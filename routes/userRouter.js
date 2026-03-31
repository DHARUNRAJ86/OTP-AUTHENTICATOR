import express from 'express'
import {register,verifyOTP,login,logout,getUser} from '../controllers/userController.js'
import {isAuthenticated} from '../middleware/auth.js'

const router =express.Router();

router.post('/register',register);
router.post('/otp-verification',verifyOTP);
router.post('/login',login);
router.get('/logout',isAuthenticated,logout);

router.get('/me',isAuthenticated,getUser);

export default router;