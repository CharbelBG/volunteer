//create a catch-all if we have an undefined route
const notFound = (req,res,next)=>{
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(err);
}

//create a catch-all for any undefined error
const errorHandler = (err, req, res, next) =>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    //cast Error in mongoose handling
    //try to get a user with an objectId that does not exist
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Recource not found';
    }
    res.status(statusCode).json({
        message
    });
}

export {
    notFound,
    errorHandler,
}