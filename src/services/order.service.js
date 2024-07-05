const Address = require('../models/address.model');
const cartService = require('../services/cart.service');
const Order = require('../models/order.model');
const OrderItem = require('../models/oderItem.model');

async function createOrder(user, shipAddress){
    let address;

    if(shipAddress._id){
        let existAddress = await Address.findById(shipAddress._id);
        address = existAddress;
    }
    else{
        address = new Address(shipAddress)
        address.user = user;
        await address.save()

        user.address.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for(const item of cart.cartItems){
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity:item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        })

        const createOrderItem = await orderItem.save();
        orderItems.push(createOrderItem)
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shipAddress: address,
    })

    const saveOrder = await createdOrder.save()
    return saveOrder;
}

async function placeOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="CONFIRMED";

    return await order.save();
}

async function shipOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="SHIPPED";

    return await order.save();
}

async function deliveryOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="DELIVERED";

    return await order.save();
}

async function cancelOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="CANCELLED";

    return await order.save();
}

async function findOrderById(orderId){
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems", populate:{path:'product'}})
    .populate('shippingAddress')

    return order
}

async function usersOrderHistory(userId){
    try {
        const orders = await Order.find({user:userId, orderStatus:"PLACED"})
        .populate({path:"orderItems", populate:{path:"product"}}).lean();
        return orders;
    } catch (error) {
        throw new Error(error.message)  
    }
}

async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItems", populate:{path:"product"}}).lean();
}

async function deleteOrders(orderId){
    const order = await findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
}

module.exports={
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliveryOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrders,
}
