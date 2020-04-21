let Product = require('./product')
let mongoose = require('mongoose');

const Product = require('../models/product')
const express = require('express');
const server = '';//replace with db server
const db = '';//replace with db name
//const morgan = require('morgan')
const database = client.db('productsdb')
const corsModule = require('cors')
const bodyPareser = require('body-parser')
const axiosModule = require('axios')
const axios = axiosModule.default
const swaggerJSCodeModule = require('swagger-jsdoc')
const swaggerUIExpressModule = require('swagger-ui-express')
const swaggerDocs = swaggerJSCodeModule(swaggerOpts)


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
mongoose.connect('mongodb+srv://ormeliarobinson:' + process.env.MONGO_ATLAS_PW + '@rest-store-gmqad.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
});
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



class Database{
    constructor(){
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.log('Database connection error')
            })
    }
}
module.exports = new Database()

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
    let msg =  new Product({
        productCode: req.body.productCode,
        productDesc: req.body.productDesc,
        productPrice: req.body.productPrice
    })

    msg.save()
        .then(doc => {
            console.log(doc)

        }) 
        .catch(err => {
            console.error(err)
            res.json(err)
        })
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
    database.all('SELECT * FROM products', (err, result) => {
        event = {'Error': "", 'Data': ""}
        if(err){
            event.error = err
            event.data = ""
        } else {
            event.data = result
        }
        res.json(err)
    })
    Product.all

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

    Product
        .find({
            _id: req.params.id
        })
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })

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
    Product
        .findOneAndUpdate({
            _id: req.body.id
        },{
            productCode: req.body.productCode,
            productDesc: req.body.productDesc,
            productPrice: req.body.productPrice
        },{
            new: true,
        })
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
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
    Product
        .findOneAndRemove({
            _id: req.params.id
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
})

express.listen(3000)