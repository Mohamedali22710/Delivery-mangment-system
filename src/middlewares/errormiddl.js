module.exports=(asyncFUN)=>{

    return (req,res,next)=>{
            asyncFUN(req,res,next).catch((error)=>{
                 console.error(" Error caught by asyncWrapper:", error);
                next(error);
            })
    }
}
