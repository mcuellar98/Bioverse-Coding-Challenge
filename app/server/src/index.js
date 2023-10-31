"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var body_parser_1 = require("body-parser");
var controllers_1 = require("./controllers/controllers");
var compression_1 = require("compression");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../client/dist')));
app.use(body_parser_1.default.json());
app.get('/ticket-table', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.get('/add-ticket', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.get('/tickets', controllers_1.default.getAllTickets);
app.get('/user', controllers_1.default.isAdmin);
app.put('/update-ticket', controllers_1.default.updateTicketStatus);
app.post('/add-ticket', controllers_1.default.addTicket);
app.put('/update-date', controllers_1.default.updateDate);
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
