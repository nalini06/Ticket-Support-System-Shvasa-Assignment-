const express = require('express');
const router = express.Router();
const ticketAgentController = require('../controllers/ticketAgentController');

// Define routes for support tickets
router.post('/', ticketAgentController.createTicketAgent);
router.get('/', ticketAgentController.getAllTicketAgents);

module.exports = router;