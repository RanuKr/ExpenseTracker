import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import UpdateExpense from "./UpdateExpense";

const ExpenseTable = () => {
  const { expenses = [] } = useSelector((state) => state.expenses || {});
  const [localExpense, setLocalExpense] = useState([]);

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const handleCheckboxChange = async (expenseId) => {
    const expense = localExpense.find((exp) => exp._id === expenseId);
    const newStatus = !expense?.done;

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLocalExpense((prev) =>
          prev.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (error) {
      console.error("Error updating done status:", error);
      toast.error("Failed to update done status.");
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/expense/remove/${expenseId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLocalExpense((prev) =>
          prev.filter((expense) => expense._id !== expenseId)
        );
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  // ✅ Count only not-done expenses
  const totalAmount = localExpense
    .filter((exp) => !exp.done)
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark as Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Add your first expense
            </TableCell>
          </TableRow>
        ) : (
          localExpense.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>
                <Checkbox
                  checked={expense.done || false}
                  onCheckedChange={() => handleCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className={expense.done ? "line-through" : ""}>
                {expense.description}
              </TableCell>
              <TableCell
                className={
                  expense.done ? "line-through text-muted-foreground" : ""
                }
              >
                ₹{expense.amount}
              </TableCell>
              <TableCell
                className={
                  expense.done ? "line-through text-muted-foreground" : ""
                }
              >
                {expense.category}
              </TableCell>
              <TableCell
                className={
                  expense.done ? "line-through text-muted-foreground" : ""
                }
              >
                {new Date(expense.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => removeExpenseHandler(expense._id)}
                    size="icon"
                    className="rounded-full border border-red-600 hover:bg-red-100"
                    variant="outline"
                  >
                    <Trash className="w-5 h-5 text-red-600" />
                  </Button>
                  {/* <Button
                    size="icon"
                    className="rounded-full border border-blue-600 hover:bg-blue-100"
                    variant="outline"
                  >
                    <Edit2 className="w-5 h-5 text-blue-600" />
                  </Button> */}

                  <UpdateExpense expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-xl">
            ₹{totalAmount.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
