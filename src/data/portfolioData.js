export const personalInfo = {
  name: "Usman Ali",
  initials: "UA",
  roleTitle: "Software Engineer",
  subtitle: "Full-Stack & Python Specialist",
  status: "Available for New Opportunities",
  avatar: "/images/usman.jpg",
  cvFile: "/Usman Ali CV.pdf",
  email: "usmanali07137@gmail.com",
  phone: "+92 309 8430449",
  location: "Lahore / Islamabad, Pakistan",
  workPreference: "Remote & Onsite",
  bio: "Software Engineer with 2+ years of hands-on experience in backend and full-stack development, specializing in FastAPI, Flask, Django, and scalable system design. Experienced in building data-driven applications, secure REST APIs with JWT authentication, and interactive dashboards using React.js, JavaScript, PostgreSQL, and Docker.",
  roles: [
    "Software Engineer",
    "Full-Stack Python Specialist",
    "FastAPI & Django Architect",
    "Data & AI Solutions Specialist",
    "Backend & Cloud Engineer"
  ],
  socials: {
    github: "https://github.com/Logic-ui",
    linkedin: "https://www.linkedin.com/in/usman-ali-b0603124a/",
    facebook: "https://web.facebook.com/profile.php?id=100013992877054",
    email: "mailto:usmanali07137@gmail.com"
  },
  stats: [
    { number: "2+", label: "Years of Industry Experience", highlight: "Engineering & Analytics" },
    { number: "9+", label: "Production & Full-Stack Projects", highlight: "High Performance" },
    { number: "10+", label: "Core Technologies Mastered", highlight: "Full Spectrum" },
    { number: "BS", label: "Computer Science Graduate", highlight: "MNS UAM (2020-2024)" }
  ],
  heroChips: [
    { name: "Python", icon: "code", color: "text-amber-400" },
    { name: "FastAPI", icon: "zap", color: "text-cyan-400" },
    { name: "Django", icon: "layers", color: "text-emerald-400" },
    { name: "Flask", icon: "cpu", color: "text-amber-300" },
    { name: "React.js", icon: "globe", color: "text-sky-400" },
    { name: "PostgreSQL", icon: "database", color: "text-indigo-400" },
    { name: "Docker", icon: "box", color: "text-blue-400" },
    { name: "Data Science", icon: "trending-up", color: "text-rose-400" }
  ]
};

export const aboutData = {
  philosophy: {
    title: "Engineering Philosophy",
    paragraphs: [
      "I am a passionate Software Engineer who thrives on designing resilient backends and intuitive, high-performance frontends. My engineering philosophy centers on clean architecture, modular design, and proactive security.",
      "Whether architecting secure authentication microservices in FastAPI, crafting complex relational models in Django & PostgreSQL, or rendering dynamic spatial maps and data dashboards in React & Plotly, I focus on delivering code that performs under real-world workloads."
    ]
  },
  education: {
    degree: "BS in Computer Science",
    institution: "MNS University of Agriculture, Multan",
    period: "2020 – 2024",
    description: "Comprehensive grounding in Algorithms, Data Structures, Database Systems, Computer Networks, and Full-Stack Web Development."
  },
  pillars: [
    {
      id: "backend",
      title: "Backend & APIs",
      icon: "server",
      accent: "amber",
      description: "FastAPI, Flask, Django, RESTful endpoints, JWT & OAuth2 authentication, and microservices architecture."
    },
    {
      id: "frontend",
      title: "Modern Frontend",
      icon: "layout",
      accent: "cyan",
      description: "React.js, TypeScript, Tailwind CSS, JavaScript ES6+, dynamic Jinja2 templating, and responsive UI/UX design."
    },
    {
      id: "data-ai",
      title: "Data & AI Pipelines",
      icon: "sparkles",
      accent: "indigo",
      description: "Pandas, NumPy, Plotly, Power BI, Geospatial GeoJSON analysis, NLP, and model training pipelines."
    },
    {
      id: "devops",
      title: "Databases & DevOps",
      icon: "shield-check",
      accent: "emerald",
      description: "PostgreSQL, MySQL, SQLite, SQLAlchemy ORM, Docker containerization, and Git CI/CD workflows."
    }
  ]
};

