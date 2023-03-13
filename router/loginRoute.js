const express = require("express")
const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
require('dotenv').config()

const { UserModel } = require("../model/userModel")

const LoginRouter = express.Router()

LoginRouter.post("/",async(req,res)=>{
    try {
        const payload=req.body
        const user=await UserModel.findOne({email:payload.email})

        if(!user){
            res.status(401).send({msg:"User Not Registered with this email,Plz Sign Up"})
        }else{
            const check=await bcrypt.compare(payload.password, user.password); 
            if(check){
                var token = jwt.sign({ userId: user._id }, process.env.tokenSecret,{expiresIn:"1m"});
                var refreshToken = jwt.sign({ userId: user._id }, process.env.refreshTokenSecret,{expiresIn:"5m"});

                res.status(200).send({token,refreshToken})
            }else{
                res.status(401).send("Wrong Password")
            }
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"There was an error in loging in"})
    }
})

module.exports={
    LoginRouter
}