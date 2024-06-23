// index.js

import express from "express";
import loginRoutes from "./loginRoute.js";
import loginAdminRoutes from "./loginAdminRoute.js";
import buktipembayaranRoutes from "./buktipembayaranRoute.js";
import beritaRoutes from "./beritaRoute.js";
import galeriRoutes from "./galeriRoute.js";
import ceritaalumniRoutes from "./ceritaalumniRoute.js";
import formulirSantriRoutes from "./formulirSantriRoute.js";
import pengumumanRoutes from "./pengumumanRoutes.js";

const router = express.Router();

router.use(loginRoutes);
router.use(loginAdminRoutes);
router.use(buktipembayaranRoutes);
router.use(beritaRoutes);
router.use(pengumumanRoutes);
router.use(galeriRoutes);
router.use(ceritaalumniRoutes);
router.use(formulirSantriRoutes);

export default router;
