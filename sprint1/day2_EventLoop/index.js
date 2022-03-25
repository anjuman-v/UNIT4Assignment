const express = require("express")
const  {scripts}=require("./package.json")
// console.log(scripts)
const mainapp = express()

mainapp.get("/root",function(req,res){
    res.send("Hello User")
})

mainapp.get("/books",function(req,res){

   res.send(scripts)

})

mainapp.listen(5500,()=>{
    console.log("Connecting to the Server")
});

