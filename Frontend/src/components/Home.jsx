import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCategory, setMarkAsDone } from "../Redux/expenseSlice";
import { useDispatch } from "react-redux";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "../Hooks/useGetExpenses";


const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };

  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main content container */}
      <div className=" mx-auto px-2 py-5 mt-16">
        {/* Header with create button - increased gap between items */}
        <div className="flex items-center justify-between gap-200 mb-8">
          {" "}
          {/* Added gap-12 */}
          <h1 className="text-2xl font-semibold text-gray-800">My Expenses</h1>
          <CreateExpense />
        </div>

        {/* Filter section */}
        <div className="mb-6 flex items-center gap-2 my-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by category:
          </label>
          <Select onValueChange={changeCategoryHandler} required>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="petrol">Petrol</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={changeDoneHandler} required>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Mark as " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="done"> Done</SelectItem>
              <SelectItem value="Undone">Undone</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
       
        <ExpenseTable/>
      </div>
    </div>
  );
};

export default Home;
