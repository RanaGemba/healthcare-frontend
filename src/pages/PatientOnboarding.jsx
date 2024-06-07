import React, { useState, useEffect } from 'react';
import './PatientOnboarding.css'; 
import axios from "axios";

const PatientRegistrationForm = () => {
  const [businessProviders, setBusinessProviders] = useState([]);
  const [insurances, setInsurances] = useState([]); 
  const [clientStaffs, setClientStaffs] = useState([]); 
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
    phone: '',
    email: '',
    sex: '',
    maritalStatus: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    primaryInsurancePlanName: '',
    primaryInsuranceInsuredName: '',
    attachments: null 
  });

  useEffect(() => {
    const fetchBusinessProviderData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/businessProvider/get-all-businessProvider');
        console.log('Business Providers:', response.data.businessProviders); 
        setBusinessProviders(response.data.businessProviders);
      } catch (error) {
        console.error('Error fetching business provider data:', error);
      }
    };

    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/insurance/get-all-insurance');
        console.log('Insurances:', response.data.insurances); 
        setInsurances(response.data.insurances);
      } catch (error) {
        console.error('Error fetching insurance data:', error);
      }
    };

    const fetchClientStaffData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/api/adminUser/get-all-adminUser');
        const clientStaffsData = response.data.adminUsers.filter(user => user.role === "ClientStaff");
        console.log('Filtered Client Staffs:', clientStaffsData); 
        setClientStaffs(clientStaffsData);
      } catch (error) {
        console.error('Error fetching client staff data:', error);
      }
    };

    fetchBusinessProviderData();
    fetchInsuranceData();
    fetchClientStaffData();
  }, []);

  useEffect(() => {
    if (insurances.length > 0) {
      console.log('Insurance data updated:', insurances);
    }
  }, [insurances]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files[0]  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:3000/v1/api/patient/create-new-patient', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error('Error creating patient:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h4 className="heading">Patient Registration Form</h4>
      <form className="form" onSubmit={handleSubmit}>
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

        <h2 className="section-heading">Patient Information</h2>
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
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Phone No.</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="input-field">
            <label>Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-field">
            <label>Marital Status</label>
            <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Emergency Contact Name</label>
            <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Emergency Contact No</label>
            <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} />
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

        <h2 className="section-heading">Insurance Information</h2>
        <div className="form-group">
          <div className="input-field">
            <label>Primary Insurance Plan Name</label>
            <select name="primaryInsurancePlanName" value={formData.primaryInsurancePlanName} onChange={handleChange}>
              <option value="">Select Insurance Plan</option>
              {insurances?.map((insurance) => (
                <option key={insurance._id} value={insurance.InsuranceName}>
                  {insurance.InsuranceName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label>Primary Insurance Insured's Name</label>
            <input type="text" name="primaryInsuranceInsuredName" value={formData.primaryInsuranceInsuredName} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Attachments</label>
            <input type="file" name="attachments" onChange={handleFileChange} />
          </div>
        </div>

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
