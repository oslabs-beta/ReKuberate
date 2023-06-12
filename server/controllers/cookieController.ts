import { Request, Response, NextFunction } from "express";
import { CookieControllerType } from '../types';

const cookieController : CookieControllerType = {

    //setSSSIDCookie sets a current instance of res.cookie to be the current value of res.locals.user pulled from when a user logs in
    setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
        console.log('setSSIDCookie controller running')
        const { username } = res.locals.foundUser;
        res.cookie('ssid', username, {httpOnly: true});
        return next()
    }
}

export default cookieController