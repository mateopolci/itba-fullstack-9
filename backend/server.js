console.log("Servidor en preparación...");

const express = require('express');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const productosRouter = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor Express activo' });
});

app.use('/api/productos', productosRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});