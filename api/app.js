const express = require('express');
const rotas = require('./routes');

const app = express();
rotas(app);

module.exports = app;
