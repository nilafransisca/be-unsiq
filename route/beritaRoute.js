import express from "express";
import { deleteBerita, getBerita, getBeritaById, insertBerita, updateBerita } from "../controller/beritaController.js";

const router = express.Router();

router.get("/berita", getBerita);
router.get("/berita/:id", getBeritaById);
router.post("/berita", insertBerita);
router.put("/berita/:id", updateBerita);
router.delete("/berita/:id", deleteBerita);

export default router;
