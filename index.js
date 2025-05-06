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


app.get('/', async (req, res) => {
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

app.get("/articles", async (req,res) => {
  try {
    const articles = await Article.find(); 
    console.log(articles);
    res.json(articles); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du chargement des articles", error: err });
  }
})

app.get('/articleDetail/:id', async (req,res) => {
  try {
    const id = req.params.id;
 
    const article = await Article.findById(id);
    console.log(article);
    res.json(article); 
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du chargement des articles", error: err });
  }
})

app.get('/article', (req, res) => {
  res.header("Content-Type", "text/html");
  console.log(__dirname);
  res.sendFile(__dirname + '/public/article.html');
})

app.listen(3000, () => {
  console.log('Serveur en ligne http://localhost:3000');
});
