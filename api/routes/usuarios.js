const { Router } = require('express');
const UsuarioController = require('../controller/UsuarioController');

const router = Router();

router
  .get('/usuarios', UsuarioController.consultarUsuarios)
  .post('/usuarios', UsuarioController.cadastrarUsuario)
  .put('/usuarios', UsuarioController.alterarUsuario)
  .delete('/usuarios', UsuarioController.excluirUsuario);

module.exports = router;

