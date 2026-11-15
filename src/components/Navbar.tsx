import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { CapgammaLogo } from './CapgammaLogo';
import type { GlitchIntensity } from '../utils/sound';

interface NavbarProps {
  onOpenProfile: (tab: 'about' | 'work' | 'contact') => void;
  onTone: (intensity?: GlitchIntensity) => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Academic & Vision', href: '#about' },
  { label: 'Skills & Career', href: '#expertise' },
  { label: 'Work', href: '#work' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile, onTone }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    onTone('medium');
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 border-b border-violet-500/20 bg-[#030106]/85 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-16 sm:h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Custom CAPGAMMA Crowned Eye Emblem */}
          <a
            href="#home"
            onClick={() => onTone('medium')}
            onMouseEnter={() => onTone('light')}
            className="group inline-flex items-center gap-3 text-white font-['Syne'] font-extrabold text-xl tracking-wider whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-md px-1"
          >
            <span className="w-9 h-9 rounded-xl bg-[#090314]/95 border border-[#00f0ff]/55 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_28px_rgba(0,240,255,0.55)] transition-all">
              <CapgammaLogo
                size={22}
                className="text-[#00f0ff] cyan-logo-glow transition-transform duration-200 group-hover:scale-110"
              />
            </span>
            <span className="bg-gradient-to-r from-white via-[#00f0ff] to-sky-300 bg-clip-text text-transparent">
              {PROFILE.brand}
            </span>
          </a>

          {/* Zone 2: Clean Typographic Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => onTone('medium')}
                onMouseEnter={() => onTone('light')}
                className="relative py-1 text-zinc-300 hover:text-[#00f0ff] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-violet-500 after:to-[#00f0ff] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action (+ mobile menu trigger on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                onTone('medium');
                onOpenProfile('about');
              }}
              onMouseEnter={() => onTone('light')}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#00f0ff] to-sky-400 hover:from-white hover:to-[#00f0ff] text-[#05010d] font-bold text-sm rounded-lg px-4 py-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030106]"
            >
              <span>Explore Dossier</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                onTone('medium');
                setMobileOpen((prev) => !prev);
              }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden w-11 h-11 rounded-lg border border-violet-500/35 bg-[#0b0516]/90 flex items-center justify-center text-white hover:border-[#00f0ff]/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-20 z-50 md:hidden rounded-2xl border border-violet-500/35 bg-[#0d061a]/95 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-violet-500/25 pb-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-[#00f0ff] uppercase tracking-wider">
                {PROFILE.institution}
              </p>
              <p className="font-['Syne'] font-bold text-base text-white">{PROFILE.name}</p>
            </div>
            <span className="text-xs font-semibold text-purple-200">{PROFILE.track}</span>
          </div>

          <nav className="flex flex-col gap-2 mb-5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 hover:text-[#00f0ff] hover:bg-violet-500/15 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 hover:text-[#00f0ff] hover:bg-violet-500/15 transition-colors"
            >
              Connect
            </a>
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onTone('medium');
              onOpenProfile('about');
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-sky-400 text-[#05010d] font-bold text-sm transition-colors cursor-pointer"
          >
            Explore Dossier
          </button>
        </div>
      )}
    </>
  );
};
