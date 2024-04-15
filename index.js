// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//import the Model
// import Product from './models/product.model.js';
const Product = require('./models/product.model.js');



app.use(express.json());// the data as json
app.use(express.urlencoded({extended:false}));//the data can be in form format too


//connect to database
mongoose.connect("mongodb+srv://donthimas54:um2jg6vRz6rET1YK@cluster0.dxrl9kr.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("Connected failed!");
});


// Define a route
app.get('/', (req, res) => {
    res.send('Hello World!');
  });


//GET ALL PRODUCTS
app.get('/api/products', async (request,respond)=>{
    try{
        const products = await Product.find({});//will get all products
        respond.status(200).json(products);
    }catch(error){
        respond.status(500).json({message: error.message});
    }
});


//GET  PRODUCT BY ID
app.get('/api/products/:id', async (request,respond)=>{
    try{
        const {id} = request.params;
        const product = await Product.findById(id);
        respond.status(200).json(product);//will get only the id product
    }catch(error){
        respond.status(500).json({message: error.message});
    }
});


//ADD PRODUCT
app.post('/api/products', async (request,respond)=>{
    try{
        const product = await Product.create(request.body);
        respond.status(200).json(product);
    }catch(error){
        respond.status(500).json({message: error.message});
    }
});

//Update  PRODUCT BY ID
app.put('/api/product/:id', async (request,respond)=>{
    try{
        const {id} = request.params;
        const product = await Product.findByIdAndUpdate(id,request.body);
        if(!product){
            return respond.status(404).json({message: "Product not found"});
        }
        const updateProduct = await Product.findById(id);
        respond.status(200).json(updateProduct);

    }catch(error){
        respond.status(500).json({message: error.message});
    }
});

//Update  PRODUCT BY ID
app.delete('/api/product/delete/:id', async (request,respond)=>{
    try{
        const {id} = request.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return respond.status(404).json({message: "Product not found"});
        }
        respond.status(200).json({message: "The Product deleted successfully"});

    }catch(error){
        respond.status(500).json({message: error.message});
    }
});





// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });