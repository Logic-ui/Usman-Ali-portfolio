import React, { useState } from 'react';
import { Briefcase, ExternalLink, ChevronDown, ChevronUp, MapPin, Shield, Calculator, Cpu, Sparkles } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function Experience() {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (id) => {
    soundFx.playPop();
    setOpenModule((prev) => (prev === id ? null : id));
  };

  const getModuleIcon = (iconName) => {
    switch (iconName) {
      case 'map-pin': return <MapPin size={16} className="text-amber-400" />;
      case 'shield': return <Shield size={16} className="text-cyan-400" />;
      case 'calculator': return <Calculator size={16} className="text-emerald-400" />;
      case 'cpu': return <Cpu size={16} className="text-rose-400" />;
      default: return <Briefcase size={16} />;
    }
  };

  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} /> Career Trajectory
          </span>
          <h2 className="section-title">
            Professional <span className="text-gradient shimmer-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated track record of delivering production software, backend APIs, data pipelines, and AI
            solutions across high-impact engineering environments.
          </p>
        </div>

        {/* Timeline with Flowing Light Stream */}
        <div className="experience-timeline">
          <div className="timeline-light-stream" aria-hidden="true" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="exp-item">
              <div className="exp-dot-pulse">
                <span className="exp-dot-core" />
              </div>

              <TiltCard maxTilt={4} scale={1.01}>
                <div className="exp-card border-beam-card">
                  <div className="exp-header">
                    <h3 className="exp-company">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFx.playPop()}
                          onMouseEnter={() => soundFx.playHover()}
                        >
                          {exp.company} <ExternalLink size={14} />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>
                    <span className="exp-period">{exp.period}</span>
                  </div>

                  <div className="exp-role-strip">
                    <span className="exp-role-name">{exp.role}</span>
                    <span>•</span>
                    <span className="location">{exp.location}</span>
                  </div>

                  {exp.summary && (
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.94rem' }}>
                      {exp.summary}
                    </p>
                  )}

                  {/* Bullets */}
                  {exp.bullets && (
                    <ul className="exp-bullets">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Deep Dive Accordion Modules for LogicChasers */}
                  {exp.modules && (
                    <div className="sub-projects-accordion">
                      {exp.modules.map((mod, mIdx) => {
                        const isOpen = openModule === `${idx}-${mIdx}`;
                        return (
                          <div key={mIdx} className="sub-project-item">
                            <button
                              type="button"
                              className={`sub-project-header ${isOpen ? 'active' : ''}`}
                              onClick={() => toggleModule(`${idx}-${mIdx}`)}
                              aria-expanded={isOpen}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {getModuleIcon(mod.icon)}
                                {mod.title}
                              </span>
                              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {isOpen && (
                              <div className="sub-project-body">
                                <p>{mod.body}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="exp-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="exp-tag"
                        onMouseEnter={() => soundFx.playHover()}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
