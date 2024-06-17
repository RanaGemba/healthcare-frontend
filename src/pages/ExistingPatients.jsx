import React, { useState, useEffect } from 'react';
import './ExistingPatients.css';
import axios from "axios";
import Modal from 'react-modal';
import { FiEdit } from 'react-icons/fi'; // Import edit icon from react-icons

const PatientList = () => {
  const [patients, setPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false); // State to track edit mode

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/v1/api/patient/get-all-patient');
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setFormData({ ...patient }); // Populate form data with selected patient details
    setEditMode(false); // Initially in view mode
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = async () => {
    if (!selectedPatient || !selectedPatient._id) {
      console.error('Selected patient ID is undefined');
      return;
    }
  
    try {
      const response = await axios.put(`/v1/api/patient/update-patient/${selectedPatient._id}`, formData);
      if (response.data.success) {
        const updatedPatients = patients.map((patient) =>
          patient._id === selectedPatient._id ? response.data.patient : patient
        );
        setPatients(updatedPatients);
        closeModal();
      } else {
        console.error('Error updating patient:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating patient:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Patient List</h1>
      {patients ? (
        <div className="patient-cards">
          {patients.map((patient) => (
            <div key={patient._id} className="patient-card" onClick={() => openModal(patient)}>
              <h2>{patient.firstName} {patient.lastName}</h2>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Address:</strong> {patient.address}, {patient.city}, {patient.state}</p>
              <p><strong>Phone:</strong> {patient.phone}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Sex:</strong> {patient.sex}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onRequestClose={closeModal}
          contentLabel="Patient Details"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{editMode ? 'Edit Patient Details' : 'Patient Details'}</h2> 
                   <FiEdit className="edit-icon" onClick={toggleEditMode} />

          <div className="patient-details">
            <label>
              Clinic Name:
              <input
                name="clinicName"
                value={formData.clinicName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              First Name:
              <input
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Last Name:
              <input
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Date of Birth:
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Age:
              <input
                name="age"
                value={formData.age || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Address:
              <input
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              City:
              <input
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              State:
              <input
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Zip Code:
              <input
                name="zipcode"
                value={formData.zipcode || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Phone:
              <input
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Sex:
              <input
                name="sex"
                value={formData.sex || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Marital Status:
              <input
                name="maritalStatus"
                value={formData.maritalStatus || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              SSN:
              <input
                name="ssn"
                value={formData.ssn || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Emergency Contact Name:
              <input
                name="emergencyContactName"
                value={formData.emergencyContactName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Emergency Contact Phone:
              <input
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Primary Insurance Plan Name:
              <input
                name="primaryInsurancePlanName"
                value={formData.primaryInsurancePlanName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Secondary Insurance Plan Name:
              <input
                name="secondaryInsurancePlanName"
                value={formData.secondaryInsurancePlanName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label>
              Client Name:
              <input
                name="clientName"
                value={formData.clientName || ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
          </div>
          <div className="modal-buttons">
           
            {editMode && (
              <button  onClick={handleUpdate}>Save Changes</button>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PatientList;