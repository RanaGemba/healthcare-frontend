import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ClientOnboarding from "./pages/ClientOnboarding";
import PatientOnboarding from "./pages/PatientOnboarding";
import Insurance from "./pages/Insurance";
import SubUser from "./pages/SubUser";
import Staff from "./pages/Staff";
import ClinicBusinessProvider from "./pages/ClinicBusinessProvider";
import ExistingPatients from "./pages/ExistingPatients";
import InsuranceVerification from "./pages/insuranceVerification";
import ApprovedPatients from "./pages/approvedPatients";
import LoginPage from "./LoginPage";
import CreateAdminUser from "./createAdminUser"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = JSON.parse(localStorage.getItem("token"));
      setToken(updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const accessToken = token?.accessToken;
    const user = token?.user;
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    console.log(accessToken, user); // Example: logging the values
  }, [token]);

  return (
    <Router>
      {isAuthenticated ? (
        <Sidebar>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/clientOnboarding" element={<ClientOnboarding />} />
            <Route path="/patientOnboarding" element={<PatientOnboarding />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/subuser" element={<SubUser />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/clinicBusinessProvider" element={<ClinicBusinessProvider />} />
            <Route path="/existingPatients" element={<ExistingPatients />} />
            <Route path="/insuranceVerification" element={<InsuranceVerification />} />
            <Route path="/approvedPatients" element={<ApprovedPatients />} />

             
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/createAdminUser" element={<CreateAdminUser />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
