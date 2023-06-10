import puppeteer from 'puppeteer';
import MouseHelper from './mouseHelper.js';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function webScrapper() {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=1900,1000`] });
  const page = await browser.newPage();
  //set puppeteer chrome window screensize for all users
  await page.setViewport({ width: 1900, height: 1000 });

  await MouseHelper(page);
  //this redirects to the dashboards page of grafana
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
  await page.mouse.click(310, 160);
  await delay(250);
  await page.mouse.click(300, 235);
  await delay(250);
  await page.mouse.click(820, 135);
  let textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const numOfKublets = await textSelector?.evaluate((el) => el.textContent);
  console.log(numOfKublets);
  //exits out of menu
  await delay(250);
  await page.mouse.click(1290, 135);

  await delay(500);

  //open menu for number of pods and gets embed
  await page.mouse.click(610, 160);
  await delay(250);
  await page.mouse.click(600, 235);
  await delay(250);
  await page.mouse.click(820, 135);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const numOfPods = await textSelector?.evaluate((el) => el.textContent);
  console.log(numOfPods);
  await delay(250);
  await page.mouse.click(1290, 135);

  await delay(500);

  //open menu for number of containers and gets embed
  await page.mouse.click(930, 160);
  await delay(250);
  await page.mouse.click(900, 235);
  await delay(250);
  await page.mouse.click(820, 135);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const numOfContainers = await textSelector?.evaluate((el) => el.textContent);
  console.log(numOfContainers);
  await delay(250);
  await page.mouse.click(1290, 135);

  await delay(500);

  //click on dashboard to go back out to all dashboards
  await page.goto('http://localhost:9000/dashboards');

  await delay(500);

  const searchInput1 =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-vbrrr8.page-action-bar > div > div > div > input';
  await page.waitForSelector(searchInput1);
  await page.type(searchInput1, 'Node Exporter / Nodes');

  await delay(500);
  const selector =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > a';

  await page.waitForSelector(selector);
  await page.click(selector);

  await delay(500);

  //opens share menu for cpu usage and gets embed
  await page.mouse.click(933, 193);
  await delay(250);
  await page.mouse.click(815, 266);
  await delay(250);
  await page.mouse.click(831, 131);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const cpuUsage = await textSelector?.evaluate((el) => el.textContent);
  console.log(cpuUsage);
  await delay(250);
  await page.mouse.click(1290, 135);
  await delay(500);

  //click on memory for memory usage (graph)
  await page.mouse.click(1402, 495);
  await delay(250);
  await page.mouse.click(1295, 568);
  await delay(250);
  await page.mouse.click(834, 132);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const memUsageGraph = await textSelector?.evaluate((el) => el.textContent);
  console.log(memUsageGraph);
  await delay(250);
  await page.mouse.click(1290, 135);
  await delay(500);

  //click on menu for memory usage (dial)
  await page.mouse.click(1870, 495);
  await delay(250);
  await page.mouse.click(1790, 573);
  await delay(250);
  await page.mouse.click(834, 132);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const memUsageDial = await textSelector?.evaluate((el) => el.textContent);
  console.log(memUsageDial);
  await delay(250);
  await page.mouse.click(1290, 135);
  await delay(500);

  //click on dashboard to go back out to all dashboards
  await page.goto('http://localhost:9000/dashboards');

  await delay(500);

  const searchInput2 =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div.css-vbrrr8.page-action-bar > div > div > div > input';
  await page.waitForSelector(searchInput2);
  await page.type(searchInput2, 'Kubernetes / API server');

  await delay(500);
  const selector1 =
    '#reactRoot > div.grafana-app > main > div.css-60onds > div.css-1syiu8h-page-wrapper > div > div.css-1rs2yug-page-container > div > div.scrollbar-view > div > div.css-1736fpx-page-content > div > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > a';

  await page.waitForSelector(selector1);
  await page.click(selector1);

  await delay(500);

  //click on menu for availability
  await page.mouse.click(621, 228);
  await delay(250);
  await page.mouse.click(505, 306);
  await delay(250);
  await page.mouse.click(834, 132);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const availability = await textSelector?.evaluate((el) => el.textContent);
  console.log(availability);
  await delay(250);
  await page.mouse.click(1290, 135);
  await delay(500);

  //click on menu for error budget
  await page.mouse.click(1870, 228);
  await delay(250);
  await page.mouse.click(1790, 306);
  await delay(250);
  await page.mouse.click(834, 132);
  textSelector = await page.waitForSelector('#share-panel-embed-embed-html-textarea');
  const errorBudget = await textSelector?.evaluate((el) => el.textContent);
  console.log(errorBudget);
  await delay(250);
  await page.mouse.click(1290, 135);

  await browser.close();

  //put all Urls into an object and then assign to res.locals.graphs
  const allUrls = {
    numOfKublets,
    numOfPods,
    numOfContainers,
    cpuUsage,
    memUsageGraph,
    memUsageDial,
    availability,
    errorBudget,
  };
  console.log(allUrls);
  return allUrls;
}

export default webScrapper;
