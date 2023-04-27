var express = require("express");
var app = express();
require("dotenv").config();
var cors = require('cors')
// const path = require("path");
const path = require('path');
// include database config file
const db = require("./config/sequelize.js");

// force: true will drop the table if it already exists
db.sequelize.sync();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

//app.use(bodyParser.json({limit: '500000mb'}));
//app.use(bodyParser.urlencoded({limit: '500000mb', extended: true, parameterLimit: 10000000000}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static('upload'));

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:8000','http://192.168.1.93:8000'];
  //  const allowedOrigins = ['https://billy247.com','https://billy247.com:3002'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Accept, Authorization, authorization');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET, POST, PUT, DELETE');
  next();
});

app.use(cors());
app.use(cors({
  exposedHeaders: ['Authorization', 'authorization', 'x-api-key', 'x-token', 'x-authorization', 'x-Authorization',],
}));



app.get("",(req,res)=>{
  res.status(201).json("welcome")
})
// app.use(express.static(path.join(__dirname, "build")));

// Access Upload Folder 
app.use("/blog",express.static('upload/blog'));
app.use("/ticket",express.static('upload/ticket'));
app.use("/offer",express.static('upload/offer'));


// routes
const userRouter = require("./routes/userRouter")
const blogRouter = require("./routes/blogRouter")
const ticketRouter = require("./routes/ticketRouter")
const offerRouter = require("./routes/offerRouter")
const categoryRouter = require("./routes/categoryRouter")
app.use("/api/v1/user", userRouter)
app.use("/api/v1/blog", blogRouter)
app.use("/api/v1/ticket", ticketRouter)
app.use("/api/v1/offer", offerRouter)
app.use("/api/v1/category", categoryRouter)



//const port = process.env.PORT || 8000
// Create & Listen Server

// app.listen(8000,()=>{
//   console.log(`server listening port no. 8000`);
// });
app.listen(8000,()=>{
  console.log(`server listening port no. 8000`);
});
