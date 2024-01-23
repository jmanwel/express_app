const express = require("express");

const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const mongodb = "CONNECTION STRING HERE";

mongoose.connect(mongodb, {useNewUrlParser: true})
    .then(()=> {
        console.log("Connected!");
        app.listen(3000);
    })
    .catch((err)=> console.log(err))

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