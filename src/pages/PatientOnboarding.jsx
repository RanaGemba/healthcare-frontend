import React, { useState, useEffect } from 'react';
import './PatientOnboarding.css'; 
import { Country, State, City } from 'country-state-city';
import axios from 'axios';

const PatientRegistrationForm = () => {
  const [businessProviders, setBusinessProviders] = useState([]);
  const [insurances, setInsurances] = useState([]); 
  const [clientStaffs, setClientStaffs] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    todaysDate: new Date().toISOString().substr(0, 10),  
    clinicName: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    email: '',
    sex: '',
    maritalStatus: '',
    ssn: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    primaryInsurancePlanName: '',
    secondaryInsurancePlanName: '',
    clientName: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [businessProviderRes, insuranceRes, clientStaffRes] = await Promise.all([
          axios.get('/v1/api/businessProvider/get-all-businessProvider'),
          axios.get('/v1/api/insurance/get-all-insurance'),
          axios.get('/v1/api/adminUser/get-all-adminUser')
        ]);

        setBusinessProviders(businessProviderRes.data.businessProviders);
        setInsurances(insuranceRes.data.insurances);
        setClientStaffs(clientStaffRes.data.adminUsers.filter(user => user.role === "ClientStaff"));

        const usStates = State.getStatesOfCountry('US');
        setStates(usStates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'state') {
      const citiesOfState = City.getCitiesOfState('US', value);
      setCities(citiesOfState);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/v1/api/patient/create-new-patient', formData);
      console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error('Error creating patient:', error.response ? error.response.data : error.message);
    }
  };
  const [primaryInsuranceCard, setPrimaryInsuranceCard] = useState(null);
  const [secondaryInsuranceCard, setSecondaryInsuranceCard] = useState(null);
  const [idCard, setIdCard] = useState(null);

  // Additional change handlers for file uploads
  const handlePrimaryInsuranceCardChange = (e) => {
    setPrimaryInsuranceCard(e.target.files[0]);
  };

  const handleSecondaryInsuranceCardChange = (e) => {
    setSecondaryInsuranceCard(e.target.files[0]);
  };

  const handleIdCardChange = (e) => {
    setIdCard(e.target.files[0]);
  };

  return (
    <div className="container">
      <h4 className="heading">Patient Registration Form</h4>
      <form className="form" onSubmit={handleSubmit}>
        <div className="section">
          <h5 className="section-header">General Information</h5>
          <div className="form-group">
            <div className="input-field">
              <label>Date (MM/DD/YYYY)</label>
              <input type="date" name="todaysDate" value={formData.todaysDate} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Clinic Name</label>
              <select name="clinicName" value={formData.clinicName} onChange={handleChange}>
                <option value="">Select Clinic</option>
                {businessProviders.map((provider) => (
                  <option key={provider.id} value={provider.name}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="section">
          <h5 className="section-header">Patient Information</h5>
          <div className="form-group">
            <div className="input-field">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>
          </div>

          <label className="address-label">Address</label>
          <input type="text" name="address" className="address-input" value={formData.address} onChange={handleChange} />

          <div className="form-group">
            <div className="input-field">
              <label>State</label>
              <select name="state" value={formData.state} onChange={handleChange}>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <label>City</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <label>Zip-Code</label>
              <input type="tel" name="zipcode" value={formData.zipcode} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Phone No.</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            
          
          </div>
          <div className="form-group">
            
            <div className="input-field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Sex</label>
              <select name="sex" value={formData.sex} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="input-field">
              <label>Marital Status</label>
              <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
            </div>
          
          </div>
          <div className="input-field">
            <label>Upload ID</label>
            <input type="file" accept="image/*" onChange={handleIdCardChange} />
          </div>
        </div>

        <div className="section">
          <h5 className="section-header">Additional Information</h5>
          <div className="form-group">
           
            <div className="input-field">
              <label>SSN</label>
              <input type="tel" name="ssn" value={formData.ssn} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Client Staff Name</label>
              <select name="clientName" value={formData.clientName} onChange={handleChange}>
                <option value="">Select Client Staff</option>
                {clientStaffs.map((staff) => (
                  <option key={staff.id} value={staff.name}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="input-field">
              <label>Emergency Contact Name</label>
              <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
            </div>
            <div className="input-field">
              <label>Emergency Contact No</label>
              <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="section">
          <h5 className="section-header">Insurance Information</h5>
          <div className="form-group">
            <div className="input-field">
              <label>Primary Insurance Plan Name</label>
              <select name="primaryInsurancePlanName" value={formData.primaryInsurancePlanName} onChange={handleChange}>
                <option value="">Select Insurance Plan</option>
                {insurances.map((insurance) => (
                  <option key={insurance._id} value={insurance.InsuranceName}>
                    {insurance.InsuranceName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <label>Secondary Insurance Plan Name</label>
              <input type="text" name="secondaryInsurancePlanName" value={formData.secondaryInsurancePlanName} onChange={handleChange} />
            </div>

          </div>
           <div className="form-group">
           <div className="input-field">
            <label>Upload Primary Insurance Card</label>
            <input type="file" accept="image/*" onChange={handlePrimaryInsuranceCardChange} />
          </div>
          
          <div className="input-field">
            <label>Upload Secondary Insurance Card</label>
            <input type="file" accept="image/*" onChange={handleSecondaryInsuranceCardChange} />
          </div>
           </div>
           
        </div>

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
