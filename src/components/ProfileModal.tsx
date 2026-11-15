import React, { useState, useEffect } from 'react';
import { Activity, Briefcase, Cpu, Github, Linkedin, Mail, X } from 'lucide-react';
import { CAPABILITIES, PROFILE } from '../data/portfolioData';
import { CapgammaLogo } from './CapgammaLogo';
import type { GlitchIntensity } from '../utils/sound';

export type ProfileModalTab = 'about' | 'work' | 'contact';

interface ProfileModalProps {
  isOpen: boolean;
  activeTab: ProfileModalTab;
  onTabChange: (tab: ProfileModalTab) => void;
  onClose: () => void;
  onTone: (intensity?: GlitchIntensity) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  onTone,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTone('heavy');
    const subject = encodeURIComponent(`${PROFILE.brand} Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    setSent(true);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setName('');
    setEmail('');
    setMessage('');
  };

  const capabilityIcons = [Activity, Cpu, Briefcase];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030106]/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border border-violet-500/35 bg-[#0d061a]/95 p-6 sm:p-8 shadow-[0_0_70px_rgba(124,58,237,0.35),0_0_30px_rgba(0,240,255,0.18)] max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-violet-500/25 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-violet-950/90 border border-[#00f0ff]/45 flex items-center justify-center shrink-0">
              <CapgammaLogo size={24} className="text-[#00f0ff] cyan-logo-glow" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#00f0ff] mb-1">
                {PROFILE.brand} · Student &amp; Strategist Dossier
              </p>
              <h2
                id="profile-modal-heading"
                className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight"
              >
                {PROFILE.name}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/85 mt-0.5">
                ECE Undergraduate at <strong className="text-white">SAKEC ACT</strong> · Aspiring{' '}
                <strong className="text-[#00f0ff]">MBA</strong> Candidate
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile dialog"
            className="w-10 h-10 rounded-full border border-violet-500/35 bg-[#090314] flex items-center justify-center text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/60 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Tab Controls */}
        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex flex-wrap gap-2 mt-5 border-b border-violet-500/20 pb-4"
        >
          {[
            { id: 'about' as const, label: 'Academic & Vision' },
            { id: 'work' as const, label: 'Technical & Business Stack' },
            { id: 'contact' as const, label: 'Direct Connect' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onTone('light');
                  onTabChange(tab.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00f0ff] to-sky-400 text-[#05010d] font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-violet-500/15'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Academic & Vision */}
        {activeTab === 'about' && (
          <div className="mt-5 space-y-4 text-sm text-slate-300 leading-relaxed">
            {PROFILE.bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-4 rounded-2xl bg-[#090314]/85 border border-violet-500/30">
                <p className="text-[11px] font-semibold text-[#00f0ff]">Institution</p>
                <p className="font-semibold text-white mt-1">{PROFILE.institution}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#090314]/85 border border-violet-500/30">
                <p className="text-[11px] font-semibold text-[#00f0ff]">Core Domain</p>
                <p className="font-semibold text-white mt-1">Electronics &amp; Business</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#090314]/85 border border-violet-500/30">
                <p className="text-[11px] font-semibold text-[#00f0ff]">Higher Studies Goal</p>
                <p className="font-semibold text-[#00f0ff] mt-1">{PROFILE.track}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technical & Business Stack */}
        {activeTab === 'work' && (
          <div className="mt-5 space-y-3 text-sm">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = capabilityIcons[idx] || Cpu;
              return (
                <div
                  key={cap.id}
                  className="p-4 rounded-2xl bg-[#090314]/85 border border-violet-500/30 flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-950 border border-cyan-400/40 flex items-center justify-center text-[#00f0ff] shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-['Syne'] font-bold text-white">
                      {cap.index} {cap.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{cap.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Direct Connect */}
        {activeTab === 'contact' && (
          <div className="mt-5 space-y-4 text-sm">
            <p className="text-slate-300">
              Connect directly with <strong className="text-white">{PROFILE.name}</strong> for
              academic collaborations, technical projects, business case discussions, or networking.
            </p>

            {/* Verified Direct Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="p-3 rounded-xl bg-[#090314]/90 border border-violet-500/35 hover:border-[#00f0ff] transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-[#00f0ff]"
              >
                <Mail className="w-4 h-4 text-[#00f0ff] shrink-0" aria-hidden="true" />
                <span className="truncate">{PROFILE.email}</span>
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#090314]/90 border border-violet-500/35 hover:border-[#00f0ff] transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-[#00f0ff]"
              >
                <Linkedin className="w-4 h-4 text-[#00f0ff] shrink-0" aria-hidden="true" />
                <span className="truncate">{PROFILE.linkedinHandle}</span>
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#090314]/90 border border-violet-500/35 hover:border-[#00f0ff] transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-[#00f0ff]"
              >
                <Github className="w-4 h-4 text-[#00f0ff] shrink-0" aria-hidden="true" />
                <span className="truncate">{PROFILE.githubHandle}</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070210] border border-violet-500/35 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] text-xs"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070210] border border-violet-500/35 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] text-xs"
                />
              </div>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message for ${PROFILE.name}...`}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070210] border border-violet-500/35 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f0ff] text-xs"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="font-semibold text-[11px] text-purple-300/75">
                  Direct: {PROFILE.email}
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-sky-400 hover:from-white hover:to-[#00f0ff] text-[#05010d] font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer"
                >
                  Send via Email Client
                </button>
              </div>
            </form>

            {sent && (
              <div
                role="status"
                className="p-3 rounded-xl bg-violet-950/90 border border-[#00f0ff]/45 text-[#00f0ff] text-xs font-semibold text-center"
              >
                Opening email client to {PROFILE.email}...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
