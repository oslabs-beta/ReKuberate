import { NextFunction } from 'express-serve-static-core';
import { ErrorHandler, userControllerType } from '../types';
import db from '../server.ts';

const userController: userControllerType = {
  //Checks if username exists in DB
  checkUser: async (req, res, next) => {
    const { username } = req.body;
    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1';
    try {
      const data = await db.query(sqlQuery, [username]);
      console.log(data.rows);
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
    if (res.locals.foundUser) {
      return next({
        log: 'Error in userController.createUser middleware function',
        status: 409,
        message: { err: 'username already taken' },
      });
    }
    const { username, password } = req.body;
    const sqlQuery: string = 'INSERT INTO people (username, password) VALUES ($1, $2)';
    try {
      const data = await db.query(sqlQuery, [username, password]);
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
    //error to be thrown if username does not exist or password does not match username
    const error: ErrorHandler = {
      log: 'Error in userController.checkPassword middleware function',
      status: 401,
      message: { err: 'incorrect username or password' },
    };

    //check if user was found in previous middleware function
    if (!res.locals.foundUser) return next(error);

    const { username } = res.locals.foundUser;
    const { password } = req.body;

    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1 AND password=$2';
    try {
      const data = await db.query(sqlQuery, [username, password]);
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
