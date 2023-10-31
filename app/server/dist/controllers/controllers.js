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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./../models/models"));
const getAllTickets = (req, res) => {
    models_1.default.getAllTickets()
        .then((results) => {
        res.json(results.rows);
    })
        .catch((err) => {
        console.log('Error', err);
        res.status(500).send('An error occurred');
    });
};
const updateTicketStatus = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    models_1.default.updateTicketStatus(id, status)
        .then(() => {
        res.send('Ticket status updated');
    })
        .catch((err) => {
        console.log('Error', err);
        res.status(500).send('An error occurred');
    });
};
const addTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    models_1.default.addTicket(name, email, description)
        .then(() => {
        res.send('Ticket Added');
    })
        .catch((err) => {
        console.log('Error', err);
        res.status(500).send('An error occurred');
    });
});
const isAdmin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    models_1.default.isAdmin(email, password)
        .then((result) => {
        res.send(result.rows);
    })
        .catch((err) => {
        console.log('Error', err);
        res.status(500).send('An error occurred');
    });
};
const updateDate = (req, res) => {
    const id = req.body.id;
    models_1.default.updateDate(id)
        .then((result) => {
        res.send('date updated');
    })
        .catch((err) => {
        console.log('Error', err);
        res.status(500).send('An error occurred');
    });
};
exports.default = {
    getAllTickets: getAllTickets,
    updateTicketStatus: updateTicketStatus,
    addTicket: addTicket,
    isAdmin: isAdmin,
    updateDate: updateDate
};
