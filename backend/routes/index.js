import { Router } from "express";
import authRoutes from './authRoutes.js'
import albumRoutes from './albumRoutes.js'

const router = Router();

router.use('/auth', authRoutes)
router.use('/album', albumRoutes)

export default router