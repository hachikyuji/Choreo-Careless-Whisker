import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/petreg.css";
import logoImg from "../assets/login/logo.png";
import Sidebar from "../components/Sidebar.jsx";

function PetRegistrationForm() {
    const [formData, setFormData] = useState({
        pet_name: "",
        pet_type: "",
        pet_breed: "",
        pet_sex: "",
        pet_age: "",
        pet_birthday: "",
        pet_condition: "",
        pet_weight: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [modal, setModal] =useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        try {
            const token = localStorage.getItem("access");
            console.log("Retrieved access token:", token);


            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await axios.post("http://127.0.0.1:8000/api/register-pet/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });

            console.log(response.data);
            setModal(true);

            setTimeout(() => {
                setModal(false);
                setLoading(false);
                navigate("/user-pets");
            }, 3000); 
        } catch (error) {
            // Handle error
            alert(error);
        } 

        if (modal){
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.remove('active-modal')
        }
    };

    return (
        <div className="register-pet-page">
            < Sidebar />
            <div className="register-pet-content">
                <div className="petreg-left-section">
                    <div className="petreg-logo">
                        <img 
                        className="onboarding-logo-top" src={logoImg} alt="Logo" 
                        />
                    </div>
                    <h2>Register your pet to avail to our services!</h2>
                </div>


                <div className="petreg-right-section">
                    <form className="petreg-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Pet Name:</label>
                            <input
                                type="text"
                                name="pet_name"
                                value={formData.pet_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="pet-dropdown">
                            <label>Pet Type:</label>
                            <select name="pet_type" 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select Pet Type</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                            </select>
                        </div>
                        <div>
                            <label>Pet Breed:</label>
                            <input
                                type="text"
                                name="pet_breed"
                                value={formData.pet_breed}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="pet-dropdown">
                            <label>Pet Sex:</label>
                                <select name="pet_sex"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                        </div>
                        <div>
                            <label>Pet Age:</label>
                            <input
                                type="text"
                                name="pet_age"
                                value={formData.pet_age}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pet Birthday:</label>
                            <input
                                type="date"
                                name="pet_birthday"
                                value={formData.pet_birthday}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pet Condition:</label>
                            <input
                                type="text"
                                name="pet_condition"
                                value={formData.pet_condition}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Pet Weight: (kg)</label>
                            <input
                                type="number"
                                name="pet_weight"
                                value={formData.pet_weight}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <button type="submit">
                            {loading ? "Submitting..." : "Register Pet"}
                        </button>
                    </form>
                </div>
            </div>

            { modal &&(
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Pet registration successful!</h2>
                            <p>Redirecting you to your pets list...</p>
                            <div className="loading-container">
                                {loading && <LoadingIndicator />}
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PetRegistrationForm;
