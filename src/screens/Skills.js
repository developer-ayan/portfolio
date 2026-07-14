import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Skills() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [terminalLogs, setTerminalLogs] = useState([]);
  const terminalEndRef = useRef(null);

  // Load experience data to get the skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("./files/MyExperianceData.json");
        const jsonData = await response.json();
        setData(jsonData);
        
        // Initial terminal welcome sequence
        addTerminalLog("system", "Initializing full-stack terminal...");
        setTimeout(() => addTerminalLog("success", "Connection established with Ayan Ahmed's skill repository."), 500);
        setTimeout(() => addTerminalLog("info", "Execute commands by clicking on categories below or on the floating nodes."), 1000);
        setTimeout(() => triggerTerminalCommand("Frontend", jsonData.skills["Frontend"]), 1500);
      } catch (err) {
        console.error("Error loading skills:", err);
      }
    };
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const addTerminalLog = (type, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTerminalLogs((prev) => [...prev, { time, type, text }]);
  };

  const triggerTerminalCommand = (category, skillsList) => {
    if (!skillsList) return;
    addTerminalLog("input", `./skills-fetcher --get "${category.toLowerCase()}"`);
    
    // Simulate compilation/loading logs
    setTimeout(() => {
      addTerminalLog("info", `Fetching modules for [${category}]...`);
    }, 200);

    setTimeout(() => {
      skillsList.forEach((skill, idx) => {
        setTimeout(() => {
          addTerminalLog("success", `  => Loaded: ${skill} (Status: Active)`);
        }, idx * 100);
      });
    }, 500);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (data && data.skills[category]) {
      triggerTerminalCommand(category, data.skills[category]);
    }
  };

  if (!data) {
    return (
      <div className="skills-container container_middle">
        <p>Loading skills module...</p>
      </div>
    );
  }

  return (
    <div className="skills-container container_middle">
      <div className="exp-content-wrapper">
        <h1 className="exp_heading">Interactive Skills Terminal</h1>
        
        <div className="skills-interactive-layout">
          {/* Left Column: Interactive Terminal */}
          <div className="terminal-panel">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">ayan_ahmed@mern_terminal:~</span>
            </div>
            <div className="terminal-body">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={`terminal-line line-${log.type}`}>
                  <span className="log-time">[{log.time}]</span>{" "}
                  {log.type === "input" && <span className="terminal-prompt">guest:~$ </span>}
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Right Column: Visual Nodes & Controls */}
          <div className="controls-panel">
            <h2 className="section-title">Categories</h2>
            
            <div className="nodes-container">
              {Object.keys(data.skills).map((category, index) => {
                const isActive = selectedCategory === category;
                return (
                  <div
                    key={category}
                    className={`skill-node node-${index + 1} ${isActive ? "active-node" : ""}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="node-pulse-ring"></div>
                    <div className="node-content">
                      <span className="node-label">{category}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Display list of active skills under selected category */}
            <div className="active-skills-list-card">
              <h3 className="category-details-title">{selectedCategory} Technologies</h3>
              <div className="skills-badges">
                {data.skills[selectedCategory].map((skill, idx) => (
                  <span key={idx} className="skill-badge glow-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
