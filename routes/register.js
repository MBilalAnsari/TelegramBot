import express from "express";
import { registerUserCallback, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Handle Telegram callbacks for registration
router.post("/", registerUserCallback);

// Add new routes for further registration steps
router.post("/individual", registerUser); // Example route for individual user data submission

export default router;
