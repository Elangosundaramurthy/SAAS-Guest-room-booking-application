const express = require('express');
const router = express.Router();
const adlist = require('../controllers/Adminlist');
router.get('/list', adlist.List);
module.exports = router;
