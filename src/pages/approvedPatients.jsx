import React, { useState, useEffect } from 'react';
import './InsuranceVerification.css';
import axios from 'axios';

const ApprovedPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPatientsData();
  }, []);

  const fetchPatientsData = async () => {
    try {
      const response = await fetch('/v1/api/patient/get-all-patient');
      if (response.ok) {
        const data = await response.json();
        const filteredPatients = data.patients.filter(patient => patient.needsAuthorization && patient.needsAuthorization.toLowerCase() === 'no');
        setPatientsData(filteredPatients);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Failed to fetch patients data');
      }
    } catch (error) {
      console.error('Error fetching patients data:', error);
      setMessage('Error fetching patients data: ' + error.message);
    }
  };

  const handleCardClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleClosePopup = () => {
    setSelectedPatient(null);
    setShowConfirmation(false);
    setRejectionReason('');
  };

  return (
    <div>
      <h2>Approved Patients </h2>
      <div className="patients-list">
        {patientsData.length === 0 && <p>No patients awaiting authorization.</p>}
        {patientsData.map((patient) => (
          <div key={patient._id} className="patient-tile" onClick={() => handleCardClick(patient)}>
            <h2>{patient.firstName} {patient.lastName}</h2>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Sex:</strong> {patient.sex}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Insurance Plan:</strong> {patient.primaryInsurancePlanName} - {patient.primaryInsuranceInsuredName}</p>
          </div>
        ))}
      </div>

      {selectedPatient && (
        <div className="patient-form">
          <span className="close-icon" onClick={handleClosePopup}>X</span>
          <h3>General Information</h3>
          <div className="section general-info">
            <div className="form-group">
              <label>
                Name:
                <input type="text" value={`${selectedPatient.firstName} ${selectedPatient.lastName}`} readOnly />
              </label>
              <label>
                Age:
                <input type="text" value={selectedPatient.age} readOnly />
              </label>
              <label>
                Email:
                <input type="text" value={selectedPatient.email} readOnly />
              </label>
              <label>
                Sex:
                <input type="text" value={selectedPatient.sex} readOnly />
              </label>
              <label>
                Marital Status:
                <input type="text" value={selectedPatient.maritalStatus} readOnly />
              </label>
              <label>
                Emergency Contact:
                <input type="text" value={`${selectedPatient.emergencyContactName} - ${selectedPatient.emergencyContactPhone}`} readOnly />
              </label>
            </div>
          </div>

          <h3>Medical Information</h3>
          <div className="section medical-info">
            <div className="form-group">
             
              <label>
                L-Code:
                <input type="text" value={selectedPatient.lCode || ''} readOnly />
              </label>
              <label>
                Product Name:
                <input type="text" value={selectedPatient.productName || ''} readOnly />
              </label>
              <label>
                Remarks:
                <textarea value={selectedPatient.remarks || ''} readOnly rows="4" />
              </label>
              <div className="radio-buttons">
                <label className="checkbox-label">Does this patient need authorization?</label>
                <label className="radio-label">
                  <input type="radio" value="yes" checked={selectedPatient.needsAuthorization === 'yes'} readOnly />
                  Yes
                </label>
                <label className="radio-label">
                  <input type="radio" value="no" checked={selectedPatient.needsAuthorization === 'no'} readOnly />
                  No
                </label>
              </div>
              {selectedPatient.needsAuthorization === 'yes' && (
                <label>
                  Status:
                  <input type="text" value="Pending" readOnly />
                </label>
              )}
              {selectedPatient.needsAuthorization === 'no' && (
                <label>
                  Status:
                  <input type="text" value="Approved" readOnly />
                </label>
              )}
            </div>
          </div>

          <h3>Insurance</h3>
          <div className="section medical-info">
            <div className="form-group">
              <label>
                Primary Insurance Plan:
                <input type="text" value={`${selectedPatient.primaryInsurancePlanName} `} readOnly />
              </label>
              <label>
                Secondary Insurance Plan:
                <input type="text" value={`${selectedPatient.secondaryInsurancePlanName} `} readOnly />
              </label>
              <label>
                Remarks:
                <textarea value={selectedPatient.remarks || ''} readOnly rows="4" />
              </label>
            </div>
          </div>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ApprovedPatients;
