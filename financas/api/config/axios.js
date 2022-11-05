const axios = require('axios');

const axiosInstancia = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

module.exports = axiosInstancia;


