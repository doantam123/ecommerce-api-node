const app = require('.');
const { connectDb } = require('./config/db');

const PORT = 5454;
app.listen(PORT, async () =>{
    await connectDb();
    console.log("api listing on Port", PORT)
})