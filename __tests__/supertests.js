import cookieParser from 'cookie-parser';
import supertest from 'supertest';
const server = 'http://localhost:3001';
const request = supertest(server);

describe('Server Unit tests', () => {

  //Catch All server route testing 
  describe('catchAll Route', () => {

    it('responds with status 404 when route is not found', async () => {
      const response = await request.get('/invalid');
      expect(response.statusCode).toBe(404);
    });
  });

  //Initialization route testing unit (need to get exact object of res.locals but keeping this commented out to speed up tests)
  describe('Initalization Route', () => {
    it ('successfully responds with status 200', async () => {
      const response = await request.get('/api/initiate/');
      expect(response.statusCode).toBe(200);
    }, 40000);

    it ('successfully returns res.locals.graphs as an object', async () => {
      const response = await request.get('/api/initiate/');
      expect(response.body).toBeInstanceOf(Object)
    }, 40000)
  });

  describe('Pods Route', () => {
    //works, skipping so I dont have to have cluster running for all tests
    it('successfully responds with status 200', async () => {
      const response = await request.get('/api/pods/');
      expect(response.statusCode).toBe(200);
    });
    //works, skipping so I dont have to have cluster running for all tests
    it('successfully sends back json object', async () => {
      const response = await request.get('/api/pods/');
      expect(response.body).toBeInstanceOf(Object);
    })
    //can't be tested with the rest of the tests because they rely on the cluster being running
    it('send error message when cluster is not running', async () => {
      const response = await request.get('/api/pods/');
      expect(response).toBe('err')
    })

  })

  //User Routes testing unit
  describe('User Route', () => {

    //Cookies route testing
    describe('User Cookies', () => {
      it ('successfully sends status 200 when checking for a cookie', async () => {
        const response = await request.get('/api/user/');
        expect(response.statusCode).toBe(200);
      });

      it('successfully sends back boolean value if cookie exists or not', async () => {
        const response = await request.get('/api/user/');
        expect(response.text).toBe("false");
      })
      // //need to figure out how to get an error to occur with just a get request
      // xit('successfully sends back status 500 when error occurs', async () => {
      //   const response = await request.get('/api/user/');
      //   expect(response.statusCode).toBe(500);
      // })
    })

    //User creation Route
    describe('User Creation', () => {
      //update with new user and password each time to test
      it('successfully sends status 200 on user creation', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "steveJobs",
          createPassword: "whatitdo",
        });
        expect(response.statusCode).toBe(200);
      });

      it('responds with status 409 if username already exists in database', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "daBoi",
          createPassword: "whatitdo",
        });
        expect(response.statusCode).toBe(409);
      });

      it('responds with error message if username is already taken', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "daBoi",
          createPassword: "whatitdo",
        });
        expect(response.text).toBe("{\"err\":\"username already taken\"}");
      });

      //seems like we can only make cookies from supertest, not check so I'll skip for now
      // xit('creates an ssid cookie assigned to the input username', async () => {
      //   const response = await request.post('/api/user/signup').send({
      //     createUsername: "Alightyyyy",
      //     createPassword: "alrightyyyy",
      //   });
      //   //this only tells us our response returns an object (which it does contain the cookie) but I'm having trouble accessing just the cookie property
      //   expect(response.body).toEqual({})
      // });
    })

  //User login route
  describe('User Login', () => {
    it('sends status 200 on succcessful login', async () => {
      const response = await request.post('/api/user/login').send({
        createUsername: "Kai",
        createPassword: "kubernetes"
      });
      expect(response.statusCode).toBe(200);
    });

    it('sucessfully sends status 400 when username is invalid', async () => {
      const response = await request.post('/api/user/login').send({
        creeateUsername: "Frank",
        createPassword: "kubernetes"
      });
      expect(response.statusCode).toBe(401);
    });

      it('successfully sends status 400 when password is invalid', async () => {
        const response = await request.post('/api/user/login').send({
          creeateUsername: "Kai",
          createPassword: "whodatboi"
        });
        expect(response.statusCode).toBe(401);
    });
  })

  //User logout route
  describe('User Logout', () => {
    it('redirects user to / path', async () => {
      const response = await request.get('/api/user/logout');
      expect(response.text).toBe("Found. Redirecting to /");
    });

    it('responds with status 302 when redirecting', async () => {
      const response = await request.get('/api/user/logout');
      expect(response.statusCode).toBe(302);
    });
  });

  });

});

