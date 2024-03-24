import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GrowthCalendar.css";

function GrowthCalendarIndoors() {
  const { id } = useParams();
  const [plant, setPlant] = useState({});

  useEffect(() => {
    async function displayGrowthData() {
      const response = await fetch(
        `https://sproutopia-backend.onrender.com/plants/${id}`
      );
      const rawData = await response.json();
      setPlant(rawData);
    }

    displayGrowthData();
  }, []);

  const getDateMonth = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

// const isSowingIndoorsMonth = dateString => {
//   const date = new Date(dateString);
//   const sowIndoorsStart = new Date(plant.sow_indoors_start);
//   const sowIndoorsEnd = new Date(plant.sow_indoors_end);

//   // Check if the given month is within the harvesting window, one month before, or the start month
// return (
//     (date >= new Date(sowIndoorsStart.getFullYear(), sowIndoorsStart.getMonth() - 1, 1) &&
//     date <= sowIndoorsEnd) ||
//     (date.getMonth() === sowIndoorsStart.getMonth() &&
//     date.getFullYear() === sowIndoorsStart.getFullYear())
//   );
// }

  const isSowingIndoorsMonth = dateString => {
    const date = new Date(dateString);
    const sowIndoorsStart = new Date(plant.sow_indoors_start);
    const sowIndoorsEnd = new Date(plant.sow_indoors_end);

    return date >= sowIndoorsStart && date <= sowIndoorsEnd;
  };

  const calendarMonthsIndoor = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1);
    return (
      <div
        key={i}
        className={`calendar-month ${
          isSowingIndoorsMonth(month.toISOString()) ? "indoor-sowing-month" : ""
        }`}
      >
        {getDateMonth(month)}
      </div>
    )
  })
  return <div className="calendar">{calendarMonthsIndoor}</div>
}

export default GrowthCalendarIndoors;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./GrowthCalendar.css";

// function GrowthCalendarIndoors() {
//   const { id } = useParams();
//   const [plant, setPlant] = useState({});

//   useEffect(() => {
//     async function displayGrowthData() {
//       const response = await fetch(
//         `https://sproutopia-backend.onrender.com/plants/${id}`
//       );
//       const rawData = await response.json();
//       setPlant(rawData);
//     }

//     displayGrowthData();
//   }, [id]);

//   const getDateMonth = dateString => {
//     const date = new Date(dateString);
//     return date.toLocaleString("default", { month: "short" });
//   };

//   const isSowingIndoorsMonth = dateString => {
//     const date = new Date(dateString);
//     const sowIndoorsStart = new Date(plant.sow_indoors_start);
//     const sowIndoorsEnd = new Date(plant.sow_indoors_end);

//     // Check if the given month is within the sowing indoors window, one month before, or the start month
//     return (
//       (date >=
//         new Date(
//           sowIndoorsStart.getFullYear(),
//           sowIndoorsStart.getMonth() - 1,
//           1
//         ) &&
//         date <= sowIndoorsEnd) ||
//       (date.getMonth() === sowIndoorsStart.getMonth() &&
//         date.getFullYear() === sowIndoorsStart.getFullYear())
//     );
//   };

//   // Generate calendar months and apply styles based on sowing indoors month
//   const calendarMonthsIndoor = Array.from({ length: 12 }, (_, i) => {
//     const month = new Date(2024, i, 1);
//     return (
//       <div
//         key={i}
//         className={`calendar-month ${
//           isSowingIndoorsMonth(month.toISOString()) ? "indoor-sowing-month" : ""
//         }`}
//       >
//         {getDateMonth(month)}
//       </div>
//     );
//   });

//   return <div className="calendar">{calendarMonthsIndoor}</div>;
// }

// export default GrowthCalendarIndoors;
