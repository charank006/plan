import express from "express";
import { generatePlan } from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/", generatePlan);

export default router;
