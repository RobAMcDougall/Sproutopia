import React from 'react';
import potImage from '../../assets/pot.png';

const PlantPot = ({ plant, onClick }) => {


  return (
    <div className="plant-pot" onClick={onClick}>
      <img src={potImage}/>
    </div>
  );
};

export default PlantPot;

