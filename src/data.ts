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
  org: "Meridian Systems",
  role: "Backend Engineering Intern",
  date: "Jun 2025 – Aug 2025",
  location: "Remote",
  summary:
    "Owned ingestion pipelines and API contracts for a multi-tenant analytics platform serving 40+ internal teams.",
  highlights: [
    "Cut batch job latency by 38% by redesigning queue partitioning and back-pressure handling.",
    "Shipped observability dashboards that reduced mean time to detect pipeline failures from hours to minutes.",
    "Authored migration runbooks adopted by two downstream teams during a PostgreSQL major-version upgrade.",
  ],
  tags: ["Go", "PostgreSQL", "Redis", "Docker", "gRPC"],
  openSource: [
    { repo: "open-telemetry/go", note: "Added span attribute helpers for batch exporters" },
    { repo: "grpc/grpc-go", note: "Fixed retry policy edge case in client interceptors" },
  ],
  fullDescription:
    "Worked on the data platform team building reliable ingestion services. Focused on idempotent writes, schema evolution, and operational visibility across distributed workers.",
  learnings: "Deepened understanding of back-pressure, exactly-once semantics, and production-grade observability.",
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
    tags: ["React", "FastAPI", "Python", "ONNX", "Docker", "SQLite"],
    arch: [
      { node: "React Dashboard", kind: "client" },
      { node: "FastAPI Scorer", kind: "service" },
      { node: "ONNX ML Model", kind: "service" },
      { node: "SQLite Store", kind: "data" },
    ],
    overview:
      "Dhokha is a fraud intelligence system for cross-bank UPI transactions. The FastAPI backend serves an ONNX-based fraud scoring model with graph-based swarm detection, while the React dashboard lets investigators drill into flagged transactions in real time.",
    problem:
      "UPI fraud often involves coordinated swarms of accounts across multiple banks. Existing rule-based systems couldn't detect graph-level patterns or serve low-latency ML scores at investigation time.",
    contribution:
      "Built the full system end-to-end: trained and exported the ONNX fraud model, designed the FastAPI scoring service with Swagger docs, implemented graph-based swarm analysis, and wired the React investigation dashboard with preset scenario replay.",
    results:
      "ONNX CPU inference with no GPU dependency; Docker-containerized for ECS/App Runner with health-check endpoints; deterministic SQLite enables reproducible investigation scenarios.",
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
    tags: ["React", "Node.js", "Supabase", "Gemini AI", "Tesseract.js", "Recharts"],
    arch: [
      { node: "React 19 Frontend", kind: "client" },
      { node: "Express API", kind: "service" },
      { node: "Gemini AI / OCR", kind: "external" },
      { node: "Supabase DB & Auth", kind: "data" },
    ],
    overview:
      "Evercare lets users upload prescriptions and lab reports, extracts structured data via Gemini AI and Tesseract.js OCR, and displays a color-coded chronological health timeline. Vitals like blood pressure, blood sugar, and wearable metrics are tracked with Recharts visualizations.",
    problem:
      "Patients struggle to interpret and organize fragmented medical records across multiple providers. There was no unified, AI-simplified view of their own health history.",
    contribution:
      "Designed the full-stack architecture — React frontend with Recharts dashboards, Node.js/Express backend, Supabase for auth and storage, and integrated both Gemini AI (primary) and Tesseract.js (fallback) for OCR document processing.",
    results:
      "Supports real-time health alerts for abnormal readings, date-range AI chat analysis, and full health timeline export. Deployed on Vercel (frontend) and Render (backend API).",
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
    tags: ["React", "Node.js", "MongoDB", "Socket.IO", "Express", "JWT"],
    arch: [
      { node: "React Client", kind: "client" },
      { node: "Express API", kind: "service" },
      { node: "Socket.IO Engine", kind: "service" },
      { node: "MongoDB", kind: "data" },
    ],
    overview:
      "QuizStorm is a real-time multiplayer trivia game where the backend is fully authoritative — it controls question order, game timers, answer validation, and score calculation. The React frontend is a dumb renderer that displays server state and emits user actions via Socket.IO.",
    problem:
      "Most quiz apps run timers and score logic on the client, making them trivially cheatable. QuizStorm demonstrates how latency-sensitive multiplayer games should handle state using a server-authoritative model.",
    contribution:
      "Built the full MERN stack: MongoDB schema for users/rooms/results, Express REST APIs for auth and room setup, the Socket.IO game engine for real-time event lifecycle, and the React frontend with clean Socket.IO client integration.",
    results:
      "Clean separation of concerns across REST and WebSocket layers; in-memory game state for live session speed with MongoDB persistence for completed games; JWT-secured room management.",
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
    name: "Core Languages",
    description: "Primary languages for systems programming, backend services, and tooling.",
    skills: [
      { name: "Python", experience: "3+ yrs", focus: "Async, FastAPI, ML", logo: dv("python"), tier: "gold" },
      { name: "Go", experience: "1.5+ yrs", focus: "Concurrency, gRPC, CLI", logo: dv("go", "original-wordmark"), tier: "gold" },
      { name: "TypeScript", experience: "2+ yrs", focus: "React, Node, Type-safety", logo: dv("typescript"), tier: "gold" },
      { name: "Rust", experience: "1+ yr", focus: "Systems, Memory Safety", logo: dv("rust", "original"), tier: "silver" },
      { name: "SQL", experience: "3+ yrs", focus: "Complex Queries, Tuning", logo: dv("azuresqldatabase"), tier: "gold" },
      { name: "C++", experience: "2+ yrs", focus: "Data Structures, Algorithms", logo: dv("cplusplus"), tier: "silver" },
    ],
  },
  {
    name: "Backend & Systems",
    description: "Building resilient microservices, schedulers, and streaming pipelines.",
    skills: [
      { name: "FastAPI", experience: "2+ yrs", focus: "REST APIs, OpenAPI", logo: dv("fastapi"), tier: "gold" },
      { name: "gRPC & Protobuf", experience: "1+ yr", focus: "Inter-service RPC", logo: dv("grpc"), tier: "silver" },
      { name: "Redis", experience: "2+ yrs", focus: "Caching, Queues, Pub/Sub", logo: dv("redis"), tier: "gold" },
      { name: "PostgreSQL", experience: "3+ yrs", focus: "Indexing, Transactions", logo: dv("postgresql"), tier: "gold" },
      { name: "Apache Kafka", experience: "1+ yr", focus: "Event Streaming", logo: dv("apachekafka"), tier: "silver" },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    description: "Containerization, CI/CD automation, and cloud deployments.",
    skills: [
      { name: "Docker", experience: "2+ yrs", focus: "Multi-stage, Compose", logo: dv("docker"), tier: "gold" },
      { name: "Linux", experience: "3+ yrs", focus: "Shell, Kernel, Systemd", logo: dv("linux"), tier: "gold" },
      { name: "GitHub Actions", experience: "2+ yrs", focus: "CI/CD Automation", logo: dv("githubactions"), tier: "gold" },
      { name: "AWS", experience: "1+ yr", focus: "EC2, S3, IAM, Lambda", logo: dv("amazonwebservices", "original-wordmark"), tier: "silver" },
      { name: "Git", experience: "4+ yrs", focus: "Trunk-based, Rebase", logo: dv("git"), tier: "gold" },
    ],
  },
  {
    name: "AI / ML & Applied LLMs",
    description: "Vector search, neural models, and retrieval-augmented systems.",
    skills: [
      { name: "PyTorch", experience: "1+ yr", focus: "Deep Learning, Tensors", logo: dv("pytorch"), tier: "silver" },
      { name: "LangChain", experience: "1+ yr", focus: "RAG Pipelines", logo: dv("python"), tier: "silver" },
      { name: "Pinecone", experience: "1+ yr", focus: "Vector Retrieval", logo: dv("python"), tier: "silver" },
      { name: "scikit-learn", experience: "2+ yrs", focus: "Classical ML", logo: dv("scikitlearn"), tier: "gold" },
    ],
  },
  {
    name: "Frontend & Interfaces",
    description: "Modern component-driven web interfaces and interactive dashboards.",
    skills: [
      { name: "React", experience: "2+ yrs", focus: "Hooks, Performance", logo: dv("react"), tier: "gold" },
      { name: "Next.js", experience: "1+ yr", focus: "App Router, SSR", logo: dv("nextjs"), tier: "silver" },
      { name: "Tailwind CSS", experience: "2+ yrs", focus: "Responsive, Design Systems", logo: dv("tailwindcss"), tier: "gold" },
    ],
  },
]

