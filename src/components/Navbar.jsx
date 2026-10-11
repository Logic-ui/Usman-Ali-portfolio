import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', num: '01' },
    { name: 'About', href: '#about', num: '02' },
    { name: 'Experience', href: '#experience', num: '03' },
    { name: 'Skills', href: '#skills', num: '04' },
    { name: 'Work', href: '#portfolio', num: '05' },
    { name: 'Contact', href: '#contact', num: '06' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 120;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    const active = soundFx.toggle();
    setSoundEnabled(active);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundFx.playPop();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="site-navbar" aria-label="Main Navigation">
            {/* Nav Brand Logo */}
            <a
              href="#home"
              className="nav-brand"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label={`${personalInfo.name} Home`}
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

            {/* Desktop Navigation Links (Visible on >= 992px) */}
            <div
              className="desktop-nav-wrapper"
              role="navigation"
              aria-label="Desktop Links"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Navbar Controls */}
            <div className="nav-actions">
              {/* Audio Toggle Button (Desktop & Tablet) */}
              <button
                onClick={handleSoundToggle}
                className={`sound-switch-btn ${soundEnabled ? 'active' : ''}`}
                aria-label="Toggle interface sounds"
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              >
                {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
              </button>

              {/* Desktop Resume Download (>= 768px) */}
              <a
                href={personalInfo.cvFile}
                download
                onClick={() => soundFx.playChime()}
                className="btn-modern btn-outline-glass btn-sm d-none d-md-inline-flex"
                title="Download CV"
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
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                className={`mobile-nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Mobile Navigation Overlay & Drawer (Rendered outside header to prevent backdrop-filter containment bugs) */}
      <div
        id="mobile-navigation-drawer"
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop for closing */}
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Floating Mobile Drawer Sheet */}
        <div className="mobile-drawer-sheet" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand">
              <div className="brand-badge-animated sm">
                <span>{personalInfo.initials}</span>
              </div>
              <div>
                <strong className="drawer-brand-name">{personalInfo.name}</strong>
                <span className="drawer-brand-role">{personalInfo.roleTitle}</span>
              </div>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => {
                soundFx.playPop();
                setMobileMenuOpen(false);
              }}
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-drawer-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="drawer-link-num font-mono">{link.num}</span>
                  <span className="drawer-link-text">{link.name}</span>
                  {isActive ? (
                    <span className="drawer-active-dot" />
                  ) : (
                    <ArrowRight size={14} className="drawer-link-arrow" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Settings & Actions within Drawer */}
          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-settings-row">
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  toggleTheme();
                }}
                className="drawer-setting-btn"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              </button>

              <button
                type="button"
                onClick={handleSoundToggle}
                className={`drawer-setting-btn ${soundEnabled ? 'active-audio' : ''}`}
              >
                {soundEnabled ? <Volume2 size={15} className="text-cyan-400" /> : <VolumeX size={15} />}
                <span>{soundEnabled ? 'Audio FX On' : 'Audio Muted'}</span>
              </button>
            </div>

            <a
              href={personalInfo.cvFile}
              download
              onClick={() => soundFx.playChime()}
              className="btn-modern btn-primary-glow mobile-drawer-resume-btn"
            >
              <Download size={15} /> Download Resume / CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
