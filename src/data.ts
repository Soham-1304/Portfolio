export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  domain: string
  demoUrl: string
  github: string
  tags: string[]
  arch: { node: string; kind: "client" | "service" | "data" | "external" }[]
  overview: string
  problem: string
  contribution: string
  results: string
}

export const experience = {
  org: "FOSSEE – IIT Bombay",
  role: "Software Development Intern (Open Source)",
  date: "May – Aug 2026",
  location: "On-Site · IIT Bombay",
  summary:
    "Working inside OSDAG-BRIDGE, an open-source bridge design and structural analysis tool built by a 25+ contributor engineering team.",
  highlights: [
    "Wrote backend modules across CAD generation, plotting, and report-generation layers, wiring solver output through to the UI.",
    "Built nodal-load visualization (Grillage overlay + toolbar controls) and LaTeX-driven report/plot auto-generation from analysis results.",
    "Optimized and refactored core CAD/plotting code paths for speed and reuse; fixed cross-module bugs surfaced during integration testing.",
    "Mastered industry Git/GitHub workflows on the job – branching, rebasing, resolving conflicts, and iterating through PR review cycles with the core team.",
  ],
  tags: ["Python", "Matplotlib", "LaTeX", "CAD Tooling", "Git", "Open Source"],
  openSource: [
    { repo: "Aditya-Donde/OsdagBridge", note: "Core CAD generation, nodal-load visualization, and LaTeX automated reporting" },
  ],
  fullDescription:
    "Worked inside OSDAG-BRIDGE at FOSSEE IIT Bombay. Developed backend modules across the CAD generation, plotting, and report-generation layers, wiring structural solver outputs to interactive UI controls and automated LaTeX engineering reports.",
  learnings:
    "Deepened understanding of open-source team collaboration, multi-contributor PR review cycles, and high-performance CAD and plotting architecture.",
}

