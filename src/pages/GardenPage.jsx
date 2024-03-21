import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlantForm from '../components/Garden/AddPlantForm';
import '../css/garden.css';
import grassImage from '../assets/grass.svg';
import skyImage from '../assets/sky.svg';
import potImage from '../assets/pot.svg';
import ToDoList from '../components/Garden/ToDoList';
import WeatherWidget from '../components/Garden/WeatherWidget';

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
  const [animationCoordinates, setAnimationCoordinates] = useState(null);
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

  const handleWater = (plantId, index) => {
    console.log("Plant watered with ID", plantId);
    closeMenu();
    const potElement = document.querySelector(`#pot-${index}`);
    const potRect = potElement.getBoundingClientRect();
    setAnimationCoordinates({
      top: potRect.top + window.scrollY,
      left: potRect.left + window.scrollX,
    });
    setTimeout(() => {
      setAnimationCoordinates(null);
    }, 1500); 
  };
  

  const handleEdit = (plantId) => {
    console.log("Harvested plant with ID", plantId);
    closeMenu();
  };

  const handlePlantInfo = (plantId) => {
    navigate(`/plant/${plantId}`);
    closeMenu();
  };

  const handleDelete = (plantId) => {
    setShowDeleteConfirmation(true);
    setDeletePlantId(plantId);
    closeMenu();
  };

  const confirmDelete = () => {
    const updatedPots = pots.map(plant => {
      if (plant && plant.id === deletePlantId) {
        return null;
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
    <ToDoList/>
    <WeatherWidget/>
      <img src={skyImage} alt="sky" className="sky" />
      <div className="plant-pots">
        {pots.map((plant, index) => (
          <div key={index} className="plant-pot-container">
            <div className="plant-pot" id={`pot-${index}`} onClick={() => handlePotClick(index)}>
              <img src={potImage} alt="Pot" />
              {plant && <img className="vegetable-overlay" src={plant.iconUrl} alt={plant.name} />}
            </div>
            {potOptionsVisible[index] &&
              <div
                ref={el => (menuRefs.current[index] = el)}
                className="pot-choices"
              >
                <div className="left-options">
                  <div className="water-choice option" onClick={() => handleWater(plant.id, index)}>Water</div>
                  <div className="edit-choice option" onClick={() => handleEdit(plant.id)}>Harvest</div>
                </div>
                <div className="right-options">
                  <div className="info-choice option" onClick={() => handlePlantInfo(plant.id)}>Details</div>
                  <div className="delete-choice option" onClick={() => handleDelete(plant.id)}>Remove</div>
                </div>
              </div>
            }
            {animationCoordinates && animationCoordinates.top && animationCoordinates.left && (
              <WateringCanAnimation coordinates={animationCoordinates} />
            )}
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

const WateringCanAnimation = ({ coordinates }) => (
  <div className="watering-can-animation" style={{ top: coordinates.top, left: coordinates.left }}>
    <div className="watering-can"></div>
  </div>
);


export default GardenPage;
