import { Request, Response, NextFunction } from "express";
import { CookieControllerType } from '../types';

const cookieController : CookieControllerType = {

    //setSSSIDCookie sets a current instance of res.cookie to be the current value of res.locals.user pulled from when a user logs in
    setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
        console.log('setSSIDCookie controller running')
        const { _id } = res.locals.foundUser;
        res.cookie('ssid', _id, {httpOnly: true});
        console.log(res.cookie)
        return next()


        // const queryString = 'SELECT User from People WHERE User = username';
        // db.query(queryString), (err, user) => {
        //     ssid = user._id;
        //     res.cookie('ssid', ssid, {
        //         HttpOnly: true;
        //     })
        //     next()
        // }
    }
}

export default cookieController