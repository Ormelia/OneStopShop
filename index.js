const axiosModule = require('axios')
const axios = axiosModule.default
var http = require('http');

let mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const bodyPareser = require('body-parser')
mongoose.Promise = global.Promise;
var ObjectId = require('mongodb').ObjectID

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

const swaggerJSCodeModule = require('swagger-jsdoc')
const swaggerUIExpressModule = require('swagger-ui-express')
const swaggerDocs = swaggerJSCodeModule(swaggerOpts)

app.use(bodyPareser.urlencoded({extended: false}))
app.use(bodyPareser.json());
app.use('/docs', swaggerUIExpressModule.serve, swaggerUIExpressModule.setup(swaggerDocs))
app.use(cors());
app.use('/', express.static('frontend/home.html'));
app.use(morgan('dev'));
//DBstuff///////////////////////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ormeliarobinson:ormelia1@rest-store-gmqad.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
/////////////////////////////////////////////////////////////////////////
console.log('Before async')
async function main(a,b){
    try{
        console.log('Trying connection')
        await client.connect();
        console.log('Connection success')
            } catch(e){
                console.error('Error connecting to databse', e)
            } finally {
                //console.error('connection closed')
                //await client.close();
            }
    }

    main().catch(console.error);

    var path = require('path');
    // app.use(express.static('frontend'));
    // app.get('/', function(req, res) {
    //     res.sendFile(path.join(__dirname,'frontend', 'home.html'));
    // });

    app.set("/products", path.join(__dirname, "frontend", "home.html"));

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
    app.get('/products', function(req, res){
        const collection = client.db("test").collection("products");
        console.log('fetching db')
        collection.find().toArray(function (err, result){
            if(err){
                console.log('Error Fetching collection.find()')
                res.send(`Restocking......Come back tomorrow!`)
            } else {
                console.log('Retrieved all items')
                res.json(result)
            }
        })
    })
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
    app.post('/products', function (req, res){
        //console.log(req.body)
        const collection = client.db("test").collection("products");
        console.log('creating new item')
        const newItem = {
            "name": req.body.name,
            "price": req.body.price
        };

        console.log('Inserting product....')
        collection.insertOne(newItem, function(err, result){
            if(err){
                console.log('Error Inserting: collection.insertOne()')
                res.send(`Error adding ${result}`)
            } else {
                console.log(`Item Inserted Successfully: ${result}`)
                res.send('Product successfully added')
            }
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
    app.get('/products/:id', function(req, res){
        const collection = client.db("test").collection("products");

        const item = {"_id": ObjectId(req.params.id)}
        console.log('Product ID: ', req.params.id)

        console.log('fetching item from db')
        collection.find(item).toArray(function(err, result){
            console.log(result)
            if(err){
                console.log('Error fetching result, item doesnt exist')
                res.send(`Error fetching ${result}, product doesnt exist`)
            } else {
                console.log('Retrieved Product')
                res.json(result)
            }
        })
    })


    // Update a product
    /**
     * @swagger 
     * /products/{id}: 
     *  patch: 
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
    app.patch('/products/:id', function (req, res){
        const collection = client.db("test").collection("products");
        console.log('Product ID: ', req.params.id)

        const item = {"_id": ObjectId(req.params.id)}
        const newItem = {$set: 
                            {"name": req.body.name, 
                             "price": req.body.price}
                        }

        console.log(item)
        console.log(newItem)

        collection.update(item, newItem, function(err, result){
            console.log('//////////////////////////////////////////////////////////')
            //console.log(result)
            console.log('//////////////////////////////////////////////////////////')
            if(err){
                console.log('Error Updating Product collection.findOne()')
                res.send(`Error fetching ${result}, product doesnt exist`)
            } else {
                console.log('Updated Product')
                res.json(result)
            }
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
    app.delete('/products/:id', function(req, res){
        const collection = client.db("test").collection("products");
        const item = {"_id": ObjectId(req.params.id)}
        console.log('Product ID: ', req.params.id)

        collection.deleteOne(item, function(err, result){
            if(err){
                console.log(`Error Deleting: ${item}, product not in Shop`)
            } else {
                console.log('Deleted product')
                res.json(result)
            }
        })
    })
console.log('After acync')




//////////////////////////////////////////////////




////////////////////////////////////////////////////



app.listen(3000)
