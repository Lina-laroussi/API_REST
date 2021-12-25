const UserModel=require("./models/User")
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv =require('dotenv');
dotenv.config()

const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/Database";
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true,useUnifiedTopology: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


app.get("/", (req, res) => {
  UserModel.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

app.post('/',(req,res,next)=>{
    let user1 = new UserModel({
        name:'yasmine',
        Email:'yasmine025@gmail.com',
        Password:'Yasmine12345'

    })
user1.save(function(err){

    if(err){
        console.error(err)
    }else{
        console.log("data saved")
    }
});
});

app.put('/',(req,res,next)=>{
    UserModel.updateOne({Id:1},
        {name:'Rouaida',Email:'rouaida2000@gmail.com',Password:"rou12345"},function(err,data){
            if(err){
                console.error(err)
            }else{
                console.log(data)

            }
        });
});

app.delete('/',(req,res,next)=>{
    UserModel.deleteOne({id:1},function(err){
        if(err){
            console.error(err)
        }else{
            console.log("data deleted")
        }
    })
})


// launch our backend into a port
app.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
