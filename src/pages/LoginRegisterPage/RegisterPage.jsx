import React from "react";

export default function RegisterPage() {
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
      <h1>New User?</h1>
      <h2>Sign up for an account below</h2>
      <form className="login-register register">
        <p className="form-label">Name</p>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />
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
          <input className="signup-button" type="submit" value="Signup" />
        </div>
      </form>
      <img
        className="bumblebee bumblebee2"
        src="src/assets/bumblebee2.png"
        alt="bumblebee"
      />
    </div>
  );
}
