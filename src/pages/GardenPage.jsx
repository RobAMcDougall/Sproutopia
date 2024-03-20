import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlantForm from '../components/Garden/AddPlantForm';
import '../css/garden.css';
import grassImage from '../assets/grass.svg';
import skyImage from '../assets/sky.svg';
import potImage from '../assets/pot.svg';

const GardenPage = () => {
  const [pots, setPots] = useState(() => {
    const storedPots = localStorage.getItem('pots');
    return storedPots ? JSON.parse(storedPots) : Array(8).fill(null);
  });
  const [selectedPotIndex, setSelectedPotIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [potOptionsVisible, setPotOptionsVisible] = useState(Array(8).fill(false));
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePlantId, setDeletePlantId] = useState(null);
  const menuRefs = useRef(Array(8).fill(null));

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('pots', JSON.stringify(pots));
  }, [pots]);

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

  const handleWater = (plantId) => {
    console.log("Plant watered with ID", plantId);
    closeMenu();
    // Perform water action based on plantId
  };

  const handleEdit = (plantId) => {
    console.log("Edit plant with ID", plantId);
    closeMenu();
    // Perform edit action based on plantId
  };

  const handlePlantInfo = (plantId) => {
    navigate(`/plant/${plantId}`);
    closeMenu();
    // Navigate to plant details page based on plantId
  };

  const handleDelete = (plantId) => {
    setShowDeleteConfirmation(true);
    setDeletePlantId(plantId);
    closeMenu();
    // Set plant ID for deletion confirmation
  };

  const confirmDelete = () => {
    const updatedPots = pots.map(plant => {
      if (plant && plant.id === deletePlantId) {
        return null; // Remove only the plant with the matching ID
      }
      return plant;
    });
    setPots(updatedPots);

    setShowDeleteConfirmation(false);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
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

  const closeMenu = () => {
    setPotOptionsVisible(Array(8).fill(false));
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
              <div
                ref={el => (menuRefs.current[index] = el)}
                className="pot-choices"
              >
                <div className="left-options">
                  <div className="water-choice option" onClick={() => handleWater(plant.id)}>Water</div>
                  <div className="edit-choice option" onClick={() => handleEdit(plant.plant_id)}>Edit</div>
                </div>
                <div className="right-options">
                  <div className="info-choice option" onClick={() => handlePlantInfo(plant.id)}>Details</div>
                  <div className="delete-choice option" onClick={() => handleDelete(plant.id)}>Remove</div>
                </div>
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
      {showDeleteConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <p>Are you sure you want to remove this plant?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GardenPage;
