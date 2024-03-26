import React, { useState, useRef, useEffect } from 'react';

const AddPlantForm = ({ visible, onAddPlant, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [plantOptions, setPlantOptions] = useState([]);
  const optionsRef = useRef(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:3000/plants/all');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const plants = await response.json();
      setPlantOptions(plants);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      plantOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowOptions(true);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setShowOptions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPlant = filteredOptions.find(option => option.name.toLowerCase() === inputValue.toLowerCase());
    if (selectedPlant) {
      try {
        await onAddPlant(selectedPlant, selectedDate);
        setInputValue('');
        setSelectedDate('');
        setFilteredOptions([]);
      } catch (error) {
        console.error('Error adding plant:', error);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    setInputValue('');
    setSelectedDate('');
    setFilteredOptions([]);
  };

  return (
    visible && (
      <div className="popup-container">
        <div className="popup-content">
          <form onSubmit={handleSubmit}>
            <div className='form-title'>
              Add a plant to your pot!
            </div>
            <div className="input-container">
              <label htmlFor="plant-input" className="input-label">
                Search for a plant:
              </label>
              <div className="search-container">
                <input
                  id="plant-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="search-input"
                />
                {showOptions && filteredOptions.length > 0 && (
                  <div ref={optionsRef} className="options-container">
                    {filteredOptions.map((option, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="date-input" className="input-label">
                Date planted:
              </label>
              <input
                id="date-input"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-input"
              />
            </div>
            <div className="button-container">
              <button className="submit-button">Add</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPlantForm;
