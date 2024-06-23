import express from "express";
import galeriController from "../controller/galeriController.js";

const router = express.Router();

router.post("/simpan-foto", galeriController.simpanFoto);
router.get("/semua-foto", galeriController.getAllPhotos);
router.get("foto/:id", galeriController.getPhotoById);
router.delete("foto/:id", galeriController.deletePhotoById);

export default router;
