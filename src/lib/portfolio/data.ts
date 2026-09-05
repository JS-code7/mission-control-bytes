import {
  Cloud,
  Lock,
  Brain,
  Shield,
  Server,
  CircuitBoard,
  Globe,
  Cpu,
  Gamepad2,
  Code2,
  Database,
  GitBranch,
  Award,
  type LucideIcon,
} from "lucide-react";

export const PROFILE = {
  name: "Jeet Soni",
  role:
    "Co-Founder @ BinBuddy (Incubated & Funded Startup) | Google SA ’26 | Internshala ISP ’26 | Rotaract SAA ’26 | Building Intelligent Autonomous Systems | Microsoft Azure • Oracle AI • Deloitte Cyber",
  tagline:
    "Building intelligent AI-driven systems combining software, hardware, cybersecurity, robotics, and web technologies.",
  summary:
    "I’m an aspiring software developer with a strong interest in cybersecurity, ethical hacking, machine learning, AI, robotics, and emerging technologies. I build practical systems across software and hardware while pursuing a Bachelor of Technology in Computer Engineering at Gujarat Technological University.",
  location: "Greater Ahmedabad Area, India",
  email: "sonijeet660@gmail.com",
  phone: "9409205791",
  linkedin: "https://www.linkedin.com/in/jeet-soni-01bb09337/",
  github: "https://github.com/JS-code7",
  portfolio: "https://mission-control-bytes.lovable.app/",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  bullets?: string[];
  tags: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Internshala",
    role: "Internshala Student Partner (ISP)",
    period: "Aug 2026 — Present",
    location: "Gurugram",
    summary:
      "Selected as an Internshala Student Partner, supporting student outreach, career awareness, and communication around internships, jobs, and online training.",
    bullets: [
      "Promote awareness of Internshala internships, jobs, and online training opportunities among students.",
      "Support Internshala campaigns and student engagement initiatives within the college community.",
      "Participate in social media branding campaigns and build practical digital communication experience.",
      "Help students discover relevant opportunities for upskilling and career development.",
    ],
    tags: ["Outreach", "Career Awareness", "Communication", "Branding"],
  },
  {
    company: "Google",
    role: "Google Student Ambassador",
    period: "Jul 2026 — Present",
    location: "Ahmedabad",
    summary:
      "Selected as a Google Student Ambassador 2026 representing Google Gemini on campus through workshops, demos, campaigns, educational content, and community initiatives.",
    bullets: [
      "Promote AI literacy by introducing students to Google Gemini through workshops, demos, campaigns, and community initiatives.",
      "Build and engage a student community through learning sessions, technical events, and collaborative activities.",
      "Create educational and technical content showcasing real-world applications of Gemini and Google’s AI ecosystem.",
      "Collaborate with fellow Student Ambassadors across India through training, challenges, and leadership initiatives.",
    ],
    tags: ["Google Gemini", "AI Advocacy", "Community Building", "Leadership"],
  },
  {
    company: "Rotaract Club of New L.J.I.E.T",
    role: "Sergeant-at-Arms",
    period: "Jun 2026 — Present",
    location: "Greater Ahmedabad Area",
    summary:
      "Serving as Sergeant-at-Arms, supporting structure, discipline, and smooth execution across club meetings and events.",
    bullets: [
      "Maintain discipline, order, and process across meetings and events.",
      "Previously served as Associate Professional Service Director from Jul 2025 to Jun 2026.",
    ],
    tags: ["Leadership", "Operations", "Service"],
  },
  {
    company: "Rotaract Club of New L.J.I.E.T",
    role: "Associate Professional Service Director",
    period: "Jul 2025 — Jun 2026",
    location: "Greater Ahmedabad Area",
    summary:
      "Contributed to professional service initiatives and community-focused club programming as Associate Professional Service Director.",
    tags: ["Professional Service", "Community", "Leadership"],
  },
  {
    company: "BinBuddy Technologies",
    role: "Co-Founder",
    period: "Oct 2025 — Present",
    location: "Ahmedabad · Associated with GTU",
    summary:
      "Co-founded an incubated and funded startup focused on intelligent waste-management systems and the intersection of software, hardware, IoT, and automation.",
    bullets: [
      "Co-founded a GTU-incubated and funded venture building an IoT-enabled smart waste-management platform.",
      "Own product direction across sensor hardware, edge firmware, cloud analytics, and route optimization.",
    ],
    tags: ["Founder", "IoT", "Cloud Analytics", "Arduino", "Product"],
  },
  {
    company: "City Ni Vaarta",
    role: "Graphic Designer & Core Member",
    period: "Jun 2026 — Present",
    location: "Ahmedabad",
    summary:
      "Contributing graphic design, visual communication, and core-team support to an Ahmedabad-based community initiative.",
    bullets: [
      "Lead visual identity, campaign design, and storytelling assets for the community initiative.",
    ],
    tags: ["Design", "Branding", "Community"],
  },
  {
    company: "Ahmedabad Reads",
    role: "Creator",
    period: "May 2026 — Present",
    location: "Ahmedabad",
    summary:
      "Creator of an Ahmedabad-based reading community focused on content, local conversations, and knowledge exchange.",
    bullets: [
      "Founded and run an Ahmedabad-focused reading community through curated conversations and content.",
    ],
    tags: ["Creator", "Content", "Community"],
  },
  {
    company: "Webcart",
    role: "Software Engineer",
    period: "Mar 2026 — Apr 2026",
    location: "Ahmedabad, Gujarat, India",
    summary:
      "Worked as a Software Engineer in a short-term product environment, building practical software experience alongside academic and community work.",
    bullets: [
      "Shipped full-stack web modules with a focus on performance, reliability, and clean product surfaces.",
      "Rebuilt key UX flows and hardened production features against edge-case failures.",
    ],
    tags: ["Software Engineering", "Web", "Product"],
  },
];

