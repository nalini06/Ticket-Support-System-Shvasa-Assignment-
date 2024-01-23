import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SupportTicketForm = () => {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    topic: '',
    description: '',
    severity: '',
    type: '',
    assignedTo: '',
    status: 'New',
    resolvedOn: null,
  });
  const [agentDataList, setAgentDataList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to create support ticket
      await api.createSupportTicket(ticketData);
      navigate('/');
    } catch (error) {
      console.error('Error creating support ticket:', error);
    }
  };

  /*
  
  const ticketToAgentMap = await api.getTicketToAgentMap();
        console.log("Stage1 "+ ticketToAgentMap)
        const agents = await api.getAllAgents();
        console.log("Agents " + agents.json());
        let nextAgentName = '';
        let nextAgentIndex = 0;
        if (ticketToAgentMap.length > 0) {
          const latestAssignment = ticketToAgentMap[ticketToAgentMap.length - 1];
          const {agentIndex } = latestAssignment
          const nextAgentIndex = (agentIndex + 1) % (agents.length); // Assuming numberOfAgents is known
           nextAgentName = agents[nextAgentIndex].name;
        }else {
          nextAgentName = agents[nextAgentIndex].body.name;
        }
        console.log("Name " + agents[nextAgentIndex].body.name);
        setTicketData({
          ...ticketData,
          assignedTo: nextAgentName,
          status: 'Assigned',
        });

        await api.createTicketAgentMapping({
          agentIndex: nextAgentIndex
        });
  
  */


    
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Support Ticket</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Topic:
          <input
            type="text"
            name="topic"
            value={ticketData.topic}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Description:
          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleInputChange}
            required
            style={{ ...styles.input, height: '100px' }} // Adjust textarea height
          />
        </label>

        <label style={styles.label}>
          Severity:
          <select
            name="severity"
            value={ticketData.severity}
            onChange={handleInputChange}
            required
            style={styles.input}
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label style={styles.label}>
          Type:
          <input
            type="text"
            name="type"
            value={ticketData.type}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>

        
        <button type="submit" style={styles.button}>
          Create Support Ticket
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SupportTicketForm;
