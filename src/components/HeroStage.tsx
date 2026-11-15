import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Eye,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import astronautImg from '../assets/images/holographic_astronaut_1794757760886.jpg';
import { PROFILE } from '../data/portfolioData';
import { CapgammaLogo } from './CapgammaLogo';
import type { GlitchIntensity } from '../utils/sound';

interface HeroStageProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onTone: (intensity?: GlitchIntensity) => void;
  onOpenProfile: (tab: 'about' | 'work' | 'contact') => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({
  audioEnabled,
  onToggleAudio,
  onTone,
  onOpenProfile,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const maskLayerRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onToneRef = useRef(onTone);
  onToneRef.current = onTone;

  const [fullCircuitMode, setFullCircuitMode] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // Dual-Layer Holographic Spotlight Engine (60FPS rAF + rapid sweep glitch SFX)
  useEffect(() => {
    const container = containerRef.current;
    const maskLayer = maskLayerRef.current;
    const halo = haloRef.current;
    if (!container || !maskLayer || !halo) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let targetX = window.innerWidth * 0.72;
    let targetY = window.innerHeight * 0.48;
    let currentX = targetX;
    let currentY = targetY;
    let isHovered = false;
    let animationFrameId = 0;
    let lastGlitchScanTime = 0;

    const getRadius = () => (window.innerWidth < 768 ? 110 : 165);

    const renderMask = () => {
      if (fullCircuitMode) {
        maskLayer.style.maskImage = 'none';
        maskLayer.style.webkitMaskImage = 'none';
        halo.style.opacity = '0';
        return;
      }

      const radius = getRadius();
      const maskStyle = `radial-gradient(circle ${radius}px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.35) 70%, transparent 100%)`;
      maskLayer.style.maskImage = maskStyle;
      maskLayer.style.webkitMaskImage = maskStyle;

      halo.style.opacity = '1';
      halo.style.transform = `translate3d(${currentX - radius}px, ${currentY - radius}px, 0)`;
      halo.style.width = `${radius * 2}px`;
      halo.style.height = `${radius * 2}px`;
    };

    const tick = () => {
      if (!fullCircuitMode) {
        const ease = isHovered ? 0.16 : 0.045;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        if (!isHovered && !prefersReducedMotion) {
          const time = Date.now() * 0.0012;
          const anchorX = window.innerWidth < 768 ? window.innerWidth * 0.55 : window.innerWidth * 0.74;
          targetX = anchorX + Math.cos(time) * 60;
          targetY = window.innerHeight * 0.48 + Math.sin(time * 1.3) * 45;
        }
      }

      renderMask();
      animationFrameId = window.requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nextX = e.clientX - rect.left;
      const nextY = e.clientY - rect.top;
      const speed = Math.hypot(nextX - targetX, nextY - targetY);

      const now = Date.now();
      if (speed > 42 && now - lastGlitchScanTime > 260) {
        onToneRef.current('light');
        lastGlitchScanTime = now;
      }

      targetX = nextX;
      targetY = nextY;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
        isHovered = true;
      }
    };

    const handleTouchEnd = () => {
      isHovered = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [fullCircuitMode]);

  // Ambient Floating Lightning Cyan (65%) & Electric Violet (35%) Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      isCyan: boolean;
    }

    const createParticle = (spawnBottom = false): Particle => ({
      x: Math.random() * width,
      y: spawnBottom ? height + 10 : Math.random() * height,
      size: Math.random() * 2.3 + 0.8,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: -Math.random() * 0.55 - 0.15,
      alpha: Math.random() * 0.72 + 0.25,
      isCyan: Math.random() > 0.35,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const count = width < 768 ? 36 : 55;
    const particles: Particle[] = Array.from({ length: count }, () => createParticle(false));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(true);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isCyan
          ? `rgba(0, 240, 255, ${p.alpha})`
          : `rgba(167, 139, 250, ${p.alpha})`;
        ctx.fill();
      }
      animId = window.requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    animId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between pt-20"
    >
      {/* Background Holographic Astronaut Stage */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden">
        {/* Ambient Dark Violet Radial Backlight behind Astronaut */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(124,58,237,0.22),rgba(0,0,0,0.98)_65%)]" />

        {!imageLoadFailed ? (
          <div className="astronaut-float-wrapper absolute inset-0 w-full h-full flex items-center justify-center md:justify-end md:pr-8 lg:pr-14">
            {/* Layer A: Base Dimmed Hologram Astronaut */}
            <img
              src={astronautImg}
              alt="CAPGAMMA Holographic Astronaut Base"
              referrerPolicy="no-referrer"
              onError={() => setImageLoadFailed(true)}
              className="astronaut-img astronaut-base-state w-[92%] sm:w-[75%] md:w-[58%] lg:w-[52%] max-w-[740px] h-auto"
            />

            {/* Layer B: Illuminated Lightning Cyan & Electric Violet Hologram Reveal Layer */}
            <div
              ref={maskLayerRef}
              className="absolute inset-0 w-full h-full flex items-center justify-center md:justify-end md:pr-8 lg:pr-14 z-[2]"
            >
              <img
                src={astronautImg}
                alt="CAPGAMMA Holographic Astronaut Illuminated"
                referrerPolicy="no-referrer"
                onError={() => setImageLoadFailed(true)}
                className="astronaut-img astronaut-reveal-state w-[92%] sm:w-[75%] md:w-[58%] lg:w-[52%] max-w-[740px] h-auto"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(124,58,237,0.26),transparent_55%)]">
            <div
              ref={maskLayerRef}
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(0,240,255,0.32),transparent_60%)]"
            />
          </div>
        )}

        {/* Measured Contrast Scrims */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black via-black/80 to-transparent md:w-2/3" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/95 via-transparent to-black/60" />

        {/* Lightning Cyan & Dark Violet Spotlight Halo */}
        <div
          ref={haloRef}
          className="absolute top-0 left-0 rounded-full border-2 border-[#00f0ff]/65 shadow-[0_0_45px_rgba(0,240,255,0.32),0_0_80px_rgba(124,58,237,0.32),inset_0_0_32px_rgba(0,240,255,0.16)] pointer-events-none z-[4] transition-opacity duration-200"
        />
      </div>

      {/* Subtle Violet & Cyan Cyber Grid + Floating Particles */}
      <div className="cyber-grid absolute inset-0 z-[5] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 z-[6] pointer-events-none" />

      {/* Main Hero Copy Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 my-auto py-12 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Clean Unboxed Metadata Kicker (Zero pills, zero pulsing dots) */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#00f0ff] tracking-wide mb-4">
            <span>{PROFILE.name}</span>
            <span aria-hidden="true" className="text-violet-400/70">
              ·
            </span>
            <span className="text-purple-100">{PROFILE.institution}</span>
            <span aria-hidden="true" className="text-violet-400/70">
              ·
            </span>
            <span className="text-purple-200/80">MBA Aspirant</span>
          </div>

          {/* Primary Display Wordmark */}
          <h1 className="font-['Syne'] text-6xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[0.95] bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(0,240,255,0.35)] [text-wrap:balance]">
            {PROFILE.brand}
          </h1>

          {/* Role Sub-Header */}
          <p className="mt-4 font-['Syne'] text-lg sm:text-xl font-bold text-[#00f0ff] tracking-wide [text-shadow:0_0_24px_rgba(0,240,255,0.35)]">
            {PROFILE.role}
          </p>

          {/* Core Value Proposition */}
          <p className="mt-4 text-base sm:text-xl font-normal text-slate-200 max-w-xl leading-relaxed">
            Bridging hardware logic and strategic leadership — pursuing{' '}
            <span className="text-white font-bold">
              Electronics &amp; Computer Engineering at SAKEC ACT
            </span>{' '}
            with core foundations in{' '}
            <span className="text-[#00f0ff] font-bold">MATLAB, C &amp; Electronics</span>, geared
            toward an <span className="text-white font-bold">MBA</span>.
          </p>

          {/* Unboxed Foundation Line */}
          <p className="mt-4 font-semibold text-xs text-purple-200/85 tracking-wide">
            {PROFILE.coreFoundations.join(' · ')}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                onTone('medium');
                onOpenProfile('about');
              }}
              onMouseEnter={() => onTone('light')}
              className="group inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full bg-[#0b0516]/85 hover:bg-[#130824] border border-violet-500/35 hover:border-[#00f0ff]/75 text-white font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
            >
              <span className="whitespace-nowrap">Explore Profile</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#05010d] flex items-center justify-center transition-transform duration-150 group-hover:bg-[#00f0ff] group-hover:translate-x-0.5 shadow-[0_0_12px_rgba(0,240,255,0.35)]">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onTone('medium');
                onOpenProfile('contact');
              }}
              onMouseEnter={() => onTone('light')}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-violet-950/85 hover:bg-violet-900/90 border border-violet-500/55 hover:border-[#00f0ff] text-[#00f0ff] font-bold text-sm sm:text-base transition-colors duration-150 cursor-pointer whitespace-nowrap shadow-[0_0_24px_rgba(124,58,237,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
            >
              <CapgammaLogo
                size={18}
                className="transition-transform duration-150 group-hover:scale-110"
              />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Utility & Verified Social Bar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Verified Social & Email Links */}
        <div className="flex items-center gap-2.5">
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn — Aryan Sawant"
            title="LinkedIn — Aryan Sawant"
            onMouseEnter={() => onTone('light')}
            className="w-10 h-10 rounded-full border border-violet-500/35 bg-[#0b0516]/80 hover:border-[#00f0ff]/75 flex items-center justify-center text-purple-200 hover:text-[#00f0ff] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub — aryansawant041008"
            title="GitHub — aryansawant041008"
            onMouseEnter={() => onTone('light')}
            className="w-10 h-10 rounded-full border border-violet-500/35 bg-[#0b0516]/80 hover:border-[#00f0ff]/75 flex items-center justify-center text-purple-200 hover:text-[#00f0ff] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href={`mailto:${PROFILE.email}`}
            aria-label={`Email ${PROFILE.email}`}
            title={`Email — ${PROFILE.email}`}
            onMouseEnter={() => onTone('light')}
            className="w-10 h-10 rounded-full border border-violet-500/35 bg-[#0b0516]/80 hover:border-[#00f0ff]/75 flex items-center justify-center text-purple-200 hover:text-[#00f0ff] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Center Scroll Prompt */}
        <a
          href="#about"
          onClick={() => onTone('medium')}
          className="hidden sm:flex items-center gap-3 text-xs text-purple-200/75 hover:text-[#00f0ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-full px-2 py-1"
        >
          <span className="w-[20px] h-[32px] rounded-full border border-violet-500/55 bg-[#0d051c]/80 flex justify-center pt-1.5">
            <span className="w-1 h-1.5 rounded-full bg-[#00f0ff] scroll-wheel-dot" />
          </span>
          <span className="tracking-wide">Scan Hologram · Scroll to explore</span>
        </a>

        {/* Interactive Optical & Cyber Glitch Audio Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              onTone('medium');
              setFullCircuitMode((prev) => !prev);
            }}
            className={`inline-flex items-center gap-2 px-3.5 h-10 rounded-full border text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] ${
              fullCircuitMode
                ? 'border-[#00f0ff]/75 bg-violet-950/90 text-[#00f0ff]'
                : 'border-violet-500/35 bg-[#0b0516]/80 text-purple-200 hover:border-[#00f0ff]/60 hover:text-white'
            }`}
          >
            {fullCircuitMode ? (
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{fullCircuitMode ? 'Full Hologram' : 'Holo-Scan'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={
              audioEnabled ? 'Mute cyber glitch audio' : 'Enable cyber glitch audio'
            }
            className={`inline-flex items-center gap-2 px-3.5 h-10 rounded-full border text-[11px] font-bold tracking-wider uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] ${
              audioEnabled
                ? 'border-[#00f0ff]/75 bg-violet-950/90 text-[#00f0ff]'
                : 'border-violet-500/35 bg-[#0b0516]/80 text-purple-200 hover:border-[#00f0ff]/60 hover:text-white'
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{audioEnabled ? 'Glitch On' : 'SFX Off'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
