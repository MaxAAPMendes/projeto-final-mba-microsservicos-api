const { Router } = require('express');
const usuarioLogado = require('../middleware/usuarioLogado');
const FinancasController = require('../controller/FinancasController');

const router = Router();

router
  .post('/financas', usuarioLogado, FinancasController.cadastrarFinancas)
  .put('/financas', usuarioLogado, FinancasController.alterarFinanca)
  .delete('/financas', usuarioLogado, FinancasController.excluirFinanca)
  .get('/financas', usuarioLogado, FinancasController.consultarFinancas);

module.exports = router;
