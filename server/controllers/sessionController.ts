import db from ../models/dbModel.ts';
import { Request, Response, NextFunction } from "express";
import { SessionControllerType } from "../types";

const sesionController: SessionControllerType = {

       //start session will create a new session and assign it to the current user in the database
       startSession: async(req: Request, res: Response, next: NextFunction) => {
        console.log('startSession controller is running')
        const cookie = res.cookie
        const cookieQuery: string = 'INSERT INTO cookies (cookieID, createdAt) VALUES ($1, $2)';
        try{
            //update user that matches _id from ssid, and create a new session that matches that _id
            
        } catch {
            return next({
                log: 'error in startSession controller: ${err}',
                status: 500,
                message: { err: 'An error occured when starting the session'}
            });
        }
    },

    //isLoggedIn checks to see if a user has a has a valid session assigned to their name. 
    //If they don't they should be redirected to the landing page
    isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
        console.log('isLoggedIn controller is running')
        //declare variable username and assign to res.cookies.ssid assigned in cookieController
        const username = req.cookies.ssid;
        console.log(username);
        const queryString = 'SELECT User from People WHERE User = username';

        try {
            const session = await db.query(queryString)
            //if the query does not find a result, the user doesnt have a cookie and is therefore not logged in
            if (!session){
                //need to reroute them to the login page so a value will likely want to be declared that is checked on the frontend
                
            }
            else return next();
        } catch (err) {
            return next({
              log: `error in isLoggedIn controller: ${err}`,
              status: 500,
              message: { err: 'An error occurred checking if a user is logged in' },
            });
        }
    }

}