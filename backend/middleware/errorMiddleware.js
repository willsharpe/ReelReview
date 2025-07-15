const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Only for development
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  };
  
  export default errorHandler;
  