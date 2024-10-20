// Dropdown.js
import React, { useState } from "react";
import "./Dropdown.css"; // Create and import your CSS for dropdownEnsure you have the styles applied

const Dropdown = ({ onProfileClick, onLogoutClick }) => {
  return (
    <div className="dropdown-menu">
      <button onClick={onProfileClick} className="dropdown-item">
        Profile
      </button>
      <button onClick={onLogoutClick} className="dropdown-item">
        Log Out
      </button>
    </div>
  );
};

export default Dropdown;
