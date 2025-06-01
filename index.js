const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Helper function to read data
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));

// Helper function to write data
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET all data
app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST form data
app.post('/formData', (req, res) => {
  const data = readData();
  data.formData = req.body;
  writeData(data);
  res.json({ message: 'Form data saved' });
});

// POST new expense
app.post('/expenses', (req, res) => {
  const data = readData();
  data.expenses.push(req.body);
  writeData(data);
  res.json({ message: 'Expense added' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
