import express from "express";
const router = express.Router();
import { userAuth } from "../controllers/Auth.controller.js";
router.post("/", userAuth);

export default router;