export const experiences = [
  {
    company: "Motive",
    role: "Data Analyst",
    period: "Nov 2025 – Present",
    location: "Lahore, Pakistan",
    link: null,
    bullets: [
      "Analyzed and validated large-scale datasets to identify data quality issues, inconsistencies, and trends.",
      "Performed data cleaning, validation, and quality assurance to ensure accurate and reliable datasets for AI/ML workflows.",
      "Reviewed data metrics and workflow outputs to identify improvement opportunities and support data-driven decisions."
    ],
    tags: ["Data Analysis", "Data Validation", "Data Quality", "Data Cleaning", "AI/ML Data", "Data Visualization"]
  },
  {
    company: "CybeCloud Pvt Ltd",
    role: "Software Engineer",
    period: "Aug 2025 – Nov 2025",
    location: "Islamabad, Pakistan",
    link: null,
    bullets: [
      "Developed scalable full-stack web applications utilizing FastAPI, Flask, Django, and React.",
      "Built resilient backend systems and REST APIs with secure authentication layers and database integrations.",
      "Designed responsive and cross-browser compatible UI components using HTML5, CSS3, JavaScript, and Tailwind."
    ],
    tags: ["FastAPI", "Django", "Flask", "React.js", "REST APIs", "SQL"]
  },
  {
    company: "LogicChasers Pvt Ltd",
    role: "Software Engineer",
    period: "Aug 2024 – Aug 2025",
    location: "Islamabad, Pakistan",
    link: "https://logicchasers.com/",
    summary: "Led key backend development and full-stack implementations across Python web services. Implemented JWT endpoint protection, automated data pipelines, interactive mapping modules, and executive reporting systems.",
    modules: [
      {
        title: "Geospatial Web App & Interactive GeoJSON Mapping",
        icon: "map-pin",
        body: "Engineered Leaflet.js and GeoJSON interactive mapping layers featuring multi-basemap switches, custom marker cluster logic, tooltips, and geospatial boundary exports. Built comparative stacked bar charts using Plotly to analyze consumption and waste data with real-time session filtering. Integrated python-pptx to generate PowerPoint presentation decks automatically embedding charts and project metadata."
      },
      {
        title: "FastAPI Authentication & Secure API Architecture",
        icon: "shield",
        body: "Engineered a robust JWT authentication system linking a React single-page frontend to a FastAPI backend. Implemented OAuth2PasswordBearer token rotation, client-side route redirection, CORS controls, and styled UI with Tailwind CSS."
      },
      {
        title: "PHP-Based CRUD System & Dynamic Fiscal Tax Calculator",
        icon: "calculator",
        body: "Constructed an employee data management system in PHP and MySQL with dynamic fiscal year linking. Developed a progressive income tax engine calculating monthly and annual liabilities based on official fiscal tax brackets."
      },
      {
        title: "Machine Learning & NLP Sentiment Analysis",
        icon: "cpu",
        body: "Trained a sentiment analysis and natural language processing model on healthcare communication data to detect early indicators of disease outbreaks."
      }
    ],
    tags: ["FastAPI", "Flask", "React.js", "Leaflet.js", "GeoJSON", "Pandas", "Plotly", "Power BI", "python-pptx", "SQLAlchemy"]
  }
];

export const skillCategories = [
  {
    category: "Backend & APIs",
    icon: "server",
    skills: [
      "Python", "FastAPI", "Flask", "Django", "Node.js", "RESTful APIs", "JWT & OAuth2", "Microservices"
    ]
  },
  {
    category: "Frontend & UI",
    icon: "layout",
    skills: [
      "React.js", "JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "Tailwind CSS", "Bootstrap 5", "Jinja2", "Responsive Design"
    ]
  },
  {
    category: "Databases & ORM",
    icon: "database",
    skills: [
      "PostgreSQL", "MySQL", "SQLite", "SQLAlchemy ORM", "Schema Design", "Query Optimization"
    ]
  },
  {
    category: "Data & AI Analytics",
    icon: "trending-up",
    skills: [
      "Pandas", "NumPy", "Plotly", "Matplotlib & Seaborn", "Power BI", "Machine Learning", "NLP", "python-pptx"
    ]
  },
  {
    category: "DevOps & Tools",
    icon: "settings",
    skills: [
      "Docker", "Docker Compose", "Git & GitHub", "Bitbucket & GitLab", "CI/CD Pipelines", "PyTest & Postman", "Vercel & Netlify"
    ]
  }
];

export const marqueeLogos = [
  { name: "Python", image: "/images/python.png" },
  { name: "FastAPI", image: "/images/fastapi.png" },
  { name: "Django", image: "/images/django.png" },
  { name: "Flask", image: "/images/flask.png" },
  { name: "React", image: "/images/react.png" },
  { name: "JavaScript", image: "/images/javascript.png" },
  { name: "PostgreSQL", image: "/images/postgresql.png" },
  { name: "MySQL", image: "/images/mysql.png" },
  { name: "Docker", image: "/images/docker.png" },
  { name: "Git", image: "/images/git.png" },
  { name: "GitHub", image: "/images/github.png" }
];

