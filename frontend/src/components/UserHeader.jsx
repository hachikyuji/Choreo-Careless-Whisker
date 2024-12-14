import React, { useState, useEffect } from "react";
import logoImg from "../assets/login/logo.png";
import "../styles/login.css";
import axios from "axios";
import ReactDOM from "react-dom";

function UserHeader() {
    
    const [userNotifications, setUserNotifications] = useState([]);

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isNotifDropDownOpen, setIsNotifDropDown] = useState(false);

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const toggleNotifDropdown = async () => {
        setIsNotifDropDown(!isNotifDropDownOpen);

        if (!isNotifDropDownOpen) {
            const updatedNotifications = userNotifications.map((notif) => ({
                ...notif,
                read: true,
            }));
            setUserNotifications(updatedNotifications);

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
            const updatedNotifications = userNotifications.map((notif) => ({
                ...notif,
                read: true,
            }));
            setUserNotifications(updatedNotifications);

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

            try {
                const response = await axios.get("http://localhost:8000/api/user-notifications/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Notifications response data:", response.data);
                setUserNotifications(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchNotifications();
    }, []);

    const [profileModal, setProfileModal] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileError, setProfileError] = useState(null);

    const toggleProfileModal = async() => {
        setProfileModal(!profileModal);

        if (!profileModal) {
            setLoadingProfile(true);
            setProfileError(null);

            const token = localStorage.getItem("access");

            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user-profile/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(response.data);
                console.log(response.data);
            } catch (error) {
                setProfileError("Failed to load profile. Please try again.");
                console.error("Error fetching profile data:", error);
            } finally {
                setLoadingProfile(false);
            }
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <a href="/home" className="img-link">
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
                            backgroundColor: userNotifications.length > 0 ? 'red' : '',
                        }}
                        className={`notif-btn ${userNotifications.length > 0 ? 'notif-btn-red' : ''}`}
                        onClick={toggleModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
                        </svg>
                    </button>
                    {isNotifDropDownOpen && (
                        <div className="notif-dropdown">
                            <ul>
                                {userNotifications.length > 0 ? (
                                    userNotifications.map((notif, index) => (
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
                            <button onClick={toggleProfileModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                                </svg> Profile
                            </button>
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
                            {userNotifications.length > 0 ? (
                                userNotifications.map((notif, index) => (
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

{profileModal &&
                ReactDOM.createPortal(
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                            <h2>User Profile</h2>
                            {loadingProfile && <p>Loading...</p>} 
                            {profileError && <p className="error">{profileError}</p>} 
                            {userProfile && ( 
                                <div>
                                    <p><strong>Name:</strong> {userProfile.first_name} {userProfile.last_name}</p>
                                    <p><strong>Email:</strong> {userProfile.email}</p>
                                    <p><strong>Mobile No.:</strong> {userProfile.mobile_no}</p>
                                    <p><strong>Onboarding Status:</strong> {userProfile.onboarding_complete ? 'Finished' : 'Not Finished'}</p>
                                    <p className="profile-txt">Contact an admin to update your details via walk-in or email! <br/> <strong>carelesswhisker1453@gmail.com</strong></p>
                                </div>
                            )}
                            <button className="close-notif-btn" onClick={toggleProfileModal}>Close</button>
                        </div>
                    </div>,
                    document.body
                )}
        </header>
    );
}

export default UserHeader;
