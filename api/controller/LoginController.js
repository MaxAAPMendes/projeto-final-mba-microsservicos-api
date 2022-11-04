const UsuarioController = require('./UsuarioController');
const conectarDatabase = require('../db');
const ModelSchemaUsuario = require('../model/schemaUsuario');

class LoginController {

  static async logar(req, res) {
    const { email, senha } = req.body;
    console.log('Executando o método logar...', email);
    if (!email || !email.includes('@')) {
      res.status(400).send({
        status: 'erro',
        mensagem: 'Falha na autenticação. Dados inválidos. Não foi possível logar',
      })
      return;
    }
    try {
      conectarDatabase();
      ModelSchemaUsuario.findOne({email}, (err, docs) => {
        if (err) return res.status(500).json({
          status: 'error',
          mensagem: `Erro ao consultar usuário por e-mail: ${err.message}`
        });
        console.log('resultado da consulta --->', docs)
        return res.status(200).json(docs);
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao consultar usuário por e-mail: ${error.message}`
      });
    }
  }
}

module.exports = LoginController;
