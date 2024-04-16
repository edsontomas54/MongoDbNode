const Product = require("../models/product.model");

const getProducts = async (request, respond) => {
    try {
      const products = await Product.find({});
      respond.status(200).json(products);
    } catch (error) {
        respond.status(500).json({ message: error.message });
    }
  };


const getProduct = async (request, respond) => {
    try {
      const { id } = request.params;
      const product = await Product.findById(id);//will get only the id product
      respond.status(200).json(product);
    } catch (error) {
        respond.status(500).json({ message: error.message });
    }
  };


//ADD PRODUCT
const createProduct = async (request, respond) => {
    try{
        const product = await Product.create(request.body);
        respond.status(200).json(product);
    }catch(error){
        respond.status(500).json({message: error.message});
    }
  };

//update
const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
  
      if (!product) {
        return res.status(404).json({ message: "Product was not found" });
      }
  
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//delete
const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product was not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };