const conectarDatabase = require('../db');
const ModelSchemaUsuario = require('../model/schemaUsuario');

class UsuarioController {
  
  static async consultarUsuarios(req, res) {
    console.log('Executando Controller -> consultarUsuarios');
    try {
      conectarDatabase();
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
    console.log('Executando Controller -> cadastrarUsuario');
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

  static async alterarUsuario(req, res) {
    const { nomeUsuario, _id } = req.body;
    console.log(
      `Executando Controller -> alterarUsuario nomeUsuario: ${nomeUsuario}, ${_id}`
    );
    if (!nomeUsuario && !_id) return res.status(400).json({
      status: 'error',
      mensagem: 'É necessário informar o campo nomeUsuario ou _id!'
    });
    const filtro = {};
    _id ? filtro._id = _id : filtro.nomeUsuario = nomeUsuario;
    try {
      conectarDatabase();
      const resultado = await ModelSchemaUsuario
        .findOneAndUpdate(filtro, req.body, {
        new: true,
      })
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na alteração do usuário ${error.message}`
      })
    }
  }

  static async excluirUsuario(req, res) {
    const { nomeUsuario, _id } = req.body;
    console.log(`Executando Controller -> excluirUsuario: ${nomeUsuario}, ${_id}`);
    if (!nomeUsuario && !_id) return res.status(400).json({
      status: 'error',
      mensagem: 'É necessário informar o campo nomeUsuario ou _id!'
    });
    const filtro = {};
    _id ? filtro._id = _id : filtro.nomeUsuario = nomeUsuario;
    try {
      conectarDatabase();
      const resultado = await ModelSchemaUsuario
        .deleteOne(filtro);
      console.log('deleção', resultado)
      if (Object.keys(resultado)[0]) return res.status(200).json({
        status: 'sucesso',
        mensagem: 'Usuário excluído com sucesso!'
      });
      return res.status(500).json({
        status: 'error',
        mensagem: 'Houve um erro na exclusão do usuário!'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na alteração do usuário ${error.message}`
      })
    }
  }
};

module.exports = UsuarioController;
