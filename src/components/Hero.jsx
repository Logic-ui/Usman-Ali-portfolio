import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Facebook, Mail, Code2, Zap, Layers, Cpu, Globe, Database, Box, TrendingUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import AnimatedCounter from './AnimatedCounter';
import DevTerminal from './DevTerminal';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Dynamic Typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    let timer;

    if (!isDeleting && charIndex <= currentRole.length) {
      setRoleText(currentRole.substring(0, charIndex));
      if (charIndex === currentRole.length) {
        timer = setTimeout(() => setIsDeleting(true), 2100);
      } else {
        timer = setTimeout(() => setCharIndex((prev) => prev + 1), 85);
      }
    } else if (isDeleting && charIndex >= 0) {
      setRoleText(currentRole.substring(0, charIndex));
      if (charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        timer = setTimeout(() => { }, 350);
      } else {
        timer = setTimeout(() => setCharIndex((prev) => prev - 1), 40);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleDownloadCv = () => {
    soundFx.playChime();

    // Multi-cannon celebratory confetti
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#06b6d4', '#3b82f6'] });
    fire(0.2, { spread: 60, colors: ['#6366f1', '#10b981'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#f59e0b', '#f43f5e'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const getChipIcon = (name) => {
    switch (name) {
      case 'Python': return <Code2 size={14} className="text-amber-400" />;
      case 'FastAPI': return <Zap size={14} className="text-cyan-400" />;
      case 'Django': return <Layers size={14} className="text-emerald-400" />;
      case 'Flask': return <Cpu size={14} className="text-amber-300" />;
      case 'React.js': return <Globe size={14} className="text-sky-400" />;
      case 'PostgreSQL': return <Database size={14} className="text-indigo-400" />;
      case 'Docker': return <Box size={14} className="text-blue-400" />;
      case 'Data Science': return <TrendingUp size={14} className="text-rose-400" />;
      default: return <Code2 size={14} />;
    }
  };

  return (
    <section id="home" className="section-wrapper hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Text & Actions */}
          <div className="hero-content">
            <div className="status-pill-animated">
              <span className="status-dot-pulse" />
              <span className="status-text">{personalInfo.status}</span>
            </div>

            <p className="hero-greeting">
              <span className="greeting-prefix">const</span> greeting = <span className="greeting-string">"Hello, I'm"</span>;
            </p>
            <h1 className="hero-title">
              Usman <span className="text-gradient shimmer-text">Ali</span>
            </h1>

            <div className="hero-roles">
              <span className="role-typed">{roleText}</span>
              <span className="typing-cursor">|</span>
            </div>

            <p className="hero-bio">
              Software Engineer with <strong>2+ years of hands-on experience</strong> in backend and full-stack
              development, specializing in <strong>FastAPI, Flask, Django</strong>, and scalable system design.
              Experienced in building data-driven applications, secure REST APIs with JWT authentication, and
              interactive dashboards using <strong>React.js, JavaScript, PostgreSQL</strong>, and Docker.
            </p>

            {/* Interactive Tech Chips */}
            <div className="hero-tech-chips">
              {personalInfo.heroChips.map((chip) => (
                <span
                  key={chip.name}
                  className="tech-chip-interactive"
                  onMouseEnter={() => soundFx.playHover()}
                >
                  {getChipIcon(chip.name)}
                  {chip.name}
                </span>
              ))}
            </div>

            {/* Magnetic Call to Actions */}
            <div className="hero-ctas">
              <MagneticButton strength={20}>
                <a
                  href="#portfolio"
                  className="btn-modern btn-primary-glow btn-shimmer"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  Explore My Work <ArrowRight size={17} />
                </a>
              </MagneticButton>

              <MagneticButton strength={18}>
                <a
                  href={personalInfo.cvFile}
                  download
                  onClick={handleDownloadCv}
                  onMouseEnter={() => soundFx.playHover()}
                  className="btn-modern btn-outline-glass"
                >
                  <Download size={16} /> Download CV
                </a>
              </MagneticButton>

              <MagneticButton strength={16}>
                <a
                  href="#contact"
                  className="btn-modern btn-outline-glass"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  Get In Touch
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="hero-socials">
              <span className="social-label">Find Me Online:</span>
              <MagneticButton strength={15}>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="GitHub Profile"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playPop()}
                >
                  <Github size={18} />
                </a>
              </MagneticButton>

              <MagneticButton strength={15}>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="LinkedIn Profile"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playPop()}
                >
                  <Linkedin size={18} />
                </a>
              </MagneticButton>

              <MagneticButton strength={15}>
                <a
                  href={personalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="Facebook Profile"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playPop()}
                >
                  <Facebook size={18} />
                </a>
              </MagneticButton>

              <MagneticButton strength={15}>
                <a
                  href={personalInfo.socials.email}
                  className="social-circle-btn"
                  aria-label="Email Usman Ali"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playPop()}
                >
                  <Mail size={18} />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right: 3D Tilt Profile Card & Harmonic Floating Badges */}
          <div className="hero-visual">
            <TiltCard maxTilt={10} scale={1.02} className="profile-tilt-card">
              <div className="profile-card-wrapper">
                <div className="profile-glow-ring" />

                {/* Floating Orbiting Tech Badges */}
                <div className="floating-pill pill-python">
                  <img src="/images/python.png" alt="Python Logo" /> Python
                </div>
                <div className="floating-pill pill-react">
                  <img src="/images/react.png" alt="React Logo" /> React.js
                </div>
                <div className="floating-pill pill-fastapi">
                  <img src="/images/fastapi.png" alt="FastAPI Logo" /> FastAPI
                </div>
                <div className="floating-pill pill-docker">
                  <img src="/images/docker.png" alt="Docker Logo" /> Docker
                </div>

                {/* Profile Card Inner */}
                <div className="profile-card-inner">
                  <div className="profile-img-box">
                    <img
                      src={personalInfo.avatar}
                      alt={`${personalInfo.name} - ${personalInfo.roleTitle}`}
                      className="profile-img"
                    />
                    <div className="profile-badge-overlay">
                      <div>
                        <div className="badge-text-primary">{personalInfo.name}</div>
                        <div className="badge-text-sub">{personalInfo.subtitle}</div>
                      </div>
                      <span className="badge-status-chip">
                        <span className="status-dot green" /> Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Live Interactive Code Terminal Showcase */}
        <div style={{ marginTop: '4rem' }}>
          <DevTerminal />
        </div>

        {/* High-Impact Stats Bar with Animated Counter */}
        <div className="hero-stats-strip">
          {personalInfo.stats.map((stat, idx) => (
            <TiltCard key={idx} maxTilt={6} scale={1.03}>
              <div className="stat-item border-beam-card">
                <span className="stat-number">
                  <AnimatedCounter value={stat.number} />
                </span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-sub">{stat.highlight}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
