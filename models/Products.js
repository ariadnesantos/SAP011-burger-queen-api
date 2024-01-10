const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String
        },
        type: {
            type: String
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('products', productsSchema);