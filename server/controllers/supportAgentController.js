const SupportAgent = require('../models/SupportAgentModel');

// Controller for creating a support agent
exports.createSupportAgent = async (req, res) => {
  try {
    const newSupportAgent = await SupportAgent.create(req.body);
    res.json(newSupportAgent);
  } catch (error) {
    console.error('Error creating support agent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllSupportAgents = async (req, res) => {
  try {
    const allSupportAgents = await SupportAgent.find();
    console.log("Send the data "+ allSupportAgents);
    res.json(allSupportAgents);
  } catch (error) {
    console.error('Error getting support tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSupportAgentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const supportAgent = await SupportAgent.findOne({ email });

    if (!supportAgent) {
      return res.status(404).json({ error: 'Support agent not found' });
    }

    res.json(supportAgent);
  } catch (error) {
    console.error('Error getting support agent by email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

