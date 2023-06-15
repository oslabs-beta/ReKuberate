"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var initController_ts_1 = require("../controllers/initController.ts");
var initRoute = express_1.default.Router();
initRoute.get('/', initController_ts_1.default.installPrometheus, initController_ts_1.default.installGrafana, function (req, res, next) {
    return res.status(200).json(res.locals.graphs);
});
exports.default = initRoute;
