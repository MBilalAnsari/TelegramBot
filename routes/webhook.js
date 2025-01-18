import express from "express";
import { handleUpdates } from "../controllers/botController.js";

const router = express.Router();

// Route to handle Telegram webhook updates
router.post("/", handleUpdates);

export default router;
