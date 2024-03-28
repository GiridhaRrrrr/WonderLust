const listing =require("../model/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });

module.exports.index=async (req,res)=>{ //index route
    let alldata=await listing.find();
    res.render("listings/index.ejs",{alldata})
  }

module.exports.new= (req,res)=>{
    res.render("listings/new.ejs");  //this routes kept up to avoid merger between show and new route as
    //new is misunderstood as id by nodejs
}

module.exports.show=async (req,res)=>{
    let {id}=req.params
    let showdata= await listing.findById(id)
    .populate(
      {path:"reviews",
      populate: {                 //nested  populate
        path:"author",
      }
       } 
    )
    .populate("owner");
    if(!showdata){
      req.flash("error","Your listing doesnt exit");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{showdata})
  }

module.exports.create=async (req,res)=>{
    // let{title,description,img,price,location,country}=req.body;
    // const newlist=new listing({
    //   title:title,
    //   description:description,
    //   img:img,
    //   price:price,
    //   location:location,
    //   country:country
    // });
    // if(!req.body.listing){
    //   throw new externalerror(400,"send Valid Data for Listing");
    // }
    let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
      .send();
     
    let url=req.file.path;
    let filename=req.file.filename;//==> req.body has access to these things
    const newlist=new listing(req.body.listing) //new way of taking from post  by making it listing objects
    newlist.owner=req.user._id;//saving the owner...as req.user has information of current logged in user so that id is saved as owner
    newlist.img={url,filename};
    newlist.geometry=response.body.features[0].geometry;
    // console.log(newlist.geometry);
    await newlist.save();
   req.flash("success","New listing Created!")
    res.redirect("/listings"); 
  }  

module.exports.edit=async (req,res)=>{
    let {id}=req.params;
    let editdata= await listing.findById(id);
    if(!editdata){
      req.flash("error","Your listing doesnt exit");
      res.redirect("/listings");
    }
    //for preview img
    let originalurl=editdata.img.url;
    originalurl=originalurl.replace("/upload","/upload/w_300")
    res.render("listings/edit.ejs",{editdata,originalurl});        //==>used wrapAsync
  }
  
module.exports.update=async (req,res)=>{
    // if(!req.body.listing){
    //   throw new externalerror(400,"send Valid Data for Listing"); ==> we use joi for the same
    // }
    let {id}=req.params;
    // console.log(req.body.listing);    
     let list=await listing.findByIdAndUpdate(id,{...req.body.listing});
    //"..." is a deconstructor used for placing new values in place old values...
    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    list.img={url,filename};
    await list.save();}
    req.flash("success","Updated succesfully");
    res.redirect(`/listings/${id}`); 

  }
  
module.exports.delete=async (req,res)=>{
    let {id}= req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Deleted succesfully!");
    res.redirect("/listings");
  }  
