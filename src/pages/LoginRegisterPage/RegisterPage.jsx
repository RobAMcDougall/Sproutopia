import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./LoginRegister.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPreference, setSelectedPreference] = useState([]);
  const handlePreferenceSelection = selectedPreference => {
    setSelectedPreference(selectedPreference);
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const foodPreferences = [
    { value: "dairy", label: "Dairy" },
    { value: "wheat", label: "Wheat" },
    { value: "peanuts", label: "Peanuts" },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(
        "https://sproutopia-backend.onrender.com/account/register",
        options
      );
      if (!response.ok) {
        setErrorMessage("An account already exists with this email.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", errorMessage);
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
      <h1>New User?</h1>
      <h2>Sign up for an account below</h2>
      <form className="login-register register" onSubmit={handleRegister}>
        <p className="form-label">Username</p>
        <input
          onChange={handleInputChange}
          type="text"
          id="name"
          name="name"
          placeholder="Enter a username"
          required
        />
        <p className="form-label">Email address</p>
        <input
          onChange={handleInputChange}
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
        <p className="form-label">Food preferences</p>
        <Select
          className="food-preference-form"
          options={foodPreferences}
          value={selectedPreference}
          onChange={handlePreferenceSelection}
          isMulti={true}
          placeholder="Select your preferences"
          // styles={{
          //   menu: provided => ({
          //     ...provided,
          //     backgroundColor: "rgba(248, 254, 230, 0.8)",
          //     borderColor: "#2d5039",
          //     border: "1px solid #2d5039",
          //   }),
          //   control: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: "rgba(248, 254, 230, 0.8)",
          //     borderColor: state.isFocused ? "#2d5039" : "#ced4da",
          //     borderWidth: "1px",
          //     borderRadius: "5px",
          //     boxShadow: state.isFocused
          //       ? "0 0 0 0.2rem rgba(45, 80, 57, 0.25)"
          //       : "",
          //   }),
          // }}
          styles={{
            menu: provided => ({
              ...provided,
              backgroundColor: "rgba(248, 254, 230, 0.8)",
              borderColor: "#2d5039",
              border: "1px solid #2d5039",
            }),
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "rgba(248, 254, 230, 0.8)",
              borderColor: state.isFocused ? "#2d5039" : "#ced4da",
              borderWidth: "1px",
              borderRadius: "5px",
              boxShadow: state.isFocused
                ? "0 0 0 0.2rem rgba(45, 80, 57, 0.25)"
                : "",
            }),
          }}
        />
        <p className="form-label">Password</p>
        <input
          onChange={handleInputChange}
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
