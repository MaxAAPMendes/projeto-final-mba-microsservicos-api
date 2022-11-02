const express = require('express');
const rotasUsuarios = require('./usuarios');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(rotasUsuarios);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'OK',
      mensagem: 'Servidor disponível',
    });
  });
}