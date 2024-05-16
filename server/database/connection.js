const mongoose = require('mongoose')

function RunServer(){
    try{
        mongoose.connect();
        console.log('mongoose is connected')
    } catch (error) {
        console.log('not connected')
    }
}
module.exports = RunServer //exporting runServer function
