import { Router } from "express";
import {
  addExpense,
  getAllExpense,
  markAsDoneUndone,
  removeExpense,
  updateExpense,
} from "../Controllers/Expense.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = Router();

// Correct usage
router.post("/add", isAuthenticated, addExpense);
router.get("/getall", isAuthenticated, getAllExpense);
router.delete("/remove/:id", isAuthenticated, removeExpense);
router.put("/update/:id", isAuthenticated, updateExpense);
router.put("/:id/done", isAuthenticated, markAsDoneUndone);

export default router;
