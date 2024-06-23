import express from 'express';
import { getPengumuman, getPengumumanById, insertPengumuman, updatePengumuman, deletePengumuman } from '../controller/pengumumanController.js';

const router = express.Router();

router.get('/pengumuman', getPengumuman);
router.get('/pengumuman/:id', getPengumumanById);
router.post('/pengumuman', insertPengumuman);
router.put('/pengumuman/:id', updatePengumuman);
router.delete('/pengumuman/:id', deletePengumuman);

export default router;
