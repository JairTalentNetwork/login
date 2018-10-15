const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use('/login', express.static(
  __dirname  + '/public/authentication'));

// Routes
app.use('/login', require('./Routes/auth'));

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port);
