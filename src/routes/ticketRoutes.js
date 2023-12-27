// ticketRoutes.js
const express = require('express');
const passport = require('passport');
const TicketController = require('../controllers/ticketController');

const ticketController = new TicketController();
const router = express.Router();

// Role-based authorization middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Permission denied' });
  }
};

router.post('/tickets', passport.authenticate('jwt', { session: false }), isAdmin, ticketController.createTicket);
router.get('/tickets', passport.authenticate('jwt', { session: false }), ticketController.getAllTickets);
router.get('/tickets/:ticketId', passport.authenticate('jwt', { session: false }), ticketController.getTicketById);
router.put('/tickets/:ticketId', passport.authenticate('jwt', { session: false }), isAdmin, ticketController.updateTicket);
router.delete('/tickets/:ticketId', passport.authenticate('jwt', { session: false }), isAdmin, ticketController.deleteTicket);

module.exports = router;
