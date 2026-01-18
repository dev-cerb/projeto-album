import { Router } from "express";
import authRoutes from './authRoutes.js'
import albumRoutes from './albumRoutes.js'
import fotosRoutes from './fotosRoutes.js'

const router = Router();

router.use('/auth', authRoutes)
router.use('/albuns', albumRoutes)
router.use('/albuns', fotosRoutes)

export default router