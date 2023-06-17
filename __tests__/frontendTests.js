import puppeteer from 'puppeteer';

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

describe('Create User Page', () => {
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
    await page.goto('http://localhost:8080/createAccount');
    const mainScreenSelector = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B';
    await page.waitForSelector(mainScreenSelector);
    const mainScreen = await page.$(mainScreenSelector);
    expect(mainScreen).toBeTruthy();
  });
  it('should display the create user form', async () => {
    await page.goto('http://localhost:8080/createAccount');
    const signInForm = '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form';
    await page.waitForSelector(signInForm);
    const signIN = await page.$(signInForm);
    expect(signIN).toBeTruthy();
  });
  it('should display the create a username input and label', async () => {
    await page.goto('http://localhost:8080/createAccount');
    const [userLabel, userInput] = [
      '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p:nth-child(1)',
      '#createUsername',
    ];
    await page.waitForSelector(userInput);
    const inputUser = await page.$(userInput);
    await page.waitForSelector(userLabel);
    const inputUserLabel = await page.$(userLabel);
    expect(inputUser).toBeTruthy();
    expect(inputUserLabel).toBeTruthy();
  });
  it('should display the make password label and input', async () => {
    await page.goto('http://localhost:8080/createAccount');
    const [passwordLabel, passwordInput] = [
      '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p:nth-child(1)',
      '#createPassword',
    ];
    await page.waitForSelector(passwordLabel);
    const inputPass = await page.$(passwordLabel);
    await page.waitForSelector(passwordInput);
    const inputPassLabel = await page.$(passwordInput);
    expect(inputPass).toBeTruthy();
    expect(inputPassLabel).toBeTruthy();
  });
});

describe('Nav Bar', () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });
  it('should display the side nav bar', async () => {
    await page.goto('http://localhost:8080');
    const sideBar = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav';
    await page.waitForSelector(sideBar);
    const navBar = await page.$(sideBar);
    expect(navBar).toBeTruthy();
  });
  it('should display the 3 links prior to login', async () => {
    await page.goto('http://localhost:8080');
    const [login, docs, darkM] = [
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(1)',
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(2)',
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > button',
    ];
    await page.waitForSelector(login);
    const navBarLogin = await page.$(login);
    await page.waitForSelector(docs);
    const navBarDocs = await page.$(docs);
    await page.waitForSelector(darkM);
    const navBarDark = await page.$(darkM);
    expect(navBarLogin).toBeTruthy();
    expect(navBarDocs).toBeTruthy();
    expect(navBarDark).toBeTruthy();
  });

  it('should now display 6 links after login', async () => {
    await page.goto('http://localhost:8080');
    const [userInput, userPass, login] = ['#loginUsername', '#loginPassword', '#loginButton'];
    await page.waitForSelector(userInput);
    const inputUser = await page.$(userInput);
    await inputUser.type('a');

    await page.waitForSelector(userPass);
    const inputPass = await page.$(userPass);
    await inputPass.type('a');

    await page.waitForSelector(login);
    const loginButton = await page.$(login);
    await loginButton.click();

    const [home, pods, metrics, logout] = [
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(1)',
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(2)',
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(3)',
      '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > button.f9uabxXsNoPCLrlDwpTW',
    ];

    await page.waitForSelector(home);
    const homeLink = await page.$(home);
    await page.waitForSelector(pods);
    const podsLink = await page.$(pods);
    await page.waitForSelector(metrics);
    const metricsLink = await page.$(metrics);
    await page.waitForSelector(logout);
    const logoutLink = await page.$(logout);
    expect(homeLink).toBeTruthy();
    expect(podsLink).toBeTruthy();
    expect(metricsLink).toBeTruthy();
    expect(logoutLink).toBeTruthy();
  });
});

describe('Pods Render after submitting', () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  it('There should be a submit button present on th home page', async () => {
    await page.goto('http://localhost:8080');
    const [userInput, userPass, login] = ['#loginUsername', '#loginPassword', '#loginButton'];
    await page.waitForSelector(userInput);
    const inputUser = await page.$(userInput);
    await inputUser.type('a');

    await page.waitForSelector(userPass);
    const inputPass = await page.$(userPass);
    await inputPass.type('a');

    await page.waitForSelector(login);
    const loginButton = await page.$(login);
    await loginButton.click();
    const submit =
      '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > form > input.UQDaLf2ZMZHKto0KhHfE';
    await page.waitForSelector(submit);
    const submitButton = await page.$(submit);
    expect(submitButton).toBeTruthy();
  });

  it('Pods and Metrics should render after hitting the submit button', async() => {
    await page.goto('http://localhost:8080');
    const [userInput, userPass, login] = ['#loginUsername', '#loginPassword', '#loginButton'];
    await page.waitForSelector(userInput);
    const inputUser = await page.$(userInput);
    await inputUser.type('a');

    await page.waitForSelector(userPass);
    const inputPass = await page.$(userPass);
    await inputPass.type('a');

    await page.waitForSelector(login);
    const loginButton = await page.$(login);
    await loginButton.click();
    const submit =
      '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > form > input.UQDaLf2ZMZHKto0KhHfE';
    await page.waitForSelector(submit);
    const submitButton = await page.$(submit);
    submitButton.click();
    await page.waitForTimeout(60000);
    await page.goto('http://localhost:8080/pods')
    const chart = '#ac-chart-container';
    await page.waitForSelector(chart);
    const chartLoaded = await page.$(chart);

    await page.goto('http://localhost:8080/metrics')
    await page.waitForTimeout(30000);
    const charts = '#root > div._91iyXizfLMZnut518R_X > div.bigDiv';
    await page.waitForSelector(charts);
    const metricCharts = await page.$(charts);
    // const charts = '#root > div._91iyXizfLMZnut518R_X > div.bigDiv'
    // await page.waitForSelector(charts);
    // const metricCharts = await page.$(charts);
    expect(chartLoaded).toBeTruthy();
    expect(metricCharts).toBeTruthy();
    // expect(metricCharts).toBeTruthy();
  }, 100000)
});

#root > div._91iyXizfLMZnut518R_X > div.bigDiv
