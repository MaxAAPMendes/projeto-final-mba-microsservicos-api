const mongoose = require('mongoose');

module.exports = () => {
  const urlDataBase = process.env.URL_MONGODB;
  mongoose.connect(urlDataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}