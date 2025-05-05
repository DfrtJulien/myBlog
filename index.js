// index.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const fs = require('fs');
const app = express();
const path = require('path');  

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
