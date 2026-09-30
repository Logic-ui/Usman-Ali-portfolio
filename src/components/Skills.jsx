import React, { useState, useEffect, useRef } from 'react';
import { Code, Server, Layout, Database, TrendingUp, Settings, Gauge, Sparkles, Filter } from 'lucide-react';
import { skillCategories, marqueeLogos, proficiencies } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [animatedGauges, setAnimatedGauges] = useState(false);
  const gaugesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimatedGauges(true);
        }
      },
      { threshold: 0.2 }
    );

    if (gaugesRef.current) {
      observer.observe(gaugesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'server': return <Server size={22} />;
      case 'layout': return <Layout size={22} />;
      case 'database': return <Database size={22} />;
      case 'trending-up': return <TrendingUp size={22} />;
      case 'settings': return <Settings size={22} />;
      default: return <Code size={22} />;
    }
  };

  const categoriesList = ['All', ...skillCategories.map((c) => c.category)];

  const filteredCategories = skillCategories.filter((cat) => {
    if (selectedCategory === 'All') return true;
    return cat.category === selectedCategory;
  });

  return (
    <section id="skills" className="section-wrapper alt-bg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Code size={14} /> Capabilities &amp; Tech Stack
          </span>
          <h2 className="section-title">
            Engineering <span className="text-gradient shimmer-text">Superpowers</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of programming languages, frameworks, data science toolkits, and DevOps
            environments I leverage to architect modern software systems.
          </p>
        </div>

        {/* Interactive Skills Filter Tabs */}
        <div className="skills-filter-nav">
          {categoriesList.map((catName) => (
            <button
              key={catName}
              type="button"
              className={`skills-filter-tab ${selectedCategory === catName ? 'active' : ''}`}
              onClick={() => {
                soundFx.playPop();
                setSelectedCategory(catName);
              }}
              onMouseEnter={() => soundFx.playHover()}
            >
              {catName === 'All' ? <Sparkles size={14} /> : null}
              {catName}
            </button>
          ))}
        </div>

        {/* 5-Category Matrix */}
        <div className="skills-categories-grid">
          {filteredCategories.map((cat, idx) => (
            <TiltCard key={cat.category} maxTilt={6} scale={1.02}>
              <div className="skill-category-card border-beam-card">
                <div className="category-header">
                  <div className="cat-icon">{getCategoryIcon(cat.icon)}</div>
                  <h3 className="cat-title">{cat.category}</h3>
                </div>
                <div className="skill-chips-list">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="skill-badge-enhanced"
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <span className="check-dot">✓</span> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Continuous Animated Logo Marquee */}
        <div className="skills-marquee-container">
          <div className="marquee-track">
            {[...marqueeLogos, ...marqueeLogos].map((logo, lIdx) => (
              <div
                key={lIdx}
                className="marquee-item"
                onMouseEnter={() => soundFx.playHover()}
              >
                <img src={logo.image} alt={logo.name} loading="lazy" />
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proficiency Gauges Card with Animated Fills */}
        <div ref={gaugesRef} className="gauges-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 className="gauges-title" style={{ marginBottom: 0 }}>
              <Gauge size={22} className="text-amber-400" />
              Proficiency Benchmark Readouts
            </h3>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              ✦ Live Metric Telemetry
            </span>
          </div>

          <div className="gauges-grid">
            {proficiencies.map((item, idx) => (
              <div key={idx} className="gauge-item">
                <div className="gauge-label">
                  <span>{item.name}</span>
                  <b className="gauge-percent-text">{item.percentage}%</b>
                </div>
                <div className="gauge-bar-track">
                  <div
                    className="gauge-bar-fill animated-shimmer"
                    style={{
                      width: animatedGauges ? `${item.percentage}%` : '0%',
                      transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms`
                    }}
                  >
                    <span className="gauge-glow-head" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
