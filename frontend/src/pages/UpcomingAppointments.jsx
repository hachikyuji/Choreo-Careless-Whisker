import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../styles/adminapo.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function UpcomingAppointments() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect( () =>{
        const fetchPets = async() => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/service/upcoming-appointments/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setAppointments(response.data);
            } catch(error) {
                alert(error)
            }
        };
        fetchPets();
    }, []);

    const handleCancelledUpdate = async (appointmentId) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/cancel-appointment/${appointmentId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            )
            alert(response.data.message);
            setTimeout(() =>{
                window.location.reload();
            }, 1000);


        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="admin-apo-page">
            <div className="admin-apo-main-text">
                <p>Upcoming Appointed Services</p>
            </div>
            <Sidebar />
            {appointments.length > 0 ? (
                <div className="admin-upcoming-apo-table-container">
                    <table className="admin-upcoming-apo-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pet Name</th>
                                <th>Service</th>
                                <th>Scheduled Date</th>
                                <th>Scheduled Time</th>
                                <th>End Time</th>
                                <th>Cancel?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={appointment.id}>
                                    <td>{index + 1}</td>
                                    <td>{appointment.pet_name}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.scheduled_date}</td>
                                    <td>{appointment.scheduled_time}</td>
                                    <td>{appointment.end_time}</td>
                                    <td>
                                        <button 
                                            className="admin-apo-btn"
                                            onClick={() => handleCancelledUpdate(appointment.id)}  
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323">
                                                <path d="m339-288 141-141 141 141 51-51-141-141 141-141-51-51-141 141-141-141-51 51 141 141-141 141 51 51ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="admin-apo-no-appointments">
                    <h2>No Upcoming Services</h2>
                    <p>You don't have any upcoming appointments yet. You can do it <a href='/schedule-services'>here</a>.</p>
                </div>
            )
            }
        </div>
    )
}

export default UpcomingAppointments;
