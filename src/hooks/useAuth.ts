import {useState} from "react";
import {COOKIE_ITEMS} from "../constants";
import {clearToken} from "../utils";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!(localStorage.getItem(COOKIE_ITEMS.AUTH_TOKEN) || sessionStorage.getItem(COOKIE_ITEMS.AUTH_TOKEN)));
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = async  () => {
        return new Promise<boolean>(
            (resolve) => {
                    setIsAuthenticated(true);
                    resolve(true);
            }
        )
    }
    const logout = () => {
        // Cookies.remove(COOKIE_ITEMS.AUTH_TOKEN);
        clearToken();
        return setIsAuthenticated(false);
    };
    const getToken = () => localStorage.getItem(COOKIE_ITEMS.AUTH_TOKEN) || sessionStorage.getItem(COOKIE_ITEMS.AUTH_TOKEN);
    return {isAuthenticated, login, logout, getToken}
}
export default useAuth;
