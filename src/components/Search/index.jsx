import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate(); 

  const fetchData = async (value) => {
    try {
      const response = await fetch("https://sproutopia-backend.onrender.com/plants/all");
      const json = await response.json();
      console.log(json);
      const results = json.filter((plant) =>
        plant.name && plant.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(results);
      setResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const matchingPlant = setResults.find((plant) =>
      plant.name.toLowerCase().includes(input.toLowerCase())
    );
    if (matchingPlant) {
      navigate(`/plant/${matchingPlant.id}`); 
    } else {
 
      navigate('/'); 
    }
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