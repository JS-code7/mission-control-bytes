import {
  Cloud, Lock, Brain, Shield, Server, CircuitBoard, Globe, Cpu,
  type LucideIcon,
} from "lucide-react";

export const PROFILE = {
  name: "Jeet Soni",
  role: "Co-Founder @ BinBuddy",
  tagline: "Building Intelligent AI-Driven Systems with Software & Hardware",
  location: "Greater Ahmedabad Area, India",
  email: "sonijeet660@gmail.com",
  phone: "9409205791",
  linkedin: "https://www.linkedin.com/in/jeet-soni-01bb09337/",
  github: "https://github.com/JS-code7",
};

export const EXPERIENCES = [
  {
    company: "BinBuddy",
    role: "Co-Founder",
    period: "2024 — Present",
    summary: "Incubated and funded startup building intelligent waste-management systems combining IoT hardware, computer vision, and cloud orchestration.",
    tags: ["Founder", "AI", "Hardware", "Cloud"],
  },
  {
    company: "Webcart",
    role: "Software Engineer",
    period: "2024",
    summary: "Engineered full-stack web modules, refined UX flows, and shipped production features focused on performance and reliability.",
    tags: ["Full-Stack", "Web", "Product"],
  },
  {
    company: "Rotaract Club of New L.J.I.E.T",
    role: "Sergeant-at-Arms · Associate Professional Service Director",
    period: "2023 — 2024",
    summary: "Led service initiatives, coordinated cross-team operations, and organized professional development programs for a 100+ member chapter.",
    tags: ["Leadership", "Operations"],
  },
];

export const EDUCATION = [
  { school: "Gujarat Technological University (GTU)", degree: "Bachelor of Technology — Computer Engineering", period: "Pursuing" },
  { school: "Holy Angels Convent School — India", degree: "School Education", period: "Completed" },
];

export const CERTIFICATIONS: { name: string; issuer: string; icon: LucideIcon }[] = [
  { name: "Microsoft Introduction to Cloud Infrastructure", issuer: "Microsoft", icon: Cloud },
  { name: "Applied Skills: Secure storage for Azure Files & Blob", issuer: "Microsoft", icon: Lock },
  { name: "Introduction to AI in Azure", issuer: "Microsoft", icon: Brain },
  { name: "OCI Certified AI Foundations Associate", issuer: "Oracle", icon: Cloud },
  { name: "Defensive Security Hacking", issuer: "Cybersecurity", icon: Shield },
  { name: "Secure Azure Storage", issuer: "Microsoft", icon: Server },
  { name: "Blob Security", issuer: "Microsoft", icon: Lock },
  { name: "Microsoft Azure Fundamentals", issuer: "Microsoft", icon: Cloud },
];

export const SKILLS: { group: string; icon: LucideIcon; items: string[] }[] = [
  { group: "Cybersecurity", icon: Shield, items: ["Defensive Security", "Ethical Hacking", "Threat Modeling", "Secure Storage"] },
  { group: "Robotics & Electronics", icon: CircuitBoard, items: ["Embedded Systems", "Microcontrollers", "Sensors & Actuators", "PCB Prototyping"] },
  { group: "Web Development", icon: Globe, items: ["React / TypeScript", "Node.js", "REST & APIs", "Performance"] },
  { group: "AI / ML", icon: Brain, items: ["LLM Apps", "Computer Vision", "Model Integration", "Prompt Systems"] },
  { group: "Cloud", icon: Cloud, items: ["Microsoft Azure", "OCI", "Storage Security", "Deployment"] },
  { group: "Engineering Mindset", icon: Cpu, items: ["Systems Thinking", "Rapid Prototyping", "Product Sense", "Founder Operations"] },
];

