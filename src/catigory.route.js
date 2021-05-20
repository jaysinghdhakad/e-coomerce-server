const express = require("express");

const mongoose = require("mongoose")
const Router = express.Router();


const CatigorySchema = new mongoose.Schema({
    name : String,
    image : String,
    catigory_id :  String,

})


const catigoryDb = mongoose.model("Catigory",CatigorySchema)

Router.route("/")
.get(async(req,res)=>{
try{ 
        const response = await catigoryDb.find({})
     res.status(500).json({success: true ,response })
}catch(err){
    res.status(400).json({success: false, message : "following error occured", error:err.message})
}
  })
.post(async(req,res)=>{
    try{
        const product = req.body;
        console.log(product)
        const newProduct = new catigoryDb(product);
        const updatedproduct = await newProduct.save()
        res.status(500).json({success: true , updatedproduct})
    }catch(err){
        res.status(400).json({success: false , error : err.message})
    }
})



module.exports = Router;