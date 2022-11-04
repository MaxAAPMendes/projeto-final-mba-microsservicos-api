const express = require('express');
const rotasUsuarios = require('./usuarios');
const login = require('./login');
const rotasFinancas = require('./financas');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(rotasUsuarios);
  app.use(login);
  app.use(rotasFinancas);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'OK',
      mensagem: 'Servidor disponível',
    });
  });
}