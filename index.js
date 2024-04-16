// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoute = require("./routes/product.route.js");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 30001;

const Product = require('./models/product.model.js');


// middleware
app.use(express.json());// the data as json
app.use(express.urlencoded({extended:false}));//the data can be in form format too


// routes
app.use("/api/products", productRoute);

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World!');
  });


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log("Server is running on port: " + PORT);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
