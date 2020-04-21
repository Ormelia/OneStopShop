const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//
const expressModule = require('express')
const corsModule = require('cors'); 
const express = expressModule()
const bodyPareser = require('body-parser')
const axiosModule = require('axios')
const axios = axiosModule.default
const sqlite3Handler = require('sqlite3').verbose();
const swaggerJSCodeModule = require('swagger-jsdoc')
const swaggerUIExpressModule = require('swagger-ui-express')
//
const Product = require('../models/product');
let productsArray = [];
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

const swaggerDocs = swaggerJSCodeModule(swaggerOpts);
express.use('/docs', swaggerUIExpressModule.serve, swaggerUIExpressModule.setup(swaggerDocs))



let database = new sqlite3Handler.Database('storeDB', (err)=>{
    if (err){
        console.log(err.message)
    }
    else {
        console.log('Connection Successful')
    }
}); 


express.use(corsModule())
express.use(bodyPareser.urlencoded({extended: false}))
express.use(bodyPareser.json());
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
    database.run('INSERT INTO users (productCode, productDesc, productPrice) VALUES (?,?,?)', 
    [
        req.body.productCode, 
        req.body.productDesc, 
        req.body.productPrice
    ], 
    (addError)=>{
        event = {'Error': "", 'Data': ""}
        if (addError){
            event.error = addError
            event.data = ""
        } else {
            event.data = 'Successfully Added ' 
        }
        res.json(event)
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
    database.all('SELECT * FROM products WHERE productCode = ?', [req.params.id], (err, result)=>{
        event = {'error': "", 'data': ""}
        if (err){
            event.error = err
            event.data = ""
        } else {
            event.data = result 
        }
        res.json(event)
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
    console.log(req.body)
    dbHandler.run('UPDATE users SET productDesc = ?, productPrice = ? WHERE productCode = ?', 
    [
        req.body.productDesc,
        req.body.productPrice,  
        req.body.id
    ], (err)=>{
        event = {'Error': "", 'Data': ""}
        if (err){
            event.error = err
            event.data = ""
        } else {
            event.data = 'Updated Successfully' 
        }
        res.json(event)
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
    console.log(req.params.id)
    database.run('DELETE FROM products WHERE productCode = ?', [req.params.id], (deleteError)=>{
        event = {'Error': "", 'Data': ""}
        if (deleteError){
            event.error = deleteError
            event.data = ""
        } else {
            event.data = 'Record has been deleted Successfully ' 
        }
        res.json(event)
    })
})

express.listen(3000)