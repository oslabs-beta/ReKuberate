import express from 'express';
const userRoute = express.Router();

import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts'
import sessionController from '../controllers/sessionController.ts'

//check for cookies associated with user
userRoute.get('/', sessionController.hasCookie, (req, res) => {
  res.status(200).send(res.locals.checked)
})

//create new user in DB
userRoute.post('/signup', userController.checkUser, userController.createUser, cookieController.setSSIDCookie, (req, res) => {
  res.sendStatus(200);
});

//logins in user
userRoute.post('/login', (req, res, next) => {console.log('login here'); return next()}, userController.checkUser, userController.checkPassword, cookieController.setSSIDCookie, (req, res) => { 
  res.sendStatus(200)
});

export default userRoute;

// cookieController.setSSIDCookie, sessionController.startSession