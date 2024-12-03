const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Datos de ejemplo
const datos = {
    nombre: "Daniel",
    edad: 30,
    profesion: "Desarrollador"
};

// Servir los archivos estáticos (HTML, JS, CSS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los datos
app.get('/api/datos', (req, res) => {
    res.json(datos);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
