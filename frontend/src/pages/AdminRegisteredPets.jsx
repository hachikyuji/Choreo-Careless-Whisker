import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminregpets.css";

function AdminRegisteredPets() {
    const [pets, setPets] = useState([]);

    useEffect( () => {
        const fetchPets = async() => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin-registered-pets/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setPets(response.data)
            } catch (error) {
                alert(error);
            }
        };
        fetchPets();
    }, []);

    const [selectedPet, setSelectedPet] = useState(null);
    
    const [formValues, setFormValues] = useState({
       pet_name: "",
       pet_type: "",
       pet_breed: "",
       pet_sex: "",
       pet_age: "",
       pet_birthday: "",
    });

    const handleRowClick = (pet) => {
        setSelectedPet(pet);
        setFormValues({
            pet_name: pet.pet_name || "",
            pet_type: pet.pet_type || "",
            pet_breed: pet.pet_breed || "",
            pet_sex: pet.pet_sex || "",
            pet_age: pet.pet_age || "",
            pet_birthday: pet.pet_birthday || "",
        });
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!selectedPet) return;
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/admin-registered-pets/update/${selectedPet.pet_name}/`,
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
                window.location.reload();
            } catch (error) {
                alert("Error updating pet details: " + error.message);
            }
    };

    const handleCloseModal = () => {
        setSelectedPet(null);
        setFormValues({
            pet_name: "",
            pet_type: "",
            pet_breed: "",
            pet_sex: "",
            pet_age: "",
            pet_birthday: "",
        });
        window.location.reload();
    }

    return(
        <div className="admin-pets-page">
            <AdminSidebar />
            <div className="admin-pets-main-text">
                <p>Update Pet Details</p>
            </div>
            <div className="admin-pets-content">
                {pets.length > 0 ? (
                    <div className="admin-pets-table-container">
                        <table className="admin-pets-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Breed</th>
                                    <th>Sex</th>
                                    <th>Age</th>
                                    <th>Birthday</th>
                                    <th>Kg</th>
                                    <th>Cond.</th>
                                    <th>Health</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pets.map((pet, index) => (
                                    <tr 
                                        key={pet.id}
                                        onClick={() => handleRowClick(pet)}
                                        className="clickable-row"
                                    >
                                        <td>{index + 1}</td>
                                        <td>{pet.pet_name}</td>
                                        <td>{pet.pet_type}</td>
                                        <td>{pet.pet_breed}</td>
                                        <td>{pet.pet_sex}</td>
                                        <td>{pet.pet_age}</td>
                                        <td>{pet.pet_birthday}</td>
                                        <td>{pet.pet_weight}</td>
                                        <td>{pet.pet_condition}</td>
                                        <td>{pet.pet_health}</td>
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

            {selectedPet && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="admin-unfinished-modal-content">
                        <h2>Update Pet Condition: {selectedPet.pet_name}</h2>
                        <form>
                            <label>
                                Pet Name:
                                <input
                                    type="text"
                                    name="pet_name"
                                    value={formValues.pet_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Pet Type:
                                <input
                                    type="text"
                                    name="pet_type"
                                    value={formValues.pet_type}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Pet Breed:
                                <input
                                    type="text"
                                    name="pet_breed"
                                    value={formValues.pet_breed}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Pet Sex:
                                <input
                                    type="text"
                                    name="pet_sex"
                                    value={formValues.pet_sex}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Pet Birthday:
                                <input
                                    type="date"
                                    name="pet_birthday"
                                    value={formValues.pet_birthday}
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
    )
}

export default AdminRegisteredPets;