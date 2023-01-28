
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const errorHelpers = require('../helpers/errorEvents')


module.exports = (req,res,next)=>{
    let headers = req.headers;
    req.headers.clientSecret = process.env.KEYRING_CLIENT_SECRET; //REMOVE IN PRODUCTION
    let client_secret = headers.clientSecret;
    if(client_secret === undefined || client_secret !== process.env.KEYRING_CLIENT_SECRET){
        errorHelpers.unauthorizedEvent({
            req,
            res, 
            additionalData:{message:"Invalid Client Secret"}
        })
    }else{
        next()
    } 
    return headers.authorization;
}