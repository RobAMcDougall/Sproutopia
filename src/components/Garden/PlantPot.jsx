import React from 'react';
import potImage from '../../assets/pot.svg';

const PlantPot = ({ plant, onClick }) => {
  // Extract the image URL and name from the plant object
  const { name, iconUrl } = plant || {};

  return (
    <div className="plant-pot" onClick={onClick}>
      <img src={potImage} alt="Pot" />
      {iconUrl && <img className="vegetable-overlay" src={iconUrl} alt={name} />}
    </div>
  );
};

export default PlantPot;
