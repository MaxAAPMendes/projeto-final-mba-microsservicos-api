const express = require('express');
const rotas = require('./routes');
require('dotenv').config();

const app = express();
rotas(app);

module.exports = app;
