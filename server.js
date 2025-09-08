const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
const excuses = require('./excuses.json');
app.use(express.static(path.join(__dirname)));

// Route for (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/random-excuse', (req, res) => {
  const randomIndex = Math.floor(Math.random() * excuses.length);
  res.json({ excuse: excuses[randomIndex] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