/** Handful of top core competencies featured on the landing scroll */
export const topSkills: SkillItem[] = [
  { name: "Python", experience: "3+ yrs", focus: "FastAPI, Async, ML", logo: dv("python"), tier: "gold" },
  { name: "Go", experience: "1.5+ yrs", focus: "Concurrency, gRPC, CLI", logo: dv("go", "original-wordmark"), tier: "gold" },
  { name: "Rust", experience: "1+ yr", focus: "Systems, Memory Safety", logo: dv("rust", "original"), tier: "silver" },
  { name: "PostgreSQL", experience: "3+ yrs", focus: "Indexing, Transactions", logo: dv("postgresql"), tier: "gold" },
  { name: "Redis", experience: "2+ yrs", focus: "Caching, Queues, Pub/Sub", logo: dv("redis"), tier: "gold" },
  { name: "Docker", experience: "2+ yrs", focus: "Multi-stage, Compose", logo: dv("docker"), tier: "gold" },
  { name: "PyTorch", experience: "1+ yr", focus: "Deep Learning, Tensors", logo: dv("pytorch"), tier: "silver" },
  { name: "React", experience: "2+ yrs", focus: "Hooks, Performance", logo: dv("react"), tier: "gold" },
]

export const achievements = [
  { metric: "Top 5%", label: "ICPC Regionals", note: "Qualified for regional finals among 800+ competitive programming teams." },
  { metric: "1st Place", label: "National Hackathon", note: "Built a real-time anomaly detection stream in 24 hours." },
  { metric: "4.0", label: "Major CS GPA", note: "Top tier academic standing in core systems and computer science coursework." },
  { metric: "500+", label: "LeetCode Problems", note: "Consistent algorithmic mastery across graph algorithms, dynamic programming, and concurrency." },
]

export const coCurricular = [
  { period: "2024 – Present", title: "Open Source Club — Lead", note: "Organize monthly contribution sprints and mentor 50+ developers on upstream PRs." },
  { period: "2023 – 2024", title: "Technical Writing", note: "Published articles on distributed queues, database indexing, and backend architectures." },
  { period: "2022 – 2023", title: "Competitive Programming Society", note: "Coordinated weekly algorithmic problem-solving sessions and mock contests." },
]

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2025", verify: "#" },
  { name: "Google Data Analytics Professional", issuer: "Google", date: "2024", verify: "#" },
  { name: "Meta Backend Developer Certificate", issuer: "Meta", date: "2024", verify: "#" },
  { name: "Docker Certified Associate Foundations", issuer: "Docker", date: "2023", verify: "#" },
]

export const siteLinks = {
  github: "https://github.com/Soham-1304",
  linkedin: "#",
  email: "soham.karandikar007@gmail.com",
  resume: "#",
}
