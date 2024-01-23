const SupportTicket = require('../models/SupportTicket');

// Controller for creating a support ticket
exports.createSupportTicket = async (req, res) => {
  try {
    const newSupportTicket = await SupportTicket.create(req.body);
    res.json(newSupportTicket);
  } catch (error) {
    console.error('Error creating support ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupportTicket = await SupportTicket.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated ticket
    );

    if (!updatedSupportTicket) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }

    res.json(updatedSupportTicket);
  } catch (error) {
    console.error('Error updating support ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting all support tickets
exports.getAllSupportTickets = async (req, res) => {
  try {
    const { status, assignedTo, severity, type, sortBy} = req.query;
    const filteredAndSortedTickets = await filterSortAndPaginateTickets(status, 
      assignedTo, severity, type, sortBy);
    console.log("Send the tickets "+ filteredAndSortedTickets);
    res.json(filteredAndSortedTickets);
  } catch (error) {
    console.error('Error getting support tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


async function filterSortAndPaginateTickets(status, assignedTo, severity, type, sortBy) {
  try {
    // Fetch all support tickets from the database
    let allTickets = await SupportTicket.find();

    // Apply filters
    if (status) {
      allTickets = allTickets.filter(ticket => ticket.status === status);
    }
    if (assignedTo) {
      allTickets = allTickets.filter(ticket => ticket.assignedTo === assignedTo);
    }
    if (severity) {
      allTickets = allTickets.filter(ticket => ticket.severity === severity);
    }
    if (type) {
      allTickets = allTickets.filter(ticket => ticket.type === type);
    }

    // Sort tickets
    if (sortBy) {
      allTickets.sort((a, b) => {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      });
    }

    return allTickets;
  } catch (error) {
    console.error('Error filtering, sorting, and paginating tickets:', error);
    throw error;
  }
}

