import React, { useState, useMemo } from 'react';
import { Layers, Search, X, Sparkles, Filter, Code2, Globe } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import ProjectCard from './ProjectCard';
import FeaturedSpotlight from './FeaturedSpotlight';
import CaseStudyModal from './CaseStudyModal';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Identify flagship project (RetailPulse, id: "9")
  const flagshipProject = useMemo(() => {
    return projects.find((p) => p.id === '9') || projects[0];
  }, []);

  const filterButtons = [
    { label: `All Projects (${projects.length})`, value: 'all' },
    { label: 'Full-Stack & React', value: 'fullstack' },
    { label: 'Python & APIs', value: 'backend' },
    { label: 'Data & Geospatial', value: 'data' },
  ];

  const popularTags = ['FastAPI', 'React.js', 'Django', 'PostgreSQL', 'Leaflet.js', 'Docker', 'Plotly'];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      const matchesCategory = filter === 'all' || (p.categories && p.categories.includes(filter));

      // Specific tag filter
      const matchesTech = !selectedTech || p.techStack.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [filter, selectedTech, searchQuery]);

  return (
    <section id="portfolio" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Layers size={14} /> Selected Works &amp; Architecture
          </span>
          <h2 className="section-title">
            Featured <span className="text-gradient shimmer-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of production-ready web applications, geospatial analytics, automated reporting engines, and
            full-stack software systems engineered for scale.
          </p>
        </div>

        {/* Flagship Production Project Spotlight */}
        <FeaturedSpotlight
          project={flagshipProject}
          onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
        />

        {/* Search & Dynamic Filter Controls Bar */}
        <div className="portfolio-control-panel">
          {/* Main Category Tabs */}
          <div className="portfolio-filters">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                className={`filter-btn ${filter === btn.value ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setFilter(btn.value);
                }}
                onMouseEnter={() => soundFx.playHover()}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="portfolio-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Filter by tech or keyword (e.g. FastAPI, Leaflet, JWT...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  soundFx.playPop();
                  setSearchQuery('');
                }}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Tech Tag Pills */}
          <div className="portfolio-quick-tags">
            <span className="quick-tags-label font-mono">Quick Stack Filter:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`quick-tag-pill ${selectedTech === tag ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setSelectedTech(selectedTech === tag ? null : tag);
                }}
                onMouseEnter={() => soundFx.playHover()}
              >
                #{tag}
              </button>
            ))}
            {selectedTech && (
              <button
                type="button"
                className="quick-tag-reset font-mono"
                onClick={() => {
                  soundFx.playPop();
                  setSelectedTech(null);
                }}
              >
                Reset Filter ✕
              </button>
            )}
          </div>

          {/* Results telemetry counter */}
          <div className="portfolio-telemetry-row">
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Displaying <b style={{ color: 'var(--accent-cyan)' }}>{filteredProjects.length}</b> of{' '}
              {projects.length} software projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </div>
        ) : (
          <div className="portfolio-empty-state">
            <Code2 size={40} className="text-cyan-400 mb-2" />
            <h4>No projects match your filter query</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Try searching with another keyword or resetting the quick filters.
            </p>
            <button
              type="button"
              className="btn-modern btn-primary-glow btn-sm mt-3"
              onClick={() => {
                soundFx.playPop();
                setFilter('all');
                setSearchQuery('');
                setSelectedTech(null);
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Enhanced Case Study Modal */}
        {activeModalProject && (
          <CaseStudyModal
            project={activeModalProject}
            allProjects={projects}
            onSelectProject={(proj) => setActiveModalProject(proj)}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </div>
    </section>
  );
}
