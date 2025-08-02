// Login.jsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Shared/Logo";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/Redux/authSlice"; // ✅ correct path

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // optional — only if backend sends cookies
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg space-y-4">
        <div className="w-full flex justify-center mb-3">
          <Logo />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <Button className="w-full my-5" type="submit">Login</Button>
          <p className="text-sm text-center">
            Not an account?{" "}
            <Link to="/Signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
