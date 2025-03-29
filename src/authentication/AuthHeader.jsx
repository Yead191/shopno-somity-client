import logo from "/logo-oli.png";
import { IoIosLogIn } from "react-icons/io";
import { Link, useLocation } from "react-router";

const AuthHeader = () => {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <div>
            <div>
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Care-Matrix logo" className="w-14 -mt-0.5" />
                    <h4 className="text-3xl font-semibold">
                        স্বপ্নস্বাক্ষর <span className="text-[#3B9DF8]">সমিতি</span>
                    </h4>
                </Link>
            </div>
            <div className="mt-6">
                <h1 className="text-2xl -ml-[4px] font-bold tracking-wider flex items-center gap-1">
                    <IoIosLogIn className="mt-[2px]" size={35} />
                    {pathname === "/login"
                        ? "Welcome Back, Login!"
                        : "Create Your Account!"}
                </h1>
                <p className="text-[15px] tracking-wide mt-1 text-gray-800">
                    Build a Better Future with স্বপ্নস্বাক্ষর সমিতি{" "}
                    <span className="text-gray-500">——</span> Your Foundation for Unity,
                    Progress, and Shared Success.
                </p>
            </div>
        </div>
    );
};

export default AuthHeader;
