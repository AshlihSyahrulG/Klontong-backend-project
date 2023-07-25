const error = async (err,req,res,next) => {
    console.log(err.name);
    if(err.name === 'LoginFailed'){
        res.status(401).json({
           msg: 'Invalid Email / Password'
       })
   } else if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
        console.log(err);
        res.status(401).json({
            msg : 'Invalid Token'
        })
   }  else if (err.name == 'SequelizeValidationError' || err.name == "SequelizeUniqueConstraintError") {
        const msg = err.errors[0].message
        res.status(400).json({
            msg
        })
    } else if (error.name === "ProductNotFound"){
        res.status(404).json({
            message : "Product Not Found"
        })
    } else {
    console.log(err);
       res.status(500).json({
           msg : 'Internal Server Error'
       })
   }
}


module.exports = error