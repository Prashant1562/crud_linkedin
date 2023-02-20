const mongoose = require("mongoose")

mongoose.set('strictQuery', false)


const connection = mongoose.connect('mongodb+srv://mongoatlas:mongoatlas@cluster0.1p8v74i.mongodb.net/linkedin?retryWrites=true&w=majority')


module.exports = {
    connection
}