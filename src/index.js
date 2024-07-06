const express = require("express")

const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req,res) =>{
    return res.status(200).send({message : "hello world", status:true})
})

const authRouters = require('./routes/auth.route.js')
app.use('/auth', authRouters);

const userRouters = require('./routes/user.route.js')
app.use('/api/users', userRouters);

const productRouters = require('./routes/product.route.js')
app.use('/api/products', productRouters);

const adminProductRouters = require('./routes/AdminProduct.route.js')
app.use('/api/admin/products', adminProductRouters);

const cartRouters = require('./routes/cart.route.js')
app.use('/api/cart', cartRouters);

const cartItemRouters = require('./routes/cartItem.route.js')
app.use('/api/cart_items', cartItemRouters);

const orderRouters = require('./routes/order.route.js')
app.use('/api/orders', orderRouters);

const adminOrderRouters = require('./routes/adminOrder.route.js')
app.use('/api/admin/orders', adminOrderRouters);

const reviewRouters = require('./routes/review.route.js')
app.use('/api/reviews', reviewRouters);

const ratingRouters = require('./routes/rating.route.js')
app.use('/api/ratings', ratingRouters);

const paymentRouters = require('./routes/payment.route.js')
app.use('/api/payments', paymentRouters);


module.exports=app;
