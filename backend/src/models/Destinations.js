import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: String,
  bestSeason: String,
  avgCost: Number,
  weather: String
});

export default mongoose.model("Destination", destinationSchema);
