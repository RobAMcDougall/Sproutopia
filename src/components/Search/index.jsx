import React, { useState } from "react";
import "./SearchBar.css";
import { Navigate } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://sproutopia-backend.onrender.com/plants")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((plant) => {
          return (
            value &&
            plant &&
            plant.name &&
            plant.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSubmit = (val) => {
    Navigate(`plant/${val}`);
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type to search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </div>
  );
};
