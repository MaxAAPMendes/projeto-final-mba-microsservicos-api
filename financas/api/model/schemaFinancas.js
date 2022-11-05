const mongoose = require('mongoose');

const SchemaFinancas = new mongoose.Schema({
  nome_banco: { type: String, required: true },
  tipo_conta: { type: Number, min: 1, max: 100, required: true },
  nome_titular: { type: String, required: true },
  limite_cartao: { type: mongoose.Decimal128, default: 0 },
});

module.exports = mongoose.model('financas', SchemaFinancas);
