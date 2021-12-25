const mongoose=require("mongoose")

let UserSchema = new mongoose.Schema({

    name:String,

  Email:String,
 
  Password:String,
}
)

module.exports = mongoose.model('UserModel', UserSchema)
