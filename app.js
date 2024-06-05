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
app.use(express.urlencoded({extend: true}))
const mongodb = `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

mongoose.connect(mongodb, {useNewUrlParser: true})
    .then(()=> {
        console.log("Connected!");
        app.listen(3000);
    })
    .catch((err)=> console.log(err))

app.get("/", (req, res)=>{
    res.redirect("get_items");
})

app.get("/get_items", (req, res)=>{    
    Item.find()
        .then(r=>  
            res.render("index", {items: r})
        )
        .catch(e => console.log(e))
});

app.get("/add_item", (req, res)=>{
    res.render("add_item");
})

app.post("/items", (req, res)=>{
    const item = Item(req.body);
    item.save()
        .then(()=>{
            res.redirect("/")
        })
        .catch((e)=> console.log(e))
})

app.get("/items/:id", (req, res)=>{
    const id = req.params.id;
    Item.findById(id)
        .then((r)=>{
            console.log(r)
            res.render("item_detail", {item:r});
        })
})

app.delete("/items/:id", (req, res)=>{
    const id = req.params.id;
    Item.findByIdAndDelete(id)
        .then((r)=>{
            console.log("item deleted");
            res.json({redirect:"/get_items"})
        })
})

app.put("/items/:id", (req, res)=>{
    const id = req.params.id;
    console.log("ID TO UPDATE: ", id)
    Item.findByIdAndUpdate(id, req.body)
        .then((r)=>{
            res.json({msg:"item updated!"})
        })
})

app.get("/test", (req, res) => {
    console.log("Test endpoint");
    res.status(200).send("Hello world");
  });
  
app.use((req, res)=>{
    res.render("error_page");
})
