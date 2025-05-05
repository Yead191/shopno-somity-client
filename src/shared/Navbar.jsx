import React, { useState } from "react";
import { motion } from "framer-motion";
// react icons
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { FaDiscord, FaHome, FaTasks } from "react-icons/fa";
import { TbBrandGithubFilled, TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import {
  MdDashboardCustomize,
  MdKeyboardArrowDown,
  MdLaptopMac,
  MdOutlineArrowRightAlt,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowRight, BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "/logo-oli.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import SearchBar from "@/components/SearchBar";
// Import shadcn drawer components
import {
  Sheet as Drawer,
  SheetContent as DrawerContent,
  SheetHeader as DrawerHeader,
  SheetTitle as DrawerTitle,
  SheetTrigger as DrawerTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logOut, useAuthUser } from "@/redux/auth/authAction";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Navbar = ({}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const user = useAuthUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSearch = (query) => {
  //     console.log("Search Query:", query);
  // };

  const links = (
    <>
      <NavLink
        to={"/"}
        className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md"
      >
        <FaHome />
        Home
      </NavLink>
      <NavLink
        to={"/leaderboard"}
        className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md"
      >
        <FaTasks />
        Leaderboard
      </NavLink>
      <NavLink
        to={"/dashboard"}
        className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md"
      >
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>
    </>
  );

  return (
    <nav className="flex items-center justify-between w-full py-2 fixed z-10 p-2 md:pl-16 lg:px-28 bg-white border-b">
      {/* Mobile Drawer Trigger */}
      <div className="md:hidden flex items-center gap-4">
        <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
          <DrawerTrigger asChild>
            <AlignLeft className="text-[1.8rem] text-[#424242] cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 flex flex-col gap-2">{links}</div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* logo */}
      <div className="flex items-center">
        <Link to={"/"} className="flex items-center gap-1">
          <img src={logo} alt="logo" className="w-[50px] -mt-1" />
          <h4 className="text-2xl font-semibold">
            স্বপ্নস্বাক্ষর <span className="text-[#3B9DF8]">সমিতি</span>
          </h4>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="hidden md:block"
      >
        <ul className="flex items-center gap-3">{links}</ul>
      </motion.div>

      {/* user account */}
      <div className="flex items-center gap-[15px]">
        {user?.email ? (
          <div
            className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                }
                alt="avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div>

            <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
              {user?.displayName}
            </h1>

            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
            >
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <IoSettingsOutline />
                Settings
              </p>

              <div className="mt-3 border-t border-gray-200 pt-[5px]">
                <button
                  onClick={() => {
                    dispatch(logOut);
                    toast.success("Log out successful");
                    navigate("/");
                  }}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>

            <IoIosArrowUp
              className={`${
                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
              } transition-all duration-300 text-gray-600 sm:block hidden`}
            />
          </div>
        ) : (
          <Link to={"/login"}>
            <Button className={"cursor-pointer"}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
