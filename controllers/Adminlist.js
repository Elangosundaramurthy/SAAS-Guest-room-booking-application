const Plan = require('../model/subscribeModel');
class Adminlist{
async List(req,res){
    try{
        const list=await Plan.find();{
        return res.status(200).json({list_are:list})
        }
    }
 catch(err){
    res.status(500).json({ error: err.message });
 }
}
}
module.exports=new Adminlist();