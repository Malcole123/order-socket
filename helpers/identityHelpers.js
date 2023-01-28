if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const IP = require('ip');
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const IP_API_KEY = process.env.IP_GEOLOCATION_API_KEY;
const IPGeoLocate = new IPGeolocationAPI(IP_API_KEY, false);
const requestIP = require('request-ip');


const clientIdentify = async (req, {locate, resolveFunc})=>{
    //GET IP ADDRESS FROM REQ
    const userIP =IP.address();
    const ipAddress = requestIP.getClientIp(req);
    let ret_obj = {
        ipAddress,
        userIP,
        locationData:{}
    }


    if(locate === false){ return ret_obj }

    //FIND USER LOCATION BY IP
    IPGeoLocate.getGeolocation((json)=>{
        try{
            resolveFunc(json);
            return true;
        }catch(err){
            return false;
        }
    });

    return ret_obj
}



module.exports = {
    //LOCATION IDENTITY
    clientIdentify,
}
