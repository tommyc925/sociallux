import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";

// establish a connection to environment variables to access with process.env
dotenv.config();

// Set up MongoDB connection for project
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { dbName: "Sociallux" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Express app
const app = express();
app.use(express.json());

// Initiate the initial entry points for the API
app.use("/api", router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