export const EDUCATION = [
  {
    school: "Gujarat Technological University (GTU)",
    degree: "Bachelor of Technology — Computer Engineering",
    period: "Sep 2024 — Sep 2028",
  },
  {
    school: "Microsoft AI and Cloud Honors (GTU)",
    degree: "Bachelor of Technology — Computer Science",
    period: "Feb 2026",
  },
  { school: "Holy Angels Convent School — India", degree: "School Education", period: "Completed" },
];

export const CERTIFICATIONS: { name: string; issuer: string; icon: LucideIcon }[] = [
  { name: "Deloitte Australia — Cyber Job Simulation", issuer: "Deloitte / Forage", icon: Shield },
  { name: "Internshala", issuer: "Internshala", icon: Award },
  { name: "Microsoft Introduction to Cloud Infrastructure", issuer: "Microsoft", icon: Cloud },
  {
    name: "Applied Skills: Secure storage for Azure Files & Blob Storage",
    issuer: "Microsoft",
    icon: Lock,
  },
  { name: "Microsoft Introduction to AI in Azure", issuer: "Microsoft", icon: Brain },
];

export const SKILLS: { group: string; icon: LucideIcon; items: string[] }[] = [
  {
    group: "Programming",
    icon: Code2,
    items: ["Python", "JavaScript", "TypeScript", "Systems Design", "Automation", "Debugging"],
  },
  {
    group: "Frontend",
    icon: Globe,
    items: ["HTML5", "CSS3", "React", "Tailwind CSS", "Responsive Web Design", "UI/UX Design"],
  },
  {
    group: "Backend & APIs",
    icon: Server,
    items: ["Node.js", "Express.js", "REST API", "Authentication", "System Design"],
  },
  {
    group: "AI / ML",
    icon: Brain,
    items: [
      "Google Gemini",
      "NLP",
      "LLM Applications",
      "Computer Vision",
      "Fraud Detection",
      "Model Integration",
    ],
  },
  {
    group: "Cybersecurity",
    icon: Shield,
    items: [
      "Ethical Hacking",
      "Defensive Security",
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Threat Intelligence",
      "Fraud Analytics",
    ],
  },
  {
    group: "Robotics & Embedded",
    icon: CircuitBoard,
    items: [
      "Arduino",
      "ESP32",
      "Ultrasonic Sensors",
      "Embedded Systems",
      "IoT Devices",
      "PCB Prototyping",
    ],
  },
  {
    group: "Cloud",
    icon: Cloud,
    items: ["Microsoft Azure", "Azure Blob & File Security", "Cloud Infrastructure"],
  },
  {
    group: "Database",
    icon: Database,
    items: ["MySQL", "MongoDB", "SQL Queries", "Data Modeling"],
  },
  {
    group: "DevOps & Tools",
    icon: GitBranch,
    items: [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "Arduino IDE",
      "Amazon Q CLI",
      "OpenTelemetry",
      "Whisper",
      "BM25",
    ],
  },
  {
    group: "Game Development",
    icon: Gamepad2,
    items: ["Unreal Engine", "Blueprint Visual Scripting", "Game Logic Design"],
  },
  {
    group: "Leadership & Community",
    icon: Cpu,
    items: [
      "Community Building",
      "Public Speaking",
      "Founder Operations",
      "Product Sense",
      "Rapid Prototyping",
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  period?: string;
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
    title: "BinBuddy — Smart Waste Management System",
    category: "AI · IoT · Startup",
    period: "Oct 2025 — Present",
    summary:
      "IoT-enabled waste-management platform that tracks bin fill levels in real time, optimizes collection routes, and fuses sensor data with cloud analytics and notifications.",
    problem:
      "Urban waste collection runs on guesswork — overflowing bins, wasted fuel, and no visibility into ground truth.",
    approach:
      "Connected bins with fill sensors, an Arduino-based edge node, and a cloud analytics layer that produces routes, alerts, and operations dashboards.",
    outcome: "Incubated and funded startup with an active product direction.",
    impact:
      "Cuts collection trips, reduces overflow events, and turns urban waste ops into measurable, optimizable data.",
    learned:
      "Hardware reliability dictates software architecture — design for the worst sensor day, not the best.",
    future:
      "Edge-only inference on device, multi-tenant ops dashboard, and city-scale routing solver.",
    tags: ["IoT", "Arduino IDE", "Cloud Analytics", "Startup"],
  },
  {
    title: "Multi-Channel Digital Arrest & Fraud Scam Detection System",
    category: "Cybersecurity · AI",
    period: "Sep 2025",
    summary:
      "Fraud-detection framework targeting digital arrest scams across SMS, email, voice calls, and messaging apps using NLP, anomaly detection, and risk scoring.",
    problem: "Digital arrest scams jump across channels faster than any single filter can react.",
    approach:
      "Unified ingest for SMS/email/voice/chat with NLP keyword analysis, behavior anomaly detection, and a real-time risk-scoring engine.",
    outcome:
      "A working detection pipeline that flags suspicious patterns across four channels with explainable risk scores.",
    impact:
      "Gives users and reviewers early warning on multi-channel scam campaigns instead of one-off alerts.",
    learned: "Cross-channel context beats any single signal — the fraud lives in the transitions.",
    future:
      "On-device inference for privacy, adaptive thresholds per user, and reviewer feedback loops.",
    tags: ["NLP", "Cyber Threat Intelligence", "Fraud Detection"],
  },
  {
    title: "ScamGuard UPI — Real-Time UPI Scam Detection",
    category: "Cybersecurity",
    period: "Aug 2025",
    summary:
      "Real-time UPI scam detection combining rule-based checks and ML logic to score transactions, links, and behavioral anomalies before money moves.",
    problem: "UPI fraud is fast, high-volume, and disproportionately hits first-time users.",
    approach:
      "Rule-based screening layered with ML scoring on transaction patterns, suspicious link heuristics, and behavior anomalies.",
    outcome:
      "A detection engine that returns alerts, risk scores, and scam-class labels in near real time.",
    impact: "Adds a critical safety layer to everyday UPI flows without blocking legitimate users.",
    learned:
      "Rules ship trust fast; ML earns precision — both are needed in production fraud stacks.",
    future: "Feedback-driven model retraining and integration hooks for consumer UPI apps.",
    tags: ["Cybersecurity", "Fraud Detection", "Real-Time Monitoring"],
  },
  {
    title: "AI-Based Smart Traffic Assistance System",
    category: "AI · IoT",
    period: "Jul 2025",
    summary:
      "AI-powered traffic-control system on Arduino Uno that dynamically adjusts signal timing based on vehicle density and environmental parameters.",
    problem: "Fixed-time signals waste minutes per intersection during off-peak and surge windows.",
    approach:
      "Arduino Uno controller with density-aware signal logic, IoT telemetry, and AI-driven decision policies.",
    outcome:
      "A working smart-signal prototype demonstrating adaptive timing over static baselines.",
    impact: "A safe test-bed for smart-city control strategies before touching real intersections.",
    learned: "Embedded control loops are only as good as their worst-case latency budget.",
    future: "RL-based controller, CCTV-based vehicle counting, and hardware-in-the-loop city sim.",
    tags: ["Arduino", "IoT", "Cloud"],
  },
  {
    title: "JOKER — Intelligent Automation Assistant",
    category: "Automation · Systems",
    period: "Dec 2025",
    summary:
      "Modular automation assistant that streamlines repetitive workflows using automation scripts, a logic engine, and adaptive response mechanisms.",
    problem: "Digital busywork silently eats hours out of every operator's week.",
    approach:
      "Composable automation modules, a rule-driven logic engine, and adaptive handlers for edge-case flows.",
    outcome:
      "A working assistant that offloads repeatable tasks with predictable, debuggable behavior.",
    impact: "Frees focus for the work that actually requires a human.",
    learned: "Automation without observability creates ten new problems for every one it solves.",
    future: "Plugin runtime, task marketplace, and LLM-augmented planning for open-ended tasks.",
    tags: ["Automation", "Debugging", "System Design"],
  },
  {
    title: "Obstacle Assist Bot",
    category: "Robotics · Embedded",
    period: "Nov 2025",
    summary:
      "Autonomous obstacle-avoidance robot using ultrasonic sensors and microcontroller-based control logic to navigate around nearby obstructions.",
    problem: "Small mobile robots need reliable, low-cost obstacle awareness to move safely.",
    approach:
      "Ultrasonic sensor array feeding a microcontroller control loop with direction-adjust logic.",
    outcome: "A field-tested chassis that detects obstacles and re-routes movement autonomously.",
    impact: "A reusable base for perception experiments and classroom robotics.",
    learned: "Sensor placement matters more than sensor spec — geometry is half the algorithm.",
    future: "Add IMU + wheel odometry and swap to a lightweight SLAM stack.",
    tags: ["Robotics", "Ultrasonic Sensors", "Embedded Systems"],
  },
  {
    title: "Flappy Bird — Unreal Engine",
    category: "Game Development",
    period: "Apr 2026",
    summary:
      "Recreated the classic Flappy Bird in Unreal Engine with physics-based movement, obstacle spawning, collision detection, scoring, and a responsive UI.",
    problem: "Building a fast, feel-good arcade loop in a AAA-grade engine.",
    approach:
      "Blueprint-driven gameplay with physics tuning, procedural pipe spawning, and a clean UI layer.",
    outcome: "A polished, playable arcade experience shipped end-to-end in Unreal.",
    impact: "Deep hands-on with real-time engine architecture and gameplay feel.",
    learned: "'Game feel' is 90% tuning — the code is the easy part.",
    future: "Mobile touch controls, cosmetics system, and a global leaderboard.",
    tags: ["Unreal Engine", "Blueprint", "UI Design", "Game Dev"],
  },
  {
    title: "Chess Game — Amazon Q CLI",
    category: "AI-Assisted · Game Logic",
    period: "Jun 2025",
    summary:
      "Command-line chess with move validation, full piece movement, check/checkmate detection, and game-state management — built with AI-assisted iteration on Amazon Q CLI.",
    problem: "Chess rules are deceptively subtle — edge cases eat naive implementations alive.",
    approach:
      "Modular architecture split by concern (board, rules, state) with AI-assisted debugging tight-looped through Amazon Q CLI.",
    outcome: "A rule-correct CLI chess implementation with clean state management.",
    impact: "A proof that AI-assisted CLI workflows can meaningfully speed up structured coding.",
    learned: "Correct primitives (board, move, state) collapse the rest of the problem.",
    future: "Perft testing, PGN import/export, and a minimax engine with iterative deepening.",
    tags: ["Game Logic", "Amazon Q CLI", "Systems Design"],
  },
  {
    title: "Rotaract Club Official Website",
    category: "Web · Community",
    period: "Nov 2025",
    summary:
      "Responsive multi-page website for the Rotaract Club — events, announcements, gallery, membership forms, and admin functionality built with HTML, CSS, and JavaScript.",
    problem: "The chapter needed a proper digital home for members, events, and outreach.",
    approach:
      "Hand-built responsive site with modular sections, forms, and lightweight admin surfaces.",
    outcome: "A live club presence used for events, membership, and announcements.",
    impact: "Consolidated club operations into a single, shareable place.",
    learned: "Ship the smallest useful CMS pattern before reaching for a framework.",
    future: "Move to a static-site pipeline with role-gated admin.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Web Design"],
  },
  {
    title: "Primordium — Interactive Memory Enhancement Game",
    category: "UX · Game Logic",
    summary:
      "Interactive memory game that improves cognitive recall and pattern recognition through escalating difficulty, dynamic UI transitions, and performance-based scoring.",
    problem: "Most memory trainers are dry and stop scaling with the player.",
    approach:
      "Difficulty curve tied to player performance, animated UI transitions, and scoring built on pattern accuracy over time.",
    outcome: "An engaging trainer that adapts to the user rather than the other way around.",
    impact: "A friendlier on-ramp to cognitive training for casual users.",
    learned: "Feedback timing is a first-class design decision — not a polish item.",
    future: "Daily challenge mode, longitudinal progress tracking, and shareable results.",
    tags: ["UX Design", "Logic Building", "Game Dev"],
  },
];

