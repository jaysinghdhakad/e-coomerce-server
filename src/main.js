const express = require("express");
const  cors = require('cors')
const app = express();

const catigory = require("./catigory.route")
const product  = require("./product.route")
const cart = require("./cart.route")
const wishList = require("./wishlist.route")
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://user_001:jay%40007%23001@cluster0.efyfm.mongodb.net/inventory?retryWrites=true&w=majority",{
  useNewUrlParser :true,
  useUnifiedTopology: true 
})
.then(() => console.log("serrver was succesfully connected"))
.catch(err=> console.log("mongoose connection failed", err))

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.json({my : "server"})
})
app.use("/wish-list",wishList)
app.use("/cart",cart)
 app.use("/catigories",catigory);
 app.use("/catigories/:id/products",(req,res,next)=>{
     const {id } = req.params;
     req.id  = id;
   
     next()
 },product)

 function errorhandler(err,req,res,next){
  console.log(err.stack);
  res.status(500).json({success: false, message:` the following error has occured: ${err.message}`});
  
}
app.use(errorhandler)
app.listen(process.env.PORT || 3000)