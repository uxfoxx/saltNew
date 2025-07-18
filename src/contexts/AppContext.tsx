/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { MeIf, UserIf } from '../types';
import SplashScreen from '../global/splashScreen';
import { GET, POST } from '../app/auth/AxiosHelper';
import { CustomError } from '../types';
import { toast } from 'react-toastify';
import Api from '../api/api';
import { showToast } from '../app/components/common/Toast';

interface AppContextType {
    // isAdmin: boolean;
    me: MeIf | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    userTypeLocal: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    // const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [me, setMe] = useState<MeIf | null>(null);
    const [userTypeLocal, setUserTypeLocal] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const getUserFromToken = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            if (token) {
                const res = await GET(Api.user.me);
                // users/profile
                console.log("resuser", res);

                setMe(res.data as MeIf);
                setLoading(false);
                switch (res.data?.role) {
                    case Number(process.env.REACT_APP_SUPER_ADMIN):
                        // setIsAdmin(true);
                        setUserTypeLocal("SUPER_ADMIN");
                        break;
                    case Number(process.env.REACT_APP_MANAGER):
                        setUserTypeLocal("MANAGER");
                        break;
                    case Number(process.env.REACT_APP_STAFF):
                        setUserTypeLocal("STAFF");
                        break;
                    case Number(process.env.REACT_APP_CLIENT):
                        setUserTypeLocal("CLIENT");
                        break;
                    default:
                        setUserTypeLocal("GUEST");
                        break;
                }
            }
        } catch (err) {
            console.log(err, "err");
            if ((err as CustomError).response?.status === 401 || (err as CustomError).response?.status === undefined) {
                localStorage.removeItem("accessToken");
                localStorage.clear();
                window.location.href = "/sign-in";
            }
        }
    }

    const login = async (credentials: { username: string; password: string }) => {
        try {
            // setLoading(true);
            const data = {
                username: credentials.username,
                password: credentials.password
            }
            const res = await POST(Api.user.login, data, { includeAuthorization: false });
            localStorage.setItem("accessToken", res.data.token);
            if (res.data) {
                await getUserFromToken();
                showToast({
                    type: "success",
                    toastId: "login-success",
                    message: "Login successful!"
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                toastId: "login-error",
                message: (error as CustomError).response?.data?.error || "Login failed. Please try again."
            });
            throw error; // Rethrow the error if needed
        }
    };

    const loginnew = async (credentials: { username: string; password: string }) => {
        try {
            // setLoading(true);
            const data = {
                username: credentials.username,
                password: credentials.password
            }
            console.log(data);

            const res = await POST(Api.user.login, data, { includeAuthorization: false });
            localStorage.setItem("accessToken", res.data.token);
            console.log("first res", res);
            if (res.data) {
                await getUserFromToken();
                showToast({
                    type: "success",
                    toastId: "login-success",
                    message: "Login successful!"
                });
            }


        }
        catch (error) {
            console.log("Login error:", error);
            showToast({
                type: "error",
                toastId: "login-error",
                message: (error as CustomError).response?.data?.message || "Login failed. Please try again."
            });
        }
    };
    const logout = () => {
        localStorage.removeItem("accessToken");
        setMe(null);
        // setIsAdmin(false);
    };


    // useLayoutEffect(() => {
    //     fetchSpecialOffers();
    // }, []);

    // if accessToken is  available
    const accessToken = localStorage.getItem("accessToken");

    useLayoutEffect(() => {
        if (accessToken) {
            getUserFromToken();
        }
    }, [accessToken]);

    const contextValue: AppContextType = {
        // isAdmin,
        me,
        login,
        logout,
        userTypeLocal,
    };

    return loading ? <SplashScreen /> : <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;

};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
