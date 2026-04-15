import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
