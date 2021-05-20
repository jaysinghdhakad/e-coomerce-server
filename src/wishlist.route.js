const express = require("express");

const mongoose = require("mongoose")
const Router = express.Router();

const WishListSchema = new mongoose.Schema({
    product_id : {
        type:String,
        unique: true
        },
    brand : String,
    name: String ,
    price: Number ,
    
    discription : String ,
    features: String,
    image: String
    
})

const wishListDb = new mongoose.model("wish-list",WishListSchema );


Router.route("/")
.get(async(req,res)=>{
    try{
        const products = await wishListDb.find({});
        res.status(500).json({success:true, products})
    }catch(err){
        res.status(400).json({success:false, error : err.message})
    }
})
.post(async(req,res)=>{
    const product = req.body;
    console.log(product);
    try{
        let updatedProduct = new wishListDb(product);
        updatedProduct = await  updatedProduct.save();
        res.status(500).json({success: true, updatedProduct})
    }catch(err){
        res.status(400).json({success : false , error:err.message})
    }
})

Router.route("/:id")
.post(async(req,res)=>{
    const {id} = req.params;
    try{
        let product = await wishListDb.findById(id);
        const response = await product.delete();
        res.status(500).json({success:true, response})
    }catch(err){
        res.status(400).json({success:fase, error: err.message})
    }
})

module.exports = Router