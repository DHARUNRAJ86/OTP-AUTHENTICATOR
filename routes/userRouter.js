import express from 'express'
import {register,verifyOTP,login} from '../controllers/userController.js'

const router =express.Router();

router.post('/register',register);
router.post('/otp-verification',verifyOTP);
router.post('/login',login);

export default router;