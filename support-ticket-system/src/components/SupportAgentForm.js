import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import api from '../services/api';

const SupportAgentForm = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const [agentData, setAgentData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentData({ ...agentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createSupportAgent(agentData);
      if(response == 200){
        throw new Error();
      }
      console.log('Support Agent created:', response);
      // Assuming the API call is successful, navigate to a new page or screen
      navigate('/success'); // Replace '/success' with the desired route
    } catch (error) {
      console.error('Error creating support agent:', error);
      alert("Email already exists")
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Support Agent</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={agentData.name}
          onChange={handleInputChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={agentData.email}
          onChange={handleInputChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Phone:</label>
        <input
          type="text"
          name="phone"
          value={agentData.phone}
          onChange={handleInputChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={agentData.description}
          onChange={handleInputChange}
          required
          style={{ ...styles.input, height: '100px' }} // Adjust textarea height
        />

        <button type="submit" style={styles.button}>
          Create Support Agent
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

export default SupportAgentForm;
