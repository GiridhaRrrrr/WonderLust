const listing=require("../model/listing.js");//requring listings file from model
const review = require("../model/reviews.js");
const externalerror=require("../utils/externalerror.js");//For exteranl Error class "2nd"
const {listingschema,reviewschema}=require("../utils/joiSchema.js");//in joySchema reuiring lisiting and review schema


module.exports.isloggedin=(req,res,next)=>{
     //passport method==>isauthenticated()  which tells the user  is loged or not by checking cookies==>rreturns true/false
     if(!req.isAuthenticated()){
      //saving original url link where user want to go
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login required");
        return res.redirect("/login");    //return is required to avoid http errors
      }
      next();
}

module.exports.saveredirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports.isowner=async (req,res,next)=>{
  let {id}=req.params;
  let listings=await listing.findById(id);
    if(!listings.owner._id.equals(res.locals.curruser._id)){
      req.flash("error","You have no permission make changes");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

//writing a function of joi for serval side validation ==> and passing this function as miidleware in every form route
module.exports.validateError=(req,res,next)=>{
  let {error}=listingschema.validate(req.body);
  if(error){
    throw new externalerror(404,error);
  }else{
    next();
  }
};

//writing a function of joi for serval side validation ==> and passing this function as middleware in every form route
module.exports.validatereview=(req,res,next)=>{
  let {error}=reviewschema.validate(req.body);
  if(error){
    throw new externalerror(404,error);
  }else{
    next();
  }
};

module.exports.isreviewauthor=async (req,res,next)=>{
  let {id,reviewId}=req.params;
  let reviews=await review.findById(reviewId);
    if(!reviews.author._id.equals(res.locals.curruser._id)){
      req.flash("error","You have no access delete ");
      return res.redirect(`/listings/${id}`);
    }
    next();
}
