import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./login.css";

export default function Login() {

    const { login } = useContext(LoginContext);

    const onLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const id = form.id.value;
        const password = form.password.value;

        login(id, password);
    }

    return (
        <div className="container">
            <form className="form-signin" onSubmit={ (e) => onLogin(e) }>
                <h2 className="form-signin-heading">Please sign in</h2>
                <p>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="id" name="id" className="form-control" placeholder="ID" required="" autoFocus="" />
                </p>
                <p>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" required="" />
                </p>
                {/* <input name="_csrf" type="hidden" value="a2b4af0f-816a-4766-a749-f40abdd810fe" /> */}
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Sign in" />
            </form>
        </div>
    )
}