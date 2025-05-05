const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const articleSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  }
});

// Créer et exporter le modèle User
module.exports = mongoose.model('Article', articleSchema);