const express = require('express');
require('dotenv').config()
const path = require('path');
const cors = require('cors');
const connectDB = require('./db/connect')
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection


// API Routes
const supportAgentRoutes = require('./routes/supportAgentRoutes');
const supportTicketRoutes = require('./routes/supportTicketRoutes');
const ticketAgentRoutes = require('./routes/ticketAgentRoutes');
app.use('/api/support-agents', supportAgentRoutes);
app.use('/api/support-tickets', supportTicketRoutes);
app.use('/api/tickets-agents', ticketAgentRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Start the server

const start = async () =>{
  try{
      await connectDB(process.env.url)
      app.listen(port, ()=>{
          console.log(`Server started listening on port ${port}`);
      })
  }catch(error){
      console.log(error);
  }
}

start();
