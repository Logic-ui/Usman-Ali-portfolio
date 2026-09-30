import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Github, ExternalLink, CheckCircle2, Layers, Info, Copy, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function CaseStudyModal({ project, allProjects = [], onSelectProject, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  if (!project) return null;

  const nextImage = () => {
    soundFx.playPop();
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    soundFx.playPop();
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const handleCopyLink = () => {
    soundFx.playChime();
    if (project.github) {
      navigator.clipboard.writeText(project.github);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find index in allProjects
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-dialog-custom"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="caseStudyTitle"
      >
        <button
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <span className="modal-category-badge">{project.badge}</span>
          {project.isActive && (
            <span className="badge-live-pulse" style={{ marginBottom: '0.65rem' }}>
              <span className="pulse-indicator" /> Live Deployment
            </span>
          )}
        </div>

        <h3 id="caseStudyTitle" className="modal-title-custom">
          {project.title}
        </h3>

        {/* Gallery Carousel */}
        {project.images && project.images.length > 0 && (
          <div className="modal-gallery-wrap">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="modal-slide-img"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="carousel-arrow left"
                  style={{ opacity: 1 }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="carousel-arrow right"
                  style={{ opacity: 1 }}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="modal-img-counter font-mono">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Interactive Thumbnail Strip */}
        {project.images && project.images.length > 1 && (
          <div className="modal-thumbnails-strip">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`modal-thumb-btn ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setCurrentImageIndex(idx);
                }}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Overview */}
        <h4 className="modal-section-title">
          <Info size={18} className="text-amber-400" />
          Project Overview
        </h4>
        <p className="modal-body-text">{project.overview}</p>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <>
            <h4 className="modal-section-title">
              <CheckCircle2 size={18} className="text-cyan-400" />
              Architecture &amp; Key Deliverables
            </h4>
            <ul className="modal-feature-list">
              {project.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Tech Stack */}
        <h4 className="modal-section-title">
          <Layers size={18} className="text-emerald-400" />
          Technologies Utilized
        </h4>
        <div className="skill-chips-list" style={{ marginBottom: '2rem' }}>
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="skill-badge-enhanced">
              {tech}
            </span>
          ))}
        </div>

        {/* Project Switcher Navigation */}
        {allProjects.length > 1 && onSelectProject && (
          <div className="modal-project-switcher">
            <button
              type="button"
              className="modal-nav-proj-btn"
              onClick={() => {
                soundFx.playPop();
                onSelectProject(prevProject);
              }}
            >
              <ArrowLeft size={14} /> Previous: {prevProject.title.slice(0, 24)}...
            </button>
            <button
              type="button"
              className="modal-nav-proj-btn"
              onClick={() => {
                soundFx.playPop();
                onSelectProject(nextProject);
              }}
            >
              Next: {nextProject.title.slice(0, 24)}... <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="modal-footer-custom">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern btn-primary-glow btn-sm btn-shimmer"
                onClick={() => soundFx.playPop()}
              >
                <ExternalLink size={15} /> Launch Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern btn-outline-glass btn-sm"
                onClick={() => soundFx.playPop()}
              >
                <Github size={15} /> Open GitHub Repo
              </a>
            )}
            {project.github && (
              <button
                type="button"
                className="btn-modern btn-outline-glass btn-sm"
                onClick={handleCopyLink}
                title="Copy GitHub URL"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedLink ? 'Copied Link!' : 'Copy Link'}
              </button>
            )}
          </div>
          <button
            type="button"
            className="btn-modern btn-outline-glass btn-sm"
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
