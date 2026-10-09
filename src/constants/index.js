// index.js
export const servicesData = [
  {
    title: "Full-Stack Web Development",
    description:
      "I build scalable, high-performance web applications with clean architecture and seamless user experiences—balancing elegant design with powerful backend logic.",

    items: [
      {
        title: "Frontend Craftsmanship",
        description:
          "(Next.js 14, React.js, Tailwind CSS, Material UI, GSAP, Framer Motion, Three.js, Scroll-based Animations & Transitions, Responsive UI/UX)",
      },
      {
        title: "Backend Engineering",
        description:
          "(Node.js, Express.js, REST APIs, PHP, Authentication Systems, Socket.io, Micro-service Architecture, WordPress API Integrations)",
      },
      {
        title: "Database Design",
        description:
          "(MySQL, MongoDB, PostgreSQL — Schema Design, Query Optimization, Caching Strategies)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Integration",
    description:
      "I handle deployments, server setups, and automation to keep your applications fast, secure, and always available. My focus is stability, maintainability, and ease of scaling.",
    items: [
      {
        title: "Version Control & CI",
        description: "(Git, GitHub, GitHub Actions, Automated Deployments)",
      },
      {
        title: "Cloud & Hosting",
        description:
          "(Vercel, Render, Linux Servers, Nginx Configuration, Environment Management)",
      },
      {
        title: "Performance Optimization",
        description:
          "(Caching, Compression, Code Splitting, Lazy Loading, Lighthouse & Web Vitals Tuning)",
      },
    ],
  },
  {
    title: "SaaS & Enterprise Solutions",
    description:
      "I’ve built production-ready SaaS and enterprise platforms that handle large-scale data, real-time events, and multi-tenant dashboards—designed for growth and reliability.",
    items: [
      {
        title: "SaaS Platforms",
        description:
          "(Multi-Client Dashboards, Access Control, Analytics Modules, Redis Caching)",
      },
      {
        title: "CRM & Automation",
        description:
          "(Lead Management, Payment Integrations, WhatsApp API Automation)",
      },
      {
        title: "Enterprise Apps",
        description:
          "(Finance Portals, Campaign Engines, Reporting Dashboards with Real-time Insights)",
      },
    ],
  },
];
export const projects = [
  {
    id: 7,
    name: "QuantDesk",
    personal: true,
    description:
      "My own multi-tenant algorithmic forex trading SaaS — Next.js dashboard + FastAPI engine running 13 strategies on users' own MetaTrader 5 accounts, with real-time Redis/WebSocket streaming, backtesting, risk gates and Stripe billing.",
    href: "https://www.bhaskar-tech.xyz/",
    image: "/assets/projects/quantdesk.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "FastAPI" },
      { id: 3, name: "Python" },
      { id: 4, name: "Redis" },
      { id: 5, name: "TimescaleDB" },
      { id: 6, name: "MetaTrader 5" },
    ],
  },
  {
    id: 1,
    name: "V3Cars",
    description:
      "A large-scale automotive listing site built on HTML/CSS/JS + jQuery/PHP/MySQL/Bootstrap — custom CMS & lead-flow engine deployed on Linux.",
    href: "https://www.v3cars.com/",
    image: "/assets/projects/v3cars.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "jQuery" },
      { id: 5, name: "PHP" },
      { id: 6, name: "MySQL" },
      { id: 7, name: "Bootstrap" },
    ],
  },
  {
    id: 2,
    name: "Credit Circle",
    description:
      "React Native mobile app + MySQL backend for WhatsApp-API powered lead automation and private SaaS CMS, built for finance portal CreditCircle.in.",
    href: "https://www.creditcircle.in/",
    image: "/assets/projects/credit-circle.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "React" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "Tailwind CSS" },
      { id: 5, name: "WhatsApp API" },
    ],
  },
  {
    id: 3,
    name: "TimesMoney",
    description:
      "Modern financial platform (Next.js 14 + React + Tailwind + MongoDB + shadcn) with custom CMS and lead-management workflows, deployed on Linux.",
    href: "https://timesmoney.in/",
    image: "/assets/projects/timesmoney.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js 14" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "shadcn/ui" },
    ],
  },
  {
    id: 4,
    name: "CarNDrive",
    description:
      "Next.js 14 + Tailwind CSS site with custom CMS, MySQL backend and third-party lead-flow APIs — built for automotive listings CarNDrive.com.",
    href: "https://www.carndrive.com/",
    image: "/assets/projects/carndrive.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Next.js 14" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "CMS" },
      { id: 5, name: "Lead-API Integration" },
    ],
  },
  {
    id: 5,
    name: "Tesla Redesign Website",
    description:
      "Personal showcase site (Next.js 14 + Tailwind + GSAP ScrollTrigger) built for product-display and UI-motion exploration, live on Vercel.",
    href: "https://tesla-concept-redesigned.vercel.app/",
    image: "/assets/projects/tesla-redesign.png",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Next.js 14" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "GSAP" },
      { id: 4, name: "ScrollTrigger" },
      { id: 5, name: "UI/UX Motion" },
    ],
  },
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Bhaskarpathriya27",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bhaskar-pathriya-2a314818a/",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bhaskar_pathriya_/",
  },
];
