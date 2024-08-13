const express = require('express');
const router = express.Router();
const adminonly=require('../auth/Houseowners')
const PlanController = require('../controllers/addPlan');
router.post('/add/plans',adminonly,(PlanController.addPlan));
router.put('/edit/:id',(PlanController.editplans));
module.exports = router;
