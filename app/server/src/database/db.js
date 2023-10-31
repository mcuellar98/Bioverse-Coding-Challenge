"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var client = new pg_1.Client({
    user: 'michaelcuellar',
    host: 'localhost',
    database: 'bioverse',
    port: 5432,
});
client.connect()
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) {
    console.log("Error connecting to database", err);
});
exports.default = client;
