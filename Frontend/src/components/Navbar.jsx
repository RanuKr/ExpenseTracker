import React from "react";
import Logo from "./Shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {  useSelector } from "react-redux";



const Navbar = () => {
  const {user} = useSelector(store => store.auth) // Set true if logged in, false if logged out
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      // Make POST request to logout endpoint
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right - User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-44 mt-2">
                <Button variant="destructive" onClick={logouthandler}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
