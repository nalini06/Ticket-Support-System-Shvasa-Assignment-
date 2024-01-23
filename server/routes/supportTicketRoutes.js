const express = require('express');
const router = express.Router();
const supportTicketController = require('../controllers/supportTicketController');

// Define routes for support tickets
router.post('/', supportTicketController.createSupportTicket);
router.get('/', supportTicketController.getAllSupportTickets);
router.put('/:id', supportTicketController.updateSupportTicket);

module.exports = router;
