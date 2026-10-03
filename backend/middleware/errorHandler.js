const errorHandler = (err, req, res, next) => {
    console.error('Error no controlado:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = errorHandler;