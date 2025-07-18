import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../routes/navigationConfig';
import './navbar.css';
import { LogOut } from 'lucide-react';
interface NavBarProps {
    navigation: NavigationItem[];
    scroll: number;
}

const NavBar: React.FC<NavBarProps> = ({ navigation, scroll }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleOpen = () => {
        setOpen(!open);
        document.body.style.overflow = open ? 'auto' : 'hidden';
    };

    return (
        <>
            <nav
                className={`fixed w-full z-[999] transition-all duration-300 ease-in-out  
                    ${(/^\/room-view\/[a-zA-Z0-9]+$/.test(location.pathname) || /^\/table-view\/[a-zA-Z0-9]+$/.test(location.pathname) ||
                        /^\/room-book\/[a-zA-Z0-9]+$/.test(location.pathname) || /^\/table-book\/[a-zA-Z0-9]+$/.test(location.pathname)
                    )
                        ? 'bg-gradient-to-t from-[#3B7576] to-[#529C9D] text-white'
                        : /^\/blog\/[a-zA-Z0-9]+$/.test(location.pathname) ||
                            location.pathname === '/sign-in' ||
                            location.pathname === '/forgot-password' ||
                            location.pathname === '/verify-email' ||
                            location.pathname === '/sign-up' ||
                            location.pathname === '/profile'
                            ? 'bg-black text-white shadow-md'
                            : scroll > 0
                                ? 'bg-black/60 shadow-md'
                                : 'bg-transparent'
                    }`}
            >
                <div className="flex items-center justify-between p-5 relative">
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="flex items-center gap-2"
                        >
                            <img
                                className="h-[30px]"
                                src="/assets/images/logo/logo.svg"
                                alt="Workflow"
                            />
                        </Link>
                    </div>
                    <div className='hidden lg:flex items-center gap-4'>
                        {navigation.map((item, index) => (
                            <Link
                                key={index}
                                to={String(item.path)}
                                className={`text-sm font-medium  hover:text-primaryColor px-4 py-2 ${location.pathname === item.path ? 'text-primaryColor' : 'text-white'
                                    }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <div className='flex items-center gap-4'>
                        {localStorage.getItem('accessToken') ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="hidden md:block text-sm font-medium text-white hover:text-primaryColor py-2"
                                >
                                    Profile
                                </Link>
                                <button
                                    type='button'
                                    className='text-black hover:text-primaryColor cursor-pointer bg-white p-1 rounded-md transition-all duration-300 ease-in-out hover:scale-110'
                                    onClick={() => {
                                        localStorage.removeItem('accessToken');
                                        localStorage.clear();
                                        window.location.href = '/sign-in';
                                    }}
                                >
                                    <LogOut />
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/sign-in"
                                className="hidden md:block text-sm font-medium text-white hover:text-primaryColor py-2"
                            >
                                Sign In
                            </Link>
                        )}
                        <div className='h-5 w-0.5 bg-white/50  hidden md:block'></div>
                        <Link
                            to="/contact-us"
                            className="bg-white text-sm text-primaryColor py-2 px-4 rounded-xl flex items-center gap-2"

                        >
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                    fill="currentColor" />
                            </svg>
                            Contact Us
                        </Link>
                        <div className='lg:hidden z-10'>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-primaryColor text-secondaryColor hover:bg-secondaryColor bg-primaryColor hover:rotate-180 hover:duration-300 hover:transition-all"
                                onClick={handleOpen}
                            >
                                {open ? (
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="close"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M563.2 512l317.6-317.6c17.6-17.6 17.6-46.4 0-64s-46.4-17.6-64 0L499.2 448 181.6 130.4c-17.6-17.6-46.4-17.6-64 0s-17.6 46.4 0 64L435.2 512l-317.6 317.6c-17.6 17.6-17.6 46.4 0 64s46.4 17.6 64 0L512 576l317.6 317.6c17.6 17.6 46.4 17.6 64 0s17.6-46.4 0-64L563.2 512z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="menu"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M128 192h640v64H128zm0 256h640v64H128zm0 256h640v64H128z"></path>
                                    </svg>
                                )
                                }

                            </button>

                        </div>
                    </div>
                    {open && (
                        <div className='fixed top-0 bottom-0 right-0 left-0'>
                            <div className='flex flex-col items-center justify-center absolute top-0 bottom-0 right-0 left-0 bg-black/70'>
                                <div className='flex flex-col items-center gap-4'>
                                    {navigation.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={String(item.path)}
                                            className={`text-sm font-medium hover:text-primaryColor px-4 py-2 ${location.pathname === item.path ? 'text-primaryColor' : 'text-white'
                                                }`}
                                            onClick={handleOpen}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    {localStorage.getItem('accessToken') ? (
                                        <Link
                                            to="/profile"
                                            className="text-sm font-medium text-white hover:text-primaryColor py-2 block md:hidden"
                                            onClick={handleOpen}
                                        >
                                            Profile
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/sign-in"
                                            className="text-sm font-medium text-white hover:text-primaryColor py-2 block md:hidden"
                                            onClick={handleOpen}
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                </div>

                            </div>
                        </div>

                    )}
                </div>
            </nav >

        </>
    );
};

export default NavBar;
