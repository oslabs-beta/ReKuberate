import express from 'express';
const userRoute = express.Router();

import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts';
import sessionController from '../controllers/sessionController.ts';

//checks for cookies associated with user and sends back boolean for frontend routing
userRoute.get('/', sessionController.hasCookie, (req, res) => {
  res.status(200).send(res.locals.checked);
});

//creates a new user in DB, checking for username availability and creates a session cookie
userRoute.post('/signup', userController.checkUser, userController.createUser, cookieController.setSSIDCookie, (req, res) => {
    res.sendStatus(200);
  }
);

//logins user, checking for username in database, matching password, and creates a session cookie
userRoute.post('/login', userController.checkUser, userController.checkPassword, cookieController.setSSIDCookie, (req, res) => {
    res.sendStatus(200);
  }
);

//clears cookie when user logs out and reroutes to login page
userRoute.get('/logout', (req, res) => {
  return res.clearCookie('ssid').redirect('/');
});

export default userRoute;

