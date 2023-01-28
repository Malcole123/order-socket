if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const MAX_PAGINATION = 200

const mongo = require('../database/mongodb/mongo');

const searchModel = require('../database/mongodb/models/search');


const createSearch = async ( callback, searchData )=>{
    let create = await searchModel.create(searchData);
    create.save((err,search)=>{
        callback({
            err,
            createdSearch:search,
        });
        return 
    });
    return 
};

const setSearchResults = async ( callback, { search_id, results} )=>{
    let update = searchModel.findOne({_id:search_id})
    .exec((err, search)=>{
        if(search === undefined || (err !== null && err !== undefined)){
            callback({err:true});
            return 
        }
        searchModel.updateOne({_id:search_id}, {
            results:[...results],
        }).exec((error,updatedSearch)=>{
            callback({
                err:error,
                updated:updatedSearch,
            });
            return
        })
        return 
    })
    return 
}

//Gets total search on all Keyring ---- Returns number
const totalSearchCount = async( callback )=>{
    searchModel.count().exec((err,result)=>{
        if(err){
            callback({
                err:true,
            });
            return 
        }
        console.log(result)
        callback({
            err,
            searchData:{
                result
            }
        })
    })
}

//Get search Appearance of a single listing on Keyring
const searchAppearanceCount = async( callback, {listing_reference} )=>{
    if(typeof listing_reference !== 'string' && typeof listing_reference !== 'object'){
        callback({
            err:true,
        });
        return 
    }
    let result_val = typeof listing_reference === 'string' ? listing_reference : [...listing_reference]
    searchModel.count({results:result_val}).exec((err,result)=>{
        if(err){
            callback({
                err:true,
            });
            return 
        }
        callback({
            err,
            searchData:{
                result
            }
        })
    })
}

//Get descriptive search data

const searchAppearanceDetailed = async( callback, {listing_reference} )=>{
    if(typeof listing_reference !== 'string' && typeof listing_reference !== 'object'){
        callback({
            err:true,
        });
        return 
    }
    let result_val = typeof listing_reference === 'string' ? listing_reference : [...listing_reference]
    searchModel.find({results:result_val}).exec((err,result)=>{
        if(err){
            callback({
                err:true,
            });
            return 
        }
        callback({
            err,
            searchData:{
                result
            }
        })
    })
}



module.exports = {
    //CREATE SEARCH
    createSearch,
    //Update Search
    setSearchResults,
    //Get data
    totalSearchCount,
    searchAppearanceCount,
    searchAppearanceDetailed,
}
