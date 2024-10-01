const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Crear la aplicación de Express
const app = express();
app.use(cors()); // Permitir solicitudes desde cualquier origen (útil para desarrollo)
app.use(express.json()); // Para parsear solicitudes JSON

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mcbecas'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Ruta para obtener las becas
app.get('/api/becas', (req, res) => {
    const query = 'SELECT id, nombre, descripcion, estatus FROM becas';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data from database' });
        } else {
            res.json(results); // Enviar los resultados como respuesta JSON
        }
    });
});

// Ruta para obtener todas sol
app.get('/api/info_becas', (req, res) => {
    const query = 'SELECT * FROM solicitudes';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data from database' });
        } else {
            res.json(results); // Enviar los resultados como respuesta JSON
        }
    });
});

// Ruta para obtener las sol
app.get('/api/info_becas/:idUser', (req, res) => {
    const idUser = parseInt(req.params.idUser);

    const query = 'SELECT * FROM solicitudes where id_usuario = ? ';
    db.query(query, [idUser], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching data from database' });
        } else {
            res.json(results); // Enviar los resultados como respuesta JSON
        }
    });
});

app.put('/api/becas/:id', (req, res) => {
    const becaId = parseInt(req.params.id);
    const { estatus } = req.body

    // Verificar que se envió el estatus correctamente
    if (typeof estatus !== 'number') {
        return res.status(400).json({ error: 'El estatus debe ser un número (0 o 1)' });
    }

    const query = 'UPDATE becas SET estatus = ? WHERE id = ?';

    db.query(query, [estatus, becaId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error updating the database' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'No se encontró una beca con ese ID' });
        } else {
            res.json({ message: 'Beca actualizada con éxito' });
        }
    });
});

// Endpoint para registrar una nueva solicitud de beca
app.post('/api/solicitud_becas', (req, res) => {
    const { id_usuario, id_becas } = req.body;

    const query = 'CALL solicitud_becas(?, ?)';
    db.query(query, [id_usuario, id_becas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Solicitud registrada', folio: results[0][0].folio }); // Ajusta esto según la estructura de la respuesta
    });
});

app.put('/api/validacion_becas', (req, res) => {
    const { id_beca } = req.body;
    const { estatus } = req.body;
    const { comentarios } = req.body;

    const query = 'UPDATE solicitudes_becas SET estatus = ?, comentarios = ? WHERE folio = ?';

    db.query(query, [estatus,comentarios,id_beca], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró una solicitud con ese ID' });
        }

        res.json({ message: 'Solicitud validada correctamente' });
    });
});


// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
