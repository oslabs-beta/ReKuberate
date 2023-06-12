import express from 'express';
const userRoute = express.Router();

import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts';
import sessionController from '../controllers/sessionController.ts';

//check for cookies associated with user
userRoute.get('/', sessionController.hasCookie, (req, res) => {
  res.status(200).send(res.locals.checked);
});

//create new user in DB
userRoute.post('/signup', userController.checkUser, userController.createUser, cookieController.setSSIDCookie, (req, res) => {
    res.sendStatus(200);
  }
);

//logins in user
userRoute.post('/login', userController.checkUser, userController.checkPassword, cookieController.setSSIDCookie, (req, res) => {
    res.sendStatus(200);
  }
);

//clears cookie when user logs out
userRoute.get('/logout', (req, res) => {
  return res.clearCookie('ssid').redirect('/');
});

export default userRoute;

// cookieController.setSSIDCookie, sessionController.startSession
