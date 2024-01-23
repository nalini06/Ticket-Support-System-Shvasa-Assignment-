import React, { useState } from 'react';
import api from '../services/api';

const SupportTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState({
    status: '',
    assignedTo: '',
    severity: '',
    type: '',
    sortBy: ''
  });

  const handleAssign = async (ticketData) =>{
    try{
          const {assignedTo} = ticketData;
          console.log("Assignedto " + ticketData);
         if(assignedTo != ''){
            throw new Error("Ticket is already assigned to " + assignedTo);
         }
         const agents = await api.getAllAgents();
         const ticketAgent = await api.getTicketToAgentMap();
         let lastIndexUsed = -1;
         if(ticketAgent.length > 0){
             const{lastAgentIndex} = ticketAgent[ticketAgent.length-1];
             lastIndexUsed = lastAgentIndex;   
         }
         const nextAgentIndex = (lastIndexUsed + 1) % (agents.length); // Assuming numberOfAgents is known

         const {name} = agents[nextAgentIndex];
         

         const agentTicketData = {
            "lastAgentIndex" : nextAgentIndex
         }
         await api.createTicketAgent(agentTicketData)
         const updatedTicket = {
           ...ticketData,
           "assignedTo":  name,
           "status": "Assigned"
         }
         console.log("Id " + ticketData._id);
         await api.updateSupportTicket(ticketData._id, updatedTicket);
         fetchTickets();
    }catch(Ex){
         console.log("error " + Ex);
         alert("Ticket is already assigned")
    }
  }

  const handleResolve = async (ticketData) =>{
      const updatedTicketData = {
         ...ticketData,
         "status" : "Resolved",
         "resolvedOn" : Date.now()
      }
      await api.updateSupportTicket(ticketData._id, updatedTicketData);
      fetchTickets();
  }



  const fetchTickets = async () => {
    try {
      const params = {
        status: filter.status,
        assignedTo: filter.assignedTo,
        severity: filter.severity,
        type: filter.type,
        sortBy: filter.sortBy
      };
      const response = await api.getAllSupportTickets(params);
      console.log("From Client " + response);
      setTickets(response);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
    }
  };

  return (
    <div>
      <h2>All Support Tickets</h2>
      <div style={styles.filtersContainer}>
        {/* Status Filter */}
        <label style={styles.filterLabel}>
          Status:
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            style={styles.filterInput}
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
            {/* Add other status options */}
          </select>
        </label>

        {/* AssignedTo Filter */}
        <label style={styles.filterLabel}>
          Assigned To:
          <input
            type="text"
            value={filter.assignedTo}
            onChange={(e) => setFilter({ ...filter, assignedTo: e.target.value })}
            style={styles.filterInput}
          />
        </label>

        {/* Severity Filter */}
        <label style={styles.filterLabel}>
          Severity:
          <select
            value={filter.severity}
            onChange={(e) => setFilter({ ...filter, severity: e.target.value })}
            style={styles.filterInput}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            {/* Add other severity options */}
          </select>
        </label>

        {/* Type Filter */}
        <label style={styles.filterLabel}>
          Type:
          <input
            type="text"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            style={styles.filterInput}
          />
        </label>

        {/* Severity Filter */}
        <label style={styles.filterLabel}>
          Sort By:
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
            style={styles.filterInput}
          >
            <option value="">All</option>
            <option value="resolvedOn">ResolvedOn</option>
            <option value="dateCreated">DateCreated</option>

            {/* Add other severity options */}
          </select>
        </label>

        <button style={styles.button} onClick={fetchTickets}>
          Get Tickets
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
            <th>Date_Created</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Assigned_To</th>
            <th>Status</th>
            <th>Resolved_On</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} style={styles.row}>
              <td style={styles.cell}>{ticket.topic}</td>
              <td style={styles.cell}>{ticket.description}</td>
              <td style={styles.cell}>{new Date(ticket.dateCreated).toLocaleDateString()}</td>
              <td style={styles.cell}>{ticket.severity}</td>
              <td style={styles.cell}>{ticket.type}</td>
              <td style={styles.cell}>{ticket.assignedTo}</td>
              <td style={styles.cell}>{ticket.status}</td>
              <td style={styles.cell}>
                {ticket.resolvedOn
                  ? new Date(ticket.resolvedOn).toLocaleDateString()
                  : '-'}
              </td>
              <td style={styles.cell}>
                <button onClick={() => handleAssign(ticket)} style={{ backgroundColor: 'purple', color: 'white', marginRight: '5px' }}>Assign</button>
                 /
                <button onClick={() => handleResolve(ticket)} style={{ backgroundColor: 'black', color: 'white' }}>Resolve</button>
    
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  filtersContainer: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: '10px',
  },
  filterInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    marginLeft: '10px',
    padding: '8px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  row: {
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '8px',
    border: '1px solid #ddd',
  },
};

export default SupportTicketList;
