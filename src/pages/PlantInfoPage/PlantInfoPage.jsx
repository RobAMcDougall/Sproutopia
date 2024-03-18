import React from "react";
import "./index.css";
const PlantInfoPage = () => {
  return (
    <div className="plant-info-container">
      <div className="plant-name col-1">Beans (Bush Snap)</div>
      <div className="latin-name col-1">Phaseolus vulgaris</div>
      <div className="plant-image col-1">
        <img
          src="https://harvesttotable.com/wp-content/uploads/2009/03/Beans-French-beans-harvest-1.jpg"
          className="plant-info-img"
        />
      </div>
      <div className="description col-2">
        Phaseolus vulgaris, commonly known as common beans or green beans, are
        versatile annual plants offering delicious flavor and nutritional
        richness to gardens. With options like bush or pole varieties, they suit
        various garden sizes and preferences. Packed with essential nutrients,
        they're a rewarding addition to any plate and a favourite among
        gardeners of all levels.
      </div>
      <div className="info-container col-2">
        <div className="info-label">Season:</div>
        <div className="info-value">Warm</div>
        <div className="info-label">Soil:</div>
        <div className="info-value">Average, well drained soil</div>
        <div className="info-label">Position:</div>
        <div className="info-value">Sunny</div>
        <div className="info-label">Watering frequency:</div>
        <div className="info-value">Roughly every 3 days</div>
        <div className="info-label">Harvesting:</div>
        <div className="info-value">
          Gather pods before they fill with seeds. When picked often, many
          varieties continue to produce for up to a month.
        </div>
        <div className="info-label">Sow & Plant:</div>
        <div className="info-value">
          Plant seeds 2 inches deep and 6 inches apart in late spring, after the
          last frost has passed and the soil is warm. Make additional sowings
          until midsummer.
        </div>
        <div className="info-label">Germination:</div>
        <div className="info-value">4-10 days</div>
        <div className="info-label">Storage:</div>
        <div className="info-value">
          Can be kept fresh for at least 4 days, or blanched and frozen
          immediately after harvesting
        </div>
        <div className="info-label">Growth calendar:</div>
        <div className="info-value">Growth calendar</div>
      </div>
    </div>
  );
};

export default PlantInfoPage;
