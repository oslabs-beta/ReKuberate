"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var clusterController_ts_1 = require("../controllers/clusterController.ts");
var clusterRoute = express_1.default.Router();
clusterRoute.get('/', clusterController_ts_1.default.getPodAndNodeInfo, function (req, res, next) {
    return res.status(200).json(res.locals.nodeAndPodInfo);
});
exports.default = clusterRoute;
