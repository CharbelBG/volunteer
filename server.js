import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./services/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoriesRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/health", (req, res) => {
  res.send("server is alive 🧟‍♂️, and flutter is the best 🚀");
});

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/event", eventRoutes);
app.use("/search", searchRoutes);

app.use(notFound);
app.use(errorHandler);
connectDB();
app.listen(port, () => {
  console.log("server is alive at", port);
});
