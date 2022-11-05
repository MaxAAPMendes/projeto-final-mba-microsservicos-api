const { Router } = require('express');
const FinancasController = require('../controller/FinancasController');

const router = Router();

router
  .get('/login', FinancasController.logar);

module.exports = router;
