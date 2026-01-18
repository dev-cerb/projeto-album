import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import { listAlbums, createAlbum, updateAlbum, deleteAlbum } from "../controllers/albumController.js";

const router = Router();

router.get('/', AuthMiddleware, listAlbums)
router.post('/', AuthMiddleware, createAlbum)
router.put('/:id', AuthMiddleware, updateAlbum)
router.delete('/:id', AuthMiddleware, deleteAlbum)

export default router;