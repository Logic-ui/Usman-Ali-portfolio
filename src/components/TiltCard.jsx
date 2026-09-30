import React, { useRef, useState } from 'react';
import { soundFx } from '../utils/soundEffects';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.015,
  onClick,
  style = {}
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setSpotlightPos({
      x: percentX,
      y: percentY,
      opacity: 1
    });
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease',
        position: 'relative',
        ...style
      }}
    >
      {/* Spotlight Sheen Overlay */}
      <div
        className="tilt-card-spotlight"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 3,
          background: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(6, 182, 212, 0.16), transparent 70%)`,
          opacity: spotlightPos.opacity,
          transition: 'opacity 0.3s ease'
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
