const mockUsuarios = require('../mocks/listaUsuarios.json');

// async function pesquisarTodosUsuarios() {
//   console.log('Executando Model -> pesquisarTodosUsuarios...');
//   console.log(`Lista de usuários ${JSON.stringify(mockUsuarios)}`);
//   return mockUsuarios;
// }

// module.exports = {
//   pesquisarTodosUsuarios,
// }
const mongoose = require('mongoose');

module.exports = () => {
  // const urlDataBase = process.env.URL_MONGODB;
  // mongoose.connect(urlDataBase, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // const SchemaUsers = new mongoose.Schema({
  //   nomeUsuario: {type: String, required: true},
  //   email: {type: String, required: true, unique: true},
  //   senha: {type: String, required: true},
  //   nomeCompleto: {type: String, required: true},
  //   telefone: {type: String},
  //   dataCadastro: {type: Date, default: Date.now}
  // });
  // const ModelUsuario = mongoose.model('cadastroUsuarios', SchemaUsers);
  async function pesquisarTodosUsuarios() {
    console.log('Executando Model -> pesquisarTodosUsuarios...');
    console.log(`Lista de usuários ${JSON.stringify(mockUsuarios)}`);
    return mockUsuarios;
  }
  return {
    // ModelUsuario,
    pesquisarTodosUsuarios
  };
}
