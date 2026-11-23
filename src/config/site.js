/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Every piece of personal content lives here. Edit this file
 *  to update the portfolio — no component changes required.
 * ─────────────────────────────────────────────────────────────
 */

export const personal = {
  name: 'Manish Dabaria',
  firstName: 'Manish',
  initials: 'MD',
  role: 'Full-Stack Developer | AI Engineer | Generative AI Enthusiast',
  roles: ['Full-Stack Developer', 'AI & GenAI Enthusiast', 'Problem Solver'],
  tagline: 'Building intelligent solutions through code.',
  location: 'Jaipur, Rajasthan, India',
  university: 'JECRC University, Jaipur',
  degree: 'B.Tech in Computer Science and Engineering',
  graduation: 2027,
  availability: 'Open to internships & SDE / AI roles',
  timezone: 'Asia/Kolkata', // drives the live local-time clock
  // Phrases typed out one after another in the hero
  typedRoles: ['full-stack web apps.', 'LLM-powered products.', 'RAG pipelines.', 'scalable REST APIs.'],
  currentlyBuilding: 'Agentic AI workflows with LLMs & tool-use',
  // Put your photo in /public (e.g. /public/profile.jpg) and set the path here.
  // Leave empty to show the animated monogram instead.
  profileImage: '',
  resumeUrl: '/resume.pdf',
  siteUrl: 'https://manishdabaria.vercel.app', // update after deploying
};

// Social links used across the site
export const socials = {
  email: 'manishdabaria28@gmail.com',
  github: 'https://github.com/ManishDabaria',
  linkedin: 'https://www.linkedin.com/in/manish-dabaria/',
};

/**
 * Contact form delivery.
 *  - 'api'       → POST to the Vercel function at /api/contact (uses Resend; see .env.example)
 *  - 'web3forms' → POST to https://api.web3forms.com/submit with `web3formsKey`
 *  - 'formspree' → POST to your `formspreeEndpoint`
 * If the request fails, the form offers a mailto: fallback automatically.
 */
export const contactForm = {
  provider: 'api',
  apiEndpoint: '/api/contact',
  web3formsKey: '',
  formspreeEndpoint: '', // e.g. https://formspree.io/f/xxxxxxx
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  heading: 'A Little About Me',
  paragraphs: [
    "I'm a Computer Science Engineering student at JECRC University with a strong interest in software engineering, artificial intelligence, and emerging technologies.",
    'I enjoy transforming complex problems into practical digital solutions. My experience includes developing full-stack applications, integrating AI-powered features, designing REST APIs, and working with modern development technologies.',
    "I'm continuously learning, experimenting, and building projects to strengthen my engineering skills.",
  ],
  stats: [
    { value: 3, suffix: '+', label: 'Major Projects' },
    { value: 1, suffix: '', label: 'Internship Experience' },
    { value: 2027, suffix: '', label: 'Graduation', noCount: true },
    { value: '∞', suffix: '', label: 'Continuous Learning Mindset' },
  ],
};

/**
 * `icon` keys map to icons in src/components/ui/TechIcon.jsx.
 */
