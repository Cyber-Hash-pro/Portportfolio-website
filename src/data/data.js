// ============================================
// PORTFOLIO DATA - Central data store
// ============================================
// Update this file to change your portfolio content

// Personal Information
export const personalInfo = {
    name: "Nilesh Patil",
    title: "Full Stack Developer",
    tagline: "Building Scalable AI-Powered Systems",
    email: "np103177@gmail.com",
    location: "Jalgaon, Maharashtra",
    resumeLink: "#",
    social: {
        github: "https://github.com/Cyber-Hash-pro",
        linkedin: "https://linkedin.com/in/nilesh-patil-451637322",
        twitter: "#",
    }
};

// About Section
export const aboutData = {
    image: "/about.png",
    bio: `Full-stack developer specializing in AI-powered platforms, real-time systems, and scalable microservices architectures. Built production-grade applications including AI conversational systems, AI-music streaming, and an AI-driven e-commerce marketplace with distributed services, WebSocket communication, secure authentication, and event-driven workflows. Passionate about building high-performance systems with measurable real-world impact.`,
    stats: [
        { label: "Projects Built", value: "3+" },
        { label: "Technologies", value: "20+" },
        { label: "Commitment", value: "100%" },
        { label: "Graduation", value: "2027" }
    ]
};

// Skills Data
export const skillsData = {
    frontend: [
        { name: "React.js", icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg", level: 90 },
        { name: "Redux Toolkit", icon: "https://cdn.worldvectorlogo.com/logos/redux.svg", level: 85 },
        { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", level: 90 },
        { name: "Vite", icon: "https://cdn.worldvectorlogo.com/logos/vitejs.svg", level: 85 },
        { name: "Next.js", icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg", level: 80 },
        { name: "TypeScript", icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg", level: 80 }
    ],
    backend: [
        { name: "Node.js", icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", level: 85 },
        { name: "Express.js", icon: "https://cdn.worldvectorlogo.com/logos/express-109.svg", level: 85 },
        { name: "MongoDB", icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg", level: 85 },
        { name: "PostgreSQL", icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg", level: 75 },
        { name: "Prisma ORM", icon: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg", level: 80 },
        { name: "Redis", icon: "https://cdn.worldvectorlogo.com/logos/redis.svg", level: 70 },
        { name: "Socket.IO", icon: "https://cdn.worldvectorlogo.com/logos/socket-io.svg", level: 80 }
    ],
    tools: [
        { name: "Docker", icon: "https://cdn.worldvectorlogo.com/logos/docker-4.svg", level: 75 },
        { name: "AWS EC2", icon: "https://cdn.worldvectorlogo.com/logos/aws-ec2.svg", level: 70 },
        { name: "Git", icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg", level: 85 },
        { name: "RabbitMQ", icon: "https://cdn.worldvectorlogo.com/logos/rabbitmq.svg", level: 70 },
        { name: "Linux", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9e/UbuntuCoF.svg", level: 80 },
        { name: "LangChain", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4", level: 80 }
    ]
};

// Projects Data
export const projectsData = [
    {
        id: 1,
        title: "Real-Time AI Synchronized Music Platform",
        description: "AI-powered music streaming platform with mood detection and conversational assistant. Architected Docker-based microservices, implemented synchronized listening rooms using Socket.IO, and designed RabbitMQ event-driven workflows.",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Socket.IO", "LangChain", "RabbitMQ", "Docker"],
        github: "https://github.com/Cyber-Hash-pro",
        live: "#",
        featured: true
    },
    {
        id: 2,
        title: "Mino – AI-Powered E-Commerce Marketplace",
        description: "Microservices-based marketplace with AI shopping assistant. Features real-time order tracking, secure RBAC authentication, and 7 diverse services (Auth, Product, Cart, Order, AI Buddy, etc.).",
        thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "RabbitMQ", "Google Gemini"],
        github: "https://github.com/Cyber-Hash-pro",
        live: "#",
        featured: true
    },
    {
        id: 3,
        title: "Cyber-AI (Full-Stack AI Chat Application)",
        description: "Real-time conversational AI platform supporting text, image & file interactions. Features RAG with Pinecone, secure JWT auth, and a CI/CD pipeline with GitHub Actions.",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Socket.IO", "Pinecone", "Docker", "AWS"],
        github: "https://github.com/Cyber-Hash-pro",
        live: "https://ai.cyberhash.me/",
        featured: true
    }
];

// Experience Data
export const experienceData = [
    {
        id: 1,
        type: "education",
        role: "B.Tech in Computer Science and Engineering",
        company: "G H Raisoni College of Engineering and Management",
        duration: "2023 - 2027",
        location: "Jalgaon, Maharashtra",
        description: [
            "Pursuing Bachelor of Technology in Computer Science",
            "Focus on AI-powered platforms and systems Engineering"
        ],
        logo: "https://ui-avatars.com/api/?name=GH&background=A9927D&color=fff&size=64"
    },
    {
        id: 2,
        type: "work",
        role: "Job Ready Cohort (Full Stack Development)",
        company: "Sheriyans Coding School",
        duration: "2025",
        location: "Online",
        description: [
            "Intensive Full Stack Development Bootcamp (Frontend, Backend, DevOps)",
            "Built production-grade applications with modern tech stack",
            "Credential ID: 9808d600"
        ],
        logo: "https://ui-avatars.com/api/?name=SC&background=10B981&color=fff&size=64"
    }
];

// Navigation Links
export const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" }
];

// Tech Stack for Hero Marquee
export const techStack = [
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
    { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker-4.svg" },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
    { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
    { name: "Redis", logo: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
    { name: "RabbitMQ", logo: "https://cdn.worldvectorlogo.com/logos/rabbitmq.svg" },
    { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-ec2.svg" }
];
