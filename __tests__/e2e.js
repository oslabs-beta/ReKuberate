import 'expect-puppeteer';

describe('End to End Unit Tests', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    const logoutButton = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > button.f9uabxXsNoPCLrlDwpTW';
    await page.click(logoutButton)
  })

  //Unit Tests for Login Functionality
  xdescribe('Logging in', () => {
    const username = '#loginUsername';
    const password = '#loginPassword';
    const loginButton = '#loginButton';

    //handles functionality of trying to login with incorrect username
    it('Should receive error if username is incorrect', async () => {
      await page.waitForSelector(username);
      await page.waitForSelector(loginButton);
      await page.type(username, '');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p.GOCoYCTPu5bX4zlBl_Z6';
      expect(errorMessage).toBeTruthy;
    });

    //handles functionality of trying to login with incorrect password
    it('Should receive error if password is incorrect', async () => {
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(password, '');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p.GOCoYCTPu5bX4zlBl_Z6';
      expect(errorMessage).toBeTruthy;
    });

    //handles functionality of logging in with correct username and password
    it('Should reroute to main page if username and password are valid', async () => {
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');

      const navigationPromise = page.waitForNavigation();
      await page.click(loginButton);
      await navigationPromise;
      //select the info box to make sure that the page rendered properly
      const infoBox = '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > div';
      await page.waitForSelector(infoBox);
      const info = await page.$(infoBox);
      expect(info).toBeTruthy();
      //need to write an expect statement to verify a change in state
      // expect(page.url()).toBe( "http://localhost:8080/");
    });
  });

  //Unit Tests for Creating Users
  xdescribe('Create new user', () => {
    const newUserButton = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > div > a';
    const username = '#createUsername';
    const password = '#createPassword';
    const loginButton = '#loginButton';

    //handles functionality of Create an Account button
    it('Should reroute to createUser endpoint when clicking Create an Account', async () => {
      await page.waitForSelector(newUserButton);

      const navigationPromise = page.waitForNavigation();
      await page.click(newUserButton);
      await navigationPromise;

      expect(page.url()).toBe('http://localhost:8080/createAccount');
    });

    //handles error functionality if no username is provided
    it('Should throw an error if username is not provided', async () => {
      await page.goto('http://localhost:8080/createAccount');
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(password, 'testpassword');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p.g5TRelzMwcZSywZtXjZF';
      expect(errorMessage).toBeTruthy;
    });

    //handles error functionality if no password is provided
    it('Should throw an error if password is not provided', async () => {
      await page.goto('http://localhost:8080/createAccount');
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'testusername');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p.g5TRelzMwcZSywZtXjZF';
      expect(errorMessage).toBeTruthy;
    });

    //handles error functionality if provided username is not available
    it('Should throw an error if username is already taken', async () => {
      await page.goto('http://localhost:8080/createAccount');
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'testpassword');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.LnC6EgFrVh73ecrj0o0B > div > form > p.g5TRelzMwcZSywZtXjZF';
      expect(errorMessage).toBeTruthy;
    });

    //handles functionality of creating a new and valid user
    it('Should sign new users in with valid username and password', async () => {
      await page.goto('http://localhost:8080/createAccount');
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      //username and password need to be changed each time for test
      await page.type(username, 'testusernamed');
      await page.type(password, 'testpasswordd');
      await page.click(loginButton);
     //select the submit button to make sure that the page rendered properly
     const submitButton = '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > button'; 
     await page.waitForSelector(submitButton);
     const submit = await page.$(submitButton);
     expect(submit).toBeTruthy();
    });
  });

  //Unit Tests for Documentation Sidebar
  xdescribe('Docs', () => {
    const docs = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(2)';
    //handles functionality of clicking on docs in sidebar
    it('Should route to Docs menu', async () => {
      await page.waitForSelector(docs);
      await page.click(docs);
      expect(page.url()).toBe('http://localhost:8080/docs');
    });

    //handles functionality of clicking on getting started in sub-sidebar
    it('Should render getting started guide', async () => {
      const gettingStarted = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(1)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(gettingStarted);
      await page.click(gettingStarted);
      expect(page.url()).toBe('http://localhost:8080/docs/gettingStarted');
    });

    //handles functionality of clicking on tutorials in sub-sidebar
    it('Should render tutorials guide', async () => {
      const tutorials = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(2)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(tutorials);
      await page.click(tutorials);
      expect(page.url()).toBe('http://localhost:8080/docs/tutorial');
    });

    //handles functionality of clicking on help in sub-sidebar
    it('Should render help guide', async () => {
      const help = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(3)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(help);
      await page.click(help);
      expect(page.url()).toBe('http://localhost:8080/docs/help');
    });

    //handles functionality of clicking on trouble shooting in sub-sidebar
    it('Should render trouble shooting guide', async () => {
      const troubleShooting = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(4)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(troubleShooting);
      await page.click(troubleShooting);
      expect(page.url()).toBe('http://localhost:8080/docs/troubleShooting');
    });

     //handles functionality of clicking on home on sidebar
     it('Should render home page', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);

      const metrics = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(1)';
      await page.waitForSelector(metrics);
      await page.click(metrics);
      expect(page.url()).toBe('http://localhost:8080/');
    });
  });

  //Test Unit for Pod rendering and display
  xdescribe('Pods Page Test Unit', () => {
    it('Redirects to pods page', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);
      //wait for button to render then click
      const submitButton = '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > button'; 
      await page.waitForSelector(submitButton);
      await page.click(submitButton);
      const podsDisplay = '#ac-chart-container'
      await page.waitForSelector(podsDisplay);
       expect(page.url()).toBe('http://localhost:8080/pods');
    }, 15000);
    
    //can only check if page renders because pods are refreshing every few seconds
    it('Displays Pods on page', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);
      //wait for button to render then click
      const submitButton = '#root > div._91iyXizfLMZnut518R_X > div.E2GAg31kZD7l8WUs9InP > div > button'; 
      await page.waitForSelector(submitButton);
      await page.click(submitButton);
      const chart = '#ac-chart-container'
      await page.waitForSelector(chart);
      const pods = await page.$(chart);
     expect(pods).toBeTruthy();
    }, 30000);
  });

  //Test Unit for Metrics display page
  describe('Metrics Page Test Unit', () => {
     //handles functionality of clicking on metrics in sidebar
     it('Routes to Metrics Page', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);

      const metrics = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(3)';
      await page.waitForSelector(metrics);
      await page.click(metrics);
      expect(page.url()).toBe('http://localhost:8080/metrics');
    });

    //Route to check if metrics divs are rendering when routed to the page
    it('Metrics display when routed to', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);

      const metrics = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(3)';
      await page.waitForSelector(metrics);
      await page.click(metrics);
      const memUse = '#reactRoot > div.grafana-app > main > div > div.panel-solo > div:nth-child(1) > div > div.css-kvzgb9-panel-content > div > div > div > div > canvas.flot-overlay'
      await page.waitForSelector(memUse);
      expect(memUse).toBeTruthy();
    });
  });
  
});
