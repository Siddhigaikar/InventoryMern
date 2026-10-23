const mongoose = require('mongoose');
const connectDB=()=>{
    mongoose.connect("mongodb://localhost:27017/inventory").then((result) => {
        console.log("Database connected....");
        
    }).catch((err) => {
        console.log(err);
        
    });
}
module.exports={connectDB}