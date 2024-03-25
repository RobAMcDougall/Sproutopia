import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlantForm from '../components/Garden/AddPlantForm/AddPlantForm';
import '../css/garden.css';
import grassImage from '../assets/grass.svg';
import skyImage from '../assets/sky.svg';
import potImage from '../assets/pot.svg';
import ToDoList from '../components/Garden/ToDoList/ToDoList';
import WeatherWidget from '../components/Garden/WeatherWidget/WeatherWidget';

const GardenPage = () => {
  const [pots, setPots] = useState(Array(8).fill(null));
  const [plants, setPlants] = useState([]);
  const [plantedVeg, setPlantedVeg] = useState([]);
  const [selectedPotIndex, setSelectedPotIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [potOptionsVisible, setPotOptionsVisible] = useState(Array(8).fill(false));
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePlantId, setDeletePlantId] = useState(null);
  const [animationCoordinates, setAnimationCoordinates] = useState(null);
  const menuRefs = useRef(Array(8).fill(null));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch planted vegetables
    fetchPlantedVegetables();
  }, []);

  const fetchPlantedVegetables = async () => {
    try {
      const response = await fetch('http://localhost:3000/plants/user/2');
      if (!response.ok) {
        throw new Error('Failed to fetch planted vegetables');
      }
      const plantedVegetables = await response.json();
      // For each planted vegetable, fetch plant information
      const plantsData = await Promise.all(
        plantedVegetables.map(async (plantedVeg) => {
          const plantResponse = await fetch(`http://localhost:3000/plants/${plantedVeg.plant_id}`);
          const plantData = await plantResponse.json();
          return {
            ...plantedVeg,
            ...plantData
          };
        })
      );
      setPlants(plantsData);
      setPlantedVeg(plantedVegetables)
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

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
    if (!plants[index]) {
      setIsFormVisible(true);
    } else {
      setPotOptionsVisible((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleWater = (plantId, index) => {
    console.log('Plant watered with ID', plantId);
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
    console.log('Harvested plant with ID', plantId);
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
    const updatedPlants = plants.map((plant) => {
      if (plant && plant.id === deletePlantId) {
        return null;
      }
      return plant;
    });
    setPlants(updatedPlants);

    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddPlant = async (plant, date) => {
    try {
        const response = await fetch(`http://localhost:3000/plants/user/2/${plant.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain' 
            },
            body: date 
        });
        if (!response.ok) {
            throw new Error('Failed to add plant');
        }
        console.log("Plant added:", plant, "Date:", date);
        const updatedPlants = [...plants];
        updatedPlants[selectedPotIndex] = plant;
        setPlants(updatedPlants);
        setSelectedPotIndex(null);
        setIsFormVisible(false);
    } catch (error) {
        console.error('Error adding plant:', error);
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
      <ToDoList />
      <WeatherWidget />
      <img src={skyImage} alt="sky" className="sky" />
      <div className="plant-pots">
        {pots.map((_, index) => (
          <div key={index} className="plant-pot-container">
            <div className="plant-pot" id={`pot-${index}`} onClick={() => handlePotClick(index)}>
              <img src={potImage} alt="Pot" />
              {plants[index] && <img className="vegetable-overlay" src={plants[index].icon_url} alt={plants[index].name} />}
            </div>
            {potOptionsVisible[index] && (
              <div ref={(el) => (menuRefs.current[index] = el)} className="pot-choices">
                <div className="left-options">
                  <div className="water-choice option" onClick={() => handleWater(plantedVeg[index].id, index)}>
                    Water
                  </div>
                  <div className="edit-choice option" onClick={() => handleEdit(plants[index].id)}>
                    Harvest
                  </div>
                </div>
                <div className="right-options">
                  <div className="info-choice option" onClick={() => handlePlantInfo(plants[index].id)}>
                    Details
                  </div>
                  <div className="delete-choice option" onClick={() => handleDelete(plantedVeg[index].id, index)}>
                    Remove
                  </div>
                </div>
              </div>
            )}
            {animationCoordinates && animationCoordinates.top && animationCoordinates.left && (
              <WateringCanAnimation coordinates={animationCoordinates} />
            )}
          </div>
        ))}
        <AddPlantForm visible={isFormVisible} onAddPlant={handleAddPlant} onCancel={handleCancel} />
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
