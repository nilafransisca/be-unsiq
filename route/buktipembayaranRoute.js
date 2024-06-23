import express from "express";
import buktipembayaranController from "../controller/buktipembayaranController.js";
import buktipembayaran from "../middleware/buktipembayaran.js";

const router = express.Router();

// Route to handle bukti pembayaran file upload
router.post("/buktipembayaran", buktipembayaran.single("file"), buktipembayaranController);

export default router;
