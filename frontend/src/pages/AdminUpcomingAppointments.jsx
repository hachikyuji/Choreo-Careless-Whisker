import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminUpcomingdAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect( () => {
        const fetchScheds = async() => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/upcoming-services/",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setAppointments(response.data)
            } catch (error) {
                alert(error);
            }
        };

        fetchScheds();
    }, []);

    return (
        <div className="admin-apo-page">
            <AdminSidebar />
            <div className="admin-upcoming-apo-main-text">
                <p>Upcoming Appointments</p>
            </div>
            <div className="admin-apo-content">
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
                                    <td>{appointment.cancelled ? 'Cancelled' : 'Upcoming'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="admin-apo-no-appointments">
                    <h2>No Upcoming Services</h2>
                    <p>There are currently no upcoming appointments.</p>
                </div>
            )
            }
            </div>
        </div>
    )
}

export default AdminUpcomingdAppointments;