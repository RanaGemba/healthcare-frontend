import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #333; 
  color: white; 
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  z-index: 100; 
  overflow-y: auto; 
`;

export const SidebarItem = styled.div`
  margin-bottom: 15px;
  cursor: pointer;

  a {
    color: inherit;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: #ffffff; 
      background-color: #555; 
      transform: translateX(5px); 
    }

    svg {
      margin-right: 10px;
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(5px); 
    }
  }
`;

export const DropdownContainer = styled.div`
  background-color: #444; 
  padding-left: 20px;
  border-left: 2px solid #555; 
`;

export const DropdownItem = styled.div`
  margin-bottom: 10px;

  a {
    color: #ffffff; 
    text-decoration: none;
    font-size: 16px;
    padding: 10px;
    border-radius: 4px;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: #ffffff; 
      background-color: #555; 
      transform: translateX(5px); 
    }

    svg {
      margin-right: 10px;
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(5px);
    }
  }
`;

export const MainContent = styled.div`
  margin-left: 20%; 
  width: 80%; 
  padding: 20px; 
  box-sizing: border-box;
`;
