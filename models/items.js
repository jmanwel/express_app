const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const item_Schema = new Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
}, {timestamps:true});

const Item = mongoose.model("Item", item_Schema);
module.exports = Item;