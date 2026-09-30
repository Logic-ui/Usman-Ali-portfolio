import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animationFrame;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [visible]);

  return (
    <div
      className="cursor-glow-orb"
      style={{
        transform: `translate3d(${pos.x - 175}px, ${pos.y - 175}px, 0)`,
        opacity: visible ? 0.35 : 0
      }}
      aria-hidden="true"
    />
  );
}
