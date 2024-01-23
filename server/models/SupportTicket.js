const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  topic: String,
  description: String,
  dateCreated: { type: Date, default: Date.now },
  severity: String,
  type: String,
  assignedTo: String, // Support Agent ID
  status: { type: String, enum: ['New', 'Assigned', 'Resolved'], default: 'New' },
  resolvedOn: { type: Date, default: null },
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

module.exports = SupportTicket;
