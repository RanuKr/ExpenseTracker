import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../Redux/expenseSlice";

const useGetExpenses = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((store) => store.expenses);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`
        );
        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;
