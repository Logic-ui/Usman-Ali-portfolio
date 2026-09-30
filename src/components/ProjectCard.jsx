import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, ExternalLink, ChevronLeft, ChevronRight, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function ProjectCard({ project, index, onOpenCaseStudy }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide when hovered
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;

    let timer;
    if (isHovered) {
      timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % project.images.length);
      }, 3500);
    }

    return () => clearInterval(timer);
  }, [isHovered, project.images]);

  const nextSlide = (e) => {
    e.stopPropagation();
    soundFx.playPop();
    if (project.images && project.images.length > 1) {
      setActiveSlide((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    soundFx.playPop();
    if (project.images && project.images.length > 1) {
      setActiveSlide((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const getTagColorClass = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('fastapi') || t.includes('leaflet')) return 'tag-cyan';
    if (t.includes('react')) return 'tag-sky';
    if (t.includes('django') || t.includes('tax') || t.includes('sqlite')) return 'tag-emerald';
    if (t.includes('python') || t.includes('php')) return 'tag-amber';
    if (t.includes('postgres') || t.includes('jwt')) return 'tag-indigo';
    if (t.includes('docker') || t.includes('report') || t.includes('pptx')) return 'tag-blue';
    return '';
  };

  const projectSerial = String(index + 1).padStart(2, '0');

  return (
    <TiltCard maxTilt={5} scale={1.02} className="project-card-tilt-wrap">
      <div
        className="project-card border-beam-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Media Carousel Header */}
        <div className="project-media-wrapper">
          <div className="project-top-badges">
            <span className="project-serial-badge font-mono">
              PROJ // {projectSerial}
            </span>
            <span className="project-badge-tag">{project.badge}</span>
          </div>

          <div className="project-carousel">
            {project.images && project.images.length > 0 && (
              <img
                src={project.images[activeSlide]}
                alt={`${project.title} slide ${activeSlide + 1}`}
                className="project-img-slide"
                loading="lazy"
              />
            )}

            {/* Quick Inspect Case Study Overlay on hover */}
            <div
              className="project-img-overlay"
              onClick={() => {
                soundFx.playPop();
                onOpenCaseStudy(project);
              }}
            >
              <span className="overlay-inspect-pill">
                <Eye size={14} /> Quick Inspect Case Study
              </span>
            </div>

            {/* Carousel navigation controls if multiple images */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-arrow left"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="carousel-arrow right"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>

                <div className="carousel-slide-indicator font-mono">
                  {activeSlide + 1} / {project.images.length}
                </div>

                <div className="carousel-dots">
                  {project.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`carousel-dot ${idx === activeSlide ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playPop();
                        setActiveSlide(idx);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card Body Content */}
        <div className="project-content">
          <div className="project-header-row">
            <h3 className="project-title">
              {project.title}
            </h3>
            {project.isActive && (
              <span className="badge-live-pulse">
                <span className="pulse-indicator" /> Live
              </span>
            )}
          </div>

          <p className="project-desc">{project.summary}</p>

          {/* Quick Technical Highlights Pill */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-quick-highlight">
              <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
              <span className="highlight-text">
                {project.highlights[0].split(':')[1] || project.highlights[0]}
              </span>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="project-tech-stack">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className={`tech-tag-sm ${getTagColorClass(tech)}`}>
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Actions Hub */}
          <div className="project-actions">
            <button
              type="button"
              className="btn-details-trigger"
              onClick={() => {
                soundFx.playPop();
                onOpenCaseStudy(project);
              }}
            >
              Case Study <ArrowRight size={14} className="arrow-icon-shift" />
            </button>

            <div className="project-action-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-action"
                  title="View GitHub Repository"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <Github size={13} /> Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-action demo"
                  title="Launch Live Application"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <ExternalLink size={13} /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
