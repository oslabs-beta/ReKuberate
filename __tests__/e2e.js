import 'expect-puppeteer';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// page.goto('http://localhost:8080');

xdescribe('End to End Unit Tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });
  describe('Logging in', () => {
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
    //*****NOT FINISHED*****    Just Finished it for you Kai, you just have to select the element instead of the route
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
    //******NOT FINISHED********
    it('Should sign new users in with valid username and password', async () => {
      await page.goto('http://localhost:8080/createAccount');
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'testusername');
      await page.type(password, 'testpassword');
      await page.click(loginButton);
      //expect to be re-reouted to homepage
      //need to write an expect statement to verify a change in state
    });
  });

  xdescribe('Docs', () => {
    const docs = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(2)';
    //handles functionality of clicking on docs in sidebar
    it('Should pull up docs menu', async () => {
      await page.waitForSelector(docs);
      await page.click(docs);
      expect(page.url()).toBe('http://localhost:8080/docs');
    });

    //handles functionality of clicking on getting started in sub-sidebar
    it('Should show getting started guide', async () => {
      const gettingStarted = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(1)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(gettingStarted);
      await page.click(gettingStarted);
      expect(page.url()).toBe('http://localhost:8080/docs/gettingStarted');
    });

    //handles functionality of clicking on tutorials in sub-sidebar
    it('Should show tutorials guide', async () => {
      const tutorials = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(2)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(tutorials);
      await page.click(tutorials);
      expect(page.url()).toBe('http://localhost:8080/docs/tutorial');
    });

    //handles functionality of clicking on help in sub-sidebar
    it('Should show help guide', async () => {
      const help = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(3)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(help);
      await page.click(help);
      expect(page.url()).toBe('http://localhost:8080/docs/help');
    });

    //handles functionality of clicking on trouble shooting in sub-sidebar
    it('Should show trouble shooting guide', async () => {
      const troubleShooting = '#root > div._91iyXizfLMZnut518R_X > div.bNky_QRpXWxny6oBVSXS.nav > a:nth-child(4)';
      await page.waitForSelector(docs);
      await page.click(docs);
      await page.waitForSelector(troubleShooting);
      await page.click(troubleShooting);
      expect(page.url()).toBe('http://localhost:8080/docs/troubleShooting');
    });
  });

  describe('Sidebar', () => {
    //THIS ONE IS HAVING PROBLEMS!!!!
    //********NOT FINISHED**********
    xit('Should show pods', async () => {
      const username = '#loginUsername';
      const password = '#loginPassword';
      const loginButton = '#loginButton';
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');
      await page.click(loginButton);

      const pods = '#root > div.zEvYFT_8MiKA7RLBSHLT.nav > a:nth-child(2)';
      await page.waitForSelector(pods);
      await page.click(pods);
      expect(page.url()).toBe('http://localhost:8080/pods');
    });

    //handles functionality of clicking on metrics in sidebar
    xit('Should show metrics', async () => {
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

    //handles functionality of clicking on home in sidebar
    xit('Should go home', async () => {
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
});
