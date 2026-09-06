/**
 * USMAN ALI — PORTFOLIO JAVASCRIPT
 * Interactive UX, Dynamic Typing, Project Filtering, Case Study Modal, and Theme Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Management (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const THEME_KEY = 'usman-portfolio-theme';

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Default to dark mode for ultra-modern aesthetic
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'dark');
    }
  };

  initTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ==========================================
  // 2. Dynamic Hero Subtitle Typewriter
  // ==========================================
  const typewriterElement = document.getElementById('heroTypewriter');
  const roles = [
    'Software Engineer',
    'Full-Stack Python Specialist',
    'FastAPI & Django Architect',
    'Data & AI Solutions Specialist',
    'Backend & Cloud Engineer'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    if (!typewriterElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // ==========================================
  // 3. Mobile Navigation Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinksWrapper = document.getElementById('navLinksWrapper');

  if (mobileToggle && navLinksWrapper) {
    mobileToggle.addEventListener('click', () => {
      navLinksWrapper.classList.toggle('show');
      const isExpanded = navLinksWrapper.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded 
        ? '<i class="bi bi-x-lg"></i>' 
        : '<i class="bi bi-list"></i>';
    });

    // Close mobile nav when clicking any nav link
    document.querySelectorAll('.site-navbar .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksWrapper.classList.remove('show');
        mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  // ==========================================
  // 4. Project Filtering
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 5. Comprehensive Project Case Study Dataset & Modal
  // ==========================================
  const projectCaseStudies = {
    '1': {
      title: 'Employee Information Management & Tax Engine',
      category: 'PHP & MySQL Architecture',
      github: 'https://github.com/Logic-ui/Employee-Information-Management-System',
      images: ['images/year1.jpg', 'images/year2.jpg', 'images/year3.jpg', 'images/year4.jpg', 'images/year5.jpg'],
      overview: 'A full-fledged PHP and MySQL web application engineered to manage enterprise employee records, fiscal years, and dynamic income tax computations.',
      highlights: [
        'Employee Module: Complete CRUD operations handling salary structures, departmental assignments, and profile metadata.',
        'Fiscal Year System: Dynamic linkage between financial years and corresponding progressive tax slabs.',
        'Dynamic Tax Engine: Automated calculations of monthly and annual tax liabilities based on salary brackets and exemption thresholds.',
        'Admin Reporting: Instant tax deductions summary with tabular breakdown and exportable records.'
      ],
      techStack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
    },
    '2': {
      title: 'Geospatial Data Visualization Web Application',
      category: 'Flask & Spatial Analytics',
      github: 'https://github.com/Logic-ui/Geospatial-Data-Visualization-Web-Application',
      images: ['images/flask1.jpg', 'images/flask2.jpg', 'images/flask3.jpg', 'images/flask4.jpg', 'images/flask5.jpg'],
      overview: 'Interactive geospatial web platform integrating Flask, Leaflet.js, and GeoJSON to analyze and visualize spatial consumption, boundaries, and regional metrics.',
      highlights: [
        'Interactive Mapping Engine: Multi-layer basemap switching (satellite, terrain, street) powered by Leaflet.js with custom marker clusters.',
        'GeoJSON Analytics: Dynamic rendering of spatial polygons, coordinates, and regional boundary indicators.',
        'Data CRUD & Storage: Seamless SQLite back-end with Flask routes handling spatial data creation and attributes.',
        'Plotly Chart Integration: Synchronized Plotly stacked bar charts visualizing consumption & waste trends alongside geographic maps.'
      ],
      techStack: ['Python', 'Flask', 'Leaflet.js', 'GeoJSON', 'Plotly', 'SQLite', 'Jinja2']
    },
    '3': {
      title: 'Secure SQL Query Interface with FastAPI & React',
      category: 'FastAPI & React Full-Stack',
      github: 'https://github.com/Logic-ui/Secure-SQL-Query-Interface-with-FastAPI-React',
      images: ['images/fastapi.jpg', 'images/fastapi.png'],
      overview: 'High-performance SQL query interface built with React, TypeScript, and FastAPI, featuring strict JWT token validation and role-based access control.',
      highlights: [
        'JWT Authentication: Secure token-based user authentication using OAuth2PasswordBearer with client-side session management.',
        'Modern React UI: Built with TypeScript, Tailwind CSS, and React Router with protected route redirection logic.',
        'FastAPI API Layer: Async RESTful endpoints handling SQL schema inspection and query dispatching with robust error handling.',
        'Security & CORS: Tight cross-origin resource sharing policies preventing unauthorized API access and query injections.'
      ],
      techStack: ['FastAPI', 'Python', 'React.js', 'TypeScript', 'Tailwind CSS', 'OAuth2', 'JWT', 'MySQL']
    },
    '4': {
      title: 'Full-Stack Reporting & Geospatial Dashboard',
      category: 'Flask & Report Automation',
      github: 'https://github.com/Logic-ui',
      images: ['images/app1.png', 'images/app2.png', 'images/app3.png', 'images/app4.png', 'images/app5.png', 'images/app6.png'],
      overview: 'Enterprise-grade full-stack data platform providing dynamic analytical dashboards, interactive maps, and automated PowerPoint presentation generation.',
      highlights: [
        'Automated PPT Generation: Integrates python-pptx to generate formatted executive PowerPoint presentations with dynamic charts and uploaded images.',
        'Data Pipelines: Pandas-driven data normalization, aggregation, and session-based caching for real-time reporting.',
        'Interactive Geospatial Maps: Custom GeoJSON overlays with dynamic tooltip inspection and geo-filtering.',
        'Modular Database Design: Structured SQLAlchemy models managing project metadata, material color assignment logic, and asset files.'
      ],
      techStack: ['Python', 'Flask', 'python-pptx', 'Pandas', 'SQLAlchemy', 'GeoJSON', 'Plotly']
    },
    '5': {
      title: 'FastAPI CRUD Task Management System',
      category: 'FastAPI & SQLAlchemy',
      github: 'https://github.com/Logic-ui/Secure-SQL-Query-Interface-with-FastAPI-React',
      images: ['images/crud1.png', 'images/crud2.png', 'images/crud3.png', 'images/crud4.png'],
      overview: 'Robust task and workflow management web application developed with FastAPI, SQLAlchemy ORM, SQLite, and an interactive Jinja2 frontend.',
      highlights: [
        'RESTful Architecture: FastAPI routes handling task creation, status updates, editing, and soft-delete operations.',
        'Database Modeling: SQLAlchemy ORM models with SQLite persistent storage and automatic schema migrations.',
        'Interactive Frontend: Fetch API integration for async confirmation modals and real-time DOM status updates.',
        'Workflow Tracking: Status filters (Pending, In-Progress, Completed) with responsive UI.'
      ],
      techStack: ['FastAPI', 'Python', 'SQLAlchemy', 'SQLite', 'Jinja2', 'JavaScript', 'CSS3']
    },
    '6': {
      title: 'Pizza Ordering & Admin Management System',
      category: 'FastAPI Commercial App',
      github: 'https://github.com/Logic-ui/pizza-site',
      images: ['images/piza shop1.png', 'images/pizza shop 2.png', 'images/pizza shop 3.png', 'images/pizza shop 4.png', 'images/piza shop5.png'],
      overview: 'Full-stack food ordering solution featuring a customer-facing interactive menu, shopping cart, checkout flow, and a comprehensive admin inventory portal.',
      highlights: [
        'Customer Experience: Interactive product catalog, dynamic price calculations, and shopping cart persistence.',
        'Admin Portal: Comprehensive CRUD interface to add pizzas, manage ingredient pricing, and handle image file uploads.',
        'Order Pipeline: Real-time order placement with customer contact details, itemized tracking, and revenue totals.',
        'Backend Engine: Built on FastAPI with SQLAlchemy ORM and structured database seeding routines.'
      ],
      techStack: ['FastAPI', 'Python', 'SQLAlchemy', 'Jinja2', 'JavaScript', 'HTML5/CSS3']
    },
    '7': {
      title: 'Todo App — Full-Stack Django & React',
      category: 'Django REST & React',
      github: 'https://github.com/Logic-ui/django-todo-react',
      images: ['images/todo8.png', 'images/todo10.png', 'images/todo11.png', 'images/todo2.png', 'images/todo3.png', 'images/todo4.png'],
      overview: 'Production-ready task management application built with Django REST Framework backend, React frontend, PostgreSQL database, and Docker containerization.',
      highlights: [
        'Decoupled Architecture: REST API backend powered by Django REST Framework serving a single-page React frontend.',
        'Authentication: Secure token-based auth using SimpleJWT with access and refresh token rotation.',
        'Database & Models: PostgreSQL database integrated with Django ORM for optimal query speed.',
        'DevOps & Deployment: Fully containerized with Docker and Docker-Compose for unified development and deployment.'
      ],
      techStack: ['Django', 'Django REST Framework', 'React.js', 'PostgreSQL', 'Docker', 'JWT', 'Bootstrap']
    },
    '8': {
      title: 'Employee Management Dashboard — Flask & React',
      category: 'Flask & React Analytics',
      github: 'https://github.com/Logic-ui/employee-management',
      images: ['images/employe1.png', 'images/employe2.png', 'images/employe3.png', 'images/employe4.png', 'images/employe5.png'],
      overview: 'Feature-packed enterprise HR dashboard featuring interactive employee tables, statistical charts, dark/light themes, and automated Excel/PDF exports.',
      highlights: [
        'Data Visualization: Embedded Chart.js charts providing workforce demographic breakdowns and salary distributions.',
        'Data Export Engine: Instant XLSX spreadsheet and formatted PDF generation directly from client and backend data.',
        'Advanced Table Operations: Real-time search, multi-column sorting, pagination, and inline CRUD modal forms.',
        'Theme System: Seamless toggle between dark and light themes with state persistence.'
      ],
      techStack: ['Flask', 'Python', 'React.js', 'Chart.js', 'SQLite', 'XLSX/PDF Export', 'Axios']
    },
    '9': {
      title: 'RetailPulse — Cloud POS & Sales Intelligence',
      category: 'FastAPI & React POS Suite',
      github: 'https://github.com/Logic-ui/Sales-dashboard',
      images: ['images/sales-dashboard-preview.png', 'images/sales2.jpg'],
      overview: 'Full-stack retail management suite featuring rapid barcode POS checkout, atomic inventory tracking, customer loyalty tiers, and real-time profit analytics dashboards.',
      highlights: [
        'Cloud POS Terminal: Rapid barcode scanner and product lookup, quantity adjustments, and automated tax calculations.',
        'Sales Intelligence Dashboard: Real-time revenue, gross/net profit margins, average order value (AOV), and interactive trend curves powered by Plotly.js.',
        'Inventory Health & Stock Alerts: Live stock categorization (Healthy, Low Stock, Stockout) with low-stock warnings and SKU monitoring.',
        'Customer Loyalty & Discounts: Integrated loyalty tier discounts, order breakdown, cash/card checkout workflows, and tender confirmation.',
        'Modern Backend Architecture: High-performance FastAPI REST API endpoints backed by SQLAlchemy ORM and secure JWT authentication.'
      ],
      techStack: ['FastAPI', 'Python', 'React.js', 'SQLAlchemy', 'Plotly.js', 'JWT Auth', 'PostgreSQL / SQLite', 'Tailwind CSS']
    }
  };

  const caseStudyModal = new bootstrap.Modal(document.getElementById('caseStudyModal'));
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalOverview = document.getElementById('modalProjectOverview');
  const modalHighlights = document.getElementById('modalProjectHighlights');
  const modalTechStack = document.getElementById('modalProjectTechStack');
  const modalGithubLink = document.getElementById('modalProjectGithub');
  const modalCarouselInner = document.getElementById('modalCarouselInner');

  document.querySelectorAll('.btn-details-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const project = projectCaseStudies[projectId];
      if (!project) return;

      modalTitle.textContent = project.title;
      modalCategory.textContent = project.category;
      modalOverview.textContent = project.overview;
      modalGithubLink.href = project.github;

      // Populate highlights list
      modalHighlights.innerHTML = '';
      project.highlights.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = h;
        modalHighlights.appendChild(li);
      });

      // Populate tech stack badges
      modalTechStack.innerHTML = '';
      project.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'skill-badge';
        span.textContent = tech;
        modalTechStack.appendChild(span);
      });

      // Populate carousel images
      modalCarouselInner.innerHTML = '';
      project.images.forEach((imgSrc, idx) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
        item.innerHTML = `<img src="${imgSrc}" class="d-block w-100" alt="${project.title} screenshot ${idx + 1}" />`;
        modalCarouselInner.appendChild(item);
      });

      caseStudyModal.show();
    });
  });

  // ==========================================
  // 6. One-Click Copy Email Action
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailText = 'usmanali07137@gmail.com';
      navigator.clipboard.writeText(emailText).then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="bi bi-check2 text-success"></i> Copied!';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
        }, 2500);
      });
    });
  }

  // ==========================================
  // 7. Interactive Contact Form with Feedback Toast
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const feedbackToast = document.getElementById('formFeedbackToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please complete all required fields.');
        return;
      }

      // Simulate instantaneous submission & success feedback
      if (feedbackToast) {
        feedbackToast.className = 'form-feedback-toast success';
        feedbackToast.innerHTML = '<i class="bi bi-check-circle-fill"></i> Thank you, ' + name + '! Your message has been received. I will get back to you shortly.';
        feedbackToast.style.display = 'flex';
      }

      contactForm.reset();

      setTimeout(() => {
        if (feedbackToast) {
          feedbackToast.style.display = 'none';
        }
      }, 6000);
    });
  }

  // ==========================================
  // 8. Back to Top Button & Scroll Progress
  // ==========================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // 9. Active Nav Link on Scroll (IntersectionObserver)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-navbar .nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => navObserver.observe(s));

  // ==========================================
  // 10. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 11. Duplicate Logo Marquee Track for Seamless Infinite Loop
  // ==========================================
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const clones = Array.from(marqueeTrack.children).map(node => node.cloneNode(true));
    clones.forEach(clone => marqueeTrack.appendChild(clone));
  }

  // ==========================================
  // 12. Initialize Project Card Carousels
  // ==========================================
  document.querySelectorAll('.project-carousel').forEach(c => {
    new bootstrap.Carousel(c, {
      interval: 4000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true
    });
  });
});