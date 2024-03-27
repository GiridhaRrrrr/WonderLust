const mongoose = require('mongoose');
const user=require("./users.js");

const reviewschema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

const review =mongoose.model("review",reviewschema);
module.exports=review;


// it is one to many case,so we add the reviews in our listings in an array 