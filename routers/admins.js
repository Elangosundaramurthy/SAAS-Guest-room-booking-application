const express = require('express');
const router = express.Router();
const adminonly=require('../auth/Houseowners')
const adlist = require('../controllers/Adminlist');
router.get('/list',adminonly,(adlist.List));
module.exports = router;