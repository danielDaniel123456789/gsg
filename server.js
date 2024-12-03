// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Servir archivos estáticos

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
