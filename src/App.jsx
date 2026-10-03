import React, { useState, useEffect } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import AmbientMesh from './components/AmbientMesh';
import ParticleCanvas from './components/ParticleCanvas';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { useScrollReveal } from './utils/useScrollReveal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('usman-portfolio-theme');
    return saved ? saved : 'dark';
  });

  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('usman-portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      {/* Top Reading Scroll Progress */}
      <ScrollProgress />

      {/* Background Ambient FX */}
      <AmbientMesh />
      <ParticleCanvas />
      <CursorGlow />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
