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
  const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1900,1000'] });
  const page = await browser.newPage();
  //set puppeteer chrome window screensize for all users
  await page.setViewport({ width: 1900, height: 1000});
  await installMouseHelper(page);

  await page.goto('http://localhost:9000/dashboards');

  const searchInput =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-vbrrr8.page-action-bar > div > div > div > input';
  await page.waitForSelector(searchInput);
  await page.type(searchInput, 'kubelet');

  await delay(500);

  const kublet =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > a';

  await page.waitForSelector(kublet);
  await page.click(kublet);

  await delay(500);

  //opens menu and clicks on embed to get link for kublets
  await page.mouse.click(310, 160)
  await delay(500);
  await page.mouse.click(300, 235)
  await delay(500);
  await page.mouse.click(820, 135)
  let textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea')
  const numOfKublets = await textSelector?.evaluate(el => el.textContent);
  console.log(numOfKublets)
  //exits out of menu
  await delay(500);
  await page.mouse.click(1290, 135)

  await delay(500);

  //open menu for number of pods and gets embed
  await page.mouse.click(610, 160)
  await delay(500);
  await page.mouse.click(600, 235)
  await delay(500);
  await page.mouse.click(820, 135)
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea')
  const numOfPods = await textSelector?.evaluate(el => el.textContent);
  console.log(numOfPods)
  await delay(500);
  await page.mouse.click(1290, 135)
  
  await delay(500);

  //open menu for number of containers and gets embed
  await page.mouse.click(930, 160)
  await delay(500);
  await page.mouse.click(900, 235)
  await delay(500);
  await page.mouse.click(820, 135)
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea')
  const numOfContainers = await textSelector?.evaluate(el => el.textContent);
  console.log(numOfContainers)
  await delay(500);
  await page.mouse.click(1290, 135)
  
  await delay(500);

  //click on dashboard to go back out to all dashboards
  await page.goto('http://localhost:9000/dashboards');

  await delay(500)

  const searchInput1 =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-vbrrr8.page-action-bar > div > div > div > input';
  await page.waitForSelector(searchInput1);
  await page.type(searchInput1, 'Node Exporter / Nodes');

  await delay(500);
  const selector = '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > a';

  await page.waitForSelector(selector);
  await page.click(selector);

  await delay(500);
  
  //opens share menu for cpu usage and gets embed
  await page.mouse.click(933, 193)
  await delay(500);
  await page.mouse.click(815, 266)
  await delay(500);
  await page.mouse.click(831, 131);
  await delay(500);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea')
  const url4 = await textSelector?.evaluate(el => el.textContent);
  console.log(url4)
  await delay(500);
  await page.mouse.click(1290, 135)
  await delay(500);
  
  //click on memory for memory usage (graph)
  await page.mouse.click(1402, 495);
  await delay(500)
  await page.mouse.click(1295, 568)
  await delay(500)
  await page.mouse.click(834, 132)
  await delay(500)
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const url5 = await textSelector?.evaluate(el => el.textContent);
  console.log(url5);
  await delay(500);
  await page.mouse.click(1290, 135)
  await delay(500);
  
  //click on menu for memory usage (dial)
  await page.mouse.click(1700, 495);
  await delay(500)
  await page.mouse.click(1595, 568)
  await delay(500)
  await page.mouse.click(1134, 132)
  await delay(500)
})();

export default puppeteer;

