const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'problema1.html'));
});

app.get('/data.json', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'data.json'));
});

app.listen(3000, () => {
  console.log("Escuchando en http://localhost:3000");
});
