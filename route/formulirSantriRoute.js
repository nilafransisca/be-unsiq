import express from 'express';
import { validateForm } from '../middleware/validationMiddleware.js';
import upload from '../middleware/formulirSantri.js';
import { daftarSantri } from '../controller/formulirSantriController.js';

const router = express.Router();

// Use middleware for validation and file upload
router.post("/daftarSantri", validateForm, upload.fields([{ name: 'pas_foto', maxCount: 1 }, { name: 'surat_pernyataan', maxCount: 1 }]), daftarSantri);

export default router;
