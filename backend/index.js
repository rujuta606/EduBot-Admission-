const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
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
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
