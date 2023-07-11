const express=require("express");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'build')));
app.set('trust proxy', 1);

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const dbConfig=require('./db');
const roomsRoute=require('./routes/roomsRoute');
const usersRoute=require('./routes/usersRoute');
const bookingRoute=require('./routes/bookingRoute');

app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings',bookingRoute);

const port=process.env.PORT || 4000;
app.listen(port,()=>console.log("Node server started"));