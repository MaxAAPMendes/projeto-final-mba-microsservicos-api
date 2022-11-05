const conectarDatabase = require('../db');
const ModelSchemaFinancas = require('../model/schemaFinancas');
const axios = require('../config/axios');

class FinancasController {

  static async logar(req, res) {
    const { email, senha } = req.body;
    console.log(`Executando controller logar de financas - email: ${email}`);
    axios
      .get('/')
      .then((response) => {
        console.log('REsposta da comunicação:', response);
        const { status } = response || 500;
        const resultado = response?.data || { mensagem: 'Sem dados' };
        return res.status(status).send(resultado);
      })
      .catch((error) => {
        console.log('Erro na comunicação', error?.message);
        return res.status(500).send({
          status: 'erro',
          mensagem: `Ocorreu um erro de comunicação entre os servicos ${error.message}`
        });
      })
  }

  static async excluirFinanca(req, res) {
    const { _id } = req.body;
    console.log(`Executando Controller -> excluirFinanca: ${_id}`);
    if (!_id) return res.status(400).json({
      status: 'error',
      mensagem: 'É necessário informar o campo _id!'
    });
    const filtro = { _id };
    try {
      conectarDatabase();
      const resultado = await ModelSchemaFinancas
        .deleteOne(filtro);
      console.log('deleção de finança', resultado)
      if (Object.keys(resultado)[0]) return res.status(200).json({
        status: 'sucesso',
        mensagem: 'Finança excluída com sucesso!'
      });
      return res.status(500).json({
        status: 'error',
        mensagem: 'Houve um erro na exclusão da finança!'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na alteração da finança ${error.message}`
      })
    }
  }

  static async alterarFinanca(req, res) {
    const {
      _id,
      nome_banco,
      tipo_conta,
      nome_titular,
    } = req.body;
    if (!_id) return res.status(401).send({
      status: 'atencao',
      mensagem: 'Dados inválidos. Alteração deve ser feita via _id',
    });
    if (!nome_banco || !tipo_conta || !nome_titular) return res.status(401).send({
      status: 'atenção',
      mensagem: 'Os campos nome_banco, tipo_conta e nome_titular são obrigatórios.'
    })
    const filtro = { _id };
    try {
      conectarDatabase();
      const resultado = await ModelSchemaFinancas
        .findOneAndUpdate(filtro, req.body, {
        new: true,
      })
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na alteração da finança ${error.message}`
      })
    }    
  }

  static async consultarFinancas(req, res) {
    console.log('Executando controller consultarFinancas...');
    try {
      conectarDatabase();
      ModelSchemaFinancas.find({}, (err, docs) => {
        if (err) return res.status(500).json({
          status: 'error',
          mensagem: `Erro ao consultar todos as finanças ${err.message}`
        })
        console.log('resultado da consulta todas finanças --->', docs);
        return res.status(200).json(docs);
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `Erro ao consultar finanças ${error.message}`,
      });
    }
  }
  
  static async cadastrarFinancas(req, res) {
    const {
      nome_banco,
      tipo_conta,
      nome_titular,
    } = req.body;
    if (!nome_banco || !tipo_conta || !nome_titular) return res.status(401).send({
      status: 'atenção',
      mensagem: 'Os campos nome_banco, tipo_conta e nome_titular são obrigatórios.'
    })
    try {
      conectarDatabase();
      const novaFinanca = new ModelSchemaFinancas(req.body);
      await novaFinanca
        .save()
        .then((resultado) => {
          res.status(201).json(resultado)
        });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        mensagem: `erro na gravacao ${error.message}`
      })
    };
  }
}

module.exports = FinancasController;