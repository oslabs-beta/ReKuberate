import db from '../models/dbModel.ts';
import { ErrorHandler, userControllerType } from '../types';
import bcrypt from 'bcryptjs';

const userController: userControllerType = {
  //Checks if username exists in DB
  //used for both login and account creation
  checkUser: async (req, res, next) => {
    console.log('checkUser controller is running');
    //Desctructure createUsername property on request body
    const { createUsername } = req.body;
    //Declare variable assigned to query for selecting object that matches passed in username
    const sqlQuery = 'SELECT * FROM people WHERE username=$1';
    try {
      //Declare variable assigned to result of database query
      const data = await db.query(sqlQuery, [createUsername]);
      //Pass object from database on res.locals.foundUser property
      res.locals.foundUser = data.rows[0];
      return next();
    } catch (err) {
      //Throw error if try block fails
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
    //Throw error if result from checkUser middleware was not an empty object
    if (res.locals.foundUser) {
      return next({
        log: 'Error in userController.createUser middleware function',
        status: 409,
        message: { err: 'username already taken' },
      });
    }
    //Destructure createUsername and createPassword properties on request body
    const { createUsername, createPassword } = req.body;
    //return error if username or password was not provided
    if (!createUsername.length || !createPassword)
      return next({
        log: 'Error in userController.createUser middleware function',
        status: 400,
        message: { err: 'username or password does not meet requirements' },
      });
    //creates a hash of provided password
    const hash = await bcrypt.hash(createPassword, 10);
    //query to store provided username and hashed password in DB
    const sqlQuery = 'INSERT INTO people (username, password) VALUES ($1, $2)';
    try {
      //executes query
      console.log('INSERTING NEW USER');
      await db.query(sqlQuery, [createUsername, hash]);
      //passes object along with username key and new username as value
      res.locals.foundUser = { username: createUsername };
      return next();
    } catch (err) {
      //Throw error if try block fails
      return next({
        log: 'Error in userController.checkUser middleware function',
        status: 500,
        message: { err: 'cannot check user' },
      });
    }
  },

  checkPassword: async (req, res, next) => {
    console.log('checkPassword controller is running');
    //error to be thrown if username does not exist or password does not match username
    const error: ErrorHandler = {
      log: 'Error in userController.checkPassword middleware function',
      status: 401,
      message: { err: 'incorrect username or password' },
    };

    //If user was not found in previous middleware function throw error
    if (!res.locals.foundUser) return next(error);
    //Destructure password property from object passed from previous middleware function
    const { password } = res.locals.foundUser;
    //Desctructure createPassword property from request body
    const { createPassword } = req.body;
    try {
      //Declare variable assigned to result of calling bcrypt.compare on inputted password and stored hashed password
      const compare: boolean = await bcrypt.compare(createPassword, password);
      //If result is false throw error
      if (!compare) return next(error);
      else return next();
    } catch (err) {
      //Throw error if try block fails
      return next({
        log: 'error in userController.checkPassword middleware function',
        status: 500,
        message: { err: 'cannot identify user' },
      });
    }
  },
};

//Export userController object
export default userController;
