//we use it because normally next wont be called for async function by this we explicitly call it
module.exports=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}