const mongoose = require("mongoose")
const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { UserModel } = require("../model/userModel")


const refreshTokenRoute = express.Router()

refreshTokenRoute.get("/", async (req, res) => {

    try {
        const refreshToken = req.headers.split(" ")[1]

        const decoded = jwt.verify(refreshToken, process.env.refreshTokenSecret);

        const { userId } = decoded

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(401).send({ msg: "Unauthorized,Plz Login Again" })
        }
        var token = jwt.sign({ userId: user._id }, process.env.tokenSecret, { expiresIn: "1m" });
        var newrefreshToken = jwt.sign({ userId: user._id }, process.env.refreshTokenSecret, { expiresIn: "5m" });

        res.status(200).send({ token, refreshToken:newrefreshToken })

    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Unable To generate token,Plz login again"})
    }

})

module.exports={
    refreshTokenRoute
}