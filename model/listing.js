const mongoose = require('mongoose');
const review=require("./reviews.js");
const user=require("./users.js");
const listingschema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    img:{
        url:String,
        filename:String,
        default:"https://images.unsplash.com/photo-1682685796444-acc2f5c1b7b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"//refernce of the object id is review model
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"//reference from user as owner must be a user
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }
    }

) 

//writing post middleware for reviews deletion on deltion of listing
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){//if listing is present then only thos operation
        await review.deleteMany({_id:{$in:listing.reviews}});//if review id matches with listing reviews then delete that review
    }
});

const listing=mongoose.model("listing",listingschema);

module.exports=listing;