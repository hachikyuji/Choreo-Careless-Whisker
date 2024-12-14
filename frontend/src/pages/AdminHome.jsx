import "../styles/adminhome.css";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import grmImg from "../assets/welcome/Pet grooming.jpg";
import vacImg from "../assets/welcome/Pet Vaccination.jpg";
import wcImg from "../assets/welcome/pet wellness check up.jpg";
import srgImg from "../assets/welcome/Pet Surgeries.jpg";

function AdminHome () {
    return (
        <div className="admin-home-parent">
            <div className="admin-home-page">
                <AdminSidebar />
                <Header />
                
            </div>
            <div className="admin-home-middle">
                <div className="mid-text">
                    <p>Simplify Pet Care, One Appointment at a Time</p>
                </div>
                <div className="mid-subtext">
                    <p>
                        Stay on top of your pet's health and grooming needs effortlessly. <br /> 
                        Organize appointments, reminders, and daily routines, so you can  <br />
                        focus on enjoying time with your furry companions.
                    </p>
                </div>
            </div>
            <div className="admin-home-bottom">
                <div className= "bot-text"> 
                <p>
                    Our Services
                </p>
                </div>
                <div className= "bot-services">
                <div>
                    <img className= "services-img" src={grmImg} alt="grm" />
                </div>
                <div>
                <img className= "services-img" src={vacImg} alt="vac" />
                </div>
                <div>
                    <img className= "services-img" src={wcImg} alt="wc" />
                </div>
                <div>
                    <img className= "services-img" src={srgImg} alt="srg" />
                </div>
                </div>
                <div className= "bot-services-desc">
                    <div className="bot-services-text">
                    <p>Pet Grooming</p>
                    </div>
                    <div className="bot-services-text">
                    <p>Pet Vaccination</p>
                    </div>
                    <div className="bot-services-text">
                    <p>Pet Check-Up</p>
                    </div>
                    <div className="bot-services-text">
                    <p>Pet Surgery</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminHome;