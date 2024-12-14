import React, { useState, useEffect } from "react";
import logoImg from "../assets/login/logo.png";
import "../styles/login.css";
import axios from "axios";
import ReactDOM from "react-dom";

function Header() {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isNotifDropDownOpen, setIsNotifDropDown] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const toggleNotifDropdown = async () => {
        setIsNotifDropDown(!isNotifDropDownOpen);

        if (!isNotifDropDownOpen) {
            const updatedNotifications = notifications.map((notif) => ({
                ...notif,
                read: true,
            }));
            setNotifications(updatedNotifications);

            try {
                const token = localStorage.getItem("access");
                await axios.patch(
                    "http://127.0.0.1:8000/api/admin-notifications/update-read/",
                    {notifications: updatedNotifications.map((notif) => notif.id) },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Notifications marked as read successfully.");
            } catch (error) {
                console.error("Error updating notifications:", error);
            }
        }
    };

    const [modal, setModal] = useState(false);

    const toggleModal = async () => {
        setModal((prevState) => !prevState);

        if (modal) {
            window.location.reload();
        }

        if (!modal) {
            const updatedNotifications = notifications.map((notif) => ({
                ...notif,
                read: true,
            }));
            setNotifications(updatedNotifications);

            try {
                const token = localStorage.getItem("access");
                await axios.patch(
                    "http://127.0.0.1:8000/api/admin-notifications/update-read/",
                    {notifications: updatedNotifications.map((notif) => notif.id)},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error("Error updating notifications:", error);
            }
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem("access");
            console.log("Retrieved access token:", token);

            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin-notifications/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Notifications response data:", response.data);
                setNotifications(response.data); 

            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications(); 
    }, []); 

    return (
        <header className="header">
            <div className="header-left">
                <a href="/admin-home" className="img-link">
                    <img className="logo" src={logoImg} alt="Logo" />
                </a>
            </div>

            <div className="header-center">
                {/*  */}
            </div>

            <div className="profile-header-right">
                <div className="header-notif">
                    <button
                        style={{
                            backgroundColor: notifications.length > 0 ? 'red' : '',
                        }}
                        className={`notif-btn ${notifications.length > 0 ? 'notif-btn-red' : ''}`}
                        onClick={toggleModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
                        </svg>
                    </button>
                    {isNotifDropDownOpen && (
                        <div className="notif-dropdown">
                            <ul>
                                {notifications.length > 0 ? (
                                    notifications.map((notif, index) => (
                                        <li key={index} className={notif.read ? "read" : "unread"}>
                                            <h4>{notif.title}</h4>
                                            <p>{notif.message}</p>
                                            <span>{new Date(notif.created_at).toLocaleString()}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li>No new notifications</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="profile-dropdown" onClick={toggleDropdown}>
                    <button className="profile-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M480-360 280-560h400L480-360Z"/>
                        </svg>
                    </button>
                    {isDropDownOpen && (
                        <div className="dropdown-menu">
                            <a href="/logout">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                                    </svg> Log Out
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {modal && ReactDOM.createPortal(
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <h2>Notifications</h2>
                        <ul>
                            {notifications.length > 0 ? (
                                notifications.map((notif, index) => (
                                    <li key={index} className={notif.read ? "read" : "unread"}>
                                        <h4>{notif.title}</h4>
                                        <p>{notif.message}</p>
                                        <span className="notif-date-span">{new Date(notif.created_at).toLocaleString()}</span>
                                    </li>
                                ))
                            ) : (
                                <li>No new notifications</li>
                            )}
                        </ul>
                        <button className="close-notif-btn" onClick={toggleModal}>Close</button>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}

export default Header;
