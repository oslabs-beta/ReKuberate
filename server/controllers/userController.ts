import { NextFunction } from 'express-serve-static-core';
import { ErrorHandler, userControllerType } from '../types';
import db from '../server.ts';

const userController: userControllerType = {
  //Checks if username exists in DB
  checkUser: (req, res, next): any => {
    const { username } = req.body;
    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1';
    return db.query(sqlQuery, [username]).then((data: any) => {
      res.locals.foundUser = data.rows[0];
      return next();
    });
  },

  //adds user to DB if username is not already taken
  createUser: (req, res, next) => {
    if (res.locals.foundUser) {
      return next({
        log: 'Error in userController.createUser middleware function',
        status: 409,
        message: { err: 'username already taken' },
      });
    }
    const { username, password } = req.body;
    const sqlQuery: string = 'INSERT INTO people (username, password) VALUES ($1, $2)';
    return db.query(sqlQuery, [username, password]).then((data: any) => {
      return next();
    });
  },

  //verifies if password matches username
  checkPassword: (req, res, next) => {
    console.log('****YOU MADE IT****');
    const error: ErrorHandler = {
      log: 'Error in userController.checkPassword middleware function',
      status: 401,
      message: { err: 'incorrect username or password' },
    };

    if (!res.locals.foundUser) return next(error);

    const { username } = res.locals.foundUser;
    const { password } = req.body;
    const sqlQuery: string = 'SELECT * FROM people WHERE username=$1 AND password=$2';
    return db.query(sqlQuery, [username, password]).then((data: any) => {
      console.log(data.rows);
      if (!data.rows[0]) return next(error);
      else return next();
    });
  },
};

export default userController;
