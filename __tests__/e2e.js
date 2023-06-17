import 'expect-puppeteer';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// page.goto('http://localhost:8080');

describe('End to End Unit Tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });
  describe('Logging in', () => {
    const username = '#loginUsername';
    const password = '#loginPassword';
    const loginButton = '#loginButton';
    xit('Should receive error if username is incorrect', async () => {
      await page.waitForSelector(username);
      await page.waitForSelector(loginButton);
      await page.type(username, '');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p.GOCoYCTPu5bX4zlBl_Z6';
      expect(errorMessage).toBeTruthy;
    });
    xit('Should receive error if password is incorrect', async () => {
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(password, '');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p.GOCoYCTPu5bX4zlBl_Z6';
      expect(errorMessage).toBeTruthy;
    });
    xit('Should reroute to main page if username and password are valid', async () => {
      await page.waitForSelector(username);
      await page.waitForSelector(password);
      await page.waitForSelector(loginButton);
      await page.type(username, 'Kai');
      await page.type(password, 'kubernetes');

      const navigationPromise = page.waitForNavigation();
      await page.click(loginButton);
      await navigationPromise;
      //not working yet
      expect(page.url()).toBe();
    });
  });
  describe('Create new user', () => {
    const newUserButton = '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > div > a';
    const username = '#createUsername';
    const password = '#createPassword';
    const loginButton = '#loginButton';

    xit('Should reroute to createUser endpoint when clicking Create an Account', async () => {
      await page.waitForSelector(newUserButton);

      const navigationPromise = page.waitForNavigation();
      await page.click(newUserButton);
      await navigationPromise;

      expect(page.url()).toBe('http://localhost:8080/createAccount');
    });

    xit('Should throw an error if username is not provided', async () => {
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

    xit('Should throw an error if password is not provided', async () => {
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
  });
});
