const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Servir los archivos estáticos (HTML, JS, CSS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los datos desde el archivo JSON
app.get('/api/nombres', (req, res) => {
    // Leemos el archivo 'datos.json'
    fs.readFile(path.join(__dirname, 'datos.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer los datos');
            return;
        }
        res.json(JSON.parse(data)); // Enviar los datos del archivo JSON como respuesta
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