export const CHAPTERS = [
  {
    n: "01",
    title: "The Beginning",
    body: "Curiosity wired to a soldering iron. Pulled apart anything with a circuit and asked how the magic worked.",
    color: "var(--cyan)",
  },
  {
    n: "02",
    title: "First Build",
    body: "Shipped my first end-to-end product — messy, fragile, and the most important thing I had ever made.",
    color: "var(--electric)",
  },
  {
    n: "03",
    title: "Failures & Learning",
    body: "Burned boards, broken builds, late-night rewrites. Each failure became a calibration — sharper instincts, better defaults.",
    color: "var(--purple-glow)",
  },
  {
    n: "04",
    title: "Breakthrough",
    body: "BinBuddy got incubated and funded. Hardware, AI, and ops finally clicked into one system that worked outside the lab.",
    color: "var(--teal)",
  },
  {
    n: "05",
    title: "Now",
    body: "Building intelligent systems that span software and hardware — cybersecurity, robotics, web, and cloud, shipping in the open.",
    color: "var(--gold)",
  },
];

export const TIMELINE = [
  {
    year: "2024",
    label: "Enrolled",
    text: "Started B.Tech Computer Engineering at GTU. Deeper into code, circuits, and cloud.",
  },
  {
    year: "2025",
    label: "Builder",
    text: "Built projects spanning fraud detection, smart traffic, robotics, community web, automation, and game logic.",
  },
  {
    year: "Oct 2025",
    label: "Founder",
    text: "Co-founded BinBuddy — IoT + cloud analytics for smart waste. Incubated and funded.",
  },
  {
    year: "2026",
    label: "Operator",
    text: "Webcart Software Engineer, Unreal game build, and community roles at Rotaract, City Ni Vaarta, Ahmedabad Reads.",
  },
  {
    year: "Now",
    label: "Shipping",
    text: "Building intelligent AI-driven systems across software and hardware — in public.",
  },
];

export const BRAIN_NODES = [
  {
    id: "cyber",
    label: "Cybersecurity",
    x: 18,
    y: 28,
    color: "var(--cyan)",
    related: ["cloud", "ai"],
  },
  {
    id: "robotics",
    label: "Robotics",
    x: 82,
    y: 26,
    color: "var(--electric)",
    related: ["electronics", "ai"],
  },
  { id: "web", label: "Web Dev", x: 22, y: 76, color: "var(--teal)", related: ["ai", "cloud"] },
  {
    id: "electronics",
    label: "Electronics",
    x: 78,
    y: 78,
    color: "var(--gold)",
    related: ["robotics"],
  },
  {
    id: "ai",
    label: "AI / ML",
    x: 50,
    y: 50,
    color: "var(--purple-glow)",
    related: ["cyber", "robotics", "web", "cloud"],
  },
  {
    id: "cloud",
    label: "Azure / Cloud",
    x: 50,
    y: 14,
    color: "var(--cyan)",
    related: ["cyber", "ai", "web"],
  },
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
