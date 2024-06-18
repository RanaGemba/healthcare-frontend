import React, { useState } from 'react';
import { SidebarContainer, SidebarItem, MainContent, DropdownContainer, DropdownItem } from './Sidebar.styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUser, faUserMd, faUserInjured, faFileAlt, faUsers, faHandshake, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const SidebarIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Sidebar = ({ children }) => {
  const [isPatientsDropdownOpen, setIsPatientsDropdownOpen] = useState(false);
  const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);

  const togglePatientsDropdown = () => {
    setIsPatientsDropdownOpen(!isPatientsDropdownOpen);
  };

  const toggleInsuranceDropdown = () => {
    setIsInsuranceDropdownOpen(!isInsuranceDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";  
  };

  const user = JSON.parse(localStorage.getItem("token"))?.user;

  return (
    <>
      <SidebarContainer>
        <SidebarItem>
          <Link to="/home" className="sidebar-link">
            <SidebarIcon icon={faHome} /> Home
          </Link>
        </SidebarItem>

        {user?.role === "admin" && (
          <SidebarItem>
            <Link to="/clientOnboarding" className="sidebar-link">
              <SidebarIcon icon={faUserMd} /> Clinic Onboarding
            </Link>
          </SidebarItem>
        )}

        {(user?.role === "admin" || user?.role === "PatientStaff") && (
          <SidebarItem onClick={togglePatientsDropdown} className="dropdown-toggle">
            <div className="sidebar-link">
              <SidebarIcon icon={faUserInjured} /> Patients
              <SidebarIcon icon={isPatientsDropdownOpen ? faCaretUp : faCaretDown} style={{ marginLeft: 'auto' }} />
            </div>
            {isPatientsDropdownOpen && (
              <DropdownContainer>
                <DropdownItem>
                  <Link to="/patientOnboarding" className="sidebar-link">
                    Patient Onboarding
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/existingPatients" className="sidebar-link">
                    Existing Patients
                  </Link>
                </DropdownItem>
              </DropdownContainer>
            )}
          </SidebarItem>
        )}

        {(user?.role === "admin" || user?.role === "InsuranceStaff") && (
          <SidebarItem onClick={toggleInsuranceDropdown} className="dropdown-toggle">
            <div className="sidebar-link">
              <SidebarIcon icon={faFileAlt} /> Insurance
              <SidebarIcon icon={isInsuranceDropdownOpen ? faCaretUp : faCaretDown} style={{ marginLeft: 'auto' }} />
            </div>
            {isInsuranceDropdownOpen && (
              <DropdownContainer>
                <DropdownItem>
                  <Link to="/insurance" className="sidebar-link">
                    Insurance List
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/insuranceVerification" className="sidebar-link">
                    Insurance Verification
                  </Link>
                </DropdownItem>
              </DropdownContainer>
            )}
          </SidebarItem>
        )}

        {user?.role === "admin" && (
          <SidebarItem>
            <Link to="/subuser" className="sidebar-link">
              <SidebarIcon icon={faUsers} /> Sub User
            </Link>
          </SidebarItem>
        )}

        {(user?.role === "admin" || user?.role === "ClientStaff") && (
          <SidebarItem>
            <Link to="/staff" className="sidebar-link">
              <SidebarIcon icon={faUser} /> Staff
            </Link>
          </SidebarItem>
        )}

        {user?.role === "admin" && (
          <SidebarItem>
            <Link to="/clinicBusinessProvider" className="sidebar-link">
              <SidebarIcon icon={faHandshake} /> Clinic Business Partner
            </Link>
          </SidebarItem>
        )}
        {user?.role === "admin" && (
          <SidebarItem>
            <Link to="/approvedPatients" className="sidebar-link">
              <SidebarIcon icon={faHandshake} /> Approved Patients
            </Link>
          </SidebarItem>
        )}

        <SidebarItem onClick={handleLogout}>
          <div className="sidebar-link">
            <SidebarIcon icon={faSignOutAlt} /> Logout
          </div>
        </SidebarItem>
      </SidebarContainer>
      <MainContent>
        {children}
      </MainContent>
    </>
  );
};

export default Sidebar;
