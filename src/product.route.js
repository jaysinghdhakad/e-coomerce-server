const express = require("express");

const mongoose = require("mongoose")
const Router = express.Router();

const Product = new mongoose.Schema({
    brand : String,
    name: String ,
    price: Number ,
    rating : Number,
    description : String ,
    features: String,
    images : { 
         image1: String,
         image2 : String,
         image3: String  
           },
    catigory_id : String,
    out_of_stalk: Boolean,
    discount: Number
})
const productDb = mongoose.model("Product", Product);

Router.route("/")
.get(async (req,res)=>{
  try{
    const {id} = req
    const Products = await productDb.find({catigory_id: id})
    res.status(200).json({success: true, products : Products})
  }catch(err){
      res.status(400).json({success:false ,  error : err.message})
  }
})
.post(async(req,res)=>{
    try{
       const product = req.body;
      
       let newProduct = new productDb(product);
       newProduct = await newProduct.save();
       res.status(200).json({success: true , newProduct})
    }catch(err){
        res.status(500).json({success: false, error: err.message})
    }
})

Router.route("/:id")
.get(async (req,res)=>{
  const {id} = req.params;
 try{
  const Product = await productDb.find({_id: id});
  res.status(200).json({success: true, Product : Product})
 }catch(err){
   res.status(500).json({success : false, error : err.message})
 }

})

module.exports = Router;