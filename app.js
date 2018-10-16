const express = require('express');
const app = express();

const authRoutes = require('./Routes/auth');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/login', express.static(
  __dirname  + '/public/authentication'));

// Routes
app.use('/login', authRoutes)

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port);
