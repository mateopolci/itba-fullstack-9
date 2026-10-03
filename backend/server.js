console.log("Servidor en preparación...");

const express = require('express');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware Global de Logging
app.use(logger);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor Express activo' });
});

// Middleware para manejo de rutas no encontradas (404)
app.use(notFound);

// Middleware centralizado para manejo de errores (500)
app.use(errorHandler);

// Inicialización del listener TCP
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});