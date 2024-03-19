import React, { useState, useEffect, useRef } from 'react';
import AddPlantForm from '../components/Garden/AddPlantForm'; // Assuming this is the correct import path
import '../css/garden.css'; // Assuming this is the correct import path
import grassImage from '../assets/grass.svg';
import skyImage from '../assets/sky.svg';
import potImage from '../assets/pot.svg';

const GardenPage = () => {
  const [pots, setPots] = useState(Array(8).fill(''));
  const [selectedPotIndex, setSelectedPotIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [potOptionsVisible, setPotOptionsVisible] = useState(Array(8).fill(false));
  const menuRefs = useRef(Array(8).fill(null));

  useEffect(() => {
    const handleOutsideClick = (event) => {
      menuRefs.current.forEach((menuRef, index) => {
        if (menuRef && !menuRef.contains(event.target)) {
          setPotOptionsVisible(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
          });
        }
      });
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handlePotClick = (index) => {
    setSelectedPotIndex(index);
    if (pots[index]) {
      setPotOptionsVisible(prevState => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    } else {
      setIsFormVisible(true);
    }
  };

  const handleWater = (index) => {
    // Add functionality to water the plant at index
    console.log("Plant watered at index", index);
  };

  const handleEdit = (index) => {
    // Add functionality to edit the plant at index
    console.log("Edit plant at index", index);
  };

  const handlePlantInfo = (index) => {
    // Add functionality to navigate to plant info page for the plant at index
    console.log("Navigate to plant info page for plant at index", index);
  };

  const handleDelete = (index) => {
    // Add functionality to delete the plant at index
    console.log("Delete plant at index", index);
    const updatedPots = [...pots];
    updatedPots[index] = '';
    setPots(updatedPots);
    setPotOptionsVisible(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
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
          <div key={index} className="plant-pot-container">
            <div className="plant-pot" onClick={() => handlePotClick(index)}>
              <img src={potImage} alt="Pot" />
              {plant && <img className="vegetable-overlay" src={plant.iconUrl} alt={plant.name} />}
            </div>
            {potOptionsVisible[index] &&
              <div ref={el => (menuRefs.current[index] = el)} className="pot-choices">
                <div className="water-choice" onClick={() => handleWater(index)}>Water</div>
                <div className="edit-choice" onClick={() => handleEdit(index)}>Edit</div>
                <div className="info-choice" onClick={() => handlePlantInfo(index)}>Plant Info</div>
                <div className="delete-choice" onClick={() => handleDelete(index)}>Delete</div>
              </div>
            }
          </div>
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
