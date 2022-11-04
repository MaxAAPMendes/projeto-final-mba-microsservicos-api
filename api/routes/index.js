const express = require('express');
const rotasUsuarios = require('./usuarios');
const login = require('./login');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(rotasUsuarios);
  app.use(login);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'OK',
      mensagem: 'Servidor disponível',
    });
  });
}