
import React, { useState } from "react";
import { motion } from "framer-motion";
// react icons
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { FaDiscord, FaHome, FaTasks } from "react-icons/fa";
import { TbBrandGithubFilled, TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { MdDashboardCustomize, MdKeyboardArrowDown, MdLaptopMac, MdOutlineArrowRightAlt, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsArrowRight, BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from '/logo-oli.png'
import { Link, NavLink } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import SearchBar from "@/components/SearchBar";


const Navbar = ({ SidebarTrigger }) => {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isProductHover, setIsProductHover] = useState(false);
    const { state } = useSidebar()
    const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false);
    const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false);
    const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("");
    const handleSearch = (query) => {
        console.log("Search Query:", query);
    };

    
    const links = <>
        <NavLink to={'/'} className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize flex items-center gap-1">
            <FaHome />
            Home
        </NavLink>
        <NavLink to={'/services'} className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize flex items-center gap-1">
            Services
        </NavLink>


    </>


    return (
        <nav className="flex items-center justify-between w-full py-2 fixed z-10 p-2 md:pl-16 lg:px-28 bg-white border-b">
            {/* logo */}
            <div className="flex items-center">
                {SidebarTrigger && <SidebarTrigger className={`${state === "expanded" ? "md:ml-48 lg:ml-42" : "ml-0 "}`} />} {/* Sidebar toggle button */}
                <Link to={"/"} className="flex items-center gap-1">
                    <img src={logo} alt="logo" className="w-[50px] -mt-1" />
                    <h4 className="text-2xl font-semibold">
                        স্বপ্নস্বাক্ষর <span className="text-[#3B9DF8]">সমিতি</span>
                    </h4>
                </Link>
            </div>

            <motion.div 
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration: 0.8, ease: 'easeInOut'}}
            className="">
                <SearchBar onSearch={handleSearch} />
            </motion.div>

            {/* user account */}
            <div className="flex items-center gap-[15px]">
                <div className="flex items-center gap-[10px] cursor-pointer relative"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                    <div className="relative">
                        <img
                            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                            alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
                        <div
                            className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                    </div>

                    <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">Oli
                        Ahmed</h1>

                    <div
                        className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <FiUser />
                            View Profile
                        </p>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <IoSettingsOutline />
                            Settings
                        </p>
                        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                            <FiUser />
                            View Profile
                        </p>

                        <div className="mt-3 border-t border-gray-200 pt-[5px]">
                            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                                <TbLogout2 />
                                Logout
                            </p>
                        </div>

                    </div>

                    <IoIosArrowUp
                        className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 sm:block hidden`} />

                </div>

                {/* <CiMenuFries onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex" /> */}
            </div>

            {/* mobile sidebar */}
            {/* <aside
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-white p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}>
                <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    <li onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
                        className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
                        Products
                        <IoIosArrowDown
                            className={`${isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"} text-gray-600 group-hover:text-[#3B9DF8] transition-all duration-300`} />
                    </li>


                    <div onClick={() => setMegaMenuSubItemsOpen("more_product")}
                        className={`${isMegaMenuCollapse ? "hidden" : "block"} group font-[500] ml-6`}>
                        <h4 className="text-left flex items-center gap-[5px]">
                            More Products
                            <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
                        </h4>

                        <ul className={`${megaMenuSubItemsOpen === "more_product" ? "flex" : "hidden"} pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Demo
                                App
                            </li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">CRM</li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">CMS</li>
                        </ul>
                    </div>

                    <div onClick={() => setMegaMenuSubItemsOpen("ecosystem")}
                        className={`${isMegaMenuCollapse ? "hidden" : "block"} font-[500] ml-6`}>
                        <h4 className="text-left flex items-center gap-[5px]">
                            Ecosystem
                            <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
                        </h4>

                        <ul className={`${megaMenuSubItemsOpen === "ecosystem" ? "flex" : "hidden"} pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Directory</li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Bookings</li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">User
                                feedback
                            </li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Task
                                Manager
                            </li>
                        </ul>
                    </div>

                    <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-poin ter capitalize">Features
                    </li>
                    <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">Support</li>
                </ul>
            </aside> */}
        </nav>
    );
};

export default Navbar;

