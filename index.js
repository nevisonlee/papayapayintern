const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routers/product.route.js");
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});

// routes
app.use("/api/products", productRoute);

app.get('/', (req, res) => {
   res.send("Hello from Node API Server!");
});

mongoose.connect("mongodb+srv://leenevison516:Lnvn%401rx7@backenddb.i0rj8lt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});