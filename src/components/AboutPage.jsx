import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About the USA 2024 Elections Project</h1>
      <p className="about-description">
        Our project is a dynamic, responsive web application built using React,
        designed to provide a detailed, state-by-state overview of the USA 2024
        election results. Users can navigate an interactive map to view the
        outcomes in each state, including key data such as electoral votes,
        candidate performance, and voting trends.
      </p>

      <p className="about-description">
        The site is fully responsive, ensuring an optimal experience across
        various devices. With React at its core, the application delivers a
        seamless user experience, combining speed, interactivity, and
        scalability. This project aims to make election data accessible and
        engaging, empowering users to explore the results in an intuitive and
        visually appealing way.
      </p>
    </div>
  );
}

export default AboutPage;
