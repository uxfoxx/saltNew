import { userRoleType } from './../types/global';

export const getRedirectPath = (userType: number) => {
    switch (userType) {
        case Number(process.env.REACT_APP_SUPER_ADMIN): return "/admin/dashboard";
        case Number(process.env.REACT_APP_MANAGER): return "/admin/dashboard";
        case Number(process.env.REACT_APP_STAFF): return "/admin/dashboard";
        case Number(process.env.REACT_APP_CLIENT): return "/";
        default: return "/";
    }
};

export const getUserType = (userType: number): userRoleType => {
    switch (userType) {
        case Number(process.env.REACT_APP_SUPER_ADMIN): return "SUPER_ADMIN";
        case Number(process.env.REACT_APP_MANAGER): return "MANAGER";
        case Number(process.env.REACT_APP_STAFF): return "STAFF";
        case Number(process.env.REACT_APP_CLIENT): return "CLIENT";
        default: return "GUEST";
    }
}