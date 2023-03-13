const express = require("express")
const mongoose = require("mongoose")
const { UserModel } = require("../model/userModel")
const bcrypt=require("bcrypt")

const SignupRouter = express.Router()

SignupRouter.post("/", async (req, res) => {
    try {
        const {name,email,password,role} = req.body
        const UserPresent = await UserModel.findOne({ email })
        if (UserPresent) {
            res.send("User Already Registered with this Email,Plz Log in")
        } else {

            const salt = await bcrypt.genSalt(5);
            const hash = await bcrypt.hash(password, salt)
            
            const user = new UserModel({email,password:hash,name,role})
            await user.save()
            res.status(201).send("User Registered successfully")
        }


    } catch (error) {
        console.log(error)
        res.status(400).send("There was an error in Registering User")
    }
})



module.exports = {
    SignupRouter
}

