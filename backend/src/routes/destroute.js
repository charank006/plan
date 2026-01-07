import express from "express";
import { getDestinations } from "../controllers/destcontrol.js";

const router = express.Router();

router.get("/", getDestinations);

export default router;
