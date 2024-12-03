const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Ruta para el formulario en index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para insertar un nombre en datos.json
app.post('/agregar', (req, res) => {
  const nombre = req.body.nombre;
  
  // Leer el archivo JSON para agregar el nuevo nombre
  fs.readFile(path.join(__dirname, 'data', 'datos.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo de datos');
    }
    
    // Parsear los datos del JSON
    const datos = JSON.parse(data);
    
    // Agregar el nuevo nombre
    datos.nombres.push(nombre);
    
    // Guardar los datos actualizados en el archivo
    fs.writeFile(path.join(__dirname, 'data', 'datos.json'), JSON.stringify(datos, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error al guardar los datos');
      }
      res.redirect('/');
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
