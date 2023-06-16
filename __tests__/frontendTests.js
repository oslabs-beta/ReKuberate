import puppeteer from 'puppeteer';
import MouseHelper from '../server/controllers/mouseHelper.js';


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=1900,1000`],
  });
  const page = await browser.newPage();
  //set puppeteer chrome window screensize for all users
  await page.setViewport({ width: 1900, height: 1000 });
  await MouseHelper(page);

  await page.goto('http://localhost:8080');

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

  //Username label
  const usernameLabel = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p:nth-child(1)';
  await page.waitForSelector(usernameLabel);
  usernameLabel ? console.log('username label is present') : console.log('username label is not present');

  //login components testing
  const loginInput = '#loginUsername';
  await page.waitForSelector(loginInput);
  loginInput ? console.log('Login input is present.') : console.log('Login input is not present')

  //password label
  const passwordaLabel = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p:nth-child(3)';
  await page.waitForSelector(passwordaLabel);
  passwordaLabel ? console.log('password label is present') : console.log("not present")

  //password input
  const passwordInput = '#loginPassword';
  await page.waitForSelector(passwordInput);
  passwordInput ? console.log('password input is present') : console.log('password input is not present');

  //login button 
  const loginbutton = '#loginButton';
  await page.waitForSelector(loginbutton);
  loginbutton ? console.log('login button is present') : console.log('login button is not present');

  //github Login
  const github ='#githubLogin';
  await page.waitForSelector(github);
  github ? console.log('github button is present') : console.log('github button is not present')

  //create a login 
  const createUser = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > div > a';
  await page.waitForSelector(createUser);
  createUser ? console.log('create user link present') : console.log('create user not present')

})();
