import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subuser.css';

const SubUser = () => {
  const [clientStaffs, setClientStaffs] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    status: 'Pending',
    role: 'ClientStaff',
    password: ''
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    status: 'Pending',
    role: 'ClientStaff',
    password: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState(null);

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

  const handleAddChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setAddFormData({
      name: '',
      contact: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      status: 'Pending',
      role: 'ClientStaff',
      password: ''
    });
  };

  const openUpdateForm = (staff) => {
    setUpdateFormData({
      name: staff.name,
      contact: staff.contact,
      email: staff.email,
      address: staff.address,
      city: staff.city,
      state: staff.state,
      country: staff.country,
      pincode: staff.pincode,
      status: staff.status,
      role: staff.role,
      password: '' // Assuming you don't want to pre-fill the password
    });
    setCurrentStaffId(staff._id);
    setShowUpdateForm(true);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setCurrentStaffId(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/api/adminUser/create-new-adminUser', addFormData);
      setClientStaffs([...clientStaffs, response.data]);
      closeAddForm();
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/v1/api/adminUser/update-adminUser/${currentStaffId}`, updateFormData);
      const updatedClientStaffs = clientStaffs.map(adminUser => adminUser._id === currentStaffId ? response.data.adminUser : adminUser);
      setClientStaffs(updatedClientStaffs);
      closeUpdateForm();
    } catch (error) {
      console.error('Error updating AdminUser:', error);
    }
  };

  const handleDelete = async (adminUserId) => {
    try {
      await axios.delete(`/v1/api/adminUser/delete-adminUser/${adminUserId}`);
      const updatedClientStaffs = clientStaffs.filter(adminUser => adminUser._id !== adminUserId);
      setClientStaffs(updatedClientStaffs);
    } catch (error) {
      console.error('Error deleting AdminUser:', error);
    }
  };

  return (
    <div className="sub-user-container">
      <h1>Client Staffs</h1>
      <div className="card-container">
        {clientStaffs.map((staff) => (
          <div key={staff._id} className="card">
            <div className="card-header">
              <h2>{staff.name} {staff.code}</h2>
              <div className="card-icons">
                <span className="edit-icon" onClick={() => openUpdateForm(staff)}>✎</span>
                <span className="delete-icon" onClick={() => handleDelete(staff._id)}>❌</span>
              </div>
            </div>
            <p>Contact: {staff.contact}</p>
            <p>Email: {staff.email}</p>
            <p>Address: {staff.address}, {staff.city}</p>
            <p>{staff.state}, {staff.country}</p>
            <p>Pincode: {staff.pincode}</p>
            <p>Status: {staff.status}</p>
          </div>
        ))}

        <div className="card" onClick={openAddForm}>
          <h2>Add New Client Staff</h2>
          <p style={{ textAlign: 'center', fontSize: '4em', cursor: 'pointer' }}>+</p>
        </div>
      </div>

      {showAddForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeAddForm}>&times;</span>
            <h2>Add New Client Staff</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-row">
                <label htmlFor="addName">Name:</label>
                <input type="text" id="addName" name="name" value={addFormData.name} onChange={handleAddChange} placeholder="Name" required />
                <label htmlFor="addContact">Contact:</label>
                <input type="number" id="addContact" name="contact" value={addFormData.contact} onChange={handleAddChange} placeholder="Contact" required />
                <label htmlFor="addEmail">Email:</label>
                <input type="email" id="addEmail" name="email" value={addFormData.email} onChange={handleAddChange} placeholder="Email" required />
              </div>
              <div className="form-row">
                <label htmlFor="addAddress">Address:</label>
                <input type="text" id="addAddress" name="address" value={addFormData.address} onChange={handleAddChange} placeholder="Address" required />
                <label htmlFor="addCity">City:</label>
                <input type="text" id="addCity" name="city" value={addFormData.city} onChange={handleAddChange} placeholder="City" required />
                <label htmlFor="addState">State:</label>
                <input type="text" id="addState" name="state" value={addFormData.state} onChange={handleAddChange} placeholder="State" required />
              </div>
              <div className="form-row">
                <label htmlFor="addCountry">Country:</label>
                <input type="text" id="addCountry" name="country" value={addFormData.country} onChange={handleAddChange} placeholder="Country" required />
                <label htmlFor="addPincode">Pincode:</label>
                <input type="number" id="addPincode" name="pincode" value={addFormData.pincode} onChange={handleAddChange} placeholder="Pincode" required />
                <label htmlFor="addStatus">Status:</label>
                <select id="addStatus" name="status" value={addFormData.status} onChange={handleAddChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="addRole">Role:</label>
                <input type="text" id="addRole" name="role" value={addFormData.role} onChange={handleAddChange} placeholder="Role" required />
                <label htmlFor="addPassword">Password:</label>
                <input type="password" id="addPassword" name="password" value={addFormData.password} onChange={handleAddChange} placeholder="Password" required />
              </div>
              <div className="form-row">
                <button type="submit" className="submit-button">Add Client Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeUpdateForm}>&times;</span>
            <h2>Edit Client Staff</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-row">
                <label htmlFor="updateName">Name:</label>
                <input type="text" id="updateName" name="name" value={updateFormData.name} onChange={handleUpdateChange} placeholder="Name" required />
                <label htmlFor="updateContact">Contact:</label>
                <input type="number" id="updateContact" name="contact" value={updateFormData.contact} onChange={handleUpdateChange} placeholder="Contact" required />
                <label htmlFor="updateEmail">Email:</label>
                <input type="email" id="updateEmail" name="email" value={updateFormData.email} onChange={handleUpdateChange} placeholder="Email" required />
              </div>
              <div className="form-row">
                <label htmlFor="updateAddress">Address:</label>
                <input type="text" id="updateAddress" name="address" value={updateFormData.address} onChange={handleUpdateChange} placeholder="Address" required />
                <label htmlFor="updateCity">City:</label>
                <input type="text" id="updateCity" name="city" value={updateFormData.city} onChange={handleUpdateChange} placeholder="City" required />
                <label htmlFor="updateState">State:</label>
                <input type="text" id="updateState" name="state" value={updateFormData.state} onChange={handleUpdateChange} placeholder="State" required />
              </div>
              <div className="form-row">
                <label htmlFor="updateCountry">Country:</label>
                <input type="text" id="updateCountry" name="country" value={updateFormData.country} onChange={handleUpdateChange} placeholder="Country" required />
                <label htmlFor="updatePincode">Pincode:</label>
                <input type="number" id="updatePincode" name="pincode" value={updateFormData.pincode} onChange={handleUpdateChange} placeholder="Pincode" required />
                <label htmlFor="updateStatus">Status:</label>
                <select id="updateStatus" name="status" value={updateFormData.status} onChange={handleUpdateChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="updateRole">Role:</label>
                <input type="text" id="updateRole" name="role" value={updateFormData.role} onChange={handleUpdateChange} placeholder="Role" required />
                <label htmlFor="updatePassword">Password:</label>
                <input type="password" id="updatePassword" name="password" value={updateFormData.password} onChange={handleUpdateChange} placeholder="Password" required />
              </div>
              <div className="form-row">
                <button type="submit" className="submit-button">Update Client Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubUser;
