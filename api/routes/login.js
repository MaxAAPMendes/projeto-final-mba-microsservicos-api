const { Router } = require('express');
const LoginController = require('../controller/LoginController');

const router = Router();

router
  .get('/login', LoginController.logar)
  .put('/alterarSenha', LoginController.alterarSenha);

module.exports = router;
