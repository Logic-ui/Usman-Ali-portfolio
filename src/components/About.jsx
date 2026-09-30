import React from 'react';
import { User, Terminal, GraduationCap, Calendar, Download, Server, Layout, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { personalInfo, aboutData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function About() {
  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'server': return <Server size={22} />;
      case 'layout': return <Layout size={22} />;
      case 'sparkles': return <Sparkles size={22} />;
      case 'shield-check': return <ShieldCheck size={22} />;
      default: return <Server size={22} />;
    }
  };

  return (
    <section id="about" className="section-wrapper alt-bg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <User size={14} /> Profile Overview
          </span>
          <h2 className="section-title">Architecting Robust Systems with Clean Code</h2>
          <p className="section-subtitle">
            A software engineer dedicated to building scalable web applications, robust REST APIs, and data-driven
            intelligence solutions.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Biography & Education */}
          <TiltCard maxTilt={4} scale={1.01}>
            <div className="about-card">
              <h3 className="about-title">
                <Terminal size={22} className="text-cyan-400" />
                {aboutData.philosophy.title}
              </h3>

              {aboutData.philosophy.paragraphs.map((p, idx) => (
                <p key={idx} className="about-desc">
                  {idx === 0 ? (
                    <>
                      I am a passionate <strong>Software Engineer</strong> who thrives on designing resilient backends and
                      intuitive, high-performance frontends. My engineering philosophy centers on clean architecture, modular
                      design, and proactive security.
                    </>
                  ) : (
                    <>
                      Whether architecting secure authentication microservices in <strong>FastAPI</strong>, crafting complex
                      relational models in <strong>Django &amp; PostgreSQL</strong>, or rendering dynamic spatial maps and data
                      dashboards in <strong>React &amp; Plotly</strong>, I focus on delivering code that performs under
                      real-world workloads.
                    </>
                  )}
                </p>
              ))}

              {/* Education Box */}
              <div className="education-box">
                <div className="edu-icon-wrap">
                  <GraduationCap size={24} />
                </div>
                <div className="edu-info">
                  <h4 className="edu-degree">{aboutData.education.degree}</h4>
                  <p className="edu-school">{aboutData.education.institution}</p>
                  <span className="edu-years">
                    <Calendar size={13} /> {aboutData.education.period}
                  </span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
                    {aboutData.education.description}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <a
                  href={personalInfo.cvFile}
                  download
                  onClick={() => soundFx.playChime()}
                  className="btn-modern btn-primary-glow btn-sm"
                >
                  <Download size={15} /> Download Full Resume
                </a>
              </div>
            </div>
          </TiltCard>

          {/* Right Column: Architectural Pillars */}
          <div className="about-card">
            <h3 className="about-title">
              <Sparkles size={22} className="text-amber-400" />
              What I Bring to the Table
            </h3>
            <p className="about-desc">
              End-to-end capabilities spanning system architecture, API security, automated data reporting, and modern
              user experiences.
            </p>

            <div className="pillars-grid">
              {aboutData.pillars.map((pillar) => (
                <TiltCard key={pillar.id} maxTilt={7} scale={1.03}>
                  <div className="pillar-card">
                    <div className={`pillar-icon ${pillar.accent}`}>
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.description}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