export const skillGroups = [
  {
    title: 'Programming Languages',
    icon: 'code',
    accent: 'accent',
    skills: [
      { name: 'C++', icon: 'cpp' },
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    title: 'Frontend Development',
    icon: 'layout',
    accent: 'cyan',
    skills: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'React.js', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'server',
    accent: 'violet',
    skills: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'REST APIs', icon: 'api' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgres' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'brain',
    accent: 'violet',
    skills: [
      { name: 'Machine Learning', icon: 'ml' },
      { name: 'Generative AI', icon: 'genai' },
      { name: 'Large Language Models', icon: 'llm' },
      { name: 'RAG', icon: 'rag' },
      { name: 'TensorFlow', icon: 'tensorflow' },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: 'wrench',
    accent: 'accent',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Postman', icon: 'postman' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
];

export const experience = [
  {
    role: 'Software Development Intern',
    company: 'Volansoft Technologies',
    companyUrl: '', // optional
    period: 'May 2025 – July 2025',
    type: 'Internship',
    location: 'Jaipur, India',
    highlights: [
      'Developed RESTful APIs using Node.js and Express.js.',
      'Improved application performance by approximately 25%.',
      'Developed reusable React components.',
      'Integrated MongoDB for backend data management.',
      'Collaborated with a development team of five members.',
    ],
    stack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'REST APIs'],
  },
];

/**
 * Projects. `image` is optional — leave empty to render the built-in
 * illustrated mockup (`mockup` selects which one). Put screenshots in
 * /public/projects/ and reference them as '/projects/name.webp'.
 */
export const projects = [
  {
    slug: 'ai-fitness-tracker',
    title: 'AI Fitness Tracker',
    category: 'Health · GenAI',
    overview:
      'An AI-powered fitness companion that tracks nutrition and generates personalised diet and workout plans.',
    highlights: [
      'Developed an AI-powered fitness tracking application.',
      'Implemented calorie tracking for 500+ food items.',
      'Integrated AI-generated diet and workout recommendations.',
      'Tested with 100+ users.',
    ],
    metrics: [
      { value: '500+', label: 'Food items' },
      { value: '100+', label: 'Test users' },
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Python', 'Generative AI'],
    image: '',
    mockup: 'fitness',
    github: '', // TODO: add repository URL
    demo: '', // TODO: add live demo URL
    featured: true,
  },
  {
    slug: 'ai-legal-document-analyzer',
    title: 'AI Legal Document Analyzer',
    category: 'LegalTech · RAG',
    overview:
      'An intelligent platform that lets users query, summarise and analyse legal documents using Retrieval-Augmented Generation.',
    highlights: [
      'Developed an intelligent legal document analysis platform.',
      'Implemented Retrieval-Augmented Generation for document querying.',
      'Enabled summarization and analysis of 1,000+ legal documents.',
      'Reduced document analysis time by up to 70%.',
    ],
    metrics: [
      { value: '1,000+', label: 'Documents' },
      { value: '70%', label: 'Faster analysis' },
    ],
    stack: ['MERN Stack', 'Python', 'RAG', 'LLMs'],
    image: '',
    mockup: 'legal',
    github: '',
    demo: '',
    featured: true,
  },
  {
    slug: 'artisan-hub',
    title: 'Artisan Hub',
    category: 'Marketplace · AI',
    overview:
      'An AI-powered marketplace connecting local artisans with customers, with smart listing assistance and multilingual support.',
    highlights: [
      'AI-powered marketplace connecting artisans with customers.',
      'Intelligent product listing assistance.',
      'Designed for multilingual accessibility and digital commerce.',
    ],
    metrics: [
      { value: 'AI', label: 'Listing assistant' },
      { value: 'i18n', label: 'Multilingual' },
    ],
    stack: ['React.js', 'Node.js', 'AI Integration'],
    image: '',
    mockup: 'artisan',
    github: '',
    demo: '',
    featured: true,
  },
];

export const education = [
  {
    degree: 'B.Tech — Computer Science and Engineering',
    institution: 'JECRC University',
    location: 'Jaipur, Rajasthan',
    period: '2023 – 2027',
    details: [
      'Core coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP.',
      'Focus areas: Artificial Intelligence, Machine Learning and Full-Stack Development.',
    ],
  },
];

/**
 * Achievements & activities. Add certifications, hackathons, etc.
 * `type` controls the badge: 'community' | 'activity' | 'certification' | 'hackathon' | 'learning' | 'opensource'
 * `link` is optional.
 */
export const achievements = [
  {
    type: 'community',
    title: 'Google Developer Student Clubs',
    subtitle: 'Data Science & Machine Learning Volunteer',
    description:
      'Volunteering with the DS/ML track — supporting workshops, study jams and peer learning sessions.',
    link: '',
  },
  {
    type: 'activity',
    title: 'Technical & Innovation Activities',
    subtitle: 'Participant',
    description:
      'Active participation in technical events and innovation-focused activities on campus and beyond.',
    link: '',
  },
  {
    type: 'opensource',
    title: 'Open Source & Community',
    subtitle: 'Contributor mindset',
    description:
      'Strong interest in open-source development and giving back to developer communities.',
    link: '',
  },
  {
    type: 'learning',
    title: 'Continuous Learning',
    subtitle: 'AI/ML & Software Engineering',
    description:
      'Consistently levelling up through courses, papers and side projects across AI/ML and systems.',
    link: '',
  },
];

export const exploring = [
  { name: 'Agentic AI', icon: 'sparkles', note: 'Planning, tool-use & autonomous workflows' },
  { name: 'AI Agents', icon: 'bot', note: 'Multi-agent orchestration with LLMs' },
  { name: 'System Design', icon: 'network', note: 'Trade-offs at scale' },
  { name: 'Scalable Backend Architecture', icon: 'layers', note: 'Queues, caching, microservices' },
  { name: 'MLOps', icon: 'workflow', note: 'Shipping models to production' },
  { name: 'Cloud Computing', icon: 'cloud', note: 'Deploy, observe, scale' },
  { name: 'Open Source Contributions', icon: 'git', note: 'Learning in public' },
];
