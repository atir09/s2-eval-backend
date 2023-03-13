const mongoose=require("mongoose")
require('dotenv').config()

const connection=async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL)
        console.log("connected to DB")
    } catch (error) {
        console.log("Error in connecting to DB")
        console.log(error)
    }

}


module.exports={
    connection
}