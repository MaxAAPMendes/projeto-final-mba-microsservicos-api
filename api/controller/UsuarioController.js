const conectarDatabase = require('../db');
const ModelSchemaUsuario = require('../model/schemaUsuario');
const bcrypt = require('bcrypt');

class UsuarioController {

  static async compararSenhas(senhaPayLoad, senhaBanco) {
    console.log('Executando a comparação de senhas...');
    const resultadoComparacao = await bcrypt.compare(senhaPayLoad, senhaBanco);
    // const resultadoComparacao = await bcrypt.compare(senhaPayLoad, senhaBanco, async (err, result) => {
    //   if (err) return {
    //     status: 'erro',
    //     mensagem: 'Erro ao comparar as senhas'
    //   }
    //   console.log('Resultado da comparação de senhas', result);
    //   return result;
    // });
    console.log("resultadoComparacao", resultadoComparacao);
    return resultadoComparacao;
  }

  static gerarSenhaComoHash(senha) {
    const salt = 12;
    return bcrypt.hashSync(senha, salt);
  }
  
  static async consultarTodosUsuarios(req, res) {
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

  static consultarUsuarioPorEmail(email) {
    console.log('Executando Controller -> consultarUsuarioPorEmail...', email);
    try {
      conectarDatabase();
      ModelSchemaUsuario.findOne({email}, (err, docs) => {
        if (err) return {
          status: 'error',
          mensagem: `Erro ao consultar usuário por e-mail: ${err.message}`
        };
        console.log('resultado da consulta --->', docs)
        return docs;
      })
    } catch (error) {
      return {
        status: 'error',
        mensagem: `Erro ao consultar usuário por e-mail: ${error.message}`
      };
    }
  }

  static async cadastrarUsuario(req, res) {
    console.log('Executando Controller -> cadastrarUsuario');
    const { body } = req;
    if (!body.senha) return res.status(400).json({
      status: 'erro',
      mensagem: 'A senha é um requisito obrigatório! Informe a senha!'
    });
    const senhaHash = UsuarioController.gerarSenhaComoHash(body.senha);
    if (!senhaHash) return res.status(500).json({
      status: 'erro',
      mensagem: 'Erro ao criptografar a senha!'
    });
    body.senha = senhaHash;
    try {
      conectarDatabase();
      const novoUsuario = new ModelSchemaUsuario(body);
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
