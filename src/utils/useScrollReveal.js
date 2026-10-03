import { useEffect } from 'react';

/**
 * Custom hook to automatically add scroll-driven reveal animations
 * across portfolio sections and interactive cards.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll, .section-wrapper').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve once revealed for performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .section-header, .stat-item, .exp-item, .skill-category-card, .project-card-tilt-wrap, .contact-info-card, .contact-form-card, .gauges-card, .spotlight-showcase-container'
      );
      targets.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('reveal-init');
          observer.observe(el);
        }
      });
    };

    observeElements();

    // Re-check when DOM changes (e.g. project filters change)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mutationObserver.observe(mainContent, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
