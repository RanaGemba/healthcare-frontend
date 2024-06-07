import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ClientOnboarding.css';

const ClinicCard = ({ clinic, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [clinicName, setClinicName] = useState(clinic.name);
  const [clinicAddress, setClinicAddress] = useState(clinic.address);
  const [doctorName, setDoctorName] = useState('');
  const [doctorDesignation, setDoctorDesignation] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!clinic._id) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/v1/api/doctor/get-all-doctor/${clinic._id}`);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [clinic._id]);

  const handleAddDoctor = async () => {
    if (!clinic._id || !doctorName || !doctorDesignation) {
      return;
    }
    const newDoctor = { name: doctorName, designation: doctorDesignation };
    try {
      const response = await axios.post(`http://localhost:3000/v1/api/doctor/create-new-doctor/${clinic._id}`, newDoctor);
      setDoctors([...doctors, response.data.doctor]);
    } catch (error) {
      console.error('Error creating doctor:', error.response ? error.response.data : error.message);
    }
    setDoctorName('');
    setDoctorDesignation('');
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleUpdateClinic = async () => {
    try {
      const updatedClinic = { ...clinic, name: clinicName, address: clinicAddress };
      await onUpdate(updatedClinic);
      setEditing(false);
    } catch (error) {
      console.error('Error updating clinic:', error);
    }
  };

  const handleCancelEdit = () => {
    setClinicName(clinic.name);
    setClinicAddress(clinic.address);
    setEditing(false);
  };

  const handleDeleteClinic = async () => {
    try {
      await onDelete(clinic._id);
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <div className="clinic-card">
      <div className="clinic-details">
        {editing ? (
          <>
            <input
              type="text"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Clinic Name"
              className="clinic-input"
            />
            <input
              type="text"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              placeholder="Clinic Address"
              className="clinic-input"
            />
            <div className="icon-group">
              <FontAwesomeIcon icon={faCheck} onClick={handleUpdateClinic} className="edit-icon" />
              <FontAwesomeIcon icon={faTimes} onClick={handleCancelEdit} className="delete-icon" />
            </div>
          </>
        ) : (
          <>
            <h3>{clinic.name}</h3>
            <p>{clinic.address}</p>
            <div className="icon-group">
              <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} className="edit-icon" />
              <FontAwesomeIcon icon={faTrashAlt} onClick={handleDeleteClinic} className="delete-icon" />
            </div>
          </>
        )}
      </div>
      <div className="doctor-section">
        <div className="doctor-form">
          <h4>Doctors</h4>
          <div>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Doctor Name"
              className="doctor-input"
            />
            <input
              type="text"
              value={doctorDesignation}
              onChange={(e) => setDoctorDesignation(e.target.value)}
              placeholder="Designation"
              className="doctor-input"
            />
            <button onClick={handleAddDoctor} className="add-doctor-button">
              Add Doctor
            </button>
          </div>
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-list">
              <strong>{doctor.name}</strong> - {doctor.designation}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
