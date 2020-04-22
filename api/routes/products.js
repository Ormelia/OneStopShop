let Product = require('./product')
let mongoose = require('mongoose');

const Product = require('../models/product')
const express = require('express');
//const morgan = require('morgan')
const database = client.db('productsdb')
const corsModule = require('cors')
const bodyPareser = require('body-parser')
const axiosModule = require('axios')
const axios = axiosModule.default
const swaggerJSCodeModule = require('swagger-jsdoc')
const swaggerUIExpressModule = require('swagger-ui-express')
const swaggerDocs = swaggerJSCodeModule(swaggerOpts)


//DBstuff///////////////////////////////////////////////////
//Retrieve
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ormeliarobinson:<ormelia1>@rest-store-gmqad.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const collection = client.db("test").collection("devices");
///////////////////////////DB//////////////////////////////
express.use(corsModule())
express.use(bodyPareser.urlencoded({extended: false}))
express.use(bodyPareser.json());
express.use(bodyPareser.urlencoded({extended: false}))
express.use(bodyPareser.json());
express.use('/docs', swaggerUIExpressModule.serve, swaggerUIExpressModule.setup(swaggerDocs))

//routes that will handle requests
app.use('/products', productRoutes);
app.use(express.static('frontend'));
app.use(morgan('dev'));


mongoose.Promise = global.Promise;

//////////////////////////////////////////////////


const swaggerOpts = {
    swaggerDefinition: {
        info: {
            title: 'One Stop Shop', 
            description: 'One Stop Shop Documentation', 
            constact: {
                name: 'Ormelia Robinson', 
                email: 'orobins5@uncc.edu'
            }
        }, 
        servers: ['http://167.172.150.145:5000 odr']
    }, 
    apis: ['products.js'] 
}

// class Database{
//     constructor(){
//         this._connect()
//     }

//     _connect() {
//         mongoose.connect(`mongodb://${server}/${database}`)
//             .then(() => {
//                 console.log('Database connection successful')
//             })
//             .catch(err => {
//                 console.log('Database connection error')
//             })
//     }
// }
// module.exports = new Database()
// const database = client.db('products')//select database
// const collection = database.collection('products')

////////////////////////////////////////////////////

// Adds a product
/**
 * @swagger 
 * /products: 
 *  post: 
 *     name: Adding a product
 *     summary: Adds a product to the shop
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             productCode:
 *               type: string
 *             productDesc:
 *               type: string
 *             productPrice:
 *               type: integer
 *         required:
 *           - productCode
 *           - productDesc
 *           - productPrice
 *     responses:
 *       '200':
 *         description: Product successfully added
 *       '404':
 *         description: Error adding product
 *       '500':
 *         description: Database Connection Problem
 */
express.post('/products', function (req, res){
    console.log(req.body)
    //connect to db
    client.connect(err => {
        if(err) throw err;
        collection.insertOne({name: req.body.productDesc, price: req.body.productPrice})
        .then(item => {
            console.log('Added:', item)
        })
        .catch(err => {
            console.log(err)
        })

    });
})

// Displays a list of all the products in the shop 
/**
 * @swagger 
 * /products: 
 *  get: 
 *     name: Display all products
 *     summary: This will show all of the products in the shop
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Products successfully displayed
 *       '404':
 *         description: No products in database
 *       '500':
 *         description: Database connection problem
 */
express.get('/products', function(req, res){
    client.connect(err => {
        if(err) throw err;
        collection.find().toArray((err, items))
        .then(items => {
            console.log('Retrieved all items: ', items)
        })
        .catch(err => {
            console.log(err)
        })
    });
})

// Get a product
/**
 * @swagger 
 * /products/{id}: 
 *  get: 
 *     name: Get a product
 *     summary: Retrieves specific product from the shop
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Product retrieved
 *       '404':
 *         description: No product with that code
 *       '500':
 *         description: Database Connection Problem
 */
express.get('/products/:id', function(req, res){
    console.log('Product ID: ', req.params.id)

    client.connect(err => {
        if(err) throw err;
        collection.findOne({_id: req.params.id})
            .then(item => {
                console.log('Found:', item)
            })
            .catch(err => {
                console.log(err)
            })
    });
})


// Update a product
/**
 * @swagger 
 * /products/{id}: 
 *  put: 
 *     name: Update a product
 *     summary: Updates a product in the shop
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             productCode:
 *               type: string
 *             productDesc:
 *               type: string
 *             productPrice:
 *               type: integer
 *         required:
 *            productCode
 *            productDesc
 *            productPrice
 *     responses:
 *       '200':
 *         description: Product successfully updated
 *       '404':
 *         description: No product with <productCode> in database
 *       '500':
 *         description: Database Connection Problem
 */
express.put('/product/:id', function (req, res){

    client.connect(err => {
        if(err) throw err;

        collection.updateOne({_id: req.params.id}, {'$set': {'name': req.body.productDesc, 'price': req.body.productPrice}})
        .then(item => {
            console.log('Updated:', item)
        })
        .catch(err => {
            console.log(err)
        })
    });
})

// Delete user Profile 
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     name: Deletes a product
 *     summary: Removes a product from the store
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required:
 *           - productCode
 *     responses:
 *       '200':
 *         description: Product successfully deleted
 *       '404':
 *         description: No product with <productCode> in database
 *       '500':
 *         description: Database Connection Problem
 */
express.delete('/products/:id', function(req, res){
    client.connect(err => {
        if(err) throw err;

        collection.deleteOne({_id: req.params.id})
            .then(item => {
                console.log('Deleted:', item)
            })
            .catch(err => {
                console.log(err)
            })
    });
})

express.listen(3000)