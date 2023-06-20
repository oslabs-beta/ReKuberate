import { Request, Response, NextFunction } from 'express';
import { CookieControllerType } from '../types';

const cookieController: CookieControllerType = {
  //setSSIDCookie sets an ssid cookie to be the current value of res.locals.user pulled from when a user logs in
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
    console.log('setSSIDCookie controller running');
    const username = res.locals.foundUser.username;
    res.cookie('ssid', username, { httpOnly: true });
    return next();
  },
};

export default cookieController;
