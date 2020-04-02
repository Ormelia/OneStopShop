// const http = require('http');
// const app = require('./app');

// const port = process.env.port || 3000;
// const server = http.createServer(app);

// app.get('/', (req, res) => {
//     //res.sendFile(path.join(__dirname, 'home.html'));
//     res.send('hello world');
// });

// server.listen(port);

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
});

app.get('/addProduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/productInfo.html'))
});
app.listen(port);