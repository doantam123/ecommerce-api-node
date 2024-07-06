const razorpay = require('../config/razorpayClient.js')
const orderService = require('../services/order.service.js')

const createPaymentLink = async(orderId) =>{
    try {
        testRazorpayAuthentication()
        const order = await orderService.findOrderById(orderId)

        const paymentLinkRequest = {
            amount: order.totalPrice*100,
            currency: "INR",
            customer: {
                name:order.user.firstName + " " + order.user.lastName,
                contact: order.user.mobile,
                email: order.user.mobile
            },
            notify:{
                sms:true,
                email:true,
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method: 'get'
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }

        return resData

    } catch (error) {
        throw new Error(error.message)
    }
}

const updatePaymentInformation = async(reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_Id;

    try {
        const order = await orderService.findOrderById(orderId)
        
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured"){
            order.paymentDetail.paymentId = paymentId;
            order.paymentDetail.status = "COMPLETED";
            order.orderStatus="PLACED";

            await order.save()
        }

        const resData = {
            message:"Your order is placed",
            success: true
        }

        return resData
    } catch (error) {
        throw new Error(error.message)
    }
}

const testRazorpayAuthentication = async () => {
    try {
        const response = await razorpay.orders.create({
            amount: 100,
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 1
        });
        console.log("Razorpay Authentication Successful:", response);
    } catch (error) {
        console.error("Razorpay Authentication Failed:", error);
    }
  };

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}