const express = require("express")
const {UserModel} = require("../model/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register", async(req,res) => {
    const {email,pass,name,gender,age,city} = req.body
    try{
        bcrypt.hash(pass, 5,async(err, secure_password) => {
            if(err) {
                console.log(err)
            }else{
                const user = new UserModel({email,pass:secure_password,name,gender,age,city})
                await user.save()
                res.send({"msg":"Registered"})
            }
        });
    }catch(err){
      res.send({"msg":"Error in registering the user"})
      console.log(err)
    }
})


userRouter.post("/login", async(req,res) => {
    const {email,pass} = req.body
    console.log(email,pass)
    try{
       const user = await UserModel.find({email})
       const hashed_pass = user[0].pass
       if(user.length>0) {
        bcrypt.compare(pass,hashed_pass,(err, result) => {
            if(result) {
                const token = jwt.sign({userID: user[0]._id}, process.env.key);
                res.send({"msg":"Login Successfull","token": token})
            }else{
                res.send({"msg":"Wrong Credentials"})
                console.log(err)
            }
        });
       }else{
        res.send({"msg":"Wrong Credentials"})
       }

    }catch(err){
      res.send({"msg":"Something went wrong"})
      console.log(err)
    }
})


module.exports = {
    userRouter
    
}