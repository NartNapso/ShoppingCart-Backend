import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import checkoutRoutes from "./routes/checkoutRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
console.log("✅ Connected to MongoDB");
app.use("/api/checkout", checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
