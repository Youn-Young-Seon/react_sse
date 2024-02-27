import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import * as auth from '../api/auth';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName';

const LoginContextProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
    const [rememberUserId, setRememberUserId] = useState();

    const loginCheck = async () => {
        const accessToken = Cookies.get("accessToken");
        console.log(`accessToken: ${accessToken}`);

        if(!accessToken) {
            console.log(`쿠키에 accessToken(jwt)이 없음`);
            logoutSetting();
            return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        let response, data;
        response = await auth.info();
        console.log(response);
        data = response.data.data;
        console.log(`data: ${data}`);

        loginSetting(data, accessToken);
    }

    const login = async (username, password) => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);

        const response = await auth.login(username, password);
        const data = response.data;
        const status = response.status;
        const headers = response.headers;
        const authorization = headers.authorization;
        const accessToken = authorization.replace("Bearer ", "");

        console.log(`data: ${data}`);
        console.log(`status: ${status}`);
        console.log(`headers: ${headers}`);
        console.log(`jwt: ${accessToken}`);

        if(status === 200) {
            Cookies.set("accessToken", accessToken);

            loginCheck();
        }
    }

    const loginSetting = (userData, accessToken) => {
        const { id } = userData;
        // const roleList = authList.map(auth => auth.auth);

        console.log(`userId: ${id}`);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        setLogin(true);

        const updatedUserInfo = { id };
        setUserInfo(updatedUserInfo);

        // const updatedRoles = { isUser: false, isAdmin: false};
        // roleList.forEach(role => {
        //     if(role === 'ROLE_USER') updatedRoles.isUser = true;
        //     if(role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        // });
        // setRoles(updatedRoles);
    }

    const logoutSetting = () => {
        api.defaults.headers.common.Authorization = undefined;    
        Cookies.remove("accessToken");
        setUserInfo(null);
        setRoles(null);        
    }
    
    const logout = () => {
        setLogin(false);
    }

    useEffect(() => {
        
    }, [])

    return(
        <LoginContext.Provider value={{ isLogin, userInfo, roles, login, logout }}>
            { children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;