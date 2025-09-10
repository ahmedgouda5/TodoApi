import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./Routers/user.route.js";
import todoRouter from "./Routers/todo.route.js";
import cors from "cors";

dotenv.config();

const app = express(); // ✅ عرّف app الأول

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/todo/users", userrouter);
app.use("/api/todo", todoRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
