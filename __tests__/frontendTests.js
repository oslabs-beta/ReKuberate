import puppeteer from 'puppeteer';
import MouseHelper from '../server/controllers/mouseHelper.js';


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=1900,1000`],
  });
  //set puppeteer chrome window screensize for all users
  await page.setViewport({ width: 1900, height: 1000 });
  await MouseHelper(page);

  await page.goto('http://localhost:300');

  //Main screen testing and all of it components in it for the login page
  const mainScreen = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa';
  await page.waitForSelector(mainScreen);
  mainScreen ? console.log('Main Screen is present.') : console.log('Main screen is not present');

  //Login Components
  const loginComponents = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div';
  await page.waitForSelector(loginComponents);
  loginComponents ? console.log('the login components div is present') : console.log('the login components div is not present')

  //Sign in Form
  const signInForm = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form';
  await page.waitForSelector(signInForm);
  signInForm ? console.log('Sign in form is present') : console.log('Sign in form is not present')

  //login components testing
  const loginbutton = '#loginUsername';
  await page.waitForSelector(loginbutton);
  loginbutton ? console.log('Login button is present.') : console.log('Login button is not present')

})();
