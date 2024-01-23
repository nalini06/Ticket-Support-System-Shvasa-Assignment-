const apiUrl = 'https://ticket-support-system-vd82.onrender.com/api'; // Update with your API endpoint

const api = {
  createSupportAgent: async (agentData) => {
    const {email} = agentData;
    console.log("Email " + email);
    const agentExist = await fetch(`${apiUrl}/support-agents/${email}`);

    if(agentExist.status != 404){
      return 200;
    }

    const response = await fetch(`${apiUrl}/support-agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentData),
    });
    return response.json();
  },

  createSupportTicket: async (ticketData) => {
    const updatedTicketData = {
      ...ticketData,
      "status" : "New"
    }
    const response = await fetch(`${apiUrl}/support-tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTicketData),
    });
    return response.json();
  },

  updateSupportTicket: async (ticketId, updatedTicketData) => {
    const response = await fetch(`${apiUrl}/support-tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTicketData),
    });

    return response.json();
  },

  getAllSupportTickets: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}/support-tickets?${queryString}`);
    return response.json();
  },

  getTicketToAgentMap: async () =>{
    const response = await fetch(`${apiUrl}/tickets-agents`);
    return response.json();
  },

  createTicketAgent: async (ticketData) =>{
    const response = await fetch(`${apiUrl}/tickets-agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
     });
     return response.json();
  },

  getAllAgents: async () =>{
    const response = await fetch(`${apiUrl}/support-agents`);
    return response.json();
  }

};

export default api;
