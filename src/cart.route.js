const express = require("express");
const {extend} = require("lodash");
const mongoose = require("mongoose")
const Router = express.Router();


const CartSchema = new mongoose.Schema({
    product_id : {
        type:String,
        unique: true
        },
    brand : String,
    name: String ,
    price: Number ,
    
    discription : String ,
    features: String,
    image: String,
    Quantity : Number
})

const cartDb = new mongoose.model("Cart",CartSchema);

Router.route("/")
.get(async(req,res)=>{
    try{
        const cart = await cartDb.find({});
        res.status(500).json({success: true, cartData: cart})
    }catch(err){
         res.status(400).jscon({sccess: false, error : err.message})
    }
})
.post(async(req,res)=>{
    const item = req.body;
    try{ let  cartItem =  new cartDb(item);
        cartItem = await  cartItem.save();
        res.status(500).json({success:true, cart : cartItem})
    }catch(err){
        res.status(400).json({success: false, error : err.message})
    }
   
})
 
Router.route("/:id")
.post(async(req,res)=>{
    const {id} = req.params;
    const  { quantity} = req.body;
    const newUpdate = {Quantity : quantity}
    try{
      
        if(quantity===0){
            let product = await cartDb.findById(id);
            const response = await product.delete();
            res.status(500).json({success: true , response})
        }
        else{
            let product = await cartDb.findById(id);
             product = extend(product, newUpdate);
             product = await product.save();
            res.status(500).json({success:true, product})
        }
    }catch(err){
        res.status(400).json({success:false, error : err.message})
    }
})
.delete(async(req,res)=>{
    const {id} = req.params;
    try{
        let product = await cartDb.findById(id);
        const response = await product.delete();
        res.status(500).json({success: true , response})
    }catch(err){
        res.status(400).json({success:false, error:err.message})
    }
})

module.exports = Router