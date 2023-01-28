const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = new Schema({
    socketID:{ //MOST RECENT SOCKETID VIEW
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:false,
    },
    userID:{
        type:String,
        required:false,
    },
    viewDuration:{
        type:Number,
        required:false
    },
    viewSessions:{ //Array of seconds representing time spend viewing page on Keyring
        type:Array,
        required:true,
        default:[0],
    },
    listingReference:{
        type:String,
        required:true
    },
    listingID:{
        type:Number,
        required:false
    },
    isKeyringUser:{
        type:Boolean,
        required:true,
    },
    viewCount:{
        type:Number,
        required:false,
        default:1,
    },
    lastViewStart:{ //Referenced in UTC TIME
        type:Number,
        required:false,
        default:0,
    },
    lastViewEnd:{ //Referenced in UTC TIME
        type:Number,
        required:false,
        default:0,
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
    networkProvier:{
        type:String,
        required:false,
        default:"",
    },
    location:{
        country:{
            name:{
                type:String,
                required:false,
                default:"",
            },
            short_code:{
                type:String,
                required:false,
                default:"",
            },
            capital:{
                type:String,
                required:false,
                default:"",
            },
            continent:{
                type:String,
                required:false,
                default:"",
            },
            continent_code:{
                type:String,
                required:false,
                default:"",
            },
            currency:{
                type:String,
                required:false,
                default:"",
            },
        }
    },

}, {timestamps:true})


module.exports = mongoose.model('views', viewSchema) 