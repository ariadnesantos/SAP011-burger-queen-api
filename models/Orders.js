const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true           //objeto que define os parâmetros
        },
        client: {
            type: String,
            required: true
        },
        products: [
            {
                _id: {},
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
            },
        ],
        status: {
            type: String,
            enum: ['pending', 'canceled', 'delivering', 'delivered'],
            default: 'pending',
        },
        dateEntry: {
            type: Date
        },
        dateProcessed: {
            type: Date
        },
    },
    { timestamps: true }, //salva a data de criação do registro e a data de atualização
);

module.exports = mongoose.model('orders', ordersSchema);