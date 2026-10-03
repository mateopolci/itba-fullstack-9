const express = require('express');
const router = express.Router();
const products = require('../data/productos');


router.get('/', (req, res) => {
  res.status(200).json(products);
});


router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 11);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.status(200).json(product);
});

module.exports = router;