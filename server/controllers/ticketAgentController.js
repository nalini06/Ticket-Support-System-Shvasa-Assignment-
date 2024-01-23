const TicketAgent = require('../models/TicketAgentModel');

// Controller for creating a support agent
exports.createTicketAgent = async (req, res) => {
  try {
    const newTicketAgent = await TicketAgent.create(req.body);
    res.json(newTicketAgent);
  } catch (error) {
    console.error('Error creating support agent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTicketAgents = async (req, res) => {
    try {
      const allTicketAgents = await TicketAgent.find();
      console.log("Send the data "+ allTicketAgents);
      res.json(allTicketAgents);
    } catch (error) {
      console.error('Error getting ticket-agent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
