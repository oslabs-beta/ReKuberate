"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Pool = pg_1.default.Pool;
var PG_URI = 'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
var pool = new Pool({
    connectionString: PG_URI,
    ssl: {
        rejectUnauthorized: false,
    },
});
//Connect to SQL database
pool.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    else {
        console.log('connected');
    }
});
var db = {
    query: function (text, params, callback) {
        return pool.query(text, params, callback);
    },
};
exports.default = db;