export const projects: Project[] = [
  {
    id: "dhokha",
    name: "Dhokha",
    tagline: "Cross-bank UPI fraud intelligence & ONNX-powered ML detection",
    description:
      "A full-stack fraud detection platform combining a React investigation dashboard, a FastAPI ML scoring service with ONNX inference, and graph-based swarm detection across cross-bank UPI transactions.",
    domain: "dhokha-vert.vercel.app",
    demoUrl: "https://dhokha-vert.vercel.app/",
    github: "https://github.com/Soham-1304/Dhokha",
    tags: ["FastAPI", "LightGBM", "ONNX", "NetworkX", "WebSockets", "React", "Docker"],
    arch: [
      { node: "React Dashboard", kind: "client" },
      { node: "FastAPI Scorer", kind: "service" },
      { node: "ONNX Risk Model", kind: "service" },
      { node: "NetworkX Graph", kind: "data" },
    ],
    overview:
      "Dhokha is a fraud intelligence system for cross-bank UPI transactions. The FastAPI backend serves an ONNX-compiled LightGBM model combined with rule-based checks and NetworkX transaction graph centrality to catch fraud swarms in real time.",
    problem:
      "UPI fraud often involves coordinated swarms of accounts across multiple banks. Traditional rule-based checks fail to detect graph-level connection patterns or serve sub-100ms ML scores during live transaction streams.",
    contribution:
      "Built the full platform end-to-end: trained and compiled the LightGBM model to ONNX for CPU inference, designed NetworkX graph scoring for mule networks, exposed WebSocket event streams, and shipped the React investigation dashboard with Docker containerization.",
    results:
      "Scores every transaction 0–100 in real time with zero GPU dependency; containerized for AWS EC2/ECS/App Runner behind Nginx + TLS with persisted transaction history.",
  },
  {
    id: "evercare",
    name: "Evercare",
    tagline: "AI-driven personal health tracker with OCR & unified timeline",
    description:
      "A comprehensive HealthTech platform that uses OCR and Google Gemini AI to extract and simplify medical documents, tracks vitals and doctor visits, and builds a unified personal health timeline with AI-powered insights.",
    domain: "evercare-five.vercel.app",
    demoUrl: "https://evercare-five.vercel.app/",
    github: "https://github.com/Soham-1304/Evercare",
    tags: ["React 19", "Node.js", "Express", "Supabase", "Gemini AI", "OCR", "Recharts"],
    arch: [
      { node: "React 19 UI", kind: "client" },
      { node: "Express REST API", kind: "service" },
      { node: "Gemini AI + OCR", kind: "external" },
      { node: "Supabase DB (RLS)", kind: "data" },
    ],
    overview:
      "Evercare automates medical record extraction from lab reports and prescriptions using Gemini AI + OCR, providing a color-coded chronological health timeline, smart abnormal reading alerts, vitals tracking, and date-range AI health conversations.",
    problem:
      "Patients struggle to interpret and organize fragmented medical records across multiple providers. There was no unified, AI-simplified view of their personal health history with strict data isolation.",
    contribution:
      "Architected the full-stack system with Supabase authentication and Row-Level Security (RLS), modular controller-service REST APIs, Recharts metric dashboards, and the dual Gemini AI + Tesseract.js OCR processing pipeline.",
    results:
      "Provides multi-tenant data isolation across user roles, automated extraction of abnormal lab values, and real-time vitals tracking deployed across Vercel and Render.",
  },
  {
    id: "quizstorm",
    name: "QuizStorm",
    tagline: "Real-time multiplayer trivia with backend-authoritative game logic",
    description:
      "A MERN stack multiplayer quiz platform inspired by Kahoot, with backend-authoritative game state, Socket.IO real-time sync, server-side timers, and JWT authentication.",
    domain: "quiz-storm.vercel.app",
    demoUrl: "https://quiz-storm.vercel.app/",
    github: "https://github.com/Soham-1304/QuizStorm",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    arch: [
      { node: "React Client", kind: "client" },
      { node: "Express API", kind: "service" },
      { node: "Socket.IO Engine", kind: "service" },
      { node: "MongoDB Store", kind: "data" },
    ],
    overview:
      "QuizStorm is a real-time multiplayer trivia game where the backend is fully authoritative — the server exclusively controls all question ordering, timer countdowns, answer validation, and score computation, while the React frontend acts as a pure reactive renderer.",
    problem:
      "Most trivia apps run timers and scoring on the client, making them prone to tampering. QuizStorm demonstrates how latency-sensitive multiplayer games should synchronize state authoritatively over WebSockets.",
    contribution:
      "Engineered the Socket.IO real-time game lifecycle, event-driven leaderboard sync, scalable MongoDB schemas with clean separation of API/socket/middleware layers, and complete JWT-based game room management.",
    results:
      "Fast in-memory game state for live gameplay combined with persistent MongoDB session history and secure JWT authentication for room lifecycles.",
  },
]

export interface SkillItem {
  name: string
  experience: string
  focus?: string
  logo: string
  tier: "gold" | "silver" | "bronze"
}

export interface SkillGroup {
  name: string
  description: string
  skills: SkillItem[]
}

const dv = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

