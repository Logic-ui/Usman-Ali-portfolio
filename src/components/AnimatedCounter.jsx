import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  // Extract number and any non-digit suffix if provided inside value (e.g. "2+", "9+")
  const numericVal = parseInt(value, 10);
  const displaySuffix = isNaN(numericVal) ? value : value.replace(/[0-9]/g, '') + suffix;

  useEffect(() => {
    if (isNaN(numericVal)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * numericVal));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(numericVal);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericVal, duration]);

  if (isNaN(numericVal)) {
    return <span ref={elementRef}>{value}</span>;
  }

  return (
    <span ref={elementRef}>
      {count}
      {displaySuffix}
    </span>
  );
}
