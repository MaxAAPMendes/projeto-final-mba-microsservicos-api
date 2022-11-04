const conectarDatabase = require('../db');
const ModelSchemaFinancas = require('../model/schemaFinancas');

class FinancasController {
  
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