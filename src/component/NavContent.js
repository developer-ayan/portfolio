import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function NavContent() {
  return (
    <div>
      <div className="x-button-container" id="defaultMenuStyle">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div id="navigator">
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Link>
          </li>
          <li>
            <Link to="/experience">Work</Link>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/ayan-ahmed-998b0821a" rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/developer-ayan" rel="noreferrer" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <Link to="/skills">Skills</Link>
          </li>
          <li>
            <a href="mailto:ayan.ali25508@gmail.com">Contact Me</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
