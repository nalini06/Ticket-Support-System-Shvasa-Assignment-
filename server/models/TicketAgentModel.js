const mongoose = require('mongoose');

const ticketAgentSchema = new mongoose.Schema({
    lastAgentIndex: {
    type: Number,
    required: true,
  }
});

const TicketAgent = mongoose.model('TicketAgent', ticketAgentSchema);

module.exports = TicketAgent;
