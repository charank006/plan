import Destination from "../models/Destinations.js";
import mongoose from "mongoose";

export const getDestinations = async (req, res) => {
  // If DB not connected, return a 503 so the frontend can handle it gracefully
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected" });
  }

  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
