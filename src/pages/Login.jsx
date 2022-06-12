import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
import { useFormik } from "formik";

const Login = () => {
    const {auth, setAuth} = useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })

    const handleSubmit = (values) => {
        login(values.username, values.password);
    }
    const login = async (username, password) => {
        try {
            const response = await axios.post("/auth/login", {
                username: username,
                password: password,
            });
            if (response.status == "201" && response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `bearer ${response.data.access_token}`;
                const { data: user, status } = await axios.get("/");
                if (status == "401") {
                    localStorage.removeItem("token");
                    console.log("an error was occured when login");
                } else if (status == "200" && user) {
                    setAuth((prevState) => {
                        return {
                            ...prevState,
                            logedIn: true,
                            user: user,
                        };
                    });
                }
            }
        } catch (error) {
            console.log("fkldjfd");
            console.log(error);
        }
        
    };
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">User name </label>
                    <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
