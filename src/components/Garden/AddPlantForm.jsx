import React, { useState } from 'react';

const AddPlantForm = ({ visible, onAddPlant, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const plantOptions = [
    { name: 'Tomato', iconUrl: 'https://i.ibb.co/3BbZpgb/tomato.png' },
    { name: 'Carrot', iconUrl: 'https://i.ibb.co/mqrPkQb/carrot.png' },
    { name: 'Spring Onion', iconUrl: 'https://i.ibb.co/PZb5WHC/springonion.png' },
    // Add more plant options as needed
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      plantOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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
            <div className="input-container">
              <label htmlFor="plant-input" className="input-label">
                Search for a plant:
              </label>
              <input
                id="plant-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="search-input"
              />
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
              <button type="submit" className="submit-button">Add</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
          {filteredOptions.length > 0 && (
            <div className="options-container">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="option"
                  onClick={() => setInputValue(option.name)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AddPlantForm;
