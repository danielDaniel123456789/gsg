const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Ruta para cargar los datos del archivo JSON
app.get('/nombres', (req, res) => {
  // Lee el archivo datos.json
  fs.readFile(path.join(__dirname, 'datos.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al cargar los datos.');
    }

    // Envía los datos JSON al cliente
    res.json(JSON.parse(data));
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
