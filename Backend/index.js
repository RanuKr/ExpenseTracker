import express, { json } from "express";
import { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./DB/db.js";
import userRoute from "./Routes/user.route.js";
import expenseRoute from "./Routes/expense.route.js";

config({});
const app = express();
const PORT = 8000;
connectDB();

// ✅ CORRECT CORS SETUP
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // ✅ FIXED lowercase
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
