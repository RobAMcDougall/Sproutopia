import { useState } from "react";
import AddPlantForm from "../components/Garden/AddPlantForm";
import PlantPot from "../components/Garden/PlantPot";
import ToDoList from "../components/Garden/ToDoList";
import WeatherWidget from "../components/Garden/WeatherWidget";
import '../css/garden.css'

const GardenPage = () => {
    const [pots, setPots] = useState(Array(8).fill(''));

    const [selectedPotIndex, setSelectedPotIndex] = useState(null);

    const handlePotClick = (index) => {
      setSelectedPotIndex(index);
    };

    const handleAddPlant = (plant) => {
      if (selectedPotIndex !== null) {
        const updatedPots = [...pots];
        updatedPots[selectedPotIndex] = plant;
        setPots(updatedPots);
        setSelectedPotIndex(null); 
      }
    };
  
    return (
      <div className="garden-page">
        <div className="plant-pots">
          {pots.map((plant, index) => (
            <PlantPot key={index} plant={plant} onClick={() => handlePotClick(index)} />
          ))}
          <AddPlantForm 
            visible={selectedPotIndex !== null} 
            onAddPlant={handleAddPlant} 
          />
        </div>
          <ToDoList />
          <WeatherWidget />
      </div>
    );
};

export default GardenPage;