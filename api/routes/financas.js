const { Router } = require('express');
const usuarioLogado = require('../middleware/usuarioLogado');
const FinancasController = require('../controller/FinancasController');

const router = Router();

router
  .post('/financas', usuarioLogado, FinancasController.cadastrarFinancas)
  .get('/financas', usuarioLogado, FinancasController.consultarFinancas);

module.exports = router;
