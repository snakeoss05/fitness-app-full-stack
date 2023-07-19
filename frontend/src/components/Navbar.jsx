import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/user";
export default function Navbar() {
  const { userState, UserLog } = useUser();
   const ChangLogoutIcon = () => {
    if( UserLog)

    return <Link to="/login" onClick={()=>userState(false)}>Sign Out</Link>; 
     else
      return <Link to="/login">Sign in</Link>;
     
     
   };
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <a href="#" className="logo">
                Royal<em> Fitness</em>
              </a>
              {/* ***** Logo End ***** */}
              {/* ***** Menu Start ***** */}
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to="/home" className="active">
                    ACCUEIL
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/home">À PROPOS</Link>
                </li>
                <li className="scroll-to-section">
                  <a href="#our-classes">Classes</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#schedule">HORAIRES</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#contact-us">Contact</a>
                </li>
                <li className="main-button">{ChangLogoutIcon()}</li>
              </ul>
              <a className="menu-trigger" href="#">
                <span>Menu</span>
              </a>
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
