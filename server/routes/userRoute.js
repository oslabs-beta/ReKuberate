"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoute = express_1.default.Router();
var userController_ts_1 = require("../controllers/userController.ts");
var cookieController_ts_1 = require("../controllers/cookieController.ts");
var sessionController_ts_1 = require("../controllers/sessionController.ts");
//check for cookies associated with user
userRoute.get('/', sessionController_ts_1.default.hasCookie, function (req, res) {
    res.status(200).send(res.locals.checked);
});
//create new user in DB
userRoute.post('/signup', userController_ts_1.default.checkUser, userController_ts_1.default.createUser, cookieController_ts_1.default.setSSIDCookie, function (req, res) {
    res.sendStatus(200);
});
//logins in user
userRoute.post('/login', userController_ts_1.default.checkUser, userController_ts_1.default.checkPassword, cookieController_ts_1.default.setSSIDCookie, function (req, res) {
    res.sendStatus(200);
});
//clears cookie when user logs out
userRoute.get('/logout', function (req, res) {
    return res.clearCookie('ssid').redirect('/');
});
exports.default = userRoute;
// cookieController.setSSIDCookie, sessionController.startSession
