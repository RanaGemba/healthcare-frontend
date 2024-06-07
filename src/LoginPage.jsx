import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/v1/api/adminUser/login-adminUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', JSON.stringify(data));
      navigate('/home');
      window.location.href = "/home"; 
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form onSubmit={handleSubmit} className="login-form">
          <img src="https://www.gembainfotech.com/wp-content/uploads/2022/07/gemba-logo.png" alt="Gemba Infotech" />

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
            <button type="submit">Login</button>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="create-account">
            <a href="#">Create Account</a>
          </div>
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

export default LoginPage;
