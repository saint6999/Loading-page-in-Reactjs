import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./LandingPage.css";

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Debounced function inside useEffect
  useEffect(() => {
    const debouncedSearch = debounce((query) => {
      setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())));
    }, 300);

    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel(); // Cleanup on unmount
  }, [searchTerm, users]);

  return (
    <div className="landing-container">
      <header className="hero-section">
        <h1>Welcome to Our Service</h1>
      </header>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">Service 1</div>
          <div className="service-card">Service 2</div>
          <div className="service-card">Service 3</div>
        </div>
      </section>

      <section className="pricing-section">
        <h2>Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">Basic Plan - $10</div>
          <div className="pricing-card">Standard Plan - $20</div>
          <div className="pricing-card">Premium Plan - $30</div>
        </div>
      </section>

      <section className="search-section">
        <h2>User Search</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-item">{user.name}</li>
          ))}
        </ul>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" className="contact-input" />
          <input type="email" placeholder="Email" className="contact-input" />
          <textarea placeholder="Message" className="contact-input"></textarea>
          <button className="submit-button">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
