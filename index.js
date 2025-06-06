const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

const readData = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data file:', err.message);
    return { formData: { total: 0, budget: 0 }, expenses: [] }; // default structure
  }
};

// Safe write
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data file:', err.message);
  }
};

// Helper function to read data
// const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));

// Helper function to write data
// const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET all data
app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST form data
app.post('/formData', (req, res) => {
  try {
      const data = readData();
      data.formData = req.body;
      writeData(data);
      res.json({ message: 'Form data saved' });
  } catch (err) {
    console.error("Error:", err);
  }
});
// POST form data
app.post('/data', (req, res) => {
  try {
      const data = readData();
      data.formData = req.body;
      writeData(data);
      res.json({ message: 'Form data saved' });
  } catch (err) {
    console.error("Error:", err);
  }
});

// POST new expense
app.post('/expenses', (req, res) => {
  const data = readData();
  data.expenses.push(req.body);
  writeData(data);
  res.json({ message: 'Expense added' });
});

// delete data
app.delete("/data", (req, res) => {
  try {
    const emptyData = {
      formData: { total: 0, budget: 0 },
      expenses: [],
    };
    writeData(emptyData);
    res.status(200).json({ message: "Data reset successfully." });
  } catch (err) {
    console.error("error:", err);
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
