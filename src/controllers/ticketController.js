// ticketController.js
const TicketService = require('../services/ticketService');
const TicketDTO = require('../dtos/ticketDTO');

const ticketService = new TicketService();

class TicketController {
  async createTicket(req, res) {
    try {
      const { title, description } = req.body;
      const ticketDTO = new TicketDTO(title, description);
      const createdTicket = await ticketService.createTicket(ticketDTO);
      res.status(201).json(createdTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTickets(req, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTicketById(req, res) {
    try {
      const { ticketId } = req.params;
      const ticket = await ticketService.getTicketById(ticketId);
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateTicket(req, res) {
    try {
      const { ticketId } = req.params;
      const { title, description } = req.body;
      const ticketDTO = new TicketDTO(title, description);
      const updatedTicket = await ticketService.updateTicket(ticketId, ticketDTO);
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTicket(req, res) {
    try {
      const { ticketId } = req.params;
      await ticketService.deleteTicket(ticketId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = TicketController;
