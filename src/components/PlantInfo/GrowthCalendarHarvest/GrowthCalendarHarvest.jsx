import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../GrowthCalendar.css";

function GrowthCalendarHarvest() {
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


  const isHarvestMonth = dateString => {
    const date = new Date(dateString);
    const harvestStart = new Date(plant.harvest_start);
    const harvestEnd = new Date(plant.harvest_end);

   
    return (
      (date >=
        new Date(harvestStart.getFullYear(), harvestStart.getMonth(), 1) &&
        date <= harvestEnd) ||
      (date.getMonth() === harvestStart.getMonth() &&
        date.getFullYear() === harvestStart.getFullYear())
    )
  };

  const calendarMonthsHarvest = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1);
    return (
      <div
        key={i}
        className={`calendar-month ${
          isHarvestMonth(month.toISOString()) ? "harvest-month" : ""
        }`}
      >
        {getDateMonth(month)}
      </div>
    );
  });
  return <div className="calendar">{calendarMonthsHarvest}</div>;
}

export default GrowthCalendarHarvest;
