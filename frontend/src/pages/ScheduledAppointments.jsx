import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../styles/adminapo.css";
import Sidebar from "../components/Sidebar";

function ScheduledAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect( () =>{
        const fetchPets = async() => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/services/user-appointments/", {
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

    return (
        <div className="admin-apo-page">
            <div className="admin-apo-main-text">
                <p>Scheduled Services</p>
            </div>
            <Sidebar />
            {appointments.length > 0 ? (
                <div className="admin-apo-table-container">
                    <table className="admin-apo-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pet Name</th>
                                <th>Service</th>
                                <th>Scheduled Date</th>
                                <th>Scheduled Time</th>
                                <th>End Time</th>
                                <th>Status</th>
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
                                    <td>{appointment.status ? 'Approved' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="admin-apo-no-appointments">
                    <h2>No Scheduled Services</h2>
                    <p>You don't have any scheduled appointments yet. You can do it <a href='/schedule-services'>here</a>.</p>
                </div>
            )
            }
        </div>
    )
}

export default ScheduledAppointments
