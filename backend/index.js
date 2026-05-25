const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve public folder as static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount POST /chat route from ./routes/chat
const chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);

// GET / returns plain text
app.get('/', (req, res) => {
  res.send('EduBot Admission Server is running');
});

// GET /leads reads leads.json from root folder
app.get('/leads', (req, res) => {
  const leadsPath = path.join(__dirname, 'leads.json');
  if (!fs.existsSync(leadsPath)) {
    return res.json([]);
  }
  try {
    const data = fs.readFileSync(leadsPath, 'utf8');
    const leads = JSON.parse(data);
    res.json(leads);
  } catch (error) {
    res.json([]);
  }
});

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.json({ 
    status: 'running', 
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

try {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Backend ready at http://localhost:${PORT}`);
    console.log(`Admin dashboard at http://localhost:${PORT}/admin.html`);
  });
} catch (err) {
  console.error('Failed to start server:', err.message);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});
