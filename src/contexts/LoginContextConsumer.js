import { useContext } from "react";
import { LoginContext } from "./LoginContextProvider";

const LoginContextConsumer = () => {
    const { isLogin } = useContext(LoginContext);

    return(
        <div>

        </div>
    )
}

export default LoginContextConsumer;