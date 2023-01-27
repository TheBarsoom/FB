const mongoose = require('mongoose') 

const dbConnect = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true});
        console.log("Database connected........")
    } catch (error) {
        console.log(error)
    }
}

module.exports ={dbConnect}