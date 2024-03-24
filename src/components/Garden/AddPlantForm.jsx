import React, { useState, useRef, useEffect } from 'react';

const AddPlantForm = ({ visible, onAddPlant, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const plantOptions = [
    { id: 1, plant_id: 1, name: 'Tomato1', iconUrl: 'https://i.ibb.co/3BbZpgb/tomato.png' },
    { id: 2, plant_id: 1, name: 'Tomato2', iconUrl: 'https://i.ibb.co/3BbZpgb/tomato.png' },
    { id: 3, plant_id: 2, name: 'Carrot', iconUrl: 'https://i.ibb.co/mqrPkQb/carrot.png' },
    { id: 4, plant_id: 3, name: 'Spring Onion', iconUrl: 'https://i.ibb.co/PZb5WHC/springonion.png' },
  ];

  const optionsRef = useRef(null);

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
    setSelectedDate(e.target.value);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setShowOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPlant = filteredOptions.find(option => option.name.toLowerCase() === inputValue.toLowerCase());
    if (selectedPlant) {
      onAddPlant({ ...selectedPlant, plantedDate: selectedDate });
      setInputValue('');
      setSelectedDate('');
      setFilteredOptions([]);
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
