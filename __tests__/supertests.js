import supertest from 'supertest';
const server = 'http://localhost:3001';
const request = supertest(server);

describe('Server Unit tests', () => {

  //Catch All Server Route Unit Testing 
  describe('catchAll Route', () => {
    //tests for 404 response status when route doesn't exist
    it('responds with status 404 when route is not found', async () => {
      const response = await request.get('/invalid');
      expect(response.statusCode).toBe(404);
    });
  });

  //Initialization Route Testing Unit for Prometheus and Grafana, needs long timeout for tests
  describe('Initalization Route', () => {
    it ('successfully responds with status 200', async () => {
      const response = await request.get('/api/initiate/');
      expect(response.statusCode).toBe(200);
    }, 40000);
    //checks if controller returns iframe tags in res.locals.graphs as an object
    it ('successfully returns res.locals.graphs as an object', async () => {
      const response = await request.get('/api/initiate/');
      expect(response.body).toBeInstanceOf(Object)
    }, 40000)
  });

  //Route to get pod information pulled from terminal
  describe('Pods Route', () => {
    it('successfully responds with status 200', async () => {
      const response = await request.get('/api/pods/');
      expect(response.statusCode).toBe(200);
    });
    //checks if data manipulation from terminal printout gets returned properly as an object
    it('successfully sends back a json object', async () => {
      const response = await request.get('/api/pods/');
      expect(response.body).toBeInstanceOf(Object);
    });
    //can't be tested with the rest of the tests because it checks the response when the cluster is not running
    it('sends minikube not found when no pods are running', async () => {
      const response = await request.get('/api/pods/');
      expect(response.text).toBe('{\"* Profile \\\"minikube\\\" not found. Run \\\"minikube profile list\\\" to view all profiles.\":{\"pods\":[]}}')
    });
  });

  //User Routes Testing Unit
  describe('User Route', () => {

    //Cookies Route Testing
    describe('User Cookies', () => {
      it ('successfully sends status 200 when checking for a cookie', async () => {
        const response = await request.get('/api/user/');
        expect(response.statusCode).toBe(200);
      });

      //tests to see if server responds with boolean value for frontend routing 
      it('successfully sends back boolean value if cookie exists or not', async () => {
        const response = await request.get('/api/user/');
        expect(response.text).toBe("false");
      })
    });

    //User Creation Route
    describe('User Creation', () => {
      //update with new user and password each time to test
      it('successfully sends status 200 on user creation', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "steveJobs",
          createPassword: "Apple",
        });
        expect(response.statusCode).toBe(200);
      });

      //tests for response code when username already exists
      it('responds with status 409 if username already exists in database', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "Hunter",
          createPassword: "hunter2",
        });
        expect(response.statusCode).toBe(409);
      });

      //tests for response message when username already exists
      it('responds with error message if username is already taken', async () => {
        const response = await request.post('/api/user/signup').send({
          createUsername: "Hunter",
          createPassword: "hunter2",
        });
        expect(response.text).toBe("{\"err\":\"username already taken\"}");
      });
    });

    //User Login Route
    describe('User Login', () => {
      it('sends status 200 on succcessful login', async () => {
        const response = await request.post('/api/user/login').send({
          createUsername: "Kai",
          createPassword: "kubernetes"
        });
        expect(response.statusCode).toBe(200);
      });

      //tests response status code when username is not in database for login
      it('sucessfully sends status 400 when username is invalid', async () => {
        const response = await request.post('/api/user/login').send({
          creeateUsername: "Frank",
          createPassword: "kubernetes"
        });
        expect(response.statusCode).toBe(401);
      });

      //tests response status code when password does not match username in database
      it('successfully sends status 400 when password is invalid', async () => {
        const response = await request.post('/api/user/login').send({
          creeateUsername: "Kai",
          createPassword: "iLoveKubernetes"
        });
        expect(response.statusCode).toBe(401);
      });
    });

    //User Logout Route
    describe('User Logout', () => {
      //tests response message when user logs out 
      it('redirects user to / path', async () => {
        const response = await request.get('/api/user/logout');
        expect(response.text).toBe("Found. Redirecting to /");
      });

      //tests server response status when user logs out
      it('responds with status 302 when redirecting', async () => {
        const response = await request.get('/api/user/logout');
        expect(response.statusCode).toBe(302);
      });
    });
  });
});

