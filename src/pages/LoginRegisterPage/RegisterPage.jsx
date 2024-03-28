import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import "./LoginRegister.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handlePreferenceSelection = selectedPreferences => {
    setSelectedPreferences(selectedPreferences);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    preferences: [],
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
      const allergies = selectedPreferences.map(pref => pref.value);
      const updatedFormData = { ...formData, preferences: { allergies } }; // Wrap allergies in an object
      setFormData(updatedFormData);
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      };
  
      console.log("Sending request with data:", updatedFormData);
  
      const response = await fetch(
        "https://sproutopia-backend.onrender.com/account/register",
        options
      );
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        setErrorMessage("An error occurred during registration.");
        return;
      }
  
      const responseData = await response.json();
      console.log("Response data:", responseData);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration.");
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
        <p className="text-center form-label">Username</p>
        <input
          onChange={handleInputChange}
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          required
        />
        <p className="text-center form-label">Email address</p>
        <input
          onChange={handleInputChange}
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
        <p className="text-center form-label">Allergies</p>
        <Select
          className="food-preference-form"
          name="preference"
          options={foodPreferences}
          value={selectedPreferences}
          onChange={handlePreferenceSelection}
          isMulti={true}
          placeholder="Select your preferences"
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

        <div className="text-center w-[200px] button-wrap">
          <input className="signup-button" type="submit" value="Signup" />
        </div>
      </form>

      <img
        className="bumblebee bumblebee2"
        src="src/assets/bumblebee2.png"
        alt="bumblebee"
      />
       <p className="no-account text-center font-medium text-[#2d5039]">
          Already have an account? Login <Link to="/login">here</Link>
        </p>
    </div>
  );
}