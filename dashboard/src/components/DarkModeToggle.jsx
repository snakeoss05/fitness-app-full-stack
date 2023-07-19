import React, { useState } from "react";

const DarkModeToggle = ({ isDarkMode, handleToggle }) => {
  
 

  return (
    <button
      onClick={handleToggle}
      className="btn  position-fixed top-0 end-0 m-4  ">
      {isDarkMode ? (
        <i className="fa-regular fa-moon fs-5 text-white border border-white rounded-5 p-2"></i>
      ) : (
        <i className="fa-solid fa-moon fs-5"></i>
      )}
    </button>
  );
};

export default DarkModeToggle;
