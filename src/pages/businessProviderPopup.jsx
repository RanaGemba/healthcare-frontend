import React, { useState } from 'react';
import axios from 'axios';

const ClinicPopup = ({ onClose, addBusinessProvider }) => {
  const [businessProviderName, setBusinessProviderName] = useState('');
  const [businessProviderAddress, setBusinessProviderAddress] = useState('');

  const handleAddBusinessProvider = async () => {
    if (businessProviderName && businessProviderAddress) {
      const newBusinessProvider = { name: businessProviderName, address: businessProviderAddress };
      try {
        const response = await axios.post('http://localhost:3000/v1/api/businessProvider/create-new-businessProvider', newBusinessProvider);
        addBusinessProvider(response.data.businessProvider);
        setBusinessProviderName('');
        setBusinessProviderAddress('');
        onClose();
      } catch (error) {
        console.error('Error creating business provider:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Clinic</h2>
        <input
          type="text"
          value={businessProviderName}
          onChange={(e) => setBusinessProviderName(e.target.value)}
          placeholder="Clinic Name"
          className="input clinic-name"
        />
        <input
          type="text"
          value={businessProviderAddress}
          onChange={(e) => setBusinessProviderAddress(e.target.value)}
          placeholder="Clinic Address"
          className="input clinic-address"
        />
        <button onClick={handleAddBusinessProvider} className="button">
          Add Clinic
        </button>
      </div>
    </div>
  );
};

export default ClinicPopup;