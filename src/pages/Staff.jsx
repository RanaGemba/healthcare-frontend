import React, { useState, useEffect } from 'react';
import './Staff.css'; 
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/patient/get-all-patient');
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      if (selectedPatient.needsAuthorization === 'yes') {
        setStatus('Approved');
      } else if (selectedPatient.needsAuthorization === 'no') {
        setStatus('Rejected');
      }
    }
  }, [selectedPatient]);

  const handleCardClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthorizationChange = (value) => {
    setSelectedPatient((prevState) => ({
      ...prevState,
      needsAuthorization: value,
    }));
    if (value === 'yes') {
      setStatus('Pending');
    } else if (value === 'no') {
      setStatus('Approved');
    }
  };

  const handleSubmit = async () => {
    const updatedPatient = {
      ...selectedPatient,
      status: selectedPatient.needsAuthorization === 'no' ? 'Approved' : 'Pending'
    };

    try {
      const response = await axios.put(`http://localhost:3000/v1/api/patient/update-patient/${selectedPatient?._id}`, updatedPatient);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error('Error updating patient:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeselect = () => {
    setSelectedPatient(null);
  };

  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      uploads: e.target.files[0]  
    });
  };

  return (
    <div>
      {patients ? (
        <div className="patient-cards">
          {!selectedPatient && patients.map((patient) => (
            <div
              key={patient._id}
              className={`patient-card ${selectedPatient?._id === patient._id ? 'selected' : ''}`}
              onClick={() => handleCardClick(patient)}
            >
              <h2>{patient.firstName} {patient.lastName}</h2>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Sex:</strong> {patient.sex}</p>
              <p><strong>Insurance Plan:</strong> {patient.primaryInsurancePlanName} - {patient.primaryInsuranceInsuredName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {selectedPatient && (
        <div className="patient-form">
          <div className="close-icon" onClick={handleDeselect}>X
            <i className="fas fa-times"></i>
          </div>
          <div className="section general-info">
            <h3>General Information</h3>
            <div className="form-group">
              <label>
                First Name:
                <input 
                  type="text" 
                  name="firstName"
                  value={selectedPatient.firstName} 
                  readOnly 
                />
              </label>
              <label>
                Last Name:
                <input 
                  type="text" 
                  name="lastName"
                  value={selectedPatient.lastName} 
                  readOnly 
                />
              </label>
              <label>
                Date of Birth:
                <input 
                  type="text" 
                  name="dateOfBirth"
                  value={selectedPatient.dateOfBirth} 
                  readOnly 
                />
              </label>
              <label>
                Age:
                <input 
                  type="text" 
                  name="age"
                  value={selectedPatient.age} 
                  readOnly 
                />
              </label>
              <label>
                Address:
                <input 
                  type="text" 
                  name="address"
                  value={selectedPatient.address} 
                  readOnly 
                />
              </label>
              <label>
                City:
                <input 
                  type="text" 
                  name="city"
                  value={selectedPatient.city} 
                  readOnly 
                />
              </label>
              <label>
                State:
                <input 
                  type="text" 
                  name="state"
                  value={selectedPatient.state} 
                  readOnly 
                />
              </label>
              <label>
                Phone:
                <input 
                  type="text" 
                  name="phone"
                  value={selectedPatient.phone} 
                  readOnly 
                />
              </label>
              <label>
                Email:
                <input 
                  type="text" 
                  name="email"
                  value={selectedPatient.email} 
                  readOnly 
                />
              </label>
              <label>
                Sex:
                <input 
                  type="text" 
                  name="sex"
                  value={selectedPatient.sex} 
                  readOnly 
                />
              </label>
              <label>
                Marital Status:
                <input 
                  type="text" 
                  name="maritalStatus"
                  value={selectedPatient.maritalStatus} 
                  readOnly 
                />
              </label>
              <label>
                Emergency Contact:
                <input 
                  type="text" 
                  name="emergencyContactName"
                  value={`${selectedPatient.emergencyContactName} - ${selectedPatient.emergencyContactPhone}`} 
                  readOnly 
                />
              </label>
            </div>
          </div>
          <div className="section medical-info">
            <h3>Medical Information</h3>
            <div className="form-group">
              <label>
                Insurance Plan:
                <input 
                  type="text" 
                  name="primaryInsurancePlanName"
                  value={`${selectedPatient.primaryInsurancePlanName} - ${selectedPatient.primaryInsuranceInsuredName}`} 
                  readOnly 
                />
              </label>
              <label>Uploads:
                <input type="file" name="uploads" onChange={handleFileChange} />
              </label>
              <label>
                L-Code:
                <input 
                  type="text" 
                  name="lCode"
                  value={selectedPatient.lCode || ''}
                  onChange={handleInputChange}
                  className="short-input" 
                />
              </label>
              <label>
                Product Name:
                <input 
                  type="text" 
                  name="productName"
                  value={selectedPatient.productName || ''}
                  onChange={handleInputChange}
                  className="short-input" 
                />
              </label>
              <label>
                Remarks:
                <textarea 
                  name="remarks"
                  value={selectedPatient.remarks || ''}
                  onChange={handleInputChange}
                  rows="4"
                />
              </label>
              <div className="radio-buttons">
                <label className="checkbox-label">Does this patient need authorization?</label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="needsAuthorization" 
                    value="yes" 
                    checked={selectedPatient.needsAuthorization === 'yes'} 
                    onChange={() => handleAuthorizationChange('yes')} 
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="needsAuthorization" 
                    value="no" 
                    checked={selectedPatient.needsAuthorization === 'no'} 
                    onChange={() => handleAuthorizationChange('no')} 
                  />
                  No
                </label>
              </div>
              {selectedPatient.needsAuthorization === 'yes' && (
                <label>
                  Status:
                  <input 
                    type="text" 
                    name="status"
                    value='Pending' 
                    readOnly 
                  />
                </label>
              )}
              {selectedPatient.needsAuthorization === 'no' && (
                <label>
                  Status:
                  <input 
                    type="text" 
                    name="status"
                    value="Approved" 
                    readOnly 
                  />
                </label>
              )}
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default PatientList;