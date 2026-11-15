import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, X } from 'lucide-react';
import {
  CAPABILITIES,
  PROFILE,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import type { GlitchIntensity } from '../utils/sound';

interface ProfileSectionsProps {
  onTone: (intensity?: GlitchIntensity) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'ECE & MATLAB', 'C & Systems', 'Tech-Business'];

export const ProfileSections: React.FC<ProfileSectionsProps> = ({ onTone }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeProject]);

  const handleCopyEmail = async () => {
    onTone('medium');
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTone('heavy');
    const subject = encodeURIComponent(`${PROFILE.brand} Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    setSubmitted(true);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <div className="bg-[#030106] border-t border-violet-500/20">
        {/* 1. ACADEMIC & VISION */}
        <section
          id="about"
          className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 border-b border-violet-500/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#00f0ff] tracking-wide mb-3">
                  Academic &amp; Vision
                </p>
                <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                  Hardware Logic Meets Executive Tech Strategy
                </h2>
              </div>
              <p className="mt-6 text-xs font-semibold text-purple-200/75">
                {PROFILE.institution} · {PROFILE.track}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base text-slate-300 leading-relaxed max-w-3xl">
              {PROFILE.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 4-column Highlights Row */}
          <div className="mt-14 pt-10 border-t border-violet-500/15 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PROFILE.highlights.map((item) => (
              <div key={item.label}>
                <p className="text-xs text-purple-200/70 mb-1.5">{item.label}</p>
                <p className="font-['Syne'] text-lg font-bold text-white tabular-nums">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. SKILLS & CAREER */}
        <section
          id="expertise"
          className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 border-b border-violet-500/15"
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#00f0ff] tracking-wide mb-3">
              Technical &amp; Business Stack
            </p>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Foundations in MATLAB, C, Electronics &amp; Management Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.id}
                className="rounded-2xl border border-violet-500/25 bg-[#090314] p-7 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-['Syne'] text-xl font-bold text-white mb-3">
                    <span className="text-[#00f0ff] mr-2 font-semibold text-base tabular-nums">
                      {cap.index}
                    </span>
                    {cap.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{cap.summary}</p>
                </div>

                <ul className="mt-6 pt-5 border-t border-violet-500/15 space-y-2 text-xs text-purple-200/75">
                  {cap.deliverables.map((deliv) => (
                    <li key={deliv} className="flex items-center gap-2">
                      <span className="text-[#00f0ff]" aria-hidden="true">
                        —
                      </span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 3. SELECTED WORKS */}
        <section
          id="work"
          className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24 border-b border-violet-500/15"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium text-[#00f0ff] tracking-wide mb-3">
                Selected Works
              </p>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Engineering Simulations, C Logic &amp; Strategy Case Studies
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by discipline"
              className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0d051c] border border-violet-500/25"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      onTone('light');
                      setSelectedCategory(category);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] ${
                      active
                        ? 'bg-gradient-to-r from-[#00f0ff] to-sky-400 text-[#05010d] font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  onTone('medium');
                  setActiveProject(project);
                }}
                onMouseEnter={() => onTone('light')}
                className="group text-left rounded-2xl border border-violet-500/25 hover:border-[#00f0ff]/65 bg-[#090314] p-7 transition-colors duration-150 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 text-xs text-purple-200/75">
                      <span className="text-[#00f0ff] font-medium">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold tabular-nums">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.role}</span>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-purple-300/70 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{project.summary}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-violet-500/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-purple-200/75 tabular-nums">
                    {project.metrics}
                  </span>
                  <span className="text-slate-300 group-hover:text-white font-medium">
                    Read Case Study
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. DIRECT CONNECT */}
        <section
          id="contact"
          className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#00f0ff] tracking-wide mb-3">
                Direct Connect
              </p>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Connect with Aryan Amendra Sawant
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Open for academic collaborations, technical ECE projects, business case
                discussions, and networking toward MBA programs.
              </p>

              <div className="mt-8 pt-6 border-t border-violet-500/20 space-y-5">
                <div>
                  <p className="text-xs text-purple-200/70 mb-1.5">Direct Email</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-semibold text-sm text-white hover:text-[#00f0ff] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-500/35 hover:border-[#00f0ff]/65 bg-[#0d051c] text-xs font-medium text-purple-100 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00f0ff]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#090314] border border-violet-500/30 hover:border-[#00f0ff]/65 transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-[#00f0ff]"
                  >
                    <Linkedin className="w-4 h-4 text-[#00f0ff] shrink-0" aria-hidden="true" />
                    <span className="truncate">{PROFILE.linkedinHandle}</span>
                  </a>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#090314] border border-violet-500/30 hover:border-[#00f0ff]/65 transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-[#00f0ff]"
                  >
                    <Github className="w-4 h-4 text-[#00f0ff] shrink-0" aria-hidden="true" />
                    <span className="truncate">{PROFILE.githubHandle}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-violet-500/25 bg-[#090314] p-6 sm:p-8">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-purple-200/80 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05010c] border border-violet-500/35 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f0ff]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs text-purple-200/80 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05010c] border border-violet-500/35 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f0ff]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-purple-200/80 mb-1.5"
                  >
                    Message for Aryan Amendra Sawant
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your collaboration idea, project details, or inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05010c] border border-violet-500/35 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-semibold text-xs text-purple-300/75">
                    Direct: {PROFILE.email}
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-sky-400 hover:from-white hover:to-[#00f0ff] text-[#05010d] font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Send via Email Client</span>
                  </button>
                </div>

                {submitted && (
                  <div
                    role="status"
                    className="p-3.5 rounded-xl bg-violet-950/90 border border-[#00f0ff]/45 text-[#00f0ff] text-xs font-semibold"
                  >
                    Opening your email client addressed to {PROFILE.email}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Quiet Editorial Footer */}
        <footer className="border-t border-violet-500/15">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200/70">
            <p>
              © {new Date().getFullYear()} {PROFILE.brand} · {PROFILE.name} · {PROFILE.institution}
            </p>
            <div className="flex items-center gap-6">
              <a href="#home" className="hover:text-[#00f0ff] transition-colors">
                Top
              </a>
              <a href="#about" className="hover:text-[#00f0ff] transition-colors">
                Academic &amp; Vision
              </a>
              <a href="#expertise" className="hover:text-[#00f0ff] transition-colors">
                Skills &amp; Career
              </a>
              <a href="#work" className="hover:text-[#00f0ff] transition-colors">
                Work
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Project Case Study Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030106]/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-2xl rounded-3xl border border-violet-500/35 bg-[#0d061a] p-6 sm:p-8 shadow-[0_0_70px_rgba(124,58,237,0.35),0_0_30px_rgba(0,240,255,0.16)] max-h-[88vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-violet-500/25 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-purple-200/75 mb-2">
                  <span className="text-[#00f0ff] font-medium">{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold tabular-nums">{activeProject.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.role}</span>
                </div>
                <h3
                  id="project-modal-title"
                  className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  onTone('light');
                  setActiveProject(null);
                }}
                aria-label="Close project details"
                className="w-10 h-10 rounded-full border border-violet-500/35 bg-[#090314] flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/60 shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="text-xs font-medium text-purple-200/70 uppercase tracking-wider mb-1.5">
                  Overview
                </h4>
                <p>{activeProject.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-purple-200/70 uppercase tracking-wider mb-1.5">
                  Architecture &amp; Execution
                </h4>
                <p>{activeProject.architecture}</p>
              </div>

              <div className="pt-4 border-t border-violet-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-purple-200/70 mb-1">Measured Outcome</p>
                  <p className="font-semibold text-xs text-[#00f0ff] tabular-nums">
                    {activeProject.metrics}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-purple-200/70 mb-1">Technical Stack</p>
                  <p className="text-xs text-slate-200">{activeProject.stack.join(' · ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
