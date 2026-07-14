import React from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalDetails() {
  const navigate = useNavigate();
  return (
    <div className="active_comp">
      <div>
        <p className="headingName">Ayan Ahmed</p>
        <p className="headingProfession">MERN Stack Developer</p>
        <p className="descriptionText">
          Motivated MERN Stack Developer specializing in React Native, React JS, and Node.js. Experienced building mobile apps, websites, and admin panels from scratch, with a track record of on-time delivery and team leadership.
        </p>
      </div>
      <div className="informationButtonsContainer">
        <span>
          <div className="sideHorizontalLine"></div>
          <p>
            <a href="./files/AyanAhmedCV.pdf" download>
              Download CV
            </a>
          </p>
        </span>
        <span onClick={() => navigate("/experience")}>
          <div className="sideHorizontalLine"></div>
          <p>Experience</p>
        </span>
      </div>
    </div>
  );
}
