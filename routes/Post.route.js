const express = require("express")
const {PostModel} = require("../model/Post.model")
const postRouter = express.Router()

postRouter.get("/",async(req,res) => {
    try{
        const notes=await PostModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.post("/create",async(req,res) => {
    const payload = req.body
    try{
        const new_note = new PostModel(payload)
        await new_note.save()
        res.send({"msg":"Created the data"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {
   
    postRouter
}