import puppeteer from 'puppeteer';
import MouseHelper from '../server/controllers/mouseHelper.js';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=1900,1000`],
  });
  //set puppeteer chrome window screensize for all users
  await page.setViewport({ width: 1900, height: 1000 });
  await installMouseHelper(page);

  await page.goto('http://localhost:300');

  //login components testing
  const loginbutton = '#loginUsername';
  await page.waitForSelector(loginbutton);
})();
