// const express = require('express');
// const app = express();
// var port = process.env.PORT || 3000;

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// const mongoose = require('mongoose');

// const productRoutes = require('./api/routes/products');
// const orderRoutes = require('./api/routes/orders');







// app.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if (req.method  === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// module.exports = app;