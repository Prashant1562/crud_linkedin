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
        res.send({"msg":"Created the note"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.patch("/update/:id", async(req,res) => {
    const payload = req.body
    const id = req.params.id
    const note = await PostModel.findOne({"_id": id})
    const userID_in_post = note.userID
    const userID_in_making_req=req.body.userID
    try{
        if(userID_in_making_req!==userID_in_post){
res.send({"msg":"You are not authorised"})
        }else{
            await PostModel.findByIdAndUpdate({"_id": id}, payload)
            res.send("Updated the note")
        }
    }
    catch(err){
       console.log(err)
       res.send({"msg":"Something went weong"})
    }
})

postRouter.delete("/delete/:id", async(req,res) => {
    const id = req.params.id
    const note = await PostModel.findOne({"_id": id})
    const userID_in_post = note.userID
    const userID_in_making_req=req.body.userID
    try{
        if(userID_in_making_req!==userID_in_post){
res.send({"msg":"You are not authorised"})
        }else{
            await PostModel.findByIdAndDelete({"_id": id}, payload)
            res.send("Deleted the note")
        }
    }
    catch(err){
       console.log(err)
       res.send({"msg":"Something went weong"})
    }
})

module.exports = {
   
    postRouter
}