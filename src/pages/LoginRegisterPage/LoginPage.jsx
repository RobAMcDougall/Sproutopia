import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./LoginRegister.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const tokenResponse = await fetch(
        "https://sproutopia-backend.onrender.com/account/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!tokenResponse.ok) {
        setErrorMessage("Incorrect username or password.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }

      const tokenData = await tokenResponse.json();
      const userInfoResponse = await fetch(
        `https://sproutopia-backend.onrender.com/account/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: tokenData.token,
          },
        }
      );
      const userInfoData = await userInfoResponse.json();
      const userInfo = {
        token: tokenData.token,
        id: userInfoData.id,
        username: userInfoData.username,
      };
      await login(userInfo);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-register-page">
      <img
        className="logo-header"
        src="src/assets/logo-header.png"
        alt="Sproutopia logo"
      />
      <img
        className="bumblebee bumblebee1"
        src="src/assets/bumblebee.png"
        alt="bumblebee"
      />
      <h1>Existing User?</h1>
      <h2>Login to your account</h2>
      <form className="login-register" onSubmit={handleLogin}>
        <p className="form-label">Username or email address</p>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username or email address"
          onChange={handleInputChange}
          required
        />
        <p className="form-label">Password</p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleInputChange}
          required
        />
        <div className="button-wrap">
          <input className="login-button" type="submit" value="Login" />
        </div>
        <p className="no-account">
          Don't have an account? Signup <Link to="/register">here</Link>
        </p>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <img
        className="bumblebee bumblebee2"
        src="src/assets/bumblebee2.png"
        alt="bumblebee"
      />
    </div>
  );
};

export default LoginPage;
