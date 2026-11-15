export type ProjectCategory = 'All' | 'ECE & MATLAB' | 'C & Systems' | 'Tech-Business';

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  role: string;
  summary: string;
  architecture: string;
  metrics: string;
  stack: string[];
  featured?: boolean;
}

export const PROFILE = {
  brand: 'CAPGAMMA',
  name: 'Aryan Amendra Sawant',
  role: 'Electronics Engineering & Business Strategy',
  headlineRole: 'ECE & Tech-Business Innovator',
  institution: 'SAKEC ACT · ECE Branch',
  fullInstitution: 'Shah & Anchor Kutchhi Engineering College (SAKEC ACT), Mumbai',
  track: 'MBA Track',
  location: 'Mumbai, India',
  availability: 'Open for Collaborations',
  email: 'aryansawant041008@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/aryan-sawant-004a893a3',
  linkedinHandle: 'linkedin.com/in/aryan-sawant',
  githubUrl: 'https://github.com/aryansawant041008',
  githubHandle: 'github.com/aryansawant041008',
  tagline:
    'Bridging hardware logic and strategic leadership — pursuing Electronics & Computer Engineering at SAKEC ACT with core foundations in MATLAB, C & Electronics, geared toward an MBA.',
  coreFoundations: ['SAKEC ACT (ECE)', 'MATLAB', 'C Programming', 'Business Studies', 'Target: MBA'],
  bioParagraphs: [
    'Aryan Amendra Sawant is an undergraduate engineering student in the Electronics & Computer Engineering (ECE) branch at Shah & Anchor Kutchhi Engineering College (SAKEC ACT), Mumbai.',
    'Combining analytical problem-solving in Electronics, C Programming, and MATLAB with a strong passion for Business Studies, Management & Strategy, Aryan is preparing to advance his academic journey through an MBA — aiming to operate at the intersection of deep technology and executive leadership.',
  ],
  highlights: [
    { label: 'Institution', value: 'SAKEC ACT · ECE' },
    { label: 'Core Foundations', value: 'MATLAB · C · ECE' },
    { label: 'Business Focus', value: 'Strategy & Mgmt' },
    { label: 'Higher Studies Goal', value: 'MBA Track' },
  ],
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'matlab-modeling',
    index: '01.',
    title: 'MATLAB & Computational Modeling',
    summary:
      'Signal processing, mathematical simulation, waveform visualization, and engineering algorithm analysis built in MATLAB for rigorous system verification.',
    deliverables: ['Signal & System Simulation', 'Numerical Analysis', 'Engineering Data Visualization'],
  },
  {
    id: 'c-electronics',
    index: '02.',
    title: 'C Language & Core Electronics',
    summary:
      'Structured programming in C, microcontroller logic, digital and analog circuit fundamentals, and practical hardware-software interfacing.',
    deliverables: ['Structured C Programming', 'Digital & Analog Circuits', 'Microcontroller Logic'],
  },
  {
    id: 'business-mba',
    index: '03.',
    title: 'Business Studies & Postgraduate Roadmap (MBA)',
    summary:
      'Strong interest in management strategy, technology commercialization, product leadership, and preparing for top-tier MBA programs.',
    deliverables: ['Management & Case Strategy', 'Tech Commercialization', 'MBA Preparation'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'matlab-signal-lab',
    title: 'MATLAB Signal Analysis & Filter Simulation',
    category: 'ECE & MATLAB',
    year: '2026',
    role: 'ECE Undergraduate · SAKEC ACT',
    summary:
      'Computational modeling suite for inspecting frequency response, time-domain waveforms, and noise attenuation filters across core ECE laboratory signals.',
    architecture:
      'Parameterized MATLAB scripts computing FFT spectra, pole-zero stability plots, and step-response comparisons for digital filter verification.',
    metrics: 'Multi-band filter plots · Real-time FFT diagnostics',
    stack: ['MATLAB', 'Signal Processing', 'Linear Systems', 'ECE Lab'],
    featured: true,
  },
  {
    id: 'c-embedded-control',
    title: 'Structured C Logic & Circuit Interfacing',
    category: 'C & Systems',
    year: '2026',
    role: 'Electronics & C Developer',
    summary:
      'Modular C routines implementing state-machine control, bitwise register manipulation, and deterministic input/output handling for core electronics circuits.',
    architecture:
      'Clean memory-safe C modules separating hardware pin abstraction from logical state transitions and timing loops.',
    metrics: 'Zero dynamic allocation · Deterministic state transitions',
    stack: ['C Programming', 'Digital Logic', 'Circuit Fundamentals', 'Bitwise I/O'],
  },
  {
    id: 'tech-venture-strategy',
    title: 'Hardware-to-Market Commercialization Study',
    category: 'Tech-Business',
    year: '2025',
    role: 'Business Strategy Analyst',
    summary:
      'Strategic case blueprint evaluating how emerging electronics prototypes transition from lab validation into viable commercial products with clear unit economics.',
    architecture:
      'Structured cost-breakdown model pairing component BOM analysis with customer segment sizing and go-to-market sequencing.',
    metrics: 'BOM-to-margin model · MBA case portfolio',
    stack: ['Business Studies', 'Management Strategy', 'Unit Economics', 'Product Analysis'],
  },
  {
    id: 'capgamma-identity-portal',
    title: 'CAPGAMMA Interactive Showcase Architecture',
    category: 'C & Systems',
    year: '2026',
    role: 'Creator & Architect',
    summary:
      'High-contrast obsidian-violet and lightning-cyan web portal featuring a 60 FPS dual-layer holographic spotlight reveal, particle physics canvas, and cyber-glitch audio synthesis.',
    architecture:
      'React + TypeScript architecture powered by decoupled requestAnimationFrame pointer tracking and zero external audio assets.',
    metrics: '60 FPS spotlight loop · Full keyboard & touch support',
    stack: ['React', 'TypeScript', 'HTML5 Canvas', 'Web Audio API'],
  },
];
