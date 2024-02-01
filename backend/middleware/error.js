const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) =>{

    let error ={...err};
    error.message = err.message;

    if(err.name === "castError"){
        const message = `Resource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate value
    if(err.code === 11000){
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        sucess: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler;