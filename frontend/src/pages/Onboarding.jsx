import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/onboarding.css";
import LoadingIndicator from "../components/LoadingIndicator";
import logoImg from "../assets/login/logo.png";
import Sidebar from "../components/Sidebar";

function Onboarding() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        middle_initial: "",
        email:  "",
        mobile_no: ""
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put("api/profile/update/", formData, {
                headers: {
                    Authorization: 'Bearer ${localStorage.getItem("access_token")}',
                },
            });
            navigate("/home");
        } catch (error) {
            alert("Error submitting profile. Please try again.");
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-page">
            <Sidebar />
            <div className="onboarding-content">
                <div className="form-logo">
                    <img className="onboarding-logo-top" src={logoImg} alt="Logo" />
                </div>
                {/*<h1 className="onboarding-header">Complete Your Profile</h1>*/}
                <form className="onboarding-form" onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    />
                    
                    <label>Last Name</label>
                    <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    />
                    
                    <label>Middle Initial (Optional)</label>
                    <input
                    type="text"
                    name="middle_initial"
                    value={formData.middle_initial}
                    onChange={handleChange}
                    />
                    
                    <label>Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                    
                    <label>Mobile Number (Optional)</label>
                    <input
                    type="text"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={handleChange}
                    />

                    <div className="loading-container">
                    {loading && <LoadingIndicator />}
                    </div>
                    <button type="submit" className="onboarding-button" disabled={loading}>
                    {loading ? "Saving..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Onboarding;

