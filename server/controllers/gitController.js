"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbModel_ts_1 = require("../models/dbModel.ts");
var gitController = {
    getAccessToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var code, CLIENT_ID, CLIENT_SECRET, response, result, sqlQuery, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //get access token to use in next middleware to use github api
                    console.log('req.query: ', req.query);
                    code = req.query.code;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    CLIENT_ID = '4661c408155c78af4f09';
                    CLIENT_SECRET = '807d8590c5ea0e380a55ff7a323ece96d340564f';
                    return [4 /*yield*/, fetch("https://github.com/login/oauth/access_token?client_id=".concat(CLIENT_ID, "&client_secret=").concat(CLIENT_SECRET, "&code=").concat(code), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                            },
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    console.log('accessToken result: ', result);
                    res.locals.accessToken = result;
                    console.log('!!!!!', res.locals.accessToken);
                    sqlQuery = 'INSERT INTO people (username, password) VALUES ($1, $2)';
                    //executes query
                    return [4 /*yield*/, dbModel_ts_1.default.query(sqlQuery, [res.locals.accessToken.access_token, 'gh_oauth'])];
                case 4:
                    //executes query
                    _a.sent();
                    res.cookie('ssid', res.locals.accessToken.access_token);
                    return [2 /*return*/, next()];
                case 5:
                    err_1 = _a.sent();
                    //add error handling
                    return [2 /*return*/, next({
                            log: "error in gitController getAccessToken: ".concat(err_1),
                            status: 500,
                            message: { err: 'An error occurred retrieving access token' },
                        })];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    getUserData: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = res.locals.accessToken.access_token;
                    console.log('accessToken: ', accessToken);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('https://api.github.com/user', {
                            method: 'GET',
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "error in gitController getUserData: ".concat(err_2),
                            status: 500,
                            message: 'An error occurred retrieving user data',
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = gitController;
