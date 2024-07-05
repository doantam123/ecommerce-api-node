const orderService = require("../services/order.service.js")

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders()
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const confirmedOrders = async (req, res) => {
    const orderId = req.param.orderId;
    try {
        const orders = await orderService.confirmedOrder(orderId)
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const shipOrders = async (req, res) => {
    const orderId = req.param.orderId;
    try {
        const orders = await orderService.shipOrder(orderId)
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deliveryOrders = async (req, res) => {
    const orderId = req.param.orderId;
    try {
        const orders = await orderService.deliveryOrder(orderId)
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const cancelOrders = async (req, res) => {
    const orderId = req.param.orderId;
    try {
        const orders = await orderService.cancelOrder(orderId)
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteOrders = async (req, res) => {
    const orderId = req.param.orderId;
    try {
        const orders = await orderService.deleteOrders(orderId)
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getAllOrders,
    confirmedOrders,
    shipOrders,
    deliveryOrders,
    cancelOrders,
    deleteOrders,
}