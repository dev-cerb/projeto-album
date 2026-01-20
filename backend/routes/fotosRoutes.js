import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import {
  deleteFoto,
  listFotos,
  updateFoto,
  uploadFotos,
} from "../controllers/fotoController.js";
import { upload } from "../config/multer.js";

const router = Router();

router.get("/:albumId/fotos", AuthMiddleware, listFotos);
router.post(
  "/:albumId/fotos",
  AuthMiddleware,
  upload.array("files", 10),
  uploadFotos,
);
router.delete("/fotos/:id", AuthMiddleware, deleteFoto);
router.put("/:albumId/fotos/:fotoId", AuthMiddleware, updateFoto);

export default router;
