const mongoose=require("mongoose");

var mongourl=process.env.MONGOURL;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log("Recieved an error");
  });

  module.exports=mongoose;