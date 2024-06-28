const mongoose = require("mongoose")

const mongodbUrl = "mongodb+srv://huynhdoantam15:cochomoibiet@cluster0.nw0qhlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=() => {
    return mongoose.connect(mongodbUrl);
}

module.exports={connectDb}