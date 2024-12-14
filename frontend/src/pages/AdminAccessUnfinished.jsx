import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminacc.css";
import LoadingIndicator from "../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";

function AdminUnifinishedAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const [selectedPet, setSelectedPet] = useState(null);
    const [formValues, setFormValues] = useState({
        pet_condition: "",
        pet_health: "",
        pet_weight: "",
    });

    const handleRowClick = (appointment) => {
        setSelectedPet(appointment);
        setFormValues({
            pet_condition: appointment.pet_condition || "",
            pet_health: appointment.pet_health || "",
            pet_weight: appointment.pet_weight || "",
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFinishedUpdate = async (serviceId) => {
        try {
            const token = localStorage.getItem("access");
            console.log("Access token:", token);
    
            const response = await axios.put(
                `http://127.0.0.1:8000/api/update-finished-status/${serviceId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Ensure Bearer prefix
                    },
                }
            );
            console.log("Response:", response);
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.status === 401) {
                alert("Authentication failed. Please log in again.");
            } else {
                alert("An error occurred: " + error.message);
            }
        }
    };
    


    const handleSubmit = async () => {
        setLoading(true);

        if (!selectedPet) return;
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/pets/update/${selectedPet.pet_name}/`,
                    formValues,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access")}`,
                        },
                    }
                )
                alert("Pet details updated successfully!");
                console.log(localStorage.getItem("access"));
                console.log("Form Values: ", formValues);
                console.log("Selected Pet: ", selectedPet);
                console.log('Response:', response.data);
                setTimeout(() => {
                    setLoading(false);
                    handleFinishedUpdate(selectedPet.id);
                    window.location.reload();
                }, 2000)
            } catch (error) {
                alert("Error updating pet details: " + error.message);
            }
    };

    const handleCloseModal = () => {
        setSelectedPet(null);
        setFormValues({
            pet_condition: "",
            pet_health: "",
            pet_weight: "",
        });
    }

    return (
        <div className="admin-unfinished-page">
            <AdminSidebar />
            <div className="admin-unfinished-main-text">
                <p>Update Pet Condition</p>
            </div>
            <div className="admin-unfinished-content">
            {appointments.length > 0 ? (
                <div className="admin-unfinished-table-container">
                    <table className="admin-unfinished-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pet Name</th>
                                <th>Service</th>
                                <th>Scheduled Date</th>
                                <th>Scheduled Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr
                                key={appointment.id}
                                onClick={() => handleRowClick(appointment)}
                                className="clickable-row"
                                >
                                    <td>{index + 1}</td>
                                    <td>{appointment.pet_name}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.scheduled_date}</td>
                                    <td>{appointment.scheduled_time}</td>
                                    <td>{appointment.end_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="admin-unfinished-no-appointments">
                    <h2>No Upcoming Services</h2>
                    <p>There are currently no ongoing appointments.</p>
                </div>
            )}

            {selectedPet && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="admin-unfinished-modal-content">
                        <h2>Update Pet Condition: {selectedPet.pet_name}</h2>
                        <form>
                            <label>
                                Condition:
                                <input
                                    type="text"
                                    name="pet_condition"
                                    value={formValues.pet_condition}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Health:
                                <input
                                    type="text"
                                    name="pet_health"
                                    value={formValues.pet_health}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Weight (kg):
                                <input
                                    type="number"
                                    name="pet_weight"
                                    value={formValues.pet_weight}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </form>

                        <div className="loading-container">
                            {loading && <LoadingIndicator />}
                        </div>

                        <div className="modal-actions">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default AdminUnifinishedAppointments;