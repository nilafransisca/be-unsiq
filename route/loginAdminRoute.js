import express from "express";
import { loginAdmin } from "../controller/loginAdminController.js";

const router = express.Router();
router.post("/loginadmin", loginAdmin);

export default router;

