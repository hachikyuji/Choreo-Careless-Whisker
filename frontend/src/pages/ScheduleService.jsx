import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Sidebar from "../components/Sidebar";
import "../styles/scheds.css"
import dogImg from "../assets/scheds/scheddog.png"
import logoImg from "../assets/login/logo.png";

function ScheduleService() {
    const [formData, setFormData] = useState({
        pet_name: "",
        service: "",
        scheduled_date: "",
        scheduled_time: "",
        end_time: "",
    });

    const serviceDurationMap = {
        Grooming: {hours: 1, minutes: 0},
        Vaccination: {hours: 0, minutes: 30},
        "Check-Up": {hours: 0, minutes:30},
        Surgery: {hours: 3, minutes: 0},
    };

    const calculateEndTime = (startTime, serviceDuration) => {
        const [hours, minutes] = startTime.split(":").map(Number);

        const start = new Date();
        start.setHours(hours, minutes, 0, 0);

        const totalMinutesToAdd = serviceDuration.hours * 60 + serviceDuration.minutes;

        start.setMinutes(start.getMinutes() + totalMinutesToAdd);

        const endHours = start.getHours().toString().padStart(2,'0');
        const endMinutes = start.getMinutes().toString().padStart(2, '0');

        return `${endHours}:${endMinutes}`;
    }

    useEffect(() => {
        if (formData.service && formData.scheduled_time) {
            const duration = serviceDurationMap[formData.service] || {hours: 0, minutes: 0};

            setFormData((prevData) => ({
                ...prevData,
                duration: `${duration.hours} hours ${duration.minutes} minutes`
            }));

            const endTime = calculateEndTime(formData.scheduled_time, duration);
            setFormData((prevData) => ({
                ...prevData,
                end_time: endTime,
            }));
        }
    }, [formData.service, formData.scheduled_time]);

    
    const [petNames, setPetNames] = useState([]);
    const [selectedPet, setSelectedPet] = useState('');

        useEffect(() => {
            const fetchPetNames = async () => {
                const token = localStorage.getItem("access");
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/pets/names/", {
                        headers: {
                            Authorization: `Bearer ${token}` 
                        }
                    });
                    console.log("Response Data:", response.data);
                    setPetNames(response.data);
                } catch (error){
                    alert(error);
                }
            };

            fetchPetNames();
        }, []);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(false);

    const [modal, setModal] = useState(false);

    const toggleModal1 = () => {
        setModal1(!modal1);
    };

    const toggleModal2 = () => {
        setModal2(!modal2);
    };

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setModal(true);
        setLoading(true);

        const payload = {
            ...formData,
            pet_name: selectedPet,
        }

        try {
            const token = localStorage.getItem("access");
            console.log("Access token:", token)
            console.log("Pet_name:", selectedPet);
            console.log("End Time:", formData.endTime);

            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await axios.post("http://127.0.0.1:8000/api/user-scheduled-services/", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            console.log(response.data);
        setTimeout(() => {
            setLoading(false);
            setModal(false);
            navigate("/scheduled-appointments");
        }, 3000);
        } catch (error) {
            alert(error);
        }

        if (modal1) {
            document.body.classList.add('active-modal1')
        } else {
            document.body.classList.add('active-modal1')
        }

        if (modal2) {
            document.body.classList.add('active-modal2')
        } else {
            document.body.classList.add('active-modal2')
        }

        if (modal) {
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.add('active-modal')
        }
    }

    return(
        <div className="sched-page">
            <Sidebar />
            <div className="sched-h2">
                    <h2>
                        Schedule a Service
                    </h2>
                </div>
            <div className="sched-page-content">
                <div className="schedpage-left">
                    <div className="sched-left-content">    
                            <img className="schedpage-image" src={dogImg} alt="dog"/>  
                    </div>
                </div>
                <div className="schedpage-right">
                    <div>
                        <p><strong>Selected Date:</strong> {formData.scheduled_date || "Not selected yet"}</p>
                        <p><strong>Selected Time:</strong>: {formData.scheduled_time || "Not selected yet"}</p>
                    </div>

                    <form className="sched-form" onSubmit={handleSubmit}>
                    <label htmlFor="pet-dropdown"><strong>Select a Pet: </strong></label>
                        <select
                            id="pet-dropdown"
                            value={selectedPet}
                            onChange={(e) => setSelectedPet(e.target.value)}
                        >
                            <option value="">-- Select a Pet --</option>
                            {petNames.map((pet) => (
                                <option key={pet.id} value={pet.pet_name}>
                                    {pet.pet_name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <p></p>
                        </div>
                        <label><strong>Select a service:</strong> </label>
                        <select name="service" value={formData.service} onChange={handleChange} required>
                            <option value="">-- Select a Service --</option>
                            <option value="Grooming" title="Professional grooming for your pet, lasting about 1 hour.">
                                Pet Grooming
                            </option>
                            <option value="Vaccination" title="Vaccination services to protect your pet, approximately 30 minutes.">
                                Pet Vaccination
                            </option>
                            <option value="Check-Up" title="General health check-up for your pet, around 30 minutes.">
                                Pet Check-Up
                            </option>
                            <option value="Surgery" title="Specialized surgical procedures, schedule based on your doctor's suggestions.">
                                Pet Surgery
                            </option>
                            </select>
                        <div>
                        <p><strong>Approximate End Time:</strong> {formData.end_time || ""}</p>
                        </div>
                        
                        <div className="loading-container">
                            {loading && <LoadingIndicator />}
                        </div>

                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
                

            </div>

        { modal1 &&(
            <div className="ssmodal">
                <div onClick={toggleModal1} className="overlay"></div>
                <div className="ssmodal-content">
                    <h2>
                        Select a date
                    </h2>
                    <p>We are open from Mon-Fri!</p>
                    <input
                        type="date"
                        name="scheduled_date"
                        value={formData.scheduled_date}
                        onChange={handleChange}
                        required
                    />
                    <button onClick={() => {
                        toggleModal1();
                        setModal2(true);
                    }} >
                        Next
                    </button>
                </div>
            </div>
        )}

        { modal2 &&(
            <div className="ssmodal">
                <div onClick={toggleModal2} className="overlay"></div>
                    <div className="ssmodal-content">
                        <h2>
                            Select a time:
                        </h2>
                        <p>We are available from 8 AM - 5 PM!</p>
                        <input
                            type="time"
                            name="scheduled_time"
                            value={formData.scheduled_time}
                            onChange={handleChange}
                            required
                        />
                        <button onClick={ () => {
                            setModal2(false);
                        }}>
                            Next
                        </button>
                    </div>
            </div>
        )}

        { modal &&(
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Appointment scheduling successful!</h2>
                        <p>Please wait for the confirmation email.</p>

                        <div className="loading-container">
                        {loading && <LoadingIndicator />}
                        </div>

                </div>
            </div>
        )}
        </div>
    );
}

export default ScheduleService;