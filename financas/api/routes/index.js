const express = require('express');
const rotasFinancas = require('./financas');
const rotaLoginFinancas = require('./loginFinancas');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(rotasFinancas);
  app.use(rotaLoginFinancas);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'OK',
      mensagem: 'Servidor FINANÇAS disponível',
    });
  });
}