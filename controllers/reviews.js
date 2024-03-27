const review =require("../model/reviews.js");
const listing =require("../model/listing.js");

module.exports.postreview=async (req,res)=>{
    let Listing=await listing.findById(req.params.id);//or let {id}=req.body then pass into find by id
    let newreview=new review(req.body.review); 
    newreview.author= req.user._id;    
    Listing.reviews.push(newreview);    
    await newreview.save();
    await Listing.save();//for updating listing and then saving
  
      res.redirect(`/listings/${Listing._id}`);
  }

module.exports.deletereview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await review.findByIdAndDelete(reviewId);
  
    res.redirect(`/listings/${id}`);
  
  }  

