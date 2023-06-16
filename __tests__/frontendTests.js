import { sign } from 'crypto';
import puppeteer from 'puppeteer';
import { Await } from 'react-router-dom';

describe('Login Page', () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });
  it('should display the main screen', async () => {
    await page.goto('http://localhost:8080');
    const mainScreenSelector = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa';
    await page.waitForSelector(mainScreenSelector);
    const mainScreen = await page.$(mainScreenSelector);
    expect(mainScreen).toBeTruthy();
  });
  it('should display the form', async () => {
    await page.goto('http://localhost:8080');
    const signInForm = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form';
    await page.waitForSelector(signInForm);
    const signIN = await page.$(signInForm);
    expect(signIN).toBeTruthy();
  });
  it('should display the username input and label', async () => {
    await page.goto('http://localhost:8080');
    const [userLabel, userInput] = [
      '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p:nth-child(1)',
      '#loginUsername',
    ];
    await page.waitForSelector(userInput);
    const inputUser = await page.$(userInput);
    await page.waitForSelector(userLabel);
    const inputUserLabel = await page.$(userLabel);
    expect(inputUser).toBeTruthy();
    expect(inputUserLabel).toBeTruthy();
  });
  it('should display the password label and input', async () => {
    await page.goto('http://localhost:8080');
    const [passwordLabel, passwordInput] = [
      '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p:nth-child(3)',
      '#loginPassword',
    ];
    await page.waitForSelector(passwordLabel);
    const inputPass = await page.$(passwordLabel);
    await page.waitForSelector(passwordInput);
    const inputPassLabel = await page.$(passwordInput);
    expect(inputPass).toBeTruthy();
    expect(inputPassLabel).toBeTruthy();
  });
  it('Should display the login button', async () => {
    await page.goto('http://localhost:8080');
    const loginbutton = '#loginButton';
    await page.waitForSelector(loginbutton);
    const buttonLogin = await page.$(loginbutton);
    expect(buttonLogin).toBeTruthy();
  });
  it('Should display the github button', async () => {
    await page.goto('http://localhost:8080');
    const githubbutton = '#githubLogin';
    await page.waitForSelector(githubbutton);
    const loginGithub = await page.$(githubbutton);
    expect(loginGithub).toBeTruthy();
  });
  it('Should display the create user link', async () => {
    await page.goto('http://localhost:8080');
    const createUserLink = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > div > a';
    await page.waitForSelector(createUserLink);
    const linkCreateUser = await page.$(createUserLink);
    expect(linkCreateUser).toBeTruthy();
  });
});

// describe('Create User Page', () => {
//   let page;
//   let browser;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({ headless: 'new' });
//     page = await browser.newPage();
//   });

//   afterAll(async () => {
//     await browser.close();
//   });
//   it('should display the main screen', async () => {
//     await page.goto('http://localhost:8080/createAccount');
//     const mainScreenSelector = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B';
//     await page.waitForSelector(mainScreenSelector);
//     const mainScreen = await page.$(mainScreenSelector);
//     expect(mainScreen).toBeTruthy();
//   });
// });
//   await page.goto('http://localhost:8080/createAccount');

//   //TESTING FOR CREATE USER
//   const createUserDiv = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B';
//   await page.waitForSelector(createUserDiv);
//   createUserDiv ? console.log('create user is present') : console.log('create user is not present');

//   //create user form
//   const createUserForm = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form';
//   await page.waitForSelector(createUserForm);
//   createUserForm ? console.log('create user form is present') : console.log('create user form is not present');

//   //usename label
//   const newUsernameLabel = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p:nth-child(1)';
//   await page.waitForSelector(newUsernameLabel);
//   newUsernameLabel ? console.log('username label is present') : console.log('username is not present');

//   //username input
//   const newUsernameInput = '#createUsername';
//   await page.waitForSelector(newUsernameInput);
//   newUsernameInput ? console.log('username input is present') : console.log('username input is not present');

//   //password label
//   const newpasswordLabel = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p:nth-child(1)';
//   await page.waitForSelector(newpasswordLabel);
//   newpasswordLabel ? console.log('password label is present') : console.log('password is not present');

//   //username input
//   const newpasswordInput = '#createUsername';
//   await page.waitForSelector(newpasswordInput);
//   newpasswordInput ? console.log('password input is present') : console.log('password input is not present');

//   //create user button
//   const createUserButton = '#loginButton';
//   await page.waitForSelector(createUserButton);
//   createUserButton ? console.log('create user button is present') : console.log('CU button is not present')

//   await browser.close();
// })();
