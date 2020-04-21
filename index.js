const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + 'products'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
});

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/productInfo.html'))
});

app.patch('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/productInfo.html'))
});

app.delete('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
});

console.log('Server is listening on port ' + port);
app.listen(port);
