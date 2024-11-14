import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
    
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");

        if (email === "") {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if (password === "") {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        checkAccountExists((accountExists) => {
            if (accountExists) {
                logIn();
            } else {
                if (window.confirm(`No account found with this email: ${email}. Do you want to create a new account?`)) {
                    logIn();
                }
            }
        });
    };

    const checkAccountExists = (callback) => {
        fetch("http://localhost:8001/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then((r) => r.json())
        .then((r) => callback(r.userExists))
        .catch((err) => {
            console.error("Error in checkAccountExists:", err);
            window.alert("An error occurred while checking the account.");
        });
    };

    const logIn = () => {
        fetch("http://localhost:8001/api/auth", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      })
    
        .then((r) => r.json())
        .then((r) => {
            if (r.message === "success") {
                localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
                props.setLoggedIn(true);
                props.setEmail(email);
                navigate("/");
            } else {
                window.alert("Wrong email or password");
            }
        })
        .catch((err) => {
            console.error("Login failed", err);
            window.alert("An error occurred. Please try again.");
        });
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                    type={showPassword ? "text" : "password"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <div className="showPasswordContainer">
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="showPasswordButton"
                >
                    {showPassword ? "Hide Password" : "Show Password"}
                </button>
            </div>
            <div className="submitContainer">
                <button className="submitButton" onClick={onButtonClick}>
                    Log in
                </button>
            </div>
        </div>
    );
};

export default Login;
