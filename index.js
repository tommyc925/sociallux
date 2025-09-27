import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { dbName: "Sociallux" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
