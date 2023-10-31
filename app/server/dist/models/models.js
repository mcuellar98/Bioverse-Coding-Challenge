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
const db_1 = __importDefault(require("../database/db"));
const addTicket = (name, email, description, status = 'new') => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = `INSERT INTO tickets (name, email, description, status) VALUES ($1, $2, $3, '${status}')`;
    yield db_1.default.query(queryString, [name, email, description]);
});
const getAllTickets = () => {
    const queryString = `SELECT * FROM tickets`;
    return db_1.default.query(queryString);
};
const updateTicketStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = `UPDATE tickets SET status = '${status}' WHERE id = ${id}`;
    yield db_1.default.query(queryString);
});
const isAdmin = (email, password) => {
    const queryString = `SELECT admin FROM users WHERE email = '${email}' AND password = '${password}'`;
    return db_1.default.query(queryString);
};
const updateDate = (id) => {
    const queryString = `UPDATE tickets SET date_updated = NOW() WHERE id = ${id}`;
    return db_1.default.query(queryString);
};
exports.default = {
    addTicket: addTicket,
    getAllTickets: getAllTickets,
    updateTicketStatus: updateTicketStatus,
    isAdmin: isAdmin,
    updateDate: updateDate
};
