import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min((currentScroll / totalScroll) * 100, 100);
        setScrollPercentage(progress);
        setVisible(currentScroll > 320);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`back-to-top-btn ${visible ? 'visible' : ''}`}
      aria-label="Scroll back to top"
      title={`Scroll to top (${Math.round(scrollPercentage)}%)`}
    >
      <svg className="scroll-progress-circle" width="52" height="52" viewBox="0 0 52 52">
        <circle
          className="scroll-progress-bg"
          cx="26"
          cy="26"
          r={radius}
        />
        <circle
          className="scroll-progress-indicator"
          cx="26"
          cy="26"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>
      <ChevronUp size={20} className="back-to-top-icon" />
    </button>
  );
}
