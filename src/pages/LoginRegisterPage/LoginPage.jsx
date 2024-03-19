import React from "react";
import { Link } from "react-router-dom";
import "./LoginRegister.css";

const LoginPage = () => {
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
      <form className="login-register">
        <p className="form-label">Email address</p>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
        <p className="form-label">Password</p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <div className="button-wrap">
          <input className="login-button" type="submit" value="Login" />
        </div>
        <p className="no-account">
          Don't have an account? Signup <Link to="/register">here</Link>
        </p>
      </form>
      <img
        className="bumblebee bumblebee2"
        src="src/assets/bumblebee2.png"
        alt="bumblebee"
      />
    </div>
  );
};

export default LoginPage;
