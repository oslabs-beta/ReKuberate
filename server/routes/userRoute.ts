import express from 'express';
const userRoute = express.Router();

import userController from '../controllers/userController.ts';

//create new user in DB
userRoute.post('/signup', userController.checkUser, userController.createUser, (req, res) => {
  res.sendStatus(200);
});

userRoute.post('/login', userController.checkUser, userController.checkPassword, (req, res) => {
  res.sendStatus(200);
});

export default userRoute;
