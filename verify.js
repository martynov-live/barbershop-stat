const { chromium } = require('playwright');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const FILE = 'file:///C:/Users/user/Desktop/projects/barbershop/index.html';

(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] });

  async function shot(w, h, name, scroll = 0, full = false) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: w, height: h });
    await page.goto(FILE);
    await page.waitForTimeout(500);
    // Force all scroll animations visible
    await page.evaluate(() => {
      document.querySelectorAll('.fade-up, .fade-left').forEach(el => {
        el.style.transition = 'none';
        el.classList.add('in');
      });
    });
    if (scroll) await page.evaluate(y => window.scrollTo(0, y), scroll);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:/Users/user/Desktop/projects/barbershop/${name}`, fullPage: full });
    await page.close();
    console.log('✓', name);
  }

  await shot(1440, 900,  'hero.png',       0,    false);
  await shot(1440, 900,  'services.png',   950,  false);
  await shot(1440, 900,  'advantages.png', 2100, false);
  await shot(1440, 900,  'reviews.png',    3000, false);
  await shot(1440, 900,  'contacts.png',   3900, false);
  await shot(375,  812,  'mobile.png',     0,    false);

  await browser.close();
})();
