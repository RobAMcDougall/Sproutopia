import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
const PlantInfoPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState({});

  useEffect(() => {
    async function displayPlant() {
      const response = await fetch(
        `https://sproutopia-backend.onrender.com/plants/${id}`
      );
      const rawData = await response.json();
      setPlant(rawData);
      console.log(rawData);
    }

    displayPlant();
  }, []);

  return (
    <div className="plant-info-container">
      <div className="plant-name col-1">{plant.name}</div>
      <div className="latin-name col-1">{plant.latin_name}</div>
      <div className="plant-image col-1">
        <img src={plant.image_url} alt="{plant.name}" />
      </div>
      <div className="description col-2">{plant.description}</div>
      <div className="info-container col-2">
        <div className="info-label">Season:</div>
        <div className="info-value">{plant.season}</div>
        <div className="info-label">Soil:</div>
        <div className="info-value">{plant.soil}</div>
        <div className="info-label">Harvesting:</div>
        <div className="info-value">{plant.harvesting}</div>
        <div className="info-label">Watering frequency:</div>
        <div className="info-value">
          Roughly every {plant.watering_freq} days
        </div>
        <div className="info-label">Sow & Plant:</div>
        <div className="info-value">{plant.sow_and_plant_info}</div>
        <div className="info-label">Germination:</div>
        <div className="info-value">
          {plant.germination_min}-{plant.germination_max} days
        </div>
        <div className="info-label">Storage:</div>
        <div className="info-value">{plant.storage}</div>
        <div className="info-label">Growth calendar:</div>
        <div className="info-value">Growth calendar</div>
      </div>
    </div>
  );
};

export default PlantInfoPage;
