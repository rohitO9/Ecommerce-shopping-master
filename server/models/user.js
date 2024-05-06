const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const  userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true , unique: true},
    email:{type: String, required: true},
    password: { type: String, required: true }  ,
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});
userSchema.methods.verifyPassword = async function(password){
    const user = this;
    const ismatch = await bcrypt.compare(password, user.password);
    return ismatch;
}
const User = mongoose.model("User", userSchema) ;
module.exports=User;