import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
const browser = await chromium.launch();
fs.mkdirSync('docs/rtl-navigation', { recursive: true });
try {
  for (const width of [320, 390, 768, 1366]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1366 ? 860 : 844 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    for (const path of ['/site/', '/site-b/', '/site-c/']) {
      await page.goto((process.env.BASE ?? 'http://localhost:4173') + path);
      await page.evaluate(() => document.fonts.ready);
      const brand = page.locator('.top .brand');
      const menu = page.locator('.mobile-navigation');
      const trigger = menu.locator('summary');
      if (width <= 768) {
        const t = await trigger.boundingBox(), b = await brand.boundingBox();
        assert(t.x > b.x && t.width >= 44 && t.height >= 44);
        await trigger.click();
        const nav = menu.getByRole('navigation');
        await nav.waitFor();
        const box = await nav.boundingBox();
        assert(box.x >= 0 && box.x + box.width <= width);
        await page.screenshot({ path: `docs/rtl-navigation/menu-${path.split('/')[1]}-${width}.png` });
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('open'), null);
        assert(await trigger.evaluate(e => document.activeElement === e));
        await trigger.click();
        await page.locator('main').click({ position: { x: 2, y: 300 } });
        assert.equal(await menu.getAttribute('open'), null);
        await trigger.click();
        await nav.getByRole('link', { name: 'پروژه‌ها', exact: true }).click();
        await page.waitForURL(/\/projects\/$/);
      } else {
        const nav = page.locator('.desktop-navigation');
        assert((await nav.boundingBox()).x > (await brand.boundingBox()).x);
        assert.equal(await trigger.isVisible(), false);
      }
      await page.goto((process.env.BASE ?? 'http://localhost:4173')+path+'projects/');
      const input=page.getByRole('searchbox',{name:'جست‌وجو در پروژه‌ها',exact:true});await input.waitFor();
      assert((await input.boundingBox()).height>=44);
      assert(Number(await input.evaluate(e=>getComputedStyle(e).fontSize.replace('px','')))>=16);
      const all=page.locator('[data-project-search]'), total=await all.count();assert(total>1);
      await input.fill('سمفوني');assert.equal(await page.locator('[data-project-search]:visible').count(),1);
      assert((new URL(page.url())).searchParams.get('q')==='سمفوني');
      await page.screenshot({path:`docs/rtl-navigation/search-${path.split('/')[1]}-${width}.png`});
      await page.locator('[data-project-search]:visible').first().click();await page.goBack();await input.waitFor();assert.equal(await input.inputValue(),'سمفوني');
      await input.fill('zzzz-no-such-project');await page.getByText('پروژه‌ای با این مشخصات پیدا نشد.',{exact:true}).waitFor();
      await page.getByRole('button',{name:'پاک کردن جست‌وجو',exact:true}).click();assert.equal(await page.locator('[data-project-search]:visible').count(),total);
      assert(!(new URL(page.url())).searchParams.has('q'));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: `docs/rtl-navigation/header-${path.split('/')[1]}-${width}.png` });
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally { await browser.close(); }
console.log('All Zarone variants: RTL placement, keyboard, dismissal, navigation and overflow passed');
