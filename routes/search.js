if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const cors = require('cors');

const { Router } = require('express');

const router = Router();
const express = require('express');
const endEnforcer = require('../middlewares/validateRequest');
const searchHelpers = require('../helpers/searchHelper');
const errorEvents = require('../helpers/errorEvents')

router.use(cors({
    origin:"*",
}));

router.use(express.json())





router.post('/:user_type/:country', endEnforcer, async (req,res, next)=>{
    let country = req.params.country;
    let searchData = req.body;
    await searchHelpers.createSearch(
        ({err,createdSearch})=>{
            res.send({
                ok:err === undefined || err === null ? true : false,
                searchRef:createdSearch._id,
            });
            return 
        },
        searchData
    )
})


router.post('/update/:user_type/:search_id', endEnforcer, async (req, res, next)=>{
    let search_id = req.params.search_id;
    let results = req.body.search_results;
    await searchHelpers.setSearchResults(
        ({err, updated})=>{
            res.send({
                ok:err !== null & err !== undefined ? false : true,
                data:updated,
            });
            return 
        },
        {
            search_id,
            results,
        }
    )
})


//Get Search Information 

//Get total search on Keyring
router.get('/all/total', endEnforcer, async(req,res,next)=>{
    await searchHelpers.totalSearchCount(
        ({err, searchData})=>{
            res.send({
                ok:true,
                data:searchData,
            })
        }
    )
});

//Get total search appearance for a listing on keyring
router.get('/all/count/:listing_reference', endEnforcer, async(req,res,next)=>{
    let listing_reference = req.params.listing_reference;
    if(listing_reference === undefined || listing_reference.length <= 16){
        errorEvents.resourceNotFoundEvent({req,res});
        return 
    }
    await searchHelpers.searchAppearanceCount(
        ({err, searchData})=>{
            res.send({
                ok:true,
                data:searchData,
            })
        },
        {
            listing_reference,
        }
    )
})

router.get('/all/details/:listing_reference', endEnforcer, async(req,res,next)=>{
    let listing_reference = req.params.listing_reference;
    if(listing_reference === undefined || listing_reference.length <= 16){
        errorEvents.resourceNotFoundEvent({req,res});
        return 
    }
    await searchHelpers.searchAppearanceDetailed(
        ({err, searchData})=>{
            res.send({
                ok:true,
                data:searchData,
            })
        },
        {
            listing_reference,
        }
    )
})




module.exports = router;