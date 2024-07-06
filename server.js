import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./services/connectDB.js";
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import userRoutes from "./routes/userRoutes.js";

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

app.use("/", userRoutes);
app.use("/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
connectDB();
app.listen(port, () => {
  console.log("server is alive at", port);
});
