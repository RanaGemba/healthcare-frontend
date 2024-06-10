import React, { useState, useEffect } from 'react';
import './ClientOnboarding.css';
import axios from 'axios';
import ClinicPopup from './clinicPopup';
import ClinicCard from './clinicCard'; 

const ClientOnboarding = () => {
  const [clinics, setClinics] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/clinic/get-all-clinic');
        setClinics(response.data.clinics || []);
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    };

    fetchClinicData();
  }, []);

  const handleAddClinic = async (clinic) => {
    setClinics([...clinics, clinic]);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleUpdateClinic = async (updatedClinic) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/api/clinic/update-clinic/${updatedClinic._id}`, updatedClinic);
      // Assuming response.data.clinic is the updated clinic object
      const updatedClinics = clinics.map(clinic => clinic._id === updatedClinic._id ? response.data.clinic : clinic);
      setClinics(updatedClinics);
    } catch (error) {
      console.error('Error updating clinic:', error);
    }
  };

  const handleDeleteClinic = async (clinicId) => {
    try {
      await axios.delete(`http://localhost:3000/v1/api/clinic/delete-clinic/${clinicId}`);
      const updatedClinics = clinics.filter(clinic => clinic._id !== clinicId);
      setClinics(updatedClinics);
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Clinic Onboarding</h1>
      <div className="input-group">
        <button onClick={togglePopup} className="button1">
          Add Clinic
        </button>
      </div>

      {showPopup && (
        <ClinicPopup onClose={togglePopup} addClinic={handleAddClinic} />
      )}

      <div>
        {clinics.map((clinic, index) => (
          <ClinicCard
            key={index}
            clinic={clinic}
            onUpdate={handleUpdateClinic}
            onDelete={handleDeleteClinic}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientOnboarding;
