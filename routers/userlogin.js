const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authMiddleware = require('../auth/onlyuser');
const useronly = require('../auth/customers');
const adminonly=require('../auth/Houseowners')
router.post('/register', userController.register);
router.get('/login', userController.login);
router.get('/protected',authMiddleware,(userController.protectedRoute));
router.get('/protected/user',useronly,(userController.protectedRoute));
router.get('/protected/admin-only',adminonly,(userController.protectedRoute));
module.exports = router;