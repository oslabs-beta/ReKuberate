"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookieController = {
    //setSSIDCookie sets a current instance of res.cookie to be the current value of res.locals.user pulled from when a user logs in
    setSSIDCookie: function (req, res, next) {
        console.log('setSSIDCookie controller running');
        var username = res.locals.foundUser.username;
        res.cookie('ssid', username, { httpOnly: true });
        return next();
    },
};
exports.default = cookieController;
