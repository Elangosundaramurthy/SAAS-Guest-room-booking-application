const mongoose=require('mongoose');
const subscribeSchema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    plan_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    start_date:{
        type:Date,
    },
    username:{
    type:String
    },
    mobile_number:{
    type:String
    },
    email_id:{
    type:String
    },
    price_of_the_paln:{
    type:String
    },
    extra_features:{
    type:String
    },
    number_of_rooms:{
    type:String
    },
    location:{
    type:String
    },
    minimum_days:{
    type:String
    },
    maximum_days:{
    type:String
    },
    numbers_of_beds:{
    type:String
    },
    extra_features:{
    type:[String]  
    },

},{timestamps:true});
module.exports=mongoose.model('subscribe',subscribeSchema);