/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/user";
export default function Navbar() {
  const { userState, UserLog } = useUser();
  const [toggler,settogller]=useState(false)
 
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
              <ul className={`nav ${toggler ? "shownav" : ""}`}>
                <li
                  className="scroll-to-section"
                  onClick={() => settogller(!toggler)}>
                  <Link to="/home" className="active">
                    ACCUEIL
                  </Link>
                </li>
                <li
                  className="scroll-to-section"
                  onClick={() => settogller(!toggler)}>
                  <Link to="/home">À PROPOS</Link>
                </li>
                <li
                  className="scroll-to-section"
                  onClick={() => settogller(!toggler)}>
                  <a href="#our-classes">Classes</a>
                </li>
                <li
                  className="scroll-to-section"
                  onClick={() => settogller(!toggler)}>
                  <a href="#schedule">HORAIRES</a>
                </li>
                <li
                  className="scroll-to-section"
                  onClick={() => settogller(!toggler)}>
                  <a href="#contact-us">Contact</a>
                </li>
                {UserLog && (
                  <li
                    className="btn btn-sm "
                    onClick={() => settogller(!toggler)}>
                    <Link to="/ProfileInformation">
                      <i
                        className="fa-regular fa-user fs-5"
                        style={{ color: "#ed563b" }}></i>
                    </Link>
                  </li>
                )}
                <li className="main-button" onClick={() => userState(false)}>
                  <Link to="/login" className="">
                    {UserLog ? "Sign Out" : "Sign In"}
                  </Link>
                </li>
              </ul>
              <a
                className={`menu-trigger ${toggler ? "active" : ""}`}
                href="#"
                onClick={() => settogller(!toggler)}>
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
