const modelUsuario = require('../model');

class UsuarioController {

  static async consultarUsuarios(req, res) {
    console.log('Executando Controller -> consultarUsuarios');
    try {
      const listaUsuarios = await modelUsuario.pesquisarTodosUsuarios();
      return res.status(200).json(listaUsuarios);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao consultar usuários ${error.message}`,
      });
    }
  }

  static async cadastrarUsuario(req, res) {
    console.log('Executando Controller -> cadastrarUsuario');
    try {
      return res.status(200).json({
        status: 'sucesso',
        mensagem: 'Usuário cadastrado com sucesso',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao cadastrar usuário ${error.message}`,
      });
    }
  }
};

module.exports = UsuarioController;
