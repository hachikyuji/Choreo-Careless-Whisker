import { useState, useEffect } from "react";
import "../styles/Home.css";
import React from "react";
import Sidebar from "../components/Sidebar";
import UserHeader from "../components/UserHeader";
import Header from "../components/Header";
import grmImg from "../assets/welcome/Pet grooming.jpg";
import vacImg from "../assets/welcome/Pet Vaccination.jpg";
import wcImg from "../assets/welcome/pet wellness check up.jpg";
import srgImg from "../assets/welcome/Pet Surgeries.jpg";

function Home() {
  return (
    <div className="home-parent">
      <div className="home-page">
         <Sidebar />
          <UserHeader />     
      </div>
            <div className="home-middle">
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
            <div className="home-bottom">
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
  );
}

export default Home;

/*
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted!");
        } else {
          alert("Failed to delete note.");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

        <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
*/
