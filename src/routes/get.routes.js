import express from "express";
import getController from "../controllers/getsimple.controller.js";
const router = express.Router();
router.get("/", getController);

export default router;
