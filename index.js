const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + 'products'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const path = require('path');

app.get('/products', function (req, res){
    //res.sendFile(path.join(__dirname, 'frontend/home.html'))
    res.send(req.body)
})
app.get('products/:id', function (req, res){
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
    //res.send(req.params)
})
app.post('/products', function (req, res){
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
    //res.send(req.body)
})
app.patch('products/:id', function (req, res){
    res.sendFile(path.join(__dirname, 'frontend/home.html'))
    //res.send(req.params, req.body)
})
app.delete('products/:id', function (req, res){

    res.send( req.params)
})

    
console.log('Server is listening on port ' + port);
app.listen(port);
