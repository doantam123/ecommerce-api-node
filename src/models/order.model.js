const { create } = require("./cart.model");

const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    orderItems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'orderItems',
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate:{
        type: Date
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses',
    },
    paymentDetail:{
        paymentMethod:{
            type : String
        },
        transactionId:{
            type: String,
        },
        paymentStatus:{
            type: String,
            default:'PENDING'
        }
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscountPrice:{
        type:Number,
        required:true,
        default:0
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type: String,
        required: true,
        default:'PENDING'
    },
    totalItem:{
        type: Number,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('orders', orderSchema)
module.exports = Order;
