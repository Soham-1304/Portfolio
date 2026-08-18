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
    id: "nexus",
    name: "Nexus",
    tagline: "Distributed task orchestrator & fault-tolerant scheduler",
    description:
      "A high-throughput scheduler that coordinates long-running asynchronous jobs across worker pools with lease claiming, heartbeat monitoring, and automated dead-letter routing.",
    domain: "nexus-demo.vercel.app",
    demoUrl: "https://vite-react-template.vercel.app/",
    github: "https://github.com/sohamk/nexus",
    tags: ["Rust", "Redis", "PostgreSQL", "gRPC"],
    arch: [
      { node: "CLI Client", kind: "client" },
      { node: "Scheduler Core", kind: "service" },
      { node: "Redis Queue", kind: "data" },
      { node: "Distributed Workers", kind: "service" },
    ],
    overview:
      "Nexus coordinates background jobs with lease-based claiming, heartbeat monitoring, and configurable retry policies.",
    problem:
      "Existing cron-based systems couldn't handle partial failures or provide visibility into in-flight work across heterogeneous workers.",
    contribution: "Designed the scheduler core, worker lease protocol, and observability hooks end-to-end.",
    results: "Handles 12k jobs/day in staging with p99 dispatch latency under 200ms.",
  },
  {
    id: "pipeline",
    name: "Pipeline",
    tagline: "Real-time event stream processor & fan-out engine",
    description:
      "Ingests high-volume webhook events, validates strict schemas, and fans out to downstream consumer microservices with at-least-once delivery and deduplication.",
    domain: "pipeline-demo.vercel.app",
    demoUrl: "https://react.dev/",
    github: "https://github.com/sohamk/pipeline",
    tags: ["Python", "Kafka", "FastAPI", "Docker"],
    arch: [
      { node: "Webhook Ingest", kind: "external" },
      { node: "FastAPI Gateway", kind: "service" },
      { node: "Kafka Stream", kind: "data" },
      { node: "Consumer Pool", kind: "service" },
    ],
    overview:
      "Pipeline transforms raw webhook payloads into typed events and routes them to registered handlers with deduplication.",
    problem:
      "Teams needed a lightweight alternative to heavyweight stream platforms for moderate-throughput event routing.",
    contribution: "Built the ingestion API, schema registry, and consumer SDK with idempotency keys.",
    results: "Processes 500 events/sec in load tests with zero duplicate deliveries in happy-path scenarios.",
  },
  {
    id: "relay",
    name: "Relay",
    tagline: "RAG-powered documentation search & grounded question answering",
    description:
      "Indexes engineering docs and markdown wikis, performs hybrid semantic search over chunked vectors, and synthesizes answers with strict cited passages.",
    domain: "relay-demo.vercel.app",
    demoUrl: "https://tailwindcss.com/",
    github: "https://github.com/sohamk/relay",
    tags: ["TypeScript", "OpenAI", "Pinecone", "Next.js"],
    arch: [
      { node: "Search UI", kind: "client" },
      { node: "FastAPI Engine", kind: "service" },
      { node: "Vector Index", kind: "data" },
      { node: "LLM Synthesizer", kind: "external" },
    ],
    overview:
      "Relay indexes markdown and API docs, retrieves top-k chunks via hybrid search, and generates grounded answers.",
    problem:
      "Engineers spent too long searching fragmented wikis; existing search lacked semantic understanding of technical queries.",
    contribution: "Implemented chunking strategy, retrieval pipeline, and citation UI with feedback loop.",
    results: "Reduced average doc lookup time from 4 min to 45 sec in internal pilot with 8 engineers.",
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
  github: "https://github.com/soham-1304",
  linkedin: "#",
  email: "soham.karandikar007@gmail.com",
  resume: "#",
}
