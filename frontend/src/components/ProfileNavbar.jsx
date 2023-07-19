import React from 'react'
import { Link } from "react-router-dom";
export default function ProfileNavbar() {
  return (
    <div>
      <ul className="d-flex flex-row justify-content-evenly align-items-center p-3 border rounded-5 m-5 col-12 col-lg-6 mx-auto ">
        <Link to="/ProfileInformation">
          <i className="fa-solid fa-user text-black"></i>
          <span className="m-2 text-black">Profile</span>
        </Link>
        <Link to="/historique">
          <i className="fa-regular fa-clock text-black"></i>
          <span className="m-2 text-black">Historique</span>
        </Link>
      </ul>
    </div>
  );
}
