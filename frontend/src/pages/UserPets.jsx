import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import  "../styles/userpets.css";
import Sidebar from "../components/Sidebar";

function UserPets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () =>{
        const fetchPets = async() => {
            try {
                const token = localStorage.getItem("access");
                const response = await axios.get("http://127.0.0.1:8000/api/user-pets/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                setPets(response.data);
            } catch (error) {
                setError("Failed to retireve pets, please try again later!");
                console.error(error)
            } finally {
                setLoading(false)
            }
        };
        
        fetchPets();
    }, []);

    if (loading) {
        return <div className="loading-container">
        {loading && <LoadingIndicator />}
        </div>;
    } 

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="userpets-page">
            <div className="pc-main-text">
                <p>Registered Pets</p>
            </div>
            <Sidebar />
            {pets.length > 0 ? (
                pets.map((pet) => (
                    <div className="pet-card" key={pet.id}>
                        <div className="pet-card-left">
                            <p>
                                <strong>{pet.pet_name}</strong>
                            </p>
                            <img
                                className="pet-card-placeholder"
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png"
                                alt="placeholder-image"
                            />
                        </div>
                        <div className="pet-card-right">
                            <p><strong>Type:</strong> {pet.pet_type}</p>
                            <p><strong>Breed:</strong> {pet.pet_breed}</p>
                            <p><strong>Sex:</strong> {pet.pet_sex}</p>
                            <p><strong>Age:</strong> {pet.pet_age}</p>
                            <p><strong>Birthday:</strong> {pet.pet_birthday}</p>
                            <p><strong>Condition:</strong> {pet.pet_condition}</p>
                            <p><strong>Health:</strong> {pet.pet_health}</p>
                            <p><strong>Weight:</strong> {pet.pet_weight}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-pets">
                    <h2>No Pets Registered</h2>
                    <p>It seems you haven’t registered any pets yet. Please add a pet <a href="/pet-registration">here</a> to get started!</p>
                </div>
            )}
        </div>
    );
    
}

export default UserPets;