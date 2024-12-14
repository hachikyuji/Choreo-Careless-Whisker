import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminprof.css";


function AdminProfiles() {
    const [profiles, setProfiles] = useState([]);

    useEffect( () => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin-user-profiles/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setProfiles(response.data);
            } catch (error) {
                alert(error);
            }
        };
        fetchProfiles();
    }, []);

    const [selectedProfile, setSelectedProfile] = useState(null);
    
    const [formValues, setFormValues] = useState({
        email: "",
        last_name: "",
        first_name: "",
        middle_initial: "",
        mobile_no: "",
    });

    const handleRowClick = (profile) => {
        setSelectedProfile(profile);
        setFormValues({
            email: profile.email || "",
            last_name: profile.last_name || "",
            first_name: profile.first_name || "",
            middle_initial: profile.middle_initial || "",
            mobile_no: profile.mobile_no || "",
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (!selectedProfile) return;
            try{
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/admin-profiles/update/${selectedProfile.first_name}/`,
                    formValues,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access")}`,
                        },
                    }
                )
                alert("Profile details updated successfully!");
                console.log("Response:" , response.data);
                window.location.reload();
            } catch (error) {
                alert("Error updating pet details: " + error.message);
            }
    }

    const handleCloseModal = () => {
        setSelectedProfile(null);
        setFormValues({
            email: "",
            last_name: "",
            first_name: "",
            middle_initial: "",
            mobile_no: "",
        })
        window.location.reload();
    }

    return (
        <div className="admin-profiles-page">
            <AdminSidebar />
            <div className="admin-profiles-main-text">
                <p>Update Profile Details</p>
            </div>
            <div className="admin-pets-content">
                {profiles.length > 0 ? (
                    <div className="admin-pets-table-container">
                        <table className="admin-pets-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Middle Initial</th>
                                    <th>Last Name</th>
                                    <th>Mobile No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map((profile, index) => (
                                    <tr 
                                        key={profile.id}
                                        onClick={() => handleRowClick(profile)}
                                        className="clickable-row"
                                    >
                                        <td>{index + 1}</td>
                                        <td>{profile.email}</td>
                                        <td>{profile.first_name}</td>
                                        <td>{profile.middle_initial}</td>
                                        <td>{profile.last_name}</td>
                                        <td>{profile.mobile_no}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="admin-pets-no-appointments">
                        <h2>No Pets Registered</h2>
                        <p>There are currently no pets registered.</p>
                    </div>
                )}
            </div>

            {selectedProfile && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="admin-unfinished-modal-content">
                        <h2>Update Profile: {selectedProfile.pet_name}</h2>
                        <form>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formValues.first_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Middle Initial:
                                <input
                                    type="text"
                                    name="middle_initial"
                                    value={formValues.middle_initial}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formValues.last_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Mobile Number:
                                <input
                                    type="text"
                                    name="mobile_no"
                                    value={formValues.mobile_no}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </form>
                        <div className="modal-actions">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default AdminProfiles;