export const skillCategories: SkillGroup[] = [
  {
    name: "Languages",
    description: "Primary programming languages for systems, backend services, and algorithms.",
    skills: [
      { name: "Python", experience: "3+ yrs", focus: "FastAPI, ONNX, ML, Matplotlib", logo: dv("python"), tier: "gold" },
      { name: "JavaScript", experience: "2+ yrs", focus: "Node.js, Express, React 19", logo: dv("javascript"), tier: "gold" },
      { name: "C++", experience: "2+ yrs", focus: "DSA, Competitive Programming", logo: dv("cplusplus"), tier: "gold" },
      { name: "SQL", experience: "2+ yrs", focus: "PostgreSQL, MySQL, RLS", logo: dv("azuresqldatabase"), tier: "gold" },
      { name: "Golang", experience: "Learning", focus: "Concurrency, Microservices", logo: dv("go", "original-wordmark"), tier: "bronze" },
    ],
  },
  {
    name: "Backend & APIs",
    description: "Architecting resilient microservices, WebSockets, and scalable APIs.",
    skills: [
      { name: "Node.js", experience: "2+ yrs", focus: "Express, Async I/O, REST", logo: dv("nodejs"), tier: "gold" },
      { name: "Express", experience: "2+ yrs", focus: "Controller-Service, Middleware", logo: dv("express", "original"), tier: "gold" },
      { name: "FastAPI", experience: "2+ yrs", focus: "Pydantic, Async, OpenAPI", logo: dv("fastapi"), tier: "gold" },
      { name: "WebSockets", experience: "1.5+ yrs", focus: "Socket.IO, Live Streams", logo: dv("socketio"), tier: "gold" },
      { name: "JWT", experience: "2+ yrs", focus: "Auth, Tokenized Consent", logo: dv("json"), tier: "silver" },
    ],
  },
  {
    name: "Databases & Storage",
    description: "Relational, document, and in-memory databases with security and indexing.",
    skills: [
      { name: "PostgreSQL", experience: "2+ yrs", focus: "Supabase, Row-Level Security", logo: dv("postgresql"), tier: "gold" },
      { name: "MongoDB", experience: "2+ yrs", focus: "Mongoose, Scalable Schemas", logo: dv("mongodb"), tier: "gold" },
      { name: "Redis", experience: "1.5+ yrs", focus: "TTL Tokens, In-Memory Caching", logo: dv("redis"), tier: "gold" },
      { name: "MySQL", experience: "2+ yrs", focus: "Relational Modeling, Queries", logo: dv("mysql"), tier: "silver" },
      { name: "Supabase", experience: "2+ yrs", focus: "Auth, Storage, RLS Policies", logo: dv("supabase"), tier: "gold" },
    ],
  },
  {
    name: "ML, Data & Applied AI",
    description: "Model inference, graph network analysis, and AI extraction pipelines.",
    skills: [
      { name: "LightGBM & ONNX", experience: "1+ yr", focus: "CPU Risk Inference", logo: dv("python"), tier: "gold" },
      { name: "NetworkX", experience: "1+ yr", focus: "Graph Swarm & Mule Centrality", logo: dv("python"), tier: "gold" },
      { name: "Gemini API", experience: "1+ yr", focus: "Multimodal AI & OCR", logo: dv("google"), tier: "gold" },
      { name: "NumPy & Pandas", experience: "2+ yrs", focus: "Data Wrangling, Pipelines", logo: dv("pandas"), tier: "gold" },
      { name: "Matplotlib (3D)", experience: "1.5+ yrs", focus: "CAD & Nodal Load Plotting", logo: dv("python"), tier: "silver" },
    ],
  },
  {
    name: "DevOps & Cloud",
    description: "Containerization, cloud infrastructure, deployment, and automation.",
    skills: [
      { name: "Docker", experience: "2+ yrs", focus: "Containers, Multi-stage", logo: dv("docker"), tier: "gold" },
      { name: "AWS", experience: "1+ yr", focus: "EC2, App Runner, API Gateway", logo: dv("amazonwebservices", "original-wordmark"), tier: "silver" },
      { name: "Git & GitHub", experience: "3+ yrs", focus: "Rebase, PR Cycles, FOSSEE", logo: dv("git"), tier: "gold" },
      { name: "Nginx", experience: "1+ yr", focus: "Reverse Proxy, TLS", logo: dv("nginx"), tier: "silver" },
      { name: "Vercel & Render", experience: "2+ yrs", focus: "Production Deployments", logo: dv("vercel"), tier: "gold" },
    ],
  },
  {
    name: "Core CS Fundamentals",
    description: "Rigorous algorithmic foundations and systems design principles.",
    skills: [
      { name: "DSA", experience: "3+ yrs", focus: "280+ LeetCode Solved", logo: dv("cplusplus"), tier: "gold" },
      { name: "System Design", experience: "2+ yrs", focus: "Microservices, WebSockets", logo: dv("networkx", "original"), tier: "gold" },
      { name: "DBMS & OS", experience: "2+ yrs", focus: "Transactions, Concurrency", logo: dv("linux"), tier: "gold" },
      { name: "Computer Networks", experience: "2+ yrs", focus: "TCP/IP, REST, WebSockets", logo: dv("networkx", "original"), tier: "gold" },
    ],
  },
]

