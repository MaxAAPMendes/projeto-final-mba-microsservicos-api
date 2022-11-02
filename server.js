const app = require('./api/app');

const server = app;
const porta = 3000;

server.listen(porta, () => {
  console.log(`Servidor disponível e rodando na porta ${porta}!`);
});