export const proficiencies = [
  { name: "Python Backend Engineering", percentage: 90, category: "Backend" },
  { name: "HTML5, CSS3 & Modern UI", percentage: 95, category: "Frontend" },
  { name: "Data Visualization (Plotly, Seaborn)", percentage: 90, category: "Data" },
  { name: "Data Science (NumPy & Pandas)", percentage: 90, category: "Data" },
  { name: "Databases (Postgres, MySQL, SQLite)", percentage: 90, category: "Database" },
  { name: "Power BI Dashboards", percentage: 90, category: "Data" },
  { name: "Machine Learning & NLP", percentage: 85, category: "AI/ML" },
  { name: "FastAPI & Flask APIs", percentage: 85, category: "Backend" },
  { name: "JavaScript & React.js", percentage: 75, category: "Frontend" },
  { name: "Django & REST Framework", percentage: 75, category: "Backend" }
];

export const projects = [
  {
    id: "9",
    title: "RetailPulse — Cloud POS & Sales Intelligence",
    badge: "FastAPI & React POS",
    isActive: true,
    category: "fullstack",
    categories: ["fullstack", "backend", "data"],
    summary: "Full-stack retail management suite featuring rapid barcode POS checkout, atomic inventory tracking, customer loyalty tiers, and real-time profit analytics dashboards.",
    overview: "Full-stack retail management suite featuring rapid barcode POS checkout, atomic inventory tracking, customer loyalty tiers, and real-time profit analytics dashboards.",
    highlights: [
      "Cloud POS Terminal: Rapid barcode scanner and product lookup, quantity adjustments, and automated tax calculations.",
      "Sales Intelligence Dashboard: Real-time revenue, gross/net profit margins, average order value (AOV), and interactive trend curves powered by Plotly.js.",
      "Inventory Health & Stock Alerts: Live stock categorization (Healthy, Low Stock, Stockout) with low-stock warnings and SKU monitoring.",
      "Customer Loyalty & Discounts: Integrated loyalty tier discounts, order breakdown, cash/card checkout workflows, and tender confirmation.",
      "Modern Backend Architecture: High-performance FastAPI REST API endpoints backed by SQLAlchemy ORM and secure JWT authentication."
    ],
    techStack: ["FastAPI", "React.js", "SQLAlchemy", "Plotly.js", "JWT Auth", "PostgreSQL / SQLite", "Tailwind CSS"],
    github: "https://github.com/Logic-ui/Sales-dashboard",
    demo: "https://sales-dashboard-mu-silk.vercel.app/",
    images: [
      "/images/sales-dashboard-preview.png",
      "/images/sales1.jpg",
      "/images/sales2.png",
      "/images/sales3.jpg",
      "/images/sales4.jpg",
      "/images/sales5.jpg",
      "/images/sales6.jpg"
    ]
  },
  {
    id: "1",
    title: "Employee Information Management System",
    badge: "PHP & MySQL",
    category: "fullstack",
    categories: ["fullstack", "backend"],
    summary: "An enterprise PHP & MySQL system handling employee profiles, fiscal year records, and dynamic automated income tax calculations.",
    overview: "A full-fledged PHP and MySQL web application engineered to manage enterprise employee records, fiscal years, and dynamic income tax computations.",
    highlights: [
      "Employee Module: Complete CRUD operations handling salary structures, departmental assignments, and profile metadata.",
      "Fiscal Year System: Dynamic linkage between financial years and corresponding progressive tax slabs.",
      "Dynamic Tax Engine: Automated calculations of monthly and annual tax liabilities based on salary brackets and exemption thresholds.",
      "Admin Reporting: Instant tax deductions summary with tabular breakdown and exportable records."
    ],
    techStack: ["PHP", "MySQL", "Tax Engine", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    github: "https://github.com/Logic-ui/Employee-Information-Management-System",
    demo: null,
    images: [
      "/images/year1.jpg",
      "/images/year2.jpg",
      "/images/year3.jpg",
      "/images/year4.jpg",
      "/images/year5.jpg"
    ]
  },
  {
    id: "2",
    title: "Geospatial Data Visualization Web App",
    badge: "Flask & Leaflet",
    category: "data",
    categories: ["data", "backend"],
    summary: "Interactive spatial analytics app with Leaflet.js basemaps, GeoJSON polygons, SQLite dynamic CRUD, and synchronized Plotly charts.",
    overview: "Interactive geospatial web platform integrating Flask, Leaflet.js, and GeoJSON to analyze and visualize spatial consumption, boundaries, and regional metrics.",
    highlights: [
      "Interactive Mapping Engine: Multi-layer basemap switching (satellite, terrain, street) powered by Leaflet.js with custom marker clusters.",
      "GeoJSON Analytics: Dynamic rendering of spatial polygons, coordinates, and regional boundary indicators.",
      "Data CRUD & Storage: Seamless SQLite back-end with Flask routes handling spatial data creation and attributes.",
      "Plotly Chart Integration: Synchronized Plotly stacked bar charts visualizing consumption & waste trends alongside geographic maps."
    ],
    techStack: ["Flask", "Leaflet.js", "GeoJSON", "Plotly", "SQLite", "Jinja2"],
    github: "https://github.com/Logic-ui/Geospatial-Data-Visualization-Web-Application",
    demo: null,
    images: [
      "/images/flask1.jpg",
      "/images/flask2.jpg",
      "/images/flask3.jpg",
      "/images/flask4.jpg",
      "/images/flask5.jpg"
    ]
  },
  {
    id: "3",
    title: "Secure SQL Query Interface with FastAPI & React",
    badge: "FastAPI & React",
    category: "fullstack",
    categories: ["fullstack", "backend"],
    summary: "Full-stack web application featuring JWT access authentication, protected routes, and a clean React UI for secure SQL query generation.",
    overview: "High-performance SQL query interface built with React, TypeScript, and FastAPI, featuring strict JWT token validation and role-based access control.",
    highlights: [
      "JWT Authentication: Secure token-based user authentication using OAuth2PasswordBearer with client-side session management.",
      "Modern React UI: Built with TypeScript, Tailwind CSS, and React Router with protected route redirection logic.",
      "FastAPI API Layer: Async RESTful endpoints handling SQL schema inspection and query dispatching with robust error handling.",
      "Security & CORS: Tight cross-origin resource sharing policies preventing unauthorized API access and query injections."
    ],
    techStack: ["FastAPI", "Python", "React.js", "TypeScript", "Tailwind CSS", "OAuth2", "JWT", "MySQL"],
    github: "https://github.com/Logic-ui/Secure-SQL-Query-Interface-with-FastAPI-React",
    demo: null,
    images: [
      "/images/fastapi.jpg",
      "/images/fastapi.png"
    ]
  },
  {
    id: "4",
    title: "Full-Stack Reporting & Geospatial Dashboard",
    badge: "Report Automation",
    category: "data",
    categories: ["data", "backend"],
    summary: "Integrated Flask system with GeoJSON mapping, Pandas data normalization, and automated PowerPoint presentation generation via python-pptx.",
    overview: "Enterprise-grade full-stack data platform providing dynamic analytical dashboards, interactive maps, and automated PowerPoint presentation generation.",
    highlights: [
      "Automated PPT Generation: Integrates python-pptx to generate formatted executive PowerPoint presentations with dynamic charts and uploaded images.",
      "Data Pipelines: Pandas-driven data normalization, aggregation, and session-based caching for real-time reporting.",
      "Interactive Geospatial Maps: Custom GeoJSON overlays with dynamic tooltip inspection and geo-filtering.",
      "Modular Database Design: Structured SQLAlchemy models managing project metadata, material color assignment logic, and asset files."
    ],
    techStack: ["Flask", "python-pptx", "Pandas", "SQLAlchemy", "GeoJSON", "Plotly"],
    github: "https://github.com/Logic-ui",
    demo: null,
    images: [
      "/images/geo-report1.jpg",
      "/images/geo-report2.jpg",
      "/images/geo-report3.jpg",
      "/images/geo-report4.jpg"
    ]
  },
  {
    id: "5",
    title: "FastAPI CRUD Task Manager",
    badge: "FastAPI & SQLAlchemy",
    category: "backend",
    categories: ["backend"],
    summary: "Full-stack task manager built with FastAPI, SQLAlchemy ORM, SQLite, and an interactive Jinja2 frontend with delete confirmation popups.",
    overview: "Robust task and workflow management web application developed with FastAPI, SQLAlchemy ORM, SQLite, and an interactive Jinja2 frontend.",
    highlights: [
      "RESTful Architecture: FastAPI routes handling task creation, status updates, editing, and soft-delete operations.",
      "Database Modeling: SQLAlchemy ORM models with SQLite persistent storage and automatic schema migrations.",
      "Interactive Frontend: Fetch API integration for async confirmation modals and real-time DOM status updates.",
      "Workflow Tracking: Status filters (Pending, In-Progress, Completed) with responsive UI."
    ],
    techStack: ["FastAPI", "Python", "SQLAlchemy", "SQLite", "Jinja2", "JavaScript", "CSS3"],
    github: "https://github.com/Logic-ui/Secure-SQL-Query-Interface-with-FastAPI-React",
    demo: null,
    images: [
      "/images/crud1.png",
      "/images/crud2.png",
      "/images/crud3.png",
      "/images/crud4.png"
    ]
  },
  {
    id: "6",
    title: "Pizza Ordering & Admin Management System",
    badge: "FastAPI Commercial",
    category: "backend",
    categories: ["backend", "fullstack"],
    summary: "FastAPI-based food commerce system with customer cart, checkout, and admin dashboard for pizza inventory and image upload handling.",
    overview: "Full-stack food ordering solution featuring a customer-facing interactive menu, shopping cart, checkout flow, and a comprehensive admin inventory portal.",
    highlights: [
      "Customer Experience: Interactive product catalog, dynamic price calculations, and shopping cart persistence.",
      "Admin Portal: Comprehensive CRUD interface to add pizzas, manage ingredient pricing, and handle image file uploads.",
      "Order Pipeline: Real-time order placement with customer contact details, itemized tracking, and revenue totals.",
      "Backend Engine: Built on FastAPI with SQLAlchemy ORM and structured database seeding routines."
    ],
    techStack: ["FastAPI", "Python", "SQLAlchemy", "Jinja2", "E-Commerce", "JavaScript"],
    github: "https://github.com/Logic-ui/pizza-site",
    demo: null,
    images: [
      "/images/piza shop1.png",
      "/images/pizza shop 2.png",
      "/images/pizza shop 3.png",
      "/images/pizza shop 4.png",
      "/images/piza shop5.png"
    ]
  },
  {
    id: "7",
    title: "Todo App — Full-Stack Django & React",
    badge: "Django & React",
    category: "fullstack",
    categories: ["fullstack", "backend"],
    summary: "Production-grade task manager with Django REST Framework, React.js UI, PostgreSQL database, SimpleJWT authentication, and Docker deployment.",
    overview: "Production-ready task management application built with Django REST Framework backend, React frontend, PostgreSQL database, and Docker containerization.",
    highlights: [
      "Decoupled Architecture: REST API backend powered by Django REST Framework serving a single-page React frontend.",
      "Authentication: Secure token-based auth using SimpleJWT with access and refresh token rotation.",
      "Database & Models: PostgreSQL database integrated with Django ORM for optimal query speed.",
      "DevOps & Deployment: Fully containerized with Docker and Docker-Compose for unified development and deployment."
    ],
    techStack: ["Django REST", "React.js", "PostgreSQL", "Docker", "JWT", "Bootstrap"],
    github: "https://github.com/Logic-ui/django-todo-react",
    demo: null,
    images: [
      "/images/todo8.png",
      "/images/todo10.png",
      "/images/todo11.png",
      "/images/todo2.png",
      "/images/todo3.png",
      "/images/todo4.png"
    ]
  },
  {
    id: "8",
    title: "Employee Dashboard — Flask & React",
    badge: "Flask & React",
    category: "fullstack",
    categories: ["fullstack", "backend", "data"],
    summary: "Full-stack HR dashboard with Chart.js analytics, real-time table search, pagination, XLSX/PDF automated reports, and dark/light themes.",
    overview: "Feature-packed enterprise HR dashboard featuring interactive employee tables, statistical charts, dark/light themes, and automated Excel/PDF exports.",
    highlights: [
      "Data Visualization: Embedded Chart.js charts providing workforce demographic breakdowns and salary distributions.",
      "Data Export Engine: Instant XLSX spreadsheet and formatted PDF generation directly from client and backend data.",
      "Advanced Table Operations: Real-time search, multi-column sorting, pagination, and inline CRUD modal forms.",
      "Theme System: Seamless toggle between dark and light themes with state persistence."
    ],
    techStack: ["Flask", "React.js", "Chart.js", "XLSX/PDF", "SQLite", "Axios"],
    github: "https://github.com/Logic-ui/employee-management",
    demo: null,
    images: [
      "/images/employe1.png",
      "/images/employe2.png",
      "/images/employe3.png",
      "/images/employe4.png",
      "/images/employe5.png"
    ]
  }
];
