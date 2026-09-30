import React, { useRef, useState } from 'react';

export default function MagneticButton({
  children,
  className = '',
  strength = 24,
  onClick,
  style = {},
  ...props
}) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPos({
      x: (distanceX / rect.width) * strength,
      y: (distanceY / rect.height) * strength
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={btnRef}
      className={`magnetic-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out',
        display: 'inline-block',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
