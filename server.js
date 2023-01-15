const express=require('express')
const cors = require('cors')
const path =require('path')
const app = express()
const bodyParser = require('body-parser')
const Port=process.env.PORT || 80;
const db= require('./db.js');
const router = require("./routes");

//connecting to database
db.connect();

app.use(bodyParser.json({limit : "50mb"}))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))

//cors= resolve cross origin problem
app.use((req, res, next)=>{
    req.header("Access-Control-Allow-Origin","*")
    req.header("Access-Control-Allow-Origin","*");
    next()
})


//routes

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res)=>{
    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));          //to connect backend and frontends
    }catch(e){
        res.send("OOps! connection error")
    }
})

app.use(cors())


app.listen(Port, ()=>{
    console.log(`successfully running on port ${Port}`)
})