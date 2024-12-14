import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logoImg from "../assets/login/logo.png";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";
import Header from "../components/IntroHeader";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword){
      alert("Passwords do not match!");
      setLoading(false);
      return;
    } else {
        try{
          await api.post("/api/user/register/", {username, password});
          alert("Account created successfully! You may now login.");
        } catch  (error) {
          alert("Registration failed. Please try again.");
        } finally {
          navigate ("/login");
          setLoading(false);
        }
    }


  };

  return (
    <div className="register-page">
        < Header />

        <div className="login-content">
          <div className="login-left">
            <div className="left-image-text">
              <p>Your Pet’s Well-being Starts Here</p>
            </div>
          </div>

          <div className="login-right">
          
            <div className="form-logo">
              <img className="logo-top" src={logoImg} alt="Logo" />
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="loading-container">
                {loading && <LoadingIndicator />}
              </div>
              <button type="submit" className="login-submit">
                Register
              </button>
            </form>

            <div className="log-in">
              Already have an account?{" "}
              <a href="/login" className="log-in-link">
                Log In
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Register;
