import React, { useState } from 'react';
import PlantPot from '../components/Garden/PlantPot';
import AddPlantForm from '../components/Garden/AddPlantForm';
import '../css/garden.css';
import grassImage from '../assets/grass.svg';
import skyImage from '../assets/sky.svg';

const GardenPage = () => {
  const [pots, setPots] = useState(Array(8).fill(''));
  const [selectedPotIndex, setSelectedPotIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  const handlePotClick = (index) => {
    setSelectedPotIndex(index);
    setIsFormVisible(true); 
  };

  const handleAddPlant = (plant) => {
    if (selectedPotIndex !== null) {
      const updatedPots = [...pots];
      updatedPots[selectedPotIndex] = plant;
      setPots(updatedPots);
      setSelectedPotIndex(null);
      setIsFormVisible(false); 
    }
  };

  const handleCancel = () => {
    setSelectedPotIndex(null);
    setIsFormVisible(false); 
  };

  return (
    <div className="garden-page">
      <img src={skyImage} alt="sky" className="sky" />
      <div className="plant-pots">
        {pots.map((plant, index) => (
          <PlantPot key={index} plant={plant} onClick={() => handlePotClick(index)} />
        ))}
        <AddPlantForm
          visible={isFormVisible}
          onAddPlant={handleAddPlant}
          onCancel={handleCancel} 
        />
      </div>
      <img src={grassImage} alt="Grass" className="grass" />
    </div>
  );
};

export default GardenPage;
