import express from "express";
import webhookRoutes from "./webhook.js";
import registerRoutes from "./register.js";

const router = express.Router();

// router.use("/webhook", webhookRoutes);
router.use("/", registerRoutes);

export default router;
