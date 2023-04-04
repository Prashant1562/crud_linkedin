const mongoose = require("mongoose")

mongoose.set('strictQuery', false)


const connection = mongoose.connect('mongodb+srv://mongoatlas:mongoatlas@cluster0.p2ozkb9.mongodb.net/?retryWrites=true&w=majority')


module.exports = {
    connection
}