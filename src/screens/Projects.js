import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faGlobe, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function Projects() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("./files/MyProjectsData.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching projects data:", err);
      }
    };
    getProjects();
  }, []);

  if (!data) {
    return (
      <div className="projects container_middle">
        <div className="exp-content-wrapper">
          <p>Loading Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects container_middle">
      <div className="exp-content-wrapper">
        <h1 className="exp_heading">Portfolio</h1>
        <p className="projects-intro">
          A selection of apps and websites I've built and shipped — hover a card for links.
        </p>

        <div className="projects-grid">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />

                <span className="project-type-badge">
                  <FontAwesomeIcon icon={project.isMobileApp ? faMobileAlt : faGlobe} />
                  {project.isMobileApp ? "Mobile App" : "Website"}
                </span>

                <div className="project-overlay">
                  <h3 className="project-title">{project.title}</h3>

                  <div className="project-links">
                    {project.isMobileApp ? (
                      <>
                        {project.androidLink && (
                          <a
                            href={project.androidLink}
                            target="_blank"
                            rel="noreferrer"
                            className="project-link-btn"
                          >
                            Android <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </a>
                        )}
                        {project.iosLink && (
                          <a
                            href={project.iosLink}
                            target="_blank"
                            rel="noreferrer"
                            className="project-link-btn"
                          >
                            iOS <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </a>
                        )}
                      </>
                    ) : (
                      project.websiteLink && (
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                        >
                          Website <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="informationButtonsContainer">
          <span onClick={() => navigate("/")} className="back-button">
            <div className="sideHorizontalLine"></div>
            <p>Back</p>
          </span>
        </div>
      </div>
    </div>
  );
}
