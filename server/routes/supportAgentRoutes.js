const express = require('express');
const router = express.Router();
const supportAgentController = require('../controllers/supportAgentController');

// Define routes for support agents
router.post('/', supportAgentController.createSupportAgent);
router.get('/', supportAgentController.getAllSupportAgents);
router.get('/:email', supportAgentController.getSupportAgentByEmail)

module.exports = router;
