const { Router } = require('express');
const UsuarioController = require('../controller/UsuarioController');
const usuarioLogado = require('../middleware/usuarioLogado');

const router = Router();

router
  .get('/usuarios', UsuarioController.consultarTodosUsuarios)
  .post('/usuarios', UsuarioController.cadastrarUsuario)
  .put('/usuarios', UsuarioController.alterarUsuario)
  .delete('/usuarios', UsuarioController.excluirUsuario)
  .put('/alterarSenha', usuarioLogado, UsuarioController.alterarSenha);

module.exports = router;

