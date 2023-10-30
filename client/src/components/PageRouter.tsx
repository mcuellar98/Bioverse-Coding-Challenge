import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmitTicket from "../pages/SubmitTicket";
import AdminTickets from "../pages/AdminTickets";
import HomePage from "../pages/HomePage";

const PageRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/ticket-table" element={<AdminTickets/>} />
        <Route path="/add-ticket" element={<SubmitTicket/>} />
      </Routes>
    </Router>
  );
}

export default PageRouter;