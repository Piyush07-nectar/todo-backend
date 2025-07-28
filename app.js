const express=require('express')
const path = require("path");
const app=express()
const auth=require('./route/auth')
const list=require('./route/list')
app.use(express.json());
require("./conn/connection")
app.use("/api",auth)
app.use("/api",list)
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
});
app.listen(1000,()=>{
    console.log("Server Started")
})