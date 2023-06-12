import db from '../models/dbModel.ts';
import { NextFunction } from 'express-serve-static-core';
import { ErrorHandler, userControllerType } from '../types';

const userController: userControllerType = {
  //Checks if username exists in DB
  //used for both login and account creation
  checkUser: async (req, res, next) => {
    console.log('checkUser controller is running');
    const { createUsername } = req.body;
    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1';
    try {
      const data = await db.query(sqlQuery, [createUsername]);
      res.locals.foundUser = data.rows[0];
      return next();
    } catch (err) {
      return next({
        log: 'Error in userController.checkUser middleware function',
        status: 500,
        message: { err: 'cannot check user' },
      });
    }
  },

  //adds user to DB if username is not already taken
  createUser: async (req, res, next) => {
    console.log('createUser controller is running');
    if (res.locals.foundUser) {
      return next({
        log: 'Error in userController.createUser middleware function',
        status: 409,
        message: { err: 'username already taken' },
      });
    }
    const { createUsername, createPassword } = req.body;
    const sqlQuery: string = 'INSERT INTO people (username, password) VALUES ($1, $2)';
    try {
      const data = await db.query(sqlQuery, [createUsername, createPassword]);
      res.locals.foundUser = { username: createUsername };
      return next();
    } catch (err) {
      return next({
        log: 'Error in userController.checkUser middleware function',
        status: 500,
        message: { err: 'cannot check user' },
      });
    }
  },

  //verifies if password matches username
  checkPassword: async (req, res, next) => {
    console.log('checkPassword controller is running');
    //error to be thrown if username does not exist or password does not match username
    const error: ErrorHandler = {
      log: 'Error in userController.checkPassword middleware function',
      status: 401,
      message: { err: 'incorrect username or password' },
    };

    //check if user was found in previous middleware function
    if (!res.locals.foundUser) return next(error);
    const { username } = res.locals.foundUser;
    const { createPassword } = req.body;

    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1 AND password=$2';
    try {
      const data = await db.query(sqlQuery, [username, createPassword]);
      if (!data.rows[0]) return next(error);
      else return next();
    } catch (err) {
      return next({
        log: 'Error in userController.checkUser middleware function',
        status: 500,
        message: { err: 'cannot check user' },
      });
    }
  },
};

export default userController;
