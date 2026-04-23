const express = require('express');

const router = express.Router();
const productController = require('./product-controller');

router.post('/update-stock', productController.orderBeverage);

module.exports = (app) => {
  app.use('/product', router);
};
