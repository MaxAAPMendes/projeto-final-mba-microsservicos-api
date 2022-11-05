const mockUsuarios = require('../mocks/listaUsuarios.json');
const mongoose = require('mongoose');

module.exports = () => {
  async function pesquisarTodosUsuarios() {
    console.log('Executando Model -> pesquisarTodosUsuarios...');
    console.log(`Lista de usuários ${JSON.stringify(mockUsuarios)}`);
    return mockUsuarios;
  }
  return {
    pesquisarTodosUsuarios
  };
}
