import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  X,
  Sparkles,
  Filter,
  Code2,
  Globe,
  LayoutGrid,
  Table as TableIcon,
  ExternalLink,
  Github,
  ArrowRight,
  Shield,
  Database,
  Cpu
} from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'matrix'

  // Flagship project (RetailPulse, id: "9")
  const flagshipProject = useMemo(() => {
    return projects.find((p) => p.id === '9') || projects[0];
  }, []);

  const filterButtons = [
    { label: `All Systems (${projects.length})`, value: 'all' },
    { label: 'Full-Stack & React', value: 'fullstack' },
    { label: 'Python & APIs', value: 'backend' },
    { label: 'Data & Geospatial', value: 'data' },
  ];

  const popularTags = [
    { name: 'FastAPI', count: 4 },
    { name: 'React.js', count: 4 },
    { name: 'PostgreSQL', count: 2 },
    { name: 'Django', count: 1 },
    { name: 'Leaflet.js', count: 1 },
    { name: 'Docker', count: 1 },
    { name: 'Plotly', count: 2 },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      const matchesCategory = filter === 'all' || (p.categories && p.categories.includes(filter));

      // Specific tag filter
      const matchesTech = !selectedTech || p.techStack.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      // Search query filter
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
            <Layers size={14} /> Systems Architecture &amp; Production Builds
          </span>
          <h2 className="section-title">
            Featured <span className="text-gradient shimmer-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore production-grade full-stack architectures, high-concurrency Python APIs,
            geospatial intelligence platforms, and data automation engines engineered with precision.
          </p>
        </div>

        {/* Flagship Production Architecture Spotlight */}
        <FeaturedSpotlight
          project={flagshipProject}
          onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
        />

        {/* Filter & View Mode Controls Bar */}
        <div className="portfolio-control-panel">
          <div className="portfolio-controls-top">
            {/* Main Category Tabs */}
            <div className="portfolio-filters" role="tablist">
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

            {/* View Mode Toggle: Grid vs Matrix */}
            <div className="portfolio-view-toggle">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setViewMode('grid');
                }}
                title="3D Card Showcase Grid"
              >
                <LayoutGrid size={15} />
                <span>Showcase Grid</span>
              </button>
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'matrix' ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playPop();
                  setViewMode('matrix');
                }}
                title="Architecture Spec Matrix"
              >
                <TableIcon size={15} />
                <span>Spec Matrix</span>
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="portfolio-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by tech or keyword (e.g. FastAPI, Leaflet, PostgreSQL, JWT, Docker...)"
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
            <div className="quick-tags-scroll">
              {popularTags.map((tag) => (
                <button
                  key={tag.name}
                  type="button"
                  className={`quick-tag-pill ${selectedTech === tag.name ? 'active' : ''}`}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedTech(selectedTech === tag.name ? null : tag.name);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  #{tag.name} <span className="tag-count font-mono">{tag.count}</span>
                </button>
              ))}
            </div>
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

          {/* Results Telemetry Bar */}
          <div className="portfolio-telemetry-row">
            <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              Displaying <b style={{ color: 'var(--accent-cyan)' }}>{filteredProjects.length}</b> of{' '}
              {projects.length} software architectures
            </span>
            <span className="font-mono text-emerald" style={{ fontSize: '0.8rem' }}>
              ● 100% Production Ready
            </span>
          </div>
        </div>

        {/* Dynamic Display: Grid or Matrix Table */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
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
            <div className="spec-matrix-container border-beam-card">
              <div className="spec-matrix-header font-mono">
                <span>ENGINEERING SPECIFICATION MATRIX // ARCHITECTURE OVERVIEW</span>
              </div>
              <div className="table-responsive">
                <table className="spec-matrix-table">
                  <thead>
                    <tr>
                      <th>PROJECT / ARCHITECTURE</th>
                      <th>CORE ENGINE</th>
                      <th>PRIMARY STACK</th>
                      <th>KEY CAPABILITY</th>
                      <th>DEPLOYMENT / REPO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((p, idx) => (
                      <tr
                        key={p.id}
                        className="matrix-row"
                        onClick={() => setActiveModalProject(p)}
                      >
                        <td className="matrix-title-cell">
                          <span className="matrix-idx font-mono">#{String(idx + 1).padStart(2, '0')}</span>
                          <div>
                            <strong>{p.title}</strong>
                            <span className="matrix-badge">{p.badge}</span>
                          </div>
                        </td>
                        <td>
                          <span className="matrix-engine font-mono">
                            {p.techStack[0]}
                          </span>
                        </td>
                        <td>
                          <div className="matrix-tags-wrap">
                            {p.techStack.slice(0, 3).map((t, i) => (
                              <span key={i} className="matrix-tag-pill font-mono">
                                {t}
                              </span>
                            ))}
                            {p.techStack.length > 3 && (
                              <span className="matrix-tag-more font-mono">+{p.techStack.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="matrix-summary-cell">
                          <p>{p.summary}</p>
                        </td>
                        <td className="matrix-actions-cell" onClick={(e) => e.stopPropagation()}>
                          <div className="matrix-action-btns">
                            {p.demo && (
                              <a
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="matrix-btn-demo"
                                title="Launch Live Demo"
                              >
                                <ExternalLink size={13} /> Live
                              </a>
                            )}
                            {p.github && (
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="matrix-btn-code"
                                title="GitHub Source"
                              >
                                <Github size={13} /> Code
                              </a>
                            )}
                            <button
                              type="button"
                              className="matrix-btn-study"
                              onClick={() => setActiveModalProject(p)}
                              title="Open Full Case Study"
                            >
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="portfolio-empty-state">
            <Code2 size={44} className="text-cyan-400 mb-2" />
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
