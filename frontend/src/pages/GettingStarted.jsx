import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/onboarding.css"
import logoImg from "../assets/login/logo.png";
import LoadingIndicator from "../components/LoadingIndicator";

function SkipMessage() {
    return (
        <div className="modal-message ">
            <h2>You skipped the setup!</h2>
            <p>You will be asked again after logging in again.</p>
        </div>
    );
}

function GettingStarted() {
    const [showSkipMessage, setShowSkipMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleUnderstand = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/home");

        }, 2000);
    }

    if (modal){
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleSkip = () => {
        setShowSkipMessage(true);
    };
    return (
        <div className="getting-started-page">
            <div className="getting-started-content">
                <h1>Getting Started</h1>
                <p>Fill up your personal information so we can contact you for your appointments</p>
                    <div className="gs-buttons">
                        <button className="set-up-btn">
                            <a href="/onboarding">
                                Set Up
                            </a>
                        </button>
                        <button className="skip-btn" onClick={toggleModal}>
                            Skip
                            {/*<a href="/home">  </a> */}
                        </button>
                    </div>
            </div>

            {modal &&(
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>You skipped the setup!</h2>
                        <p>You will be asked after logging in again.</p>

                        {loading ? (
                            <LoadingIndicator />
                        ) : (
                            <button className="home-btn" onClick={handleUnderstand}>
                                I Understand 
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GettingStarted;