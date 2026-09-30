import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, ExternalLink, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function ProjectCard({ project, index, onOpenCaseStudy }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide when hovered or smoothly on idle
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;

    // Advance slides every 4.5 seconds if hovered
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
    if (t.includes('docker') || t.includes('report')) return 'tag-blue';
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
        {/* Media Carousel */}
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

            {/* Quick Zoom / Case Study Overlay on hover */}
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

        {/* Content */}
        <div className="project-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <h3 className="project-title" style={{ marginBottom: 0 }}>
              {project.title}
            </h3>
            {project.isActive && (
              <span className="badge-live-pulse">
                <span className="pulse-indicator" /> Live
              </span>
            )}
          </div>

          <p className="project-desc">{project.summary}</p>

          {/* Tech tags */}
          <div className="project-tech-stack">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className={`tech-tag-sm ${getTagColorClass(tech)}`}>
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-action"
                  title="View Source Code"
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
                  title="Live Preview / Demo"
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
