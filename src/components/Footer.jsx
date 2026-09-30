import React from 'react';
import { Github, Linkedin, Facebook } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">{personalInfo.name.toUpperCase()}</span>
            <span className="footer-sub">{personalInfo.roleTitle.toUpperCase()} · FULL-STACK &amp; PYTHON</span>
          </div>

          <div className="footer-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#portfolio">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0 text-muted small">
            &copy; {currentYear} {personalInfo.name}. All rights reserved. Crafted with React, clean architecture &amp; passion.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn"
              style={{ width: '36px', height: '36px' }}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn"
              style={{ width: '36px', height: '36px' }}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn"
              style={{ width: '36px', height: '36px' }}
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
