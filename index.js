// index.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const fs = require('fs');
const app = express();
const path = require('path');  
const Article = require('./models/Article');

connectDB()

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' https://m.media-amazon.com; script-src 'self';");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

app.use(express.urlencoded({ extended: true }));


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.header("Content-Type", "text/html");

 
  res.sendFile(__dirname + '/index.html');

 
});

app.get('/addArticle', (req, res) => {
  res.header("Content-Type", "text/html");
  console.log(__dirname);
  res.sendFile(__dirname + '/public/addArticle.html');

 
});

app.post('/articles', (req, res) => {
  const { title, content } = req.body;

  const article = new Article({title, content});
  try{
    article.save();
    console.log('Article ajouté');
  }catch(err){
    console.log(err);
  }

})

app.listen(3000, () => {
  console.log('Serveur en ligne http://localhost:3000');
});
