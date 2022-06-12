import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const Navigation = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("token");
        setAuth((prevState) => {
            return {
                logedIn: false,
            };
        });
    };

    const authBtn = () => {
        if (auth.logedIn) {
            return (
                <li>
                    <button onClick={logout}>Lougout</button>
                </li>
            );
        }
        return (
            <li>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </li>
        );
    };
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {authBtn()}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
