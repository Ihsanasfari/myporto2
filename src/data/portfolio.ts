import type { Experience, Project, SiteConfig, SkillGroup } from "@/types";

export const site: SiteConfig = {
  name: "Ihsan Asfari Hanifan",
  role: "Front-End Developer",
  headline: "I build clean, scalable interfaces for AI-powered products.",
  positioning:
    "I build clean, scalable interfaces for AI-powered products, dashboards, and workflow-based web apps.",
  location: "Bandung, Indonesia",
  about:
    "I'm a front-end developer from Bandung, Indonesia, focused on building clean, scalable, and user-friendly web interfaces. I enjoy working on AI products, dashboards, chat interfaces, and complex product flows.",
  email: "ihsanasfarih@gmail.com",
  cvUrl: "/file/Ihsan Asfari Hanifan.pdf",
  linkedin: "https://www.linkedin.com/in/ihsan-asfari-hanifan/",
  github: "https://github.com/Ihsanasfari",
  techBadges: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Redux",
    "API Integration",
    "AI UI"
  ]
};

export const projects: Project[] = [
  {
    slug: "projected-ai",
    name: "Projected AI — Contract IQ / CV IQ",
    tagline: "Enterprise AI document intelligence platform",
    description:
      "An enterprise platform where teams chat with contracts and CVs using generative AI. I built the chat interface, document preview, prompt settings, and export flows used daily by enterprise clients.",
    year: "2024 — Present",
    techStack: ["Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "REST API"],
    keyFeatures: [
      "Streaming AI chat interface with message history",
      "Side-by-side document preview with source citations",
      "Configurable prompt and model settings panel",
      "Export answers to PDF and DOCX"
    ],
    mockup: "ai-chat",
    accent: "#7c6cf6",
    featured: true,
    demoLink: "https://projectedai.au",
    caseStudy: {
      problem:
        "Enterprise teams in construction and recruitment were spending hours manually reading contracts and CVs to answer simple questions. They needed a reliable interface to query large documents with AI and trust the answers.",
      role:
        "Front-end developer owning the chat experience end-to-end: UI architecture, Redux state design, streaming rendering, document preview, and export features.",
      keyFeatures: [
        "Real-time streaming chat with markdown rendering and citation links",
        "Document viewer synced to AI answers so users can verify sources",
        "Prompt settings panel for tone, model, and context controls",
        "Multi-format export (PDF/DOCX) of AI-generated summaries"
      ],
      technicalChallenges: [
        "Rendering token-by-token streaming responses without layout jank",
        "Keeping chat, document, and settings state consistent across a complex Redux store",
        "Handling very large documents in the preview without blocking the main thread",
        "Designing optimistic UI and error recovery for long-running AI requests"
      ],
      result:
        "Shipped to enterprise clients including an Australian mining contractor. Reduced document review time from hours to minutes and became the core product of the platform."
    }
  },
  {
    slug: "crm-dashboard-builder",
    name: "CRM Dashboard Builder",
    tagline: "Configurable analytics dashboards for sales teams",
    description:
      "A dashboard builder that lets sales teams compose their own CRM views from reusable widgets — pipeline charts, KPI cards, activity feeds, and filterable data tables.",
    year: "2024",
    techStack: ["Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Recharts"],
    keyFeatures: [
      "Drag-and-drop widget grid with persisted layouts",
      "Reusable chart, KPI, and table components",
      "Global filters synced across all widgets",
      "Role-based views for managers and reps"
    ],
    mockup: "crm",
    accent: "#60a5fa",
    featured: true,
    caseStudy: {
      problem:
        "Sales teams relied on rigid, one-size-fits-all CRM reports. Every team wanted different metrics, and each change required a developer.",
      role:
        "Front-end developer designing the widget system architecture, building the component library, and implementing layout persistence and filtering.",
      keyFeatures: [
        "Widget registry pattern so new widget types plug in with zero layout changes",
        "Grid layout with drag, resize, and per-user persistence",
        "Cross-widget filter bus (date range, owner, pipeline stage)",
        "Skeleton loading and empty states for every widget"
      ],
      technicalChallenges: [
        "Designing a widget contract generic enough for charts, tables, and KPIs",
        "Avoiding re-render storms when global filters change across many widgets",
        "Serializing and restoring user layouts safely across schema versions"
      ],
      result:
        "Teams self-serve their own dashboards without developer involvement. The widget system became a reusable internal UI kit for other product areas."
    }
  },
  {
    slug: "billiard-booking",
    name: "Billiard Booking Website",
    tagline: "Real-time table booking for a billiard venue",
    description:
      "A booking website where customers pick a table, choose a time slot, and confirm a reservation in under a minute — with a schedule grid that reflects live availability.",
    year: "2023",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    keyFeatures: [
      "Interactive time-slot grid with live availability",
      "Multi-step booking flow with validation",
      "Booking summary and confirmation screen",
      "Fully responsive, mobile-first design"
    ],
    mockup: "booking",
    accent: "#5eead4",
    featured: true,
    caseStudy: {
      problem:
        "The venue took bookings by phone and WhatsApp, which caused double bookings, no-shows, and constant back-and-forth about availability.",
      role:
        "Front-end developer building the entire customer-facing flow: schedule grid, booking wizard, and API integration.",
      keyFeatures: [
        "Visual schedule grid mapping tables against hourly slots",
        "Step-based reservation wizard with inline validation",
        "Clear pricing breakdown per duration and table type",
        "Mobile-first layout since most customers book from their phone"
      ],
      technicalChallenges: [
        "Modeling slot availability so the grid stays correct across timezones and edge cases",
        "Preventing race conditions in the UI when two users pick the same slot",
        "Keeping the booking flow fast on low-end mobile devices"
      ],
      result:
        "Replaced manual phone bookings with a self-serve flow, eliminated double bookings, and gave the venue a professional online presence."
    }
  },
  {
    slug: "portfolio-redesign",
    name: "Portfolio Redesign",
    tagline: "This site — a dark, SaaS-inspired developer portfolio",
    description:
      "A complete redesign of my portfolio into a premium, dashboard-inspired experience: dark theme, glassmorphism, command palette navigation, and content driven from a single data file.",
    year: "2025",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide"],
    keyFeatures: [
      "Command palette navigation (Ctrl + K)",
      "Animated dashboard preview in the hero",
      "Case studies generated from one data file",
      "Scroll progress and subtle motion throughout"
    ],
    mockup: "portfolio",
    accent: "#a5a0ff",
    featured: true,
    githubLink: "https://github.com/Ihsanasfari",
    caseStudy: {
      problem:
        "My previous portfolio looked like a generic personal site and didn't reflect the AI product and dashboard work I actually do professionally.",
      role:
        "Designer and developer — information architecture, design system, component library, and content.",
      keyFeatures: [
        "Single-source content model: every section reads from one typed data file",
        "Reusable section, card, and badge components",
        "Command palette, scroll progress, and animated product mockups",
        "Static generation for every page with full SEO metadata"
      ],
      technicalChallenges: [
        "Keeping animations subtle and performant (transform/opacity only)",
        "Building CSS-only product mockups instead of heavy screenshots",
        "Balancing a premium dark aesthetic with accessibility and contrast"
      ],
      result:
        "A portfolio that reads like a product site, loads fast, scores high on Lighthouse, and positions me clearly for AI product and dashboard roles."
    }
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Front-End",
    icon: "code",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "State & Data",
    icon: "database",
    skills: ["Redux Toolkit", "Axios", "REST API"]
  },
  {
    title: "UI / UX",
    icon: "layout",
    skills: ["Responsive Design", "Dashboard UI", "Component Systems"]
  },
  {
    title: "AI Product UI",
    icon: "sparkles",
    skills: ["Chat Interface", "Document Preview", "Prompt Settings", "Export Features"]
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: ["Git", "Figma", "Vercel"]
  }
];

export const experiences: Experience[] = [
  {
    role: "Front-End Developer",
    company: "Projected AI",
    period: "Jan 2024 — Present",
    description:
      "Building enterprise AI products: chat interfaces, document intelligence tools, and workflow dashboards for clients in construction and recruitment.",
    highlights: [
      "Own the front-end of Contract IQ and CV IQ, from architecture to shipped features",
      "Built streaming AI chat, document preview, and export systems used in production",
      "Work with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS daily"
    ]
  },
  {
    role: "Data Engineer Intern",
    company: "Baznas",
    period: "Jun 2022 — Aug 2022",
    description:
      "Worked on national-scale data infrastructure at Indonesia's national zakat agency.",
    highlights: [
      "Designed and maintained database schemas for donation data pipelines",
      "Built internal queries and reports used by the data team"
    ]
  },
  {
    role: "Teaching Assistant — Web Programming",
    company: "Telkom University",
    period: "Sep 2022 — Jan 2023",
    description:
      "Mentored students through the fundamentals of building for the web.",
    highlights: [
      "Guided lab sessions on HTML, CSS, JavaScript, and PHP",
      "Reviewed and graded student projects, giving practical code feedback"
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
