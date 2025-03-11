import React from "react";
import { FaGithub } from "react-icons/fa";
import "./footer.css";
import { Link } from "react-router-dom";
import resumePDF from "../../../assets/pdfs/JahanviKumpavatCV.pdf";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="copyright">© {new Date().getFullYear()} AirBNC.</div>
          <span className="created-by">
            Created by{" "}
            <Link to={resumePDF} target="_blank" className="created-by-link">
              Jahanvi Kumpavat
            </Link>
          </span>
          <a
            href="https://github.com/Jahanvi131"
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
