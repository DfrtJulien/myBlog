const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (err) {
    console.error('Erreur MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;