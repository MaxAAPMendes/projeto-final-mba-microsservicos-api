const modelUsuario = require('../model');
const conectarDatabase = require('../db');
const ModelSchemaUsuario = require('../model/schemaUsuario');

class UsuarioController {
  
  static async consultarUsuarios(req, res) {
    console.log('Executando Controller -> consultarUsuarios');
    const { pesquisarTodosUsuarios } = modelUsuario();
    try {
      const listaUsuarios = await pesquisarTodosUsuarios();
      return res.status(200).json(listaUsuarios);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao consultar usuários ${error.message}`,
      });
    }
  }

  static async cadastrarUsuario(req, res) {
    // const { ModelUsuario } = modelUsuario();
    try {
      conectarDatabase();
      const novoUsuario = new ModelSchemaUsuario(req.body);
      novoUsuario.save()
        .then((resultado) => {
          res.status(201).json(resultado)
        })
      // const user = new ModelUsuario(req.body);
      // user.save()
      //   .then((resultado) => {
      //     res.status(201).json(resultado)
      //   })

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: 'erro na gravacao'
      })
    }
  }
  // static async cadastrarUsuario(req, res) {
  //   const {
  //     nomeusuario,
  //     email,
  //     senha,
  //     nomecompleto,
  //     telefone,
  //     datacadastro,
  //   } = req.body;
  //   console.log('Executando Controller -> cadastrarUsuario:');
  //   console.log(
  //     nomeusuario,
  //     email,
  //     senha,
  //     nomecompleto,
  //     telefone,
  //     datacadastro,
  //   );
  //   try {
  //     return res.status(200).json({
  //       status: 'sucesso',
  //       mensagem: 'Usuário cadastrado com sucesso',
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 'error',
  //       mensagem: `Erro ao cadastrar usuário ${error.message}`,
  //     });
  //   }
  // }
};

module.exports = UsuarioController;
