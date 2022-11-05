const app = require('./api/app');

const server = app;
const porta = 4020;

server.listen(porta, () => {
  console.log(`Servidor FINANCAS disponível e rodando na porta ${porta}!`);
});