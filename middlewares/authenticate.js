const express=require("express")
const jwt=require("jsonwebtoken")
require('dotenv').config()
const { UserModel } = require("../model/userModel")


const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token, process.env.tokenSecret);

        const {userId}=decoded

        const user=await UserModel.findById(userId)

        if(!user){
            return res.status(401).send({msg:"Unauthorized"})
        }

        req.user=user

        next()
    } catch (error) {
        if(error.message="jwt expired"){
            req.status(402).send({msg:"jwt expired,plz use refresh token"})
        }else{
            console.log(error)
            res.status(401).send({msg:"Unauthorized",error})
        }
    }
}

module.exports={authMiddleware}