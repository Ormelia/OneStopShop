let mongoose = require('mongoose')
let validator = require('validator')

let productSchema = new mongoose.Schema({
    productCode: String,
    productDesc: String,
    productPrice: {
        type: Number,
        required: true,
        validate: (value) => {
            return validator.isNumber(value)
        }
    }
})

module.exports = mongoose.model('Product', productSchema);