import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header_Home() {
  return (
    <>
      <header id="header" className="header d-flex align-items-center fixed-top" style={{ marginRight: "100px", marginLeft: "100px"}}>
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1 className="sitename">Kelasi-Tech</h1>
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link to="/homeinsertion" className="active">
                  Ajout De Document
                </Link>
              </li>
              <li>
                <Link to="/home" className="">
                  Home
                </Link>
              </li>
              

            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
          <Link className="btn-getstarted" to="/">
            Accueil
          </Link>
       
        </div>
      </header>

    </>
  );
}