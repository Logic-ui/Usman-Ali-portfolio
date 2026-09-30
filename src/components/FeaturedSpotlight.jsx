import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles, Layers, ShieldCheck, Zap, BarChart3, Check } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

export default function FeaturedSpotlight({ project, onOpenCaseStudy }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!project) return null;

  return (
    <div className="spotlight-showcase-container">
      <div className="spotlight-badge-strip">
        <span className="spotlight-flagship-tag">
          <Sparkles size={14} className="text-amber-400" /> FLAGSHIP PRODUCTION ARCHITECTURE
        </span>
        <span className="badge-live-pulse">
          <span className="pulse-indicator" /> Live POS Deployment
        </span>
      </div>

      <TiltCard maxTilt={4} scale={1.01} className="spotlight-card-tilt">
        <div className="spotlight-card border-beam-card">
          <div className="spotlight-grid">
            {/* Left: Interactive Media Gallery */}
            <div className="spotlight-media-pane">
              <div className="spotlight-main-img-box">
                <img
                  src={project.images[activeImgIndex]}
                  alt={`${project.title} screenshot`}
                  className="spotlight-main-img"
                />
                <span className="spotlight-img-counter font-mono">
                  {activeImgIndex + 1} / {project.images.length}
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div className="spotlight-thumbnails-row">
                {project.images.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`spotlight-thumb-btn ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => {
                      soundFx.playPop();
                      setActiveImgIndex(idx);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Project Highlights & Metrics */}
            <div className="spotlight-info-pane">
              <div className="spotlight-category-chip font-mono">
                {project.badge}
              </div>

              <h3 className="spotlight-title">{project.title}</h3>

              <p className="spotlight-desc">{project.overview}</p>

              {/* Fast Impact Highlights */}
              <div className="spotlight-feature-bullets">
                <div className="feature-bullet-item">
                  <Zap size={16} className="text-cyan-400" />
                  <span>High-speed barcode scanner POS checkout &amp; atomic inventory updates.</span>
                </div>
                <div className="feature-bullet-item">
                  <BarChart3 size={16} className="text-amber-400" />
                  <span>Real-time profit margins &amp; sales analytics powered by Plotly.js.</span>
                </div>
                <div className="feature-bullet-item">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>OAuth2 + JWT secure token authentication with role enforcement.</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="spotlight-tech-stack">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="spotlight-tech-pill"
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="spotlight-actions">
                {project.demo && (
                  <MagneticButton strength={15}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modern btn-primary-glow btn-shimmer"
                      onClick={() => soundFx.playPop()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <ExternalLink size={16} /> Launch Live POS Demo
                    </a>
                  </MagneticButton>
                )}

                {project.github && (
                  <MagneticButton strength={15}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modern btn-outline-glass"
                      onClick={() => soundFx.playPop()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <Github size={16} /> GitHub Source
                    </a>
                  </MagneticButton>
                )}

                <button
                  type="button"
                  className="btn-spotlight-case-study"
                  onClick={() => {
                    soundFx.playPop();
                    onOpenCaseStudy(project);
                  }}
                >
                  Full Case Study <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
