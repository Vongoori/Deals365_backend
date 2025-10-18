import express from "express";
import cors from "cors";
import dotenv from "dotenv";
  // 👈 make sure the path is correct
import pool from "./db.js";                  // 👈 optional: just ensures DB connection
import authRoutes from "./routes/auth.js"; 
import dealRoute from "./routes/deals.js";

dotenv.config();

const app = express();

// ✅ Allow requests from your React app
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // if you're sending cookies
}));

app.use(express.json());

// Debugging: log all incoming requests
app.use((req, res, next) => {
  console.log("👉 Incoming request:", req.method, req.url);
  next();
});

// Mount the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoute);



const PORT = process.env.PORT || 5050;
console.log("port: ", PORT);
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Connected to PostgreSQL`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});