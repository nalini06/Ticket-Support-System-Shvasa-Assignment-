import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import SupportAgentForm from './components/SupportAgentForm';
import SupportTicketForm from './components/SupportTicketForm';
import SupportTicketList from './components/SupportTicketList';
import './styles.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Support Ticket System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-support-agent">Create Support Agent</Link>
            </li>
            <li>
              <Link to="/create-support-ticket">Create Support Ticket</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes> {/* Change from Switch to Routes */}
          <Route path="/create-support-agent" element={<SupportAgentForm />} />
          <Route path="/create-support-ticket" element={<SupportTicketForm />} />
          <Route path="/" element={<SupportTicketList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
