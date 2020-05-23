const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The paeg does not exist!`);
};

exports.respondInternalError = (errors, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`Error occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};