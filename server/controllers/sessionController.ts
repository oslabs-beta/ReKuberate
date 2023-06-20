import db from '../models/dbModel.ts';
import { Request, Response, NextFunction } from 'express';
import { SessionControllerType } from '../types';

const sessionController: SessionControllerType = {
  //hasCookie checks to see if a user has a has a valid session assigned to their name
  hasCookie: async (req: Request, res: Response, next: NextFunction) => {
    console.log('hasCookie controller is running');
    try {
      //check if ssid cookie exists
      if (!req.cookies.ssid) {
        //assign res.locals.checked to false to prevent rerouting on front end
        res.locals.checked = false;
        return next();
      } else {
        //declare variable username and assign to current ssid cookie
        const username = req.cookies.ssid;
        //declare variable sqlQuery and assign to query string
        const sqlQuery: string = 'SELECT * FROM people WHERE username=$1';
        //declare variable data and assign to the evaulated result of querying the database for the username matching the ssid cookie
        const data = await db.query(sqlQuery, [username]);
        //assign res.locals.checked to a boolean depending on whether or not the user exists 
        res.locals.checked = data.rows[0] ? true : false;
        return next();
      }
    } catch (err) {
      return next({
        log: `error in hasCookie controller: ${err}`,
        status: 500,
        message: { err: 'An error occurred checking if a user has a cookie' },
      });
    }
  },
};

export default sessionController;
