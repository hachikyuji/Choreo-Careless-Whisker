import React, { useState } from "react";
import logoImg from "../assets/login/logo.png";
import "../styles/login.css";

function IntroHeader(){
    return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="img-link">
          <img className="logo" src={logoImg} alt="Logo" />
        </a>
        
      </div>

      <div className="header-center">
        <button className="nav-button">Our Mission</button>
        <button className="nav-button">Team</button>
        <button className="nav-button">Services</button>
      </div>

      <div className="header-right">
        <button className="schedule-now-btn"> 
          <a href="/register" className="btn-log-in-link">
            Sign Up
          </a>
        </button>
        <button className="schedule-now-btn"> 
          <a href="/login" className="btn-log-in-link">
            Log In
          </a>
        </button>
      </div>
    </header>
    );
}

export default IntroHeader;