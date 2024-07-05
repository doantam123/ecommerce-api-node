const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js")

async function createRating(req,user){
    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        user: user._id,
        product: product._id,
        rating:req.rating,
        createAt: new Date(),
    })

    await product.save();
    return await rating.save();
}


async function getProductRating(productId){
    return await Rating.find({product: productId});
}

module.exports = {
    createRating,
    getProductRating,
}
