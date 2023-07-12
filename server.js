const express=require("express");
const cors = require('cors');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('trust proxy', 1);

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions))

const dbConfig=require('./db');
const roomsRoute=require('./routes/roomsRoute');
const usersRoute=require('./routes/usersRoute');
const bookingRoute=require('./routes/bookingRoute');

app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings',bookingRoute);

const port=process.env.PORT || 4000;
app.listen(port,()=>console.log("Node server started"));