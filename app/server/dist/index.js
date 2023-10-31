"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = __importDefault(require("./controllers/controllers"));
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../client/dist')));
app.use(body_parser_1.default.json());
app.get('/ticket-table', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.get('/add-ticket', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.get('/tickets', controllers_1.default.getAllTickets);
app.get('/user', controllers_1.default.isAdmin);
app.put('/update-ticket', controllers_1.default.updateTicketStatus);
app.post('/add-ticket', controllers_1.default.addTicket);
app.put('/update-date', controllers_1.default.updateDate);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
