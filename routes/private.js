import express from 'express';
const router=express.Router();
import {getPrivateData} from '../controllers/private.js';
import {protect} from '../middleware/auth.js';

router.route("/").get(protect, getPrivateRoute);







export default router;