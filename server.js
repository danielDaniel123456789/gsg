const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const app = express();
const PORT = 3000;
const REPO_URL = 'https://github.com/danielDaniel123456789/gsg.git';
const LOCAL_REPO_PATH = path.join(__dirname, 'repo');

// Middleware
app.use(bodyParser.json());

// Clonar el repositorio si no está clonado
if (!fs.existsSync(LOCAL_REPO_PATH)) {
    simpleGit().clone(REPO_URL, LOCAL_REPO_PATH, (err) => {
        if (err) console.error('Error al clonar el repositorio:', err);
        else console.log('Repositorio clonado con éxito.');
    });
}

// Ruta para agregar un nuevo nombre
app.post('/nombres', async (req, res) => {
    const nuevoNombre = req.body.nombre;
    if (!nuevoNombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }

    const filePath = path.join(LOCAL_REPO_PATH, 'nombres.json');

    try {
        // Leer el archivo JSON
        const data = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(data);

        // Agregar el nuevo nombre
        json.nombres.push(nuevoNombre);

        // Guardar el archivo actualizado
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

        // Subir los cambios al repositorio
        const git = simpleGit(LOCAL_REPO_PATH);
        await git.add('./*');
        await git.commit(`Agregado nombre: ${nuevoNombre}`);
        await git.push('origin', 'main');

        res.json({ mensaje: 'Nombre agregado y cambios subidos a GitHub.' });
    } catch (error) {
        console.error('Error al modificar el archivo JSON:', error);
        res.status(500).json({ error: 'Error al agregar el nombre.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
