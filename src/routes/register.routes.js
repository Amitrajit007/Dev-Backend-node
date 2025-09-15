import express from "express";
const router = express.Router();
import { handlenewUser } from "../controllers/register.controller.js";
router.post("/", handlenewUser);

export default router;
