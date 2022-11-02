const mockUsuarios = require('../mocks/listaUsuarios.json');

async function pesquisarTodosUsuarios() {
  console.log('Executando Model -> pesquisarTodosUsuarios...');
  console.log(`Lista de usuários ${JSON.stringify(mockUsuarios)}`);
  return mockUsuarios;
}

module.exports = {
  pesquisarTodosUsuarios,
}