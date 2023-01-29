if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const port = process.env.PORT;


const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const ejs = require('ejs')

const { Server } = require("socket.io");

const allow_origins = [
    `${process.env.CLIENT_BASE_ALLOW}`,
    `${process.env.CLIENT_BASE_ALLOW_2}`
];


const io = new Server(server, {
    cors: {
        origin:"*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header", "Authorization"],
        credentials: false,
    },
});

app.use(express.urlencoded({extended:false}));



/**
 * Add Tracking 
 * 
 */


const ioEmit = (event_name, data)=>{
    try{
        io.emit(event_name, data);
        return true
    }catch(err){
        return false
    }
}

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', () => {
        //Trigger extra business logic and mailing here 

    });

   socket.on('user_redeem_request', async ({redeem_reference, order_reference, user_email, authToken})=>{
    //Triggered when a user qr code is scanned by seller application
        ioEmit('order_redeem_pending', {
            redeem_reference,
            order_reference,
        });    
   });

   
   socket.on('seller_complete_request', async ({redeem_reference, order_reference, user_email, authToken})=>{
    //Triggered when a user qr code is scanned by seller application
        ioEmit('order_complete', {
            redeem_reference,
            order_reference,
        });
   });

   socket.on('seller_redeem_accept', ()=>{
    //Triggered when a seller approves an order as ready for pick up
    
   })


   socket.on('seller_redeem_ready', ()=>{
    //Triggered when a seller marks an order as ready for pickup from store

   })

   socket.on('user_order_cancel', ()=>{
    //Triggrered when a user decides to cancel an order
        //_--> Can only be accepted if seller redeem ready has not been called previously in the session 

   })


   socket.on('get_redeem_response', ({order_reference, redeem_reference})=>{
        //Simulates response from " seller_redeem_accept "
        ioEmit('order_complete', {
            redeem_reference,
            order_reference,
        });
})


   socket.on('user_redeem_display', ()=>{
    //Triggered when a user displays a qr code while at valid branch location 
        //Used for caching purposes in xno

   })
   //TEST EMITS
 
});



server.listen(port, ()=>{
    console.log(`listening on port...` + port);

})
