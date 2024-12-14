import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";
import Header from "../components/IntroHeader";
import grmImg from "../assets/welcome/Pet grooming.jpg";
import vacImg from "../assets/welcome/Pet Vaccination.jpg";
import wcImg from "../assets/welcome/pet wellness check up.jpg";
import srgImg from "../assets/welcome/Pet Surgeries.jpg";

function Welcome() {
  return (
    <div className = "welcome-parent">
      <div className = "welcome-page">
        <Header  />
        <div className="welcome-content">
          <div className="top-image-text">
            <p>Ensures your pets get the   <br /> 
            care they deserve while  <br />
            saving you time and effort. 
            </p>
          </div>
          <div className="top-image-subtext">
            <p>
            Stay organized, never miss an appointment, and enjoy peace<br /> 
            of mind knowing your pets are always taken care of.
            </p>
          </div>
          <div className="sched-btn-div">
            <a href="/login">
              <button className="schedule-now-btn">Schedule Now</button>            
            </a>
          </div>
        </div>
      </div>
      <div className= "welcome-middle">
          <div className= "mid-text">
            <p>
              Simplify Pet Care, One Appointment at a Time
            </p>
          </div>
          <div className= "mid-subtext">
            <p>
            Stay on top of your pet's health and grooming needs effortlessly. <br /> 
            Organize appointments, reminders, and daily routines, so you can  <br />
            focus on enjoying time with your furry companions.
            </p>
          </div>
      </div>
      <div className= "welcome-bottom">
        <div className= "bot-text"> 
          <p>
            Our Services
          </p>
        </div>
        <div className= "bot-services">
          <div>
            <img className= "services-img" src={grmImg} alt="grm" />
          </div>
          <div>
          <img className= "services-img" src={vacImg} alt="vac" />
          </div>
          <div>
            <img className= "services-img" src={wcImg} alt="wc" />
          </div>
          <div>
            <img className= "services-img" src={srgImg} alt="srg" />
          </div>
        </div>
        <div className= "bot-services-desc">
            <div className="bot-services-text">
              <p>Pet Grooming</p>
            </div>
            <div className="bot-services-text">
              <p>Pet Vaccination</p>
            </div>
            <div className="bot-services-text">
              <p>Pet Check-Up</p>
            </div>
            <div className="bot-services-text">
              <p>Pet Surgery</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
