if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const MAX_PAGINATION = 200

const mongo = require('../database/mongodb/mongo');

const viewModel = require('../database/mongodb/models/views');


//Get All of a users views On Keyring
const getAllUserViews = async ()=>{
    let result_ = await viewModel.find();
    return result_;
}


//Gets search stats for the last 200 records

const getMinifiedViewStats = async(callback, { listingReference })=>{
    viewModel.find({listingReference:listingReference}, {
        viewSessions:true,
        viewCount:true,
    }).limit(MAX_PAGINATION).exec((err,views)=>{
        if(err || views === undefined ){
            callback(err, views);
            return
        }
        let viewCount_ = 0;
        let unique = views.length;
        let durationTotal = 0;
        const data = [...views].forEach((item,index)=>{
            viewCount_ += item.viewCount;
            try{
                durationTotal += [...item.viewSessions].reduce((prevVal,nextVal)=>{
                    return prevVal + nextVal
                })
            }catch(err){

            }
        })

        callback(err, {
            total_views:viewCount_,
            total_view_time:durationTotal,
            hasMore:views.length === MAX_PAGINATION ? true : false,
            unique 
        });
       
    })
}


const getViewStats = async(callback, { listingReference })=>{
    viewModel.find({listingReference:listingReference}, {
        viewSessions:true,
        viewCount:true,
        isKeyringUser:true,
        userEmail:true,
    }).exec((err,views)=>{
        callback(
            err,
            views,
        )
    })
}

//Returns listing references for last views based on limit
const getRecentViewsByUser = async (callback , { user_id , limit})=>{
   try{
    viewModel.find(
        {userID:user_id},
        { listingReference: 1}
    ).limit(limit).sort({updatedAt:-1}).exec((err,views)=>{
        callback(err,views)
    });
   }catch(err){
    callback(true)
   }
}




//Creates a new view session if user has not view a listing in the past 30 days
const createUserView = async (callback, saveData)=>{
    let create = await viewModel.create(saveData);
    create.save((err, view)=>{
        callback({
            err,
            view
        })
    })
}

//Updates Bid Information and sessions for recent views on start
const recentViewStart = ( callback , { viewID , previousSessions, start_time, socketID})=>{
    //Update Socket On Page Load & Last VIew
    try{
            viewModel.findOneAndUpdate({_id:viewID}, 
                {
                    socketID,
                    lastViewStart:start_time,
                }
            
            ).exec((err,view)=>{
                callback({
                    err,
                    newView:view,
                })
        })
    }catch(err){
        callback({
            err:true
        })
    }
}

//Ends View Session For User
const recentViewEnd = ( callback , { socketID })=>{
    viewModel.findOne({socketID:socketID}).exec((err,prevView)=>{
           if(err || prevView === undefined){
                callback({
                    err,
                    newView:prevView,
                });
                return ;
           }
           let now_ = new Date().getTime();
           if(prevView === undefined || prevView === null){
                callback(true);
                return
           }
           let previousSessions = prevView !== undefined && prevView !== null ? prevView.viewSessions : [];
           let duration = Math.round((now_ - prevView.lastViewStart) / 1000);
           let updated_session = duration;
           previousSessions[0] = updated_session;
           //Push 0 for next view           
           previousSessions.unshift(0);
           //Update
           viewModel.updateOne({_id:prevView._id}, {
                lastViewEnd:now_,
                viewSessions:previousSessions,
                viewCount:prevView.viewCount + 1,
           }).exec((err,updatedView)=>{
                callback({
                    err,
                    view:updatedView,
                })
           })   
    })
}



module.exports = {
    //GET FUNCTIONS
    //Gets all view data for a listing
    getMinifiedViewStats,
    getRecentViewsByUser,
    getViewStats,
    //UPDATE FUNCTIONS
    createUserView,
    recentViewStart,
    recentViewEnd,


}
