const { Router } = require('express');
const usuarioLogado = require('../middleware/usuarioLogado');
const FinancasController = require('../controller/FinancasController');

const router = Router();

router
  .post('/financas', usuarioLogado, FinancasController.cadastrarFinancas)
  .put('/financas', usuarioLogado, FinancasController.alterarFinancas)
  .get('/financas', usuarioLogado, FinancasController.consultarFinancas);

module.exports = router;
