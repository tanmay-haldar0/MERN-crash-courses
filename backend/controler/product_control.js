import Product from '../Models/products_models.js';
import mongoose from 'mongoose';

export const getProducts  = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("Error in fetching Product: ", error.message);
        res.status(500).json({success:false,message:"Server Error"});   
    }
};

export const addProducts = async (req,res) => { 
    const product = req.body;//user inputed data
    if(!product.name || !product.price || !product.image){
     return res.status(400).json({success:false,message:"Please fill all the feilds."});
    }
 
    const newproduct = new Product(product);
 
    try {
     await newproduct.save();
     res.status(201).json({success:true, data:newproduct});
    } catch (error) {
     console.log("error in creating product:", error.message);
     res.status(500).json({success:false,message:"Server Error"});
    }
};

export const deleteProduct =  async (req,res) =>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"No such id present in database"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"The product has been deleted successfully."});
    } catch (error) {
        console.log("Error in deleting the product:", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }

};

export const updateProduct = async (req,res) =>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"No such id present in database"});
    }

    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
       res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message:"server error"});
        console.log("error in updating the product: ", error.message);
    }
};  