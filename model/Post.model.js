const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    annual: Number,
    interest: Number,
    years: Number
})

 const PostModel = mongoose.model("note", userSchema)

 module.exports = {
    PostModel
 }