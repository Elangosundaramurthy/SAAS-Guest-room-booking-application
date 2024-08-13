const express=require('express');
const router=express.Router();
const subscribeCon=require('../controllers/subscribeControllers');
router.post('/subscribe',subscribeCon.subscribePlan);
module.exports=router;