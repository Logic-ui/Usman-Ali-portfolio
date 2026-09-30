import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = soundFx.toggle();
    setSoundEnabled(active);
  };

  const handleNavClick = (href) => {
    soundFx.playPop();
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="site-navbar" aria-label="Main Navigation">
          <a
            href="#home"
            className="nav-brand"
            onClick={() => soundFx.playPop()}
          >
            <div className="brand-badge-animated">
              <span>{personalInfo.initials}</span>
              <div className="badge-glow-effect" />
            </div>
            <div className="brand-info">
              <span className="brand-name">{personalInfo.name.toUpperCase()}</span>
              <span className="brand-title">{personalInfo.roleTitle.toUpperCase()}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className={`nav-links-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => soundFx.playHover()}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              className={`sound-switch-btn ${soundEnabled ? 'active' : ''}`}
              aria-label="Toggle interface sounds"
              title={soundEnabled ? 'Mute sound effects' : 'Enable futuristic sound effects'}
            >
              {soundEnabled ? <Volume2 size={17} className="text-cyan-400" /> : <VolumeX size={17} />}
            </button>

            {/* Resume Download */}
            <a
              href={personalInfo.cvFile}
              download
              onClick={() => soundFx.playChime()}
              className="btn-modern btn-outline-glass btn-sm d-none d-md-inline-flex"
            >
              <Download size={14} /> Resume
            </a>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                soundFx.playPop();
                toggleTheme();
              }}
              className="theme-switch-btn"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-nav-toggle"
              onClick={() => {
                soundFx.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