/** Handful of top core competencies featured on the landing scroll */
export const topSkills: SkillItem[] = [
  { name: "Python", experience: "3+ yrs", focus: "FastAPI, ONNX, ML, Matplotlib", logo: dv("python"), tier: "gold" },
  { name: "Node.js", experience: "2+ yrs", focus: "Express, Controller-Service", logo: dv("nodejs"), tier: "gold" },
  { name: "FastAPI", experience: "2+ yrs", focus: "Async, OpenAPI, ML Scoring", logo: dv("fastapi"), tier: "gold" },
  { name: "PostgreSQL", experience: "2+ yrs", focus: "Supabase, Row-Level Security", logo: dv("postgresql"), tier: "gold" },
  { name: "Docker", experience: "2+ yrs", focus: "Containers, Multi-stage", logo: dv("docker"), tier: "gold" },
  { name: "WebSockets", experience: "1.5+ yrs", focus: "Socket.IO, Event Streams", logo: dv("socketio"), tier: "gold" },
  { name: "Gemini API", experience: "1+ yr", focus: "Multimodal AI & OCR Pipelines", logo: dv("google"), tier: "gold" },
  { name: "Redis", experience: "1.5+ yrs", focus: "TTL Tokens, Caching, Pub/Sub", logo: dv("redis"), tier: "gold" },
]

export const achievements = [
  { metric: "9.73", label: "CGPA · Academic Topper", note: "Academic Topper for 2024-25 & 2025-26 in B.Tech Computer Science & Engineering at ITM Skills University." },
  { metric: "280+", label: "LeetCode Problems", note: "Consistent algorithmic mastery across graph algorithms, dynamic programming, and time/space complexity optimization." },
  { metric: "25+", label: "FOSSEE Contributor Team", note: "Core developer on OSDAG-BRIDGE at IIT Bombay building CAD generation, plotting, and LaTeX reporting modules." },
  { metric: "3", label: "Production Full-Stack Systems", note: "Architected and shipped end-to-end applications with ONNX ML inference, WebSockets, Supabase RLS, and AI pipelines." },
]

export const coCurricular = [
  { period: "2025 – Present", title: "Lead — Competitive Coding Club", note: "Building a stronger problem-solving culture through campus-wide contests, DSA workshops, and hands-on mentoring at ITM Skills University." },
  { period: "May – Aug 2026", title: "Open Source Developer — FOSSEE IIT Bombay", note: "Contributed to OSDAG-BRIDGE through CAD generation, nodal-load visualization, and automated LaTeX engineering reports." },
  { period: "2024 – Present", title: "Technical Architecture & Systems", note: "I build by turning curiosity into projects like fraud detection, health data extraction, and automation." },
]

export const certifications = [
  { name: "B.Tech Computer Science & Engineering", issuer: "ITM Skills University", date: "2024 – 2028 (CGPA: 9.73)", verify: "#" },
  { name: "Software Development Internship", issuer: "FOSSEE – IIT Bombay", date: "2026", verify: "https://github.com/Aditya-Donde/OsdagBridge/pulls?q=is%3Apr+author%3ASoham-1304" },
]

export const siteLinks = {
  github: "https://github.com/Soham-1304",
  linkedin: "https://www.linkedin.com/in/soham-karandikar1304",
  leetcode: "https://leetcode.com/u/SomK_1304/",
  email: "sohamiscoding@gmail.com",
  phone: "+91-7588720672",
  resume: "/Soham_Resume1.pdf",
}
