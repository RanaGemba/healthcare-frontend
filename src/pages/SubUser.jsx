import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subuser.css';

const SubUser = () => {
  const [clientStaffs, setClientStaffs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    status: 'Pending',
    password: ''
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClientStaffs = async () => {
      try {
        const response = await axios.get('/v1/api/adminUser/get-all-adminUser');
        const clientStaffUsers = response.data.adminUsers.filter(user => user.role === 'ClientStaff');
        setClientStaffs(clientStaffUsers);
      } catch (error) {
        console.error('Error fetching client staff:', error);
      }
    };

    fetchClientStaffs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/api/adminUser/create-new-adminUser', {
        ...formData,
        role: 'ClientStaff'
      });
      setClientStaffs([...clientStaffs, response.data]);
      setFormData({
        name: '',
        contact: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        status: 'Pending',
        password: ''
      });
      setShowForm(false);
    } catch (error) {
      if (error.response) {
        console.error('Error creating new client staff:', error.response.data);
      } else if (error.request) {
        console.error('Error creating new client staff: No response received', error.request);
      } else {
        console.error('Error creating new client staff:', error.message);
      }
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="sub-user-container">
      <h1>Client Staffs</h1>
      <div className="card-container">
        {clientStaffs.map((staff) => (
          <div key={staff.email} className="card">
            <h2>{staff.name}</h2>
            <p>Contact: {staff.contact}</p>
            <p>Email: {staff.email}</p>
            <p>Address: {staff.address}, {staff.city}</p>
            <p>{staff.state}, {staff.country}</p>
            <p>Pincode: {staff.pincode}</p>
            <p>Status: {staff.status}</p>
          </div>
        ))}
        <div className="card" onClick={toggleForm}>
          <h2>Add New Client Staff</h2>
          <p style={{ textAlign: 'center', fontSize: '4em', cursor: 'pointer' }}>+</p>
        </div>
      </div>

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleForm}>&times;</span>
            <h2>Add New Client Staff</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <label htmlFor="contact">Contact:</label>
                <input type="number" id="contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div className="form-row">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
              </div>
              <div className="form-row">
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
                <label htmlFor="pincode">Pincode:</label>
                <input type="number" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required />
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
              </div>
              <div className="form-row">
                <button type="submit" className="submit-button">Add Client Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubUser;