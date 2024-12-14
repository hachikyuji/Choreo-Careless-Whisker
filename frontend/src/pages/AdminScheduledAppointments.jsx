import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminScheduledAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect( () => {
        const fetchScheds = async() => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin-services/",{
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

    const handleStatusUpdate = async (serviceId, userId, action) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/update-service-status/${serviceId}/${userId}/${action}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );
            alert(response.data.message);

            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointments) => appointments.id !== serviceId)
            );
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="admin-apo-page">
            <AdminSidebar />
            <div className="admin-apo-main-text">
                <p>Pending Appointments</p>
            </div>
            <div className="admin-apo-content">
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
                                <th></th>
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
                                            className="admin-apo-btn button-gap"
                                            onClick={() => handleStatusUpdate(appointment.id, appointment.user_id, "accept")}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C">
                                                <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/>
                                            </svg>
                                        </button>
                                        <button 
                                            className="admin-apo-btn"
                                            onClick={() => handleStatusUpdate(appointment.id, appointment.user_id, "reject")}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323">
                                                <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
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
                    <h2>No Scheduled Services</h2>
                    <p>There are currently no scheduled appointments.</p>
                </div>
            )
            }
            </div>
        </div>
    )
}

export default AdminScheduledAppointments;