import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse the same CSS file

const CreateAdminUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/v1/api/adminUser/create-new-adminUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role, status: 'Active' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'User creation failed');
      }

      setSuccess('Admin user created successfully');
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setError('');

      // Navigate back to the login page
      navigate('/');
    } catch (error) {
      setError(error.message || 'User creation failed');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form onSubmit={handleSubmit} className="login-form">
          <img src="https://www.gembainfotech.com/wp-content/uploads/2022/07/gemba-logo.png" alt="Gemba Infotech" />

          <h2>SignUp</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="PatientStaff">Patient Staff</option>
              <option value="ClientStaff">Client Staff</option>
              <option value="InsuranceStaff">Insurance Staff</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Create User</button>
          </div>
          <div className="create-account">
            <a href="./">Log in</a>
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
       
      </div>
      <div className="login-right">
        <div className="circle">
          <div className="image-container">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/hospital-sign-5187874-4333057.png?f=webp" alt="Hospital Management" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminUser;
