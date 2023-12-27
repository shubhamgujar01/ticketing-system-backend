// ticketService.js
const Ticket = require('../models/ticketModel');

class TicketService {
  async createTicket(ticketDTO) {
    const ticket = new Ticket(ticketDTO);
    return await ticket.save();
  }

  async getAllTickets() {
    return await Ticket.find();
  }

  async getTicketById(ticketId) {
    return await Ticket.findById(ticketId);
  }

  async updateTicket(ticketId, ticketDTO) {
    return await Ticket.findByIdAndUpdate(ticketId, ticketDTO, { new: true });
  }

  async deleteTicket(ticketId) {
    return await Ticket.findByIdAndDelete(ticketId);
  }
}

module.exports = TicketService;
