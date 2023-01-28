const unauthorizedEvent = ({req,res, additionalData})=>{
    res.status(403).send({
        message:"Not Authorized To Access This Resource",
        data:additionalData
    });
    return;
}


const unexpectedErrorEvent = ({req,res, additionalData})=>{
    res.status(500).send({
        message:"An unexpected error occured",
        data:additionalData
    });
    return;
}


const resourceNotFoundEvent = ({req,res, additionalData})=>{
    res.status(400).send({
        message:"Invalid Listing",
        data:additionalData
    });
    return;
}




module.exports = {
    unauthorizedEvent,
    unexpectedErrorEvent,
    resourceNotFoundEvent,
}