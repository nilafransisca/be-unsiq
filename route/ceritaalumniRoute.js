import express from "express";
import { simpanCeritaAlumni } from "../controller/ceritaalumniController.js";

const router = express.Router();

router.post("/simpan-cerita", simpanCeritaAlumni);

export default router;
