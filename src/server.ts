import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import checkoutRoutes from "./routes/checkoutRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./utils/logger";

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map((origin) => origin.trim());

const PORT = process.env.PORT || 5000;
const app = express();

app.options("*", cors());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed from this origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
connectDB();
logger.info("Connected to MongoDB");

app.use("/api/checkout", checkoutRoutes);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
