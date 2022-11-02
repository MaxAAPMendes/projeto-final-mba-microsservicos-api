const mongoose = require('mongoose');

const SchemaUsers = new mongoose.Schema({
  nomeUsuario: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  nomeCompleto: {type: String, required: true},
  telefone: {type: String},
  dataCadastro: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cadastroUsuarios', SchemaUsers);


