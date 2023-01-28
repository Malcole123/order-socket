'use strict';

const uri = process.env.MONGO_DB_URI;
const mongoose = require('mongoose');
const sessions = require('express-session');
var MongoDBSession = require('connect-mongodb-session')(sessions);


const view_store = new MongoDBSession({
    uri:uri,
    collection:'views'
}, (err)=>{
    return {
        success:false
    }

})

const search_store = new MongoDBSession({
    uri:uri,
    collection:'search'
}, (err)=>{
    return {
        success:false
    }

})






module.exports = {
    view_store:view_store,
    search_store:search_store,
    initialize:()=>{
        mongoose.connect(uri).then(()=>{
            console.log('connected')
        }).catch((error)=>{
            console.log('something went wrong')
        })
    }
}