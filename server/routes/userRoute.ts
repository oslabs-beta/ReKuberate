import express from 'express';
const userRoute = express.Router();

import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts'

//create new user in DB
userRoute.post('/signup', userController.checkUser, userController.createUser, (req, res) => {
  res.sendStatus(200);
});
//logins in user
userRoute.post('/login', userController.checkUser, userController.checkPassword, cookieController.setSSIDCookie, (req, res) => { 
  res.sendStatus(200);
});

export default userRoute;

// cookieController.setSSIDCookie, sessionController.startSession