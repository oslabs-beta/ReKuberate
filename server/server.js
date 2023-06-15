"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import pkg from 'pg';
var url_1 = require("url");
var path_1 = require("path");
var cookie_parser_1 = require("cookie-parser");
var initRoute_ts_1 = require("./routes/initRoute.ts");
var clusterRoute_ts_1 = require("./routes/clusterRoute.ts");
var userRoute_ts_1 = require("./routes/userRoute.ts");
var gitController_ts_1 = require("./controllers/gitController.ts");
// const { Pool } = pkg;
var app = (0, express_1.default)();
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var PORT = 3001;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// const PG_URI: string = 'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
// const pool: pkg.Pool = new Pool({
//   connectionString: PG_URI,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// //Connect to SQL database
// pool.connect((err: Error) => {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   } else {
//     console.log('connected');
//   }
// });
// const db = {
//   query: (text: string, params?: string[], callback?: any): any => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
//Serves front end static files
// app.use(express.static('./frontend'))
// app.use('/', initRoute, (req: Request, res: Response) => {
//   return res.status(200).sendFile(path.resolve(__dirname, './frontend/index.html'))
// })
if (process.env.NODE_ENV === 'production') {
    app.use('/', express_1.default.static(path_1.default.resolve(__dirname, '../dist')));
}
app.use('/api/getAccessToken', gitController_ts_1.default.getAccessToken, gitController_ts_1.default.getUserData, function (req, res) {
    return res.status(200).redirect('/');
});
//Route to install prometheus and grafana
app.use('/api/initiate', initRoute_ts_1.default);
//Route to get cluster info when accessing pods display page
app.use('/api/pods', clusterRoute_ts_1.default);
//Route for user verification and creation
app.use('/api/user', userRoute_ts_1.default);
//Catch all Route
app.use('*', function (req, res) { return res.sendStatus(404); });
//Global Error Handler
app.use(function (err, req, res, next) {
    var defaultError = {
        log: 'Express error handler caught unkown middleware error',
        status: 500,
        message: { err: 'An error has occured' },
    };
    var errorObj = Object.assign(defaultError, err);
    res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () { return console.log("Listening on Port: ".concat(PORT)); });
