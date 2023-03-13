const express=require("express")
require('dotenv').config()
const cors=require("cors")

const {connection}=require("./db")
const {SignupRouter}=require("./router/SignUpRoute")
const {LoginRouter}=require("./router/loginRoute")
const {authMiddleware}=require("./middlewares/authenticate")
const {checkRoleAccess}=require("./middlewares/roleAccess")
const {refreshTokenRoute}=require("./router/refreshTokenRoute")
/////////////////////////////////////////////////////////////////////////////////////////////

const app=express()
app.use(cors())
app.use(express.json())

connection()

//////////////////////////////////////////////////////////////////////////////////////////

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/signup",SignupRouter)

app.use("/login",LoginRouter)


// app.get("/logout")


app.get("/products",authMiddleware,(req,res)=>{
    res.status(200).send("Products Page")
})

app.get("/addproducts",authMiddleware,checkRoleAccess(["seller"]),(req,res)=>{
    res.status(200).send("Add Products Page")
})

app.get("/deleteproducts",authMiddleware,checkRoleAccess(["seller"]),(req,res)=>{
    res.status(200).send("Delete Products Page")
})

app.get("/refreshtoken",refreshTokenRoute)

///////////////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT,()=>{
    console.log("Listening on Port")
})