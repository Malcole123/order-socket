const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({ 
    query:{
        type:String,
        required:false,
    },
    search_type:{
        type:String, // Search bar - search , google -search , search - results page
        required:false,
    },
    screen_type:{
        type:String, //Mobile search / Desktop Search
        required:false,
    },
    device:{
        type:String, //Device Brand Name
        required:false,
    },
    userID:{
        type:String,
        required:false,
    },
    //listing references for results from search 
    results:{
        type:Array, //Array of result id
        required:false,
    },
    top_results:{
        type:Array, //Array of result id
        required:false,
    },
    userEmail:{
        type:String,
        required:false,
        default:"",
    },
    ipAddress:{
        type:String,
        required:false,
        default:"",
    },
    timezone:{
        type:String,
        required:false,
        default:"",
    },
    location:{
        latitude:{
            type:String,
            required:false,
        },
        longitude:{
            type:String,
            required:false,
        },
    }

}, {timestamps:true})


module.exports = mongoose.model('search', searchSchema) 