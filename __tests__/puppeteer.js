import puppeteer from 'puppeteer';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function installMouseHelper(page) {
  await page.evaluateOnNewDocument(() => {
    // Install mouse helper only for top-level frame.
    if (window !== window.parent)
      return;
    window.addEventListener('DOMContentLoaded', () => {
      const box = document.createElement('puppeteer-mouse-pointer');
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        puppeteer-mouse-pointer {
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 10000;
          left: 0;
          width: 20px;
          height: 20px;
          background: rgba(0,0,0,.4);
          border: 1px solid white;
          border-radius: 10px;
          margin: -10px 0 0 -10px;
          padding: 0;
          transition: background .2s, border-radius .2s, border-color .2s;
        }
        puppeteer-mouse-pointer.button-1 {
          transition: none;
          background: rgba(0,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-2 {
          transition: none;
          border-color: rgba(0,0,255,0.9);
        }
        puppeteer-mouse-pointer.button-3 {
          transition: none;
          border-radius: 4px;
        }
        puppeteer-mouse-pointer.button-4 {
          transition: none;
          border-color: rgba(255,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-5 {
          transition: none;
          border-color: rgba(0,255,0,0.9);
        }
      `;
      document.head.appendChild(styleElement);
      document.body.appendChild(box);
      document.addEventListener('mousemove', event => {
        box.style.left = event.pageX + 'px';
        box.style.top = event.pageY + 'px';
        updateButtons(event.buttons);
      }, true);
      document.addEventListener('mousedown', event => {
        updateButtons(event.buttons);
        box.classList.add('button-' + event.which);
      }, true);
      document.addEventListener('mouseup', event => {
        updateButtons(event.buttons);
        box.classList.remove('button-' + event.which);
      }, true);
      function updateButtons(buttons) {
        for (let i = 0; i < 5; i++)
          box.classList.toggle('button-' + i, buttons & (1 << i));
      }
    }, false);
  });
};

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 1000});
  await installMouseHelper(page);
  await page.goto('http://localhost:9000/');
  const signIn = '#reactRoot > div.grafana-app > main > div.css-278jzv > div.css-13883cc > div.css-68hv8y > a';

  await page.waitForSelector(signIn);
  await page.click(signIn);

  const usernameInput =
    '#reactRoot > div.grafana-app > main > div > div.css-opq959 > div > div.css-9h8xxw > div > div > form > div:nth-child(1) > div:nth-child(2) > div > div > input';

  await page.waitForSelector(usernameInput);
  await page.type(usernameInput, 'admin');
  const passwordInput = '#current-password';

  await page.waitForSelector(passwordInput);
  await page.type(passwordInput, 'prom-operator');
  const loginButton =
    '#reactRoot > div.grafana-app > main > div > div.css-opq959 > div > div.css-9h8xxw > div > div > form > button';

  await page.waitForSelector(loginButton);
  await page.click(loginButton);
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.goto('http://localhost:9000/dashboards');
  const generalFolder =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-1rf724w > div > div';

  await page.waitForSelector(generalFolder);
  await page.click(generalFolder);

  const searchInput =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-vbrrr8.page-action-bar > div > div > div > input';
  await page.waitForSelector(searchInput);
  await page.type(searchInput, 'kubelet');

  await delay(1000);

  const kublet =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > a';

  await page.waitForSelector(kublet);
  await page.click(kublet);

  await delay(1000);

  const dotDotDotButton =
    '/html/body/div[1]/div[1]/main/div[2]/div[3]/div/div[1]/div/div/div[1]/div/div/div[1]/div/div/div[2]/button/div/svg';

  await page.mouse.click(310, 160)
  await delay(500);
  await page.mouse.click(300, 235)
  await delay(500);
  await page.mouse.click(900, 140)
  const textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea')
  const url = await textSelector?.evaluate(el => el.textContent);
  console.log(url)
})();
