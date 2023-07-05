const mongoose = require('mongoose')
const mongoUri = "mongodb://localhost:27017/inotebook"

const connectToMongo =async ()=>{
    mongoose.connect(mongoUri,await console.log('Connected to mongoose'))
}


module.exports = connectToMongo;