export type Project = {
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  impact: string;
  learned: string;
  future: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "BinBuddy — Smart Waste Intelligence",
    category: "AI · Hardware",
    summary: "An incubated, funded startup deploying connected bins with vision-based classification and route-optimization analytics.",
    problem: "Urban waste collection runs on guesswork — overflowing bins, wasted fuel, no signal.",
    approach: "Combined IoT sensors, on-device CV, and a cloud dashboard for real-time fill levels and pickup routing.",
    outcome: "Functional MVP, paying pilots, and an active investor-backed roadmap.",
    impact: "Cuts collection trips, reduces overflow events, and turns operations into measurable data.",
    learned: "Hardware reliability dictates software architecture — design for the worst sensor, not the best.",
    future: "Edge-only inference, multi-tenant ops dashboard, and city-scale routing solver.",
    tags: ["AI", "IoT", "Cloud", "Startup"],
  },
  {
    title: "Adaptive Traffic Signal Simulator",
    category: "AI · Simulation",
    summary: "A traffic system simulation that adapts signal timing using reinforcement-style heuristics on live vehicle counts.",
    problem: "Fixed-time signals waste minutes per intersection during off-peak and surge windows.",
    approach: "Built a simulation engine with queue-aware controllers and tunable policies.",
    outcome: "Demonstrated up to ~25% reduction in average wait time vs. static timing in simulation.",
    impact: "A playground for testing smart-city control strategies before touching real hardware.",
    learned: "Simulators are only useful when their failure modes match the real world's.",
    future: "Drop-in RL agent, real CCTV ingestion, and a hardware-in-the-loop bridge.",
    tags: ["AI", "Web", "Visualization"],
  },
  {
    title: "Defensive Security Toolkit",
    category: "Cybersecurity",
    summary: "A practitioner-style toolkit exploring blue-team workflows: log triage, indicator pivoting, and quick-hit hardening checks.",
    problem: "Defensive tooling is fragmented and hard to learn end-to-end.",
    approach: "Curated a focused, scriptable workflow around real attacker tradecraft.",
    outcome: "Sharper detection-engineering reflexes and reusable response patterns.",
    impact: "Bridges learning and applied defense for early-career security engineers.",
    learned: "Detection content rots — the workflow is the asset, not the rules.",
    future: "SOAR-style playbooks and a public lab environment for guided exercises.",
    tags: ["Security", "Tooling"],
  },
  {
    title: "Azure Secure Storage Blueprint",
    category: "Cloud · Security",
    summary: "Reference architecture and playbooks for hardening Azure Blob and Files with private endpoints, RBAC, and key rotation.",
    problem: "Default storage configurations leak — and teams move fast.",
    approach: "Codified a secure baseline with policy, monitoring, and breakglass paths.",
    outcome: "Deployable patterns aligned with Microsoft Applied Skills coursework.",
    impact: "A safer default for teams shipping data-heavy products on Azure.",
    learned: "Policy-as-code beats checklists — humans drift, pipelines don't.",
    future: "Terraform modules, drift detection, and an opinionated compliance pack.",
    tags: ["Cloud", "Security", "Azure"],
  },
  {
    title: "Conversational AI Concierge",
    category: "AI",
    summary: "A grounded chatbot pattern that combines retrieval, tool-use, and guardrails for domain-specific assistance.",
    problem: "Generic LLMs hallucinate when the stakes are real.",
    approach: "Retrieval over curated context plus structured tool calls with strict response contracts.",
    outcome: "Higher answer fidelity with clear citations and refusal behavior.",
    impact: "A repeatable shape for shipping LLM features that don't embarrass the brand.",
    learned: "The hardest part of LLM products is the refusal logic, not the prompt.",
    future: "Eval harness, multi-model fallback, and a thin auth-aware tool runtime.",
    tags: ["AI", "LLM", "Web"],
  },
  {
    title: "Bench-to-Field Robotics Rig",
    category: "Robotics",
    summary: "A modular robotics chassis with swappable sensor heads, used for rapid field testing of new perception models.",
    problem: "Lab demos rarely survive contact with the real world.",
    approach: "Standardized power, comms, and mounting so new payloads ship in hours, not weeks.",
    outcome: "Multiple successful field iterations across vision and navigation experiments.",
    impact: "Shortens the loop between idea and operating prototype.",
    learned: "Mechanical standards are the cheapest performance upgrade in robotics.",
    future: "Open-source the chassis spec and add a ROS 2 bring-up template.",
    tags: ["Robotics", "Hardware"],
  },
];

export const CHAPTERS = [
  { n: "01", title: "The Beginning", body: "Curiosity wired to a soldering iron. Pulled apart anything with a circuit and asked how the magic worked.", color: "var(--cyan)" },
  { n: "02", title: "First Build", body: "Shipped my first end-to-end product — messy, fragile, and the most important thing I had ever made.", color: "var(--electric)" },
  { n: "03", title: "Failures & Learning", body: "Burned boards, broken builds, late-night rewrites. Each failure became a calibration — sharper instincts, better defaults.", color: "var(--purple-glow)" },
  { n: "04", title: "Breakthrough", body: "BinBuddy got incubated and funded. Hardware, AI, and ops finally clicked into one system that worked outside the lab.", color: "var(--teal)" },
  { n: "05", title: "Now", body: "Building intelligent systems that span software and hardware — and helping others ship the same.", color: "var(--gold)" },
];

export const TIMELINE = [
  { year: "2019", label: "Spark", text: "First lines of code and first soldered circuit." },
  { year: "2021", label: "Builder", text: "Started shipping web apps and electronics side-projects." },
  { year: "2023", label: "Operator", text: "Leadership at Rotaract; deeper into security and cloud." },
  { year: "2024", label: "Engineer", text: "Software Engineer at Webcart. Azure & AI certifications." },
  { year: "2025", label: "Founder", text: "Co-founded BinBuddy. Incubated, funded, building in the open." },
];

export const BRAIN_NODES = [
  { id: "cyber", label: "Cybersecurity", x: 18, y: 28, color: "var(--cyan)", related: ["cloud", "ai"] },
  { id: "robotics", label: "Robotics", x: 82, y: 26, color: "var(--electric)", related: ["electronics", "ai"] },
  { id: "web", label: "Web Dev", x: 22, y: 76, color: "var(--teal)", related: ["ai", "cloud"] },
  { id: "electronics", label: "Electronics", x: 78, y: 78, color: "var(--gold)", related: ["robotics"] },
  { id: "ai", label: "AI / ML", x: 50, y: 50, color: "var(--purple-glow)", related: ["cyber", "robotics", "web", "cloud"] },
  { id: "cloud", label: "Azure / Cloud", x: 50, y: 14, color: "var(--cyan)", related: ["cyber", "ai", "web"] },
];

export const NAV_ITEMS = [
  { label: "Mission", to: "/mission" as const, desc: "Operator status & system overview" },
  { label: "Story", to: "/story" as const, desc: "Five chapters, one trajectory" },
  { label: "Lab", to: "/lab" as const, desc: "Interactive demos and experiments" },
  { label: "Brain", to: "/brain" as const, desc: "Connected skill map" },
  { label: "Timeline", to: "/timeline" as const, desc: "Evolution checkpoints" },
  { label: "Modules", to: "/modules" as const, desc: "Active projects, deep briefs" },
  { label: "Transmit", to: "/transmit" as const, desc: "System logs & uplink" },
  { label: "Contact", to: "/contact" as const, desc: "Open a direct channel" },
];
