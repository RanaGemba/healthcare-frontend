// ClinicPopup.js
import React, { useState } from 'react';
import axios from 'axios';

const ClinicPopup = ({ onClose, addClinic }) => {
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');

  const handleAddClinic = async () => {
    if (clinicName && clinicAddress) {
      const newClinic = { name: clinicName, address: clinicAddress };
      try {
        const response = await axios.post('http://localhost:3000/v1/api/clinic/create-new-clinic', newClinic);
        addClinic(response.data.clinic);
        setClinicName('');
        setClinicAddress('');
        onClose();
      } catch (error) {
        console.error('Error creating clinic:', error.response ? error.response.data : error.message);
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
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Clinic Name"
          className="input clinic-name"
        />
        <input
          type="text"
          value={clinicAddress}
          onChange={(e) => setClinicAddress(e.target.value)}
          placeholder="Clinic Address"
          className="input clinic-address"
        />
        <button onClick={handleAddClinic} className="button">
          Add Clinic
        </button>
      </div>
    </div>
  );
};

export default ClinicPopup;
