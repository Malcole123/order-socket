if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const cors = require('cors');

const { Router } = require('express');

const router = Router();
const endEnforcer = require('../middlewares/validateRequest');
const errorEvents = require('../helpers/errorEvents')

router.use(cors({
    origin:"*",
}));

//HELPERS
const viewHelper = require('../helpers/viewHelper')
const identityHelper = require('../helpers/identityHelpers')

router.get('/guest',endEnforcer, async (req,res, next)=>{
    res.send({
        ok:true,
        message:"message"
    })
})

router.get('/read/all/min/:listing_reference', endEnforcer, async(req,res,next)=>{
    let listing_reference = req.params.listing_reference;
    if(listing_reference === undefined){
        errorEvents.resourceNotFoundEvent({req,res});
        return 
    }
    await viewHelper.getMinifiedViewStats(
        (error,viewData)=>{
            if(viewData !== undefined){
                res.status(200).send(viewData);
                return
            }
            res.status(400).send({
                message:"No Data Available"
            })
            
        },
        {
            listingReference:listing_reference,
        }

    )
})

router.get('/read/all/max/:listing_reference', endEnforcer, async(req,res,next)=>{
    let listing_reference = req.params.listing_reference;
    if(listing_reference === undefined){
        errorEvents.resourceNotFoundEvent({req,res});
        return 
    }
    await viewHelper.getViewStats(
        (error,viewData)=>{
            if(viewData !== undefined){
                res.status(200).send(viewData);
                return
            }
            res.status(400).send({
                message:"No Data Available"
            })
            
        },
        {
            listingReference:listing_reference,
        }

    )
})




router.get('/user/recent/read/:user_id', endEnforcer, async(req,res,next)=>{
    let user = req.params.user_id;
    if(user === undefined){
        errorEvents.unexpectedErrorEvent({req,res})
        return 
    };
    await viewHelper.getRecentViewsByUser((err,views)=>{
        res.send({
            ok:err === undefined,
            data:views
        });
        return 
    }, {
        user_id:user,
        limit:8,
    });

})


module.exports = router;