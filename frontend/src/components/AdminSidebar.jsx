import React, { useState } from "react";
import "../styles/sidebar.css";
import logoImg from "../assets/login/logo.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const openIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 700 960" width="20px" fill="#e8eaed"><path d="M288-88.35 212.35-164l316-316-316-316L288-871.65 679.65-480 288-88.35Z"/></svg>);
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 700 960" width="20px" fill="#e8eaed"><path d="M391.65-88.35 0-480l391.65-391.65L467.3-796l-316 316 316 316-75.65 75.65Z"/></svg>);

  const dropIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-384 288-576h384L480-384Z"/></svg>);
  const modifyIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-528q0-29 21.5-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29 0 50.5 21.5T816-696v216h-72v-48H216v360h288v72H216Zm0-504h528v-96H216v96Zm0 0v-96 96ZM576-96v-113l210-209q7.26-7.41 16.13-10.71Q811-432 819.76-432q9.55 0 18.31 3.5Q846.83-425 854-418l44 45q6.59 7.26 10.29 16.13Q912-348 912-339.24t-3.29 17.92q-3.3 9.15-10.71 16.32L689-96H576Zm288-243-45-45 45 45ZM624-144h45l115-115-22-23-22-22-116 115v45Zm138-138-22-22 44 45-22-23Z"/></svg>);
  const petsIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M192.23-480Q152-480 124-507.77q-28-27.78-28-68Q96-616 123.77-644q27.78-28 68-28Q232-672 260-644.23q28 27.78 28 68Q288-536 260.23-508q-27.78 28-68 28Zm168-144Q320-624 292-651.77q-28-27.78-28-68Q264-760 291.77-788q27.78-28 68-28Q400-816 428-788.23q28 27.78 28 68Q456-680 428.23-652q-27.78 28-68 28Zm240 0Q560-624 532-651.77q-28-27.78-28-68Q504-760 531.77-788q27.78-28 68-28Q640-816 668-788.23q28 27.78 28 68Q696-680 668.23-652q-27.78 28-68 28Zm168 144Q728-480 700-507.77q-28-27.78-28-68Q672-616 699.77-644q27.78-28 68-28Q808-672 836-644.23q28 27.78 28 68Q864-536 836.23-508q-27.78 28-68 28ZM285-95q-38 0-65-31t-27-76q0-47 32-81t63-69q26-30 46-61t43-62q20-26 45.5-39.5T480-528q32 0 58 13t45 39q23 31 43 61.5t46 61.5q30 36 63 69.5t33 81.82Q768-158 740.5-127 713-96 674-96q-50 0-97-12t-97-12q-50 0-97.5 12.5T285-95Z"/></svg>);
  const profilesIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM384-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm336-144q0 60-42 102t-102 42q-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-264Zm0-360Z"/></svg>);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("Sidebar open state: ", !isOpen);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
            {isOpen ? closeIcon : openIcon}
        </button>

        <nav className="sidebar-links">
          <div className="sidebar-logo">
            <a href="/admin-home">
              <img className="onboarding-logo-top" src={logoImg} alt="Logo" />
            </a>
          </div>
            <ul>
                <li>
                  {dropIcon}
                  <button className="sb-dropdown-btn" onClick={toggleDropdown}>
                    Appointments
                  </button>
                  {isDropDownOpen && (
                    <ul className="sb-dropdown">
                      <li><a href="/admin-scheduled-services">Decide Appointments</a></li>
                      <li><a href="/admin-upcoming-appointments">Upcoming Appointments</a></li>
                    </ul>
                ) }
                </li>
                <li><a href="/admin-unfinished-appointments"> {modifyIcon} Modify Pet Conditions</a></li>
                <li><a href="/admin-pets"> {petsIcon} User Registered Pets</a></li>
                <li><a href="/admin-profiles">{profilesIcon} User Profiles</a></li>
            </ul>
        </nav>
      </div>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
    </div>
  );
}

export default Sidebar;
