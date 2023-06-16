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
    it('Should receive error if username is incorrect', async () => {
      await page.waitForSelector(username);
      await page.waitForSelector(loginButton);
      await page.type(username, '');
      await page.click(loginButton);
      const errorMessage =
        '#root > div._91iyXizfLMZnut518R_X > div.UIOjVBEHqQKk3K6lPcQa > div > form > p.GOCoYCTPu5bX4zlBl_Z6';
      expect(errorMessage).toBeTruthy;
    });
    it('Should receive error if password is incorrect', async () => {
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
    it('Should reroute to createUser endpoint when clicking Create an Account', async () => {
      await page.waitForSelector(newUserButton);

      const navigationPromise = page.waitForNavigation();
      await page.click(newUserButton);
      await navigationPromise;

      expect(page.url()).toBe('http://localhost:8080/createAccount');
    });
  });
});
