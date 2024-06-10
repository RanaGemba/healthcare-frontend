import React, { useState, useEffect } from 'react';
import './Insurance.css';

const Insurance = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [newInsurance, setNewInsurance] = useState({
    InsuranceName: '',
    InsuranceType: '',
    Description: '',
    InsuranceProvider: ''
  });

  const token = localStorage.getItem('token');
  console.log(token)

  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  const fetchInsuranceData = async () => {
    try {
      const response = await fetch('/v1/api/insurance/get-all-insurance');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched insurance data:', data.insurances); 
        setInsuranceData(data.insurances);
      } else {
        throw new Error('Failed to fetch insurance data');
      }
    } catch (error) {
      console.error('Error fetching insurance data:', error);
      setMessage('Error fetching insurance data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInsurance(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/v1/api/insurance/create-new-insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInsurance),
      });
      if (response.ok) {
        setMessage('Insurance data saved successfully');
        // Refresh the page
        window.location.reload();
      } else {
        throw new Error('Failed to save insurance data');
      }
    } catch (error) {
      console.error('Error saving insurance data:', error);
      setMessage('Error saving insurance data');
    }
  };

  const handleAddRow = () => {
    setShowAddForm(true);
  };

  return (
    <div className="insurance-container">
      <h1>Insurance List</h1>
      <table className="insurance-table">
        <thead>
          <tr>
            <th>Insurance Name</th>
            <th>Insurance Type</th>
            <th>Description</th>
            <th>Insurance Provider</th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.map((insurance, index) => (
            <tr key={index}>
              <td>{insurance.InsuranceName}</td>
              <td>{insurance.InsuranceType}</td>
              <td>{insurance.Description}</td>
              <td>{insurance.InsuranceProvider}</td>
            </tr>
          ))}
          {showAddForm && (
            <tr>
              <td>
                <input
                  type="text"
                  name="InsuranceName"
                  placeholder="Insurance Name"
                  value={newInsurance.InsuranceName}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="InsuranceType"
                  placeholder="Insurance Type"
                  value={newInsurance.InsuranceType}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Description"
                  placeholder="Description"
                  value={newInsurance.Description}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="InsuranceProvider"
                  placeholder="Insurance Provider"
                  value={newInsurance.InsuranceProvider}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="submit-button" onClick={handleAddRow}>Add Row</button>     
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Insurance;