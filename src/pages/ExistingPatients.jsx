import React, { useState, useEffect } from 'react';
import './ExistingPatients.css'; 
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState(null);

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

  useEffect(() => {
    if (patients) {
      console.log(patients);
    }
  }, [patients]);

  return (
    <div >
      <h1>Patient List</h1>
      {patients ? (
        <div className="patient-cards">
          {patients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <h2>{patient.firstName} {patient.lastName}</h2>
              <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Address:</strong> {patient.address}, {patient.city}, {patient.state}</p>
              <p><strong>Phone:</strong> {patient.phone}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Sex:</strong> {patient.sex}</p>
              <p><strong>Marital Status:</strong> {patient.maritalStatus}</p>
              <p><strong>Emergency Contact:</strong> {patient.emergencyContactName} - {patient.emergencyContactPhone}</p>
              <p><strong>Insurance Plan:</strong> {patient.primaryInsurancePlanName} - {patient.primaryInsuranceInsuredName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientList;
