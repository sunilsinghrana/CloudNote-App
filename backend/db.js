const mongoose = require('mongoose')


const mongoURI = "mongodb+srv://sunil:ranasunil9716@cluster0.mymzw12.mongodb.net/cloudnote?retryWrites=true&w=majority"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose successfully")
    })
}

module.exports = connectToMongo;