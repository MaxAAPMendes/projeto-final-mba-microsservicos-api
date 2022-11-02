const modelUsuario = require('../model');
const conectarDatabase = require('../db');
const ModelSchemaUsuario = require('../model/schemaUsuario');

class UsuarioController {
  
  static async consultarUsuarios(req, res) {
    console.log('Executando Controller -> consultarUsuarios');
    // const { pesquisarTodosUsuarios } = modelUsuario();
    try {
      // const listaUsuarios = await pesquisarTodosUsuarios();
      // return res.status(200).json(listaUsuarios);
      conectarDatabase();
      // const usuarios = new ModelSchemaUsuario();
      ModelSchemaUsuario.find({}, (err, docs) => {
        if (err) return res.status(500).json({
          status: 'error',
          mensagem: `Erro ao consultar todos os usuários ${err.message}`
        })
        console.log('resultado da consulta --->', docs)
        return res.status(200).json(docs);
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao consultar usuários ${error.message}`,
      });
    }
  }

  static async cadastrarUsuario(req, res) {
    try {
      conectarDatabase();
      const novoUsuario = new ModelSchemaUsuario(req.body);
      await novoUsuario
        .save()
        .then((resultado) => {
          res.status(201).json(resultado)
        });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na gravacao ${error.message}`
      })
    }
  }
};

module.exports = UsuarioController;
