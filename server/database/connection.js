const mongoose = require('mongoose')

function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log('mongoose is connected')
    } catch (error) {
        console.log('not connected')
    }
}
module.exports = RunServer //exporting runServer function
