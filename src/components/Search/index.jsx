import React, { useState } from "react";
import "./SearchBar.css";
export const SearchBar = () => {
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
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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

// import { useParams } from "react-router-dom";
// const { id } = useParams();

// const getFilteredVeg = (query, veg) => {
//     if(!query) {
//         return veg;
//     }
//     return veg.filter()
// }
// export default function Search() {
//     const [query, setQuery] = useState('')

//     return (
//         <>
//             <label>Search</label>
//             <input type="text" onChange={e => setQuery(e.target.value)} />
//         </>
//     )
// }
// const handlePlantInfo = (plantId) => {
//     navigate(`/plant/${plantId}`);
//     closeMenu();
//   };
