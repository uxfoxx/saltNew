import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminNavigationItem } from "../../routes/adminNavigationConfig";
import { useAppContext } from "../../../contexts/AppContext";

interface SideBarProps {
    adminNavItem: AdminNavigationItem[];
    isOpen: boolean;
    toggleSidebar?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, adminNavItem }) => {
    const { me } = useAppContext();

    const userType =
        me?.role === Number(process.env.REACT_APP_ADMIN)
            ? 'ADMIN'
            : me?.role === Number(process.env.REACT_APP_MANAGER)
                ? 'MANAGER'
                : me?.role === Number(process.env.REACT_APP_USER)
                    ? 'USER'
                    : 'GUEST';

    const filteredNavigationConfig = adminNavItem.filter((item: AdminNavigationItem) =>
        item.role?.includes(userType)
    );


    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    }

    const [isMobile, setIsMobile] = React.useState(false);
    console.log(isMobile);
    // in mobile view, when click the link, the sidebar will be closed

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 block sm:hidden" onClick={toggleSidebar} />}
            <div
                className={`h-screen flex flex-col justify-between fixed z-40 top-0 left-0 bg-primaryColor text-secondaryColor w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-[75%]"} transition-transform duration-300 ease-in-out shadow-sm shadow-white`}
            >
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <img
                            src="/assets/images/logo/logo.png"
                            alt="Profile"
                            className="h-8 my-2"
                        />
                        <button
                            onClick={toggleSidebar}
                            className="text-white focus:outline-none hover:text-secondaryColor transition-all duration-300 ease-in-out"
                        >
                            {isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}

                        </button>
                    </div>
                    <div className={`flex flex-col gap-2 ${isOpen ? "p-4" : "p-[0.3rem]"} transition-all duration-500 ease-in-out`}>
                        {filteredNavigationConfig && filteredNavigationConfig.length > 0 &&
                            filteredNavigationConfig.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-5 p-2 rounded-md cursor-pointer 
                                ${location.pathname === item.path ? isOpen ? "bg-gray-800 text-secondaryColor" : "bg-gray-800" : "text-white hover:text-secondaryColor hover:bg-gray-800"}
                                ${isOpen ? "justify-start pl-4" : "justify-end"}
                                transition-all duration-500 ease-in-out`}
                                    onClick={() => {
                                        navigate(item.path);
                                        if (isMobile) {
                                            toggleSidebar && toggleSidebar();
                                        }
                                    }}
                                >
                                    {isOpen && item.icon}
                                    {isOpen && <span>{item.title}</span>}
                                    {!isOpen &&
                                        <div className={`p-2 rounded-md`} >
                                            {item.icon}
                                        </div>}
                                </div>
                            ))}
                    </div>
                </div>
                <div className={`flex flex-col gap-2 mb-6 ${isOpen ? "p-4" : "p-[0.3rem]"} transition-all duration-500 ease-in-out`}>
                    <button
                        className={`w-full flex items-center gap-5 p-2 rounded-md cursor-pointer
                            ${location.pathname === "/logout" ? "bg-gray-800 text-secondaryColor" : "text-white hover:text-secondaryColor hover:bg-gray-800"}
                          ${isOpen ? "justify-start pl-4" : "justify-end"}
                            transition-all duration-500 ease-in-out`}

                        onClick={logout}
                        type="button"
                        id="logout"
                    >
                        {isOpen &&
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 384.971 384.971"
                                fill="currentColor"
                            >
                                <g>
                                    <g id="Sign_Out">
                                        <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z" />
                                        <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                                    </g>
                                </g>
                            </svg>
                        }

                        {isOpen && <span>Logout</span>}
                        {!isOpen &&
                            <div className={`p-2 rounded-md ${location.pathname === "/logout" ? "bg-gray-800 " : ""}`} >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 384.971 384.971"
                                    fill="currentColor"
                                >
                                    <g>
                                        <g id="Sign_Out">
                                            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z" />
                                            <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div >
    );
};

export default SideBar;
