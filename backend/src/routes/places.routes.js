import express from "express";
import { getRecommendedPlaces } from "../controllers/places.controller.js";

const router = express.Router();

router.post("/", getRecommendedPlaces);

export default router;
