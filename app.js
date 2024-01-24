const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/items");
require("dotenv").config();

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const db = process.env.MONGO_DATABASE;
const cluster = process.env.MONGO_CLUSTER;

const app = express();
app.set("view engine", "ejs");
const mongodb = `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

mongoose.connect(mongodb, {useNewUrlParser: true})
    .then(()=> {
        console.log("Connected!");
        app.listen(3000);
    })
    .catch((err)=> console.log(err))

app.get("/create_item", (req, res)=>{
    const item = new Item({
        name: "Laptop",
        price: 2000
    });
    item.save().then(r=> res.send(r))
})

app.get("/get_items", (req, res)=>{
    
    Item.find()
        .then(r=> res.send(r))
        .catch(e => console.log(e))
});

app.get("/get_item", (req, res)=>{
    
    Item.findById("65b13ec123be23ea43a71490")
        .then(r=> res.send(r))
        .catch(e => console.log(e))
});

app.get("/", (req, res)=>{
    const items = [
        {name: "item1", price: 100},
        {name: "item2", price: 200},
        {name: "item3", price: 300}
    ]
    res.render("index", {items});
})

app.get("/add_item", (req, res)=>{
    res.render("add_item");
})

app.use((req, res)=>{
    res.render("error_page");
})