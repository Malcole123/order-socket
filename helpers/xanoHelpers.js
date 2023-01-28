if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const {axios} = require('axios')

const xanoAuthTokenValidate = async ({authToken, email})=>{
    //Identifies Auth Token and returns user information 
    let url = ""
    await axios.$get(url).then(data=>{
        return {
            ok:true,
            data,
        }
    }).catch(err=>{
        return {
            ok:false,
        }
    })
}

const xanoOrderIdentifier = async ({orderReference, redeemReference})=>{
    //Identifies Auth Token and returns user information 
    let url = ""
    await axios.$get(url).then(data=>{
        return {
            ok:true,
            data,
        }
    }).catch(err=>{
        return {
            ok:false,
        }
    })
}

module.exports = {
    xanoAuthTokenValidate,
    xanoOrderIdentifier,

}
