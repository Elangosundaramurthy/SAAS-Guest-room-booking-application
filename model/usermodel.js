const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
username:{
    type: String,
},
mobile:{
    type:Number,
},
email:{
    type:String,
},
password:{
    type:String,
},
role:{
    type:String,
    enum:['customer','houseowner'],
    default:'user'
},
token:{
    type:String,
},
},{timestamps:true});
const User = mongoose.model('User', userSchema);
module.exports = { User };