import React, { useState, useEffect } from 'react';
import './ClinicBusinessProvider.css';
import axios from 'axios';
import ClinicPopup from './businessProviderPopup';

const ClinicCard = ({ businessProvider }) => (
  <div className="clinic-card">
    <div className="clinic-details">
      <h3>{businessProvider.name}</h3>
      <p>{businessProvider.address}</p>
    </div>
  </div>
);

const ClinicBusinessProvider = () => {
  const [businessProviders, setBusinessProviders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchBusinessProviderData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/businessProvider/get-all-businessProvider');
        setBusinessProviders(response.data.businessProviders);
      } catch (error) {
        console.error('Error fetching business provider data:', error);
      }
    };

    fetchBusinessProviderData();
  }, []);

  const handleAddBusinessProvider = async (businessProvider) => {
    setBusinessProviders([...businessProviders, businessProvider]);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="container">
      <h1 className="heading">Business Partner Onboarding</h1>
      <div className="input-group">
        <button onClick={togglePopup} className="button1">
          Add Clinic
        </button>
      </div>

      {showPopup && (
        <ClinicPopup onClose={togglePopup} addBusinessProvider={handleAddBusinessProvider} />
      )}

      <div>
        {businessProviders && businessProviders.length > 0 ? (
          businessProviders.map((businessProvider, index) => (
            <ClinicCard key={index} businessProvider={businessProvider} />
          ))
        ) : (
          <p>No clinics available</p>
        )}
      </div>
    </div>
  );
};

export default ClinicBusinessProvider;