import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import destinationRoutes from "./routes/destroute.js";
import placesRoutes from "./routes/places.routes.js";
import planRoutes from "./routes/planroute.js";

dotenv.config();
const app = express();

// ===== MIDDLEWARES =====
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.json());

// 🔴 REQUEST LOGGER (must be BEFORE routes)
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// ===== ROUTES =====
app.use("/api/places", placesRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/plan", planRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// ===== DB CONNECTION =====
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
} else {
  console.warn("MONGO_URI not set — skipping MongoDB connection. Set MONGO_URI in .env to enable DB.");
}

export default app;
