import React, { ReactElement, useEffect, useState } from "react";
import navigationConfig from "../../routes/navigationConfig";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
// import FloatingButtons from "../buttons/floating-button";
import HelmetComponent from "../../../global/helmet";
import { useLocation } from "react-router-dom";

interface UserLayoutProps {
    children: ReactElement
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");
    const [scroll, setScroll] = useState(0);
    // const scrollToTop = () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // }

    // const scrollToBottom = () => {
    //     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // }

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scroll]);

    useEffect(() => {
        const current = navigationConfig.find((item) => item.path === location.pathname);
        if (current) {
            setCurrentPath(current.title);
        } else {
            setCurrentPath("");
        }
    }, [location.pathname]);
    return (
        <div className="flex min-h-full justify-between flex-col">
            <NavBar navigation={navigationConfig} scroll={scroll} />
            <HelmetComponent title={`${currentPath ? `${currentPath + ' - '}` : ''}SALT`} />
            {children}
            <Footer />
            {/* <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2">
                {scroll > 0 ?
                    <FloatingButtons onClick={scrollToTop} icon="fas fa-chevron-up" divOrAnchor="div" />
                    :
                    <FloatingButtons onClick={scrollToBottom} icon="fas fa-chevron-down" divOrAnchor="div" />
                }
            </div > */}
        </div >
    );
}

export default UserLayout;
