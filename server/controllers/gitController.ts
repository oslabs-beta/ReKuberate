import express, { Request, Response, NextFunction } from 'express';
import { gitControllerType } from '../types.ts';
import db from '../models/dbModel.ts';

const gitController: gitControllerType = {
  getAccessToken: async (req, res, next) => {
    //get access token to use in next middleware to use github api
    console.log('req.query: ', req.query);
    const { code } = req.query;
    try {
      const CLIENT_ID = '4661c408155c78af4f09';
      const CLIENT_SECRET = '807d8590c5ea0e380a55ff7a323ece96d340564f';
      const response = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const result = await response.json();
      console.log('accessToken result: ', result);
      res.locals.accessToken = result;
      console.log('!!!!!', res.locals.accessToken);

      const sqlQuery: string = 'INSERT INTO people (username, password) VALUES ($1, $2)';

      //executes query
      await db.query(sqlQuery, [res.locals.accessToken.access_token, 'gh_oauth']);
      res.cookie('ssid', res.locals.accessToken.access_token);
      return next();
    } catch (err) {
      //add error handling
      return next({
        log: `error in gitController getAccessToken: ${err}`,
        status: 500,
        message: { err: 'An error occurred retrieving access token' },
      });
    }
  },

  getUserData: async (req, res, next) => {
    // console.log(req.body);
    //use github's api
    const accessToken = res.locals.accessToken.access_token; //BEARER access token
    console.log('accessToken: ', accessToken);
    try {
      const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next();
    } catch (err) {
      return next({
        log: `error in gitController getUserData: ${err}`,
        status: 500,
        message: 'An error occurred retrieving user data',
      });
    }
  },
};

export default gitController;