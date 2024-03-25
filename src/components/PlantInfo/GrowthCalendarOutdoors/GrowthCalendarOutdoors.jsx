import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../GrowthCalendar.css";

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

  // const isSowingOutdoorsMonth = dateString => {
  //   const date = new Date(dateString);

  //   const sowOutdoorsStart = new Date(plant.sow_outdoors_start);
  //   const sowOutdoorsEnd = new Date(plant.sow_outdoors_end);

  //   return date >= sowOutdoorsStart && date <= sowOutdoorsEnd;
  // };

  // const calendarMonthsOutdoors = Array.from({ length: 12 }, (_, i) => {
  //   const month = new Date(2024, i, 1);

  const isSowingOutdoorsMonth = dateString => {
    const date = new Date(dateString);
    const sowOutdoorsStart = new Date(plant.sow_outdoors_start);
    const sowOutdoorsEnd = new Date(plant.sow_outdoors_end);

    return (
      (date >=
        new Date(
          sowOutdoorsStart.getFullYear(),
          sowOutdoorsStart.getMonth(),
          1
        ) &&
        date <= sowOutdoorsEnd) ||
      (date.getMonth() === sowOutdoorsStart.getMonth() &&
        date.getFullYear() === sowOutdoorsStart.getFullYear())
    );
  };

  const calendarMonthsOutdoors = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1);
    return (
      <div
        key={i}
        className={`calendar-month ${
          isSowingOutdoorsMonth(month.toISOString())
            ? "outdoor-sowing-month"
            : ""
        }`}
      >
        {getDateMonth(month)}
      </div>
    );
  });

  return <div className="calendar">{calendarMonthsOutdoors}</div>;
}

export default GrowthCalendarIndoors;
