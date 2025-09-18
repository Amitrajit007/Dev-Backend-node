import express from "express";
const router = express.Router();
import { handleLogOut } from "../controllers/logOut.controller.js";
router.get("/", handleLogOut);

export default router;
