import db from '../models/dbModel.ts';
import { Request, Response, NextFunction } from "express";
import { SessionControllerType } from "../types";

const sessionController: SessionControllerType = {

    //isLoggedIn checks to see if a user has a has a valid session assigned to their name. 
    //If they don't they should be redirected to the landing page on frontend
    hasCookie: async (req: Request, res: Response, next: NextFunction) => {
        console.log('isLoggedIn controller is running')
        try {
            //check if ssid cookie exists
            if (!req.cookies.ssid){
                //assign res.locals.checked to false to prevent rerouting on front end
                res.locals.checked = false;
                return next();
            }
            else{
                const { username } = req.cookies.ssid;
                const sqlQuery: string = 'SELECT * FROM people WHERE username=$1';
                const data = await db.query(sqlQuery, [username]);
                console.log(data.rows);                
                res.locals.checked = data.rows[0] ? true : false;
                return next();
            } 
        } catch (err) {
            return next({
              log: `error in isLoggedIn controller: ${err}`,
              status: 500,
              message: { err: 'An error occurred checking if a user is logged in' },
            });
        }
    }

};

export default sessionController;