"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Calendar,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  Activity,
  Layers,
  Globe,
  Cpu,
  BarChart3,
  Rocket,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

/* ──────────────────────────── design tokens ──────────────────────────── */
const T = {
  moss: "#2E4036",
  clay: "#CC5833",
  cream: "#F2F0E9",
  charcoal: "#1A1A1A",
  headingFont: "'Plus Jakarta Sans', sans-serif",
  dramaFont: "'Cormorant Garamond', serif",
  monoFont: "'IBM Plex Mono', monospace",
};

/* ──────────────────────────── helper: split text into word spans ────── */
function WordSpans({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="word-reveal inline-block translate-y-full opacity-0">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

/* ──────────────────────────── CARD 1 — Diagnostic Shuffler ─────────── */
function DiagnosticShuffler() {
  const labels = [
    "Automatización de Procesos",
    "Análisis Predictivo",
    "Integración AI",
  ];
  const colors = ["#CC5833", "#2E4036", "#1A1A1A"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % labels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [labels.length]);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {labels.map((label, i) => {
        const offset = ((i - active + labels.length) % labels.length);
        const isTop = offset === 0;
        const zIndex = labels.length - offset;
        return (
          <div
            key={label}
            className="absolute transition-all duration-700 rounded-xl px-6 py-4 text-white font-medium text-sm shadow-lg"
            style={{
              fontFamily: T.monoFont,
              backgroundColor: colors[i],
              zIndex,
              transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05}) rotate(${offset * -2}deg)`,
              opacity: isTop ? 1 : 0.7 - offset * 0.15,
              transition:
                "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Cpu size={16} className="inline mr-2 opacity-60" />
            {label}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────── CARD 2 — Telemetry Typewriter ─────────── */
function TelemetryTypewriter() {
  const messages = [
    "Conectando con Google Workspace...",
    "Sincronizando Microsoft 365...",
    "Integrando sistema legacy...",
    "Optimizando flujos de trabajo...",
  ];
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const current = messages[msgIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev.slice(-2), current]);
        setMsgIdx((m) => (m + 1) % messages.length);
        setCharIdx(0);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [charIdx, msgIdx, messages]);

  return (
    <div
      className="h-48 w-full flex flex-col justify-between"
      style={{ fontFamily: T.monoFont }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full animate-pulse"
          style={{ backgroundColor: T.clay }}
        />
        <span className="text-xs font-medium uppercase tracking-widest opacity-60">
          Live Feed
        </span>
      </div>
      <div className="flex-1 space-y-1.5 text-xs leading-relaxed opacity-50">
        {lines.map((l, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: T.moss }} />
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="text-sm mt-2" style={{ color: T.charcoal }}>
        <span className="opacity-40">&gt; </span>
        {messages[msgIdx].slice(0, charIdx)}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
}

/* ──────────────────────────── CARD 3 — Cursor Protocol Scheduler ───── */
function CursorScheduler() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeDay, setActiveDay] = useState(-1);
  const [pressing, setPressing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [cursorOnSave, setCursorOnSave] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  const targetDay = 2; // Miércoles

  useEffect(() => {
    let cancelled = false;

    const runSequence = async () => {
      await delay(800);
      if (cancelled) return;

      // Move cursor to target day cell
      if (gridRef.current) {
        const cells = gridRef.current.children;
        const cell = cells[targetDay] as HTMLElement;
        if (cell) {
          const rect = cell.getBoundingClientRect();
          const parentRect = gridRef.current.getBoundingClientRect();
          setCursorPos({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2,
          });
        }
      }

      await delay(1000);
      if (cancelled) return;
      setPressing(true);

      await delay(300);
      if (cancelled) return;
      setPressing(false);
      setActiveDay(targetDay);

      await delay(600);
      if (cancelled) return;
      setShowSave(true);

      await delay(500);
      if (cancelled) return;
      // Move cursor to save button area
      setCursorOnSave(true);
      setCursorPos({ x: 100, y: 160 });

      await delay(800);
      if (cancelled) return;
      setPressing(true);

      await delay(300);
      if (cancelled) return;
      setPressing(false);

      // Reset and loop
      await delay(2000);
      if (cancelled) return;
      setActiveDay(-1);
      setShowSave(false);
      setCursorOnSave(false);
      setCursorPos({ x: 0, y: 0 });

      if (!cancelled) runSequence();
    };

    runSequence();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-48 w-full overflow-hidden">
      <div ref={gridRef} className="grid grid-cols-7 gap-1.5 mb-3">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-lg text-xs font-semibold h-10 transition-all duration-300"
            style={{
              fontFamily: T.monoFont,
              backgroundColor:
                activeDay === i ? T.clay : "rgba(0,0,0,0.04)",
              color: activeDay === i ? "white" : T.charcoal,
              transform:
                pressing && i === targetDay && activeDay === -1
                  ? "scale(0.9)"
                  : "scale(1)",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <button
        ref={saveRef}
        className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-300"
        style={{
          fontFamily: T.monoFont,
          backgroundColor: T.moss,
          opacity: showSave ? 1 : 0.3,
          transform:
            cursorOnSave && pressing ? "scale(0.95)" : "scale(1)",
        }}
      >
        Guardar
      </button>

      {/* SVG Cursor */}
      <svg
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: cursorPos.x - 4,
          top: cursorPos.y - 2,
          width: 20,
          height: 24,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }}
        viewBox="0 0 20 24"
        fill="none"
      >
        <path
          d="M2 2L2 19L6.5 14.5L11 22L14 20.5L9.5 13L16 13L2 2Z"
          fill={T.charcoal}
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ──────────────────────────── PROTOCOL SVGs ─────────────────────────── */
function ConcentricCircles() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-32 h-32 md:w-48 md:h-48"
      style={{ animation: "spin-slow 20s linear infinite" }}
    >
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? T.clay : T.cream}
          strokeWidth="1"
          opacity={0.3 + i * 0.2}
        />
      ))}
      <circle cx="100" cy="100" r="4" fill={T.clay} />
    </svg>
  );
}

function ScanningDotGrid() {
  const dots: React.ReactElement[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={15 + col * 16}
          cy={15 + row * 16}
          r="2"
          fill={T.cream}
          opacity="0.3"
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 210 150" className="w-40 h-28 md:w-56 md:h-40">
      {dots}
      <line
        x1="0"
        y1="0"
        x2="210"
        y2="0"
        stroke={T.clay}
        strokeWidth="2"
        opacity="0.8"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 10; 0 140; 0 10"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}

function PulsingWaveform() {
  return (
    <svg viewBox="0 0 200 80" className="w-40 h-16 md:w-56 md:h-24">
      <path
        d="M0 40 Q25 10 50 40 T100 40 T150 40 T200 40"
        fill="none"
        stroke={T.clay}
        strokeWidth="2"
        strokeDasharray="400"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="400;0;400"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M0 40 Q25 70 50 40 T100 40 T150 40 T200 40"
        fill="none"
        stroke={T.cream}
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="400"
        strokeDashoffset="200"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="600;200;600"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*                          MAIN PAGE COMPONENT                          */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function Design1() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const protocolRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  /* ──── GSAP setup ──── */
  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      const gsap = (gsapModule as any).default || (gsapModule as any).gsap || gsapModule;
      const ScrollTrigger =
        (scrollModule as any).default || (scrollModule as any).ScrollTrigger || scrollModule;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* ──── Hero staggered fade-up ──── */
        gsap.from(".hero-anim", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        });

        /* ──── Features cards fade-in ──── */
        gsap.utils.toArray(".feature-card").forEach((card: HTMLElement) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ──── Philosophy word reveal ──── */
        gsap.utils
          .toArray(".philosophy-section .word-reveal")
          .forEach((word: HTMLElement, i: number) => {
            gsap.to(word, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: word,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              delay: i * 0.04,
            });
          });

        /* ──── Protocol sticky stacking cards ──── */
        const protocolCards: HTMLElement[] = gsap.utils.toArray(".protocol-card");
        protocolCards.forEach((card: HTMLElement, i: number) => {
          if (i === 0) return; // First card is already visible

          ScrollTrigger.create({
            trigger: card,
            start: () => `top-=${i * 60} 80%`,
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to(card, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(card, {
                y: 100,
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
              });
            },
          });
        });

        /* ──── Pricing cards ──── */
        gsap.utils.toArray(".pricing-card").forEach((card: HTMLElement, i: number) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ──── Footer ──── */
        gsap.from(".footer-content > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-content",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  /* ════════════════════════════════ RENDER ════════════════════════════ */
  return (
    <div className="noise-overlay" style={{ backgroundColor: T.cream, color: T.charcoal }}>
      {/* global keyframes */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                     SECTION 1 — HERO                       ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{ minHeight: "100dvh" }}
      >
        {/* BG Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${T.charcoal} 0%, ${T.moss}dd 40%, ${T.moss}88 70%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-16 lg:px-24 max-w-6xl">
          <p
            className="hero-anim text-xs md:text-sm uppercase tracking-[0.3em] mb-6 opacity-60"
            style={{ fontFamily: T.monoFont, color: T.cream }}
          >
            New Era &mdash; AI Consultancy
          </p>

          <h1 className="hero-anim">
            <span
              className="block text-xl md:text-2xl lg:text-3xl font-bold"
              style={{
                fontFamily: T.headingFont,
                letterSpacing: "-0.02em",
                color: T.cream,
              }}
            >
              Intelligence is the
            </span>
            <span
              className="block text-5xl md:text-7xl lg:text-[5.5rem] leading-none mt-1"
              style={{
                fontFamily: T.dramaFont,
                fontStyle: "italic",
                color: T.cream,
              }}
            >
              New Standard.
            </span>
          </h1>

          <p
            className="hero-anim mt-6 max-w-lg text-base md:text-lg leading-relaxed opacity-80"
            style={{ fontFamily: T.headingFont, color: T.cream }}
          >
            Consultoría de transformación digital con AI — experiencia real, no
            teoría.
          </p>

          <div className="hero-anim mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: T.clay, fontFamily: T.headingFont }}
            >
              Agenda una Reunión
              <ArrowRight size={16} />
            </a>
            <span
              className="text-xs uppercase tracking-widest opacity-40"
              style={{ fontFamily: T.monoFont, color: T.cream }}
            >
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Bottom gradient fade to cream */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${T.cream}, transparent)`,
          }}
        />
      </section>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                 SECTION 2 — FEATURES CARDS                 ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <section
        ref={featuresRef}
        className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: T.cream }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 opacity-50"
            style={{ fontFamily: T.monoFont }}
          >
            Lo que nos diferencia
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-16"
            style={{
              fontFamily: T.headingFont,
              letterSpacing: "-0.02em",
            }}
          >
            Capacidades{" "}
            <span style={{ fontFamily: T.dramaFont, fontStyle: "italic" }}>
              esenciales
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── Card 1: Diagnostic Shuffler ── */}
            <div
              className="feature-card p-8 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                backgroundColor: T.cream,
                border: `1px solid rgba(0,0,0,0.08)`,
                borderRadius: "2rem",
              }}
            >
              <DiagnosticShuffler />
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} style={{ color: T.clay }} />
                  <span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: T.monoFont }}
                  >
                    Aplicación Real
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  AI Aplicada, No Teoría
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-60"
                  style={{ fontFamily: T.headingFont }}
                >
                  Founders con experiencia real implementando AI en operaciones.
                  Soluciones que funcionan desde el día uno.
                </p>
              </div>
            </div>

            {/* ── Card 2: Telemetry Typewriter ── */}
            <div
              className="feature-card p-8 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                backgroundColor: T.cream,
                border: `1px solid rgba(0,0,0,0.08)`,
                borderRadius: "2rem",
              }}
            >
              <TelemetryTypewriter />
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={18} style={{ color: T.clay }} />
                  <span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: T.monoFont }}
                  >
                    Multi-Plataforma
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Agnósticos al Sistema
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-60"
                  style={{ fontFamily: T.headingFont }}
                >
                  Nos adaptamos a tu stack: Google, Microsoft, o cualquier
                  plataforma. Sin ataduras tecnológicas.
                </p>
              </div>
            </div>

            {/* ── Card 3: Cursor Protocol Scheduler ── */}
            <div
              className="feature-card p-8 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                backgroundColor: T.cream,
                border: `1px solid rgba(0,0,0,0.08)`,
                borderRadius: "2rem",
              }}
            >
              <CursorScheduler />
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} style={{ color: T.clay }} />
                  <span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: T.monoFont }}
                  >
                    Centrado en Ti
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Co-diseño Empático
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-60"
                  style={{ fontFamily: T.headingFont }}
                >
                  Prototipos, MVPs y metodologías centradas en el cliente.
                  Construimos contigo, no para ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                   SECTION 3 — PHILOSOPHY                   ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <section
        ref={philosophyRef}
        className="philosophy-section relative py-32 md:py-44 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ backgroundColor: T.charcoal }}
      >
        {/* BG texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-10 opacity-40"
            style={{ fontFamily: T.monoFont, color: T.cream }}
          >
            Nuestra Filosofía
          </p>

          <div className="mb-10">
            <WordSpans
              text="La mayoría de las consultoras se enfocan en: vender soluciones predeterminadas."
              className="block text-lg md:text-2xl leading-relaxed"
              style={{ fontFamily: T.headingFont, color: `${T.cream}aa` }}
            />
          </div>

          <div>
            <span className="block overflow-hidden">
              <span
                className="word-reveal inline-block translate-y-full opacity-0 text-lg md:text-2xl"
                style={{ fontFamily: T.headingFont, color: T.cream }}
              >
                Nosotros nos enfocamos en:&nbsp;
              </span>
            </span>
            <span className="block overflow-hidden mt-2">
              <span
                className="word-reveal inline-block translate-y-full opacity-0"
                style={{ fontFamily: T.headingFont }}
              >
                <span
                  className="text-3xl md:text-5xl lg:text-6xl leading-tight"
                  style={{ fontFamily: T.dramaFont, fontStyle: "italic", color: T.cream }}
                >
                  entender tu{" "}
                  <span style={{ color: T.clay }}>realidad</span>.
                </span>
              </span>
            </span>
          </div>

          <div className="mt-16 flex items-center gap-4">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: `${T.cream}15` }}
            />
            <Activity size={16} style={{ color: T.clay }} />
            <span
              className="text-xs uppercase tracking-widest opacity-30"
              style={{ fontFamily: T.monoFont, color: T.cream }}
            >
              Since 2024
            </span>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                  SECTION 4 — PROTOCOL                      ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <section
        ref={protocolRef}
        className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: T.cream }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 opacity-50"
            style={{ fontFamily: T.monoFont }}
          >
            Nuestro Proceso
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-20"
            style={{
              fontFamily: T.headingFont,
              letterSpacing: "-0.02em",
            }}
          >
            Protocolo de{" "}
            <span style={{ fontFamily: T.dramaFont, fontStyle: "italic" }}>
              transformación
            </span>
          </h2>

          <div className="space-y-8">
            {/* Protocol Card 1 */}
            <div
              className="protocol-card relative overflow-hidden p-10 md:p-16"
              style={{
                backgroundColor: T.charcoal,
                borderRadius: "2rem",
                minHeight: "420px",
              }}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 h-full">
                <div className="flex-1">
                  <span
                    className="text-xs uppercase tracking-[0.3em] opacity-40 block mb-4"
                    style={{ fontFamily: T.monoFont, color: T.cream }}
                  >
                    01
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      fontFamily: T.headingFont,
                      letterSpacing: "-0.02em",
                      color: T.cream,
                    }}
                  >
                    Diagnóstico
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed opacity-60 max-w-md"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    Análisis profundo de operaciones. Mapeamos procesos, identificamos
                    oportunidades y definimos prioridades de impacto.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <BarChart3 size={16} style={{ color: T.clay }} />
                    <span
                      className="text-xs uppercase tracking-widest opacity-40"
                      style={{ fontFamily: T.monoFont, color: T.cream }}
                    >
                      Análisis &middot; Mapeo &middot; Priorización
                    </span>
                  </div>
                </div>
                <div className="opacity-60">
                  <ConcentricCircles />
                </div>
              </div>
            </div>

            {/* Protocol Card 2 */}
            <div
              className="protocol-card relative overflow-hidden p-10 md:p-16"
              style={{
                backgroundColor: T.moss,
                borderRadius: "2rem",
                minHeight: "420px",
              }}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 h-full">
                <div className="flex-1">
                  <span
                    className="text-xs uppercase tracking-[0.3em] opacity-40 block mb-4"
                    style={{ fontFamily: T.monoFont, color: T.cream }}
                  >
                    02
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      fontFamily: T.headingFont,
                      letterSpacing: "-0.02em",
                      color: T.cream,
                    }}
                  >
                    Prototipado
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed opacity-60 max-w-md"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    MVPs iterativos con feedback continuo. Validamos hipótesis rápidamente
                    antes de escalar.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <Layers size={16} style={{ color: T.clay }} />
                    <span
                      className="text-xs uppercase tracking-widest opacity-40"
                      style={{ fontFamily: T.monoFont, color: T.cream }}
                    >
                      Iteración &middot; Validación &middot; Feedback
                    </span>
                  </div>
                </div>
                <div className="opacity-60">
                  <ScanningDotGrid />
                </div>
              </div>
            </div>

            {/* Protocol Card 3 */}
            <div
              className="protocol-card relative overflow-hidden p-10 md:p-16"
              style={{
                backgroundColor: T.charcoal,
                borderRadius: "2rem",
                minHeight: "420px",
              }}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 h-full">
                <div className="flex-1">
                  <span
                    className="text-xs uppercase tracking-[0.3em] opacity-40 block mb-4"
                    style={{ fontFamily: T.monoFont, color: T.cream }}
                  >
                    03
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      fontFamily: T.headingFont,
                      letterSpacing: "-0.02em",
                      color: T.cream,
                    }}
                  >
                    Implementación
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed opacity-60 max-w-md"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    Despliegue adaptado a tu ecosistema. Integración sin fricción,
                    capacitación de equipos y soporte continuo.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <Rocket size={16} style={{ color: T.clay }} />
                    <span
                      className="text-xs uppercase tracking-widest opacity-40"
                      style={{ fontFamily: T.monoFont, color: T.cream }}
                    >
                      Despliegue &middot; Integración &middot; Soporte
                    </span>
                  </div>
                </div>
                <div className="opacity-60">
                  <PulsingWaveform />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                    SECTION 5 — PRICING                     ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <section
        ref={pricingRef}
        className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: T.cream }}
        id="contact"
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 opacity-50"
            style={{ fontFamily: T.monoFont }}
          >
            Inversión
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: T.headingFont,
              letterSpacing: "-0.02em",
            }}
          >
            Planes que{" "}
            <span style={{ fontFamily: T.dramaFont, fontStyle: "italic" }}>
              se adaptan
            </span>
          </h2>
          <p
            className="text-base md:text-lg opacity-50 mb-16 max-w-lg"
            style={{ fontFamily: T.headingFont }}
          >
            Cada organización es diferente. Elige el nivel de acompañamiento que necesitas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Esencial */}
            <div
              className="pricing-card p-8 md:p-10 flex flex-col"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "2rem",
              }}
            >
              <div className="mb-8">
                <Shield size={24} style={{ color: T.moss }} className="mb-4" />
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Esencial
                </h3>
                <p
                  className="text-sm opacity-50"
                  style={{ fontFamily: T.headingFont }}
                >
                  Diagnóstico inicial + Roadmap AI
                </p>
              </div>

              <div className="mb-8">
                <span
                  className="text-xs uppercase tracking-widest opacity-40"
                  style={{ fontFamily: T.monoFont }}
                >
                  Desde
                </span>
                <div
                  className="text-3xl font-bold mt-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  $2.500{" "}
                  <span className="text-sm font-normal opacity-40">USD</span>
                </div>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {[
                  "Auditoría de procesos actuales",
                  "Mapa de oportunidades AI",
                  "Roadmap de implementación",
                  "Sesión de presentación ejecutiva",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm opacity-70"
                    style={{ fontFamily: T.headingFont }}
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: T.moss }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="magnetic-btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-colors border"
                style={{
                  fontFamily: T.headingFont,
                  borderColor: T.moss,
                  color: T.moss,
                }}
              >
                Comenzar
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Avanzado — Featured */}
            <div
              className="pricing-card p-8 md:p-10 flex flex-col relative shadow-xl md:-mt-4 md:mb-[-1rem]"
              style={{
                backgroundColor: T.moss,
                borderRadius: "2rem",
              }}
            >
              <div
                className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: T.clay,
                  color: "white",
                  fontFamily: T.monoFont,
                }}
              >
                Recomendado
              </div>

              <div className="mb-8">
                <Zap size={24} style={{ color: T.clay }} className="mb-4" />
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                    color: T.cream,
                  }}
                >
                  Avanzado
                </h3>
                <p
                  className="text-sm opacity-60"
                  style={{ fontFamily: T.headingFont, color: T.cream }}
                >
                  Implementación guiada + Prototipos
                </p>
              </div>

              <div className="mb-8">
                <span
                  className="text-xs uppercase tracking-widest opacity-40"
                  style={{ fontFamily: T.monoFont, color: T.cream }}
                >
                  Desde
                </span>
                <div
                  className="text-3xl font-bold mt-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                    color: T.cream,
                  }}
                >
                  $7.500{" "}
                  <span className="text-sm font-normal opacity-40">USD</span>
                </div>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {[
                  "Todo lo del plan Esencial",
                  "Prototipo funcional (MVP)",
                  "Implementación guiada en 8 semanas",
                  "Capacitación de equipo interno",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm opacity-70"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: T.clay }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="magnetic-btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-colors"
                style={{
                  fontFamily: T.headingFont,
                  backgroundColor: T.clay,
                }}
              >
                Agenda una Reunión
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Enterprise */}
            <div
              className="pricing-card p-8 md:p-10 flex flex-col"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "2rem",
              }}
            >
              <div className="mb-8">
                <Layers size={24} style={{ color: T.moss }} className="mb-4" />
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Enterprise
                </h3>
                <p
                  className="text-sm opacity-50"
                  style={{ fontFamily: T.headingFont }}
                >
                  Transformación integral + Soporte
                </p>
              </div>

              <div className="mb-8">
                <span
                  className="text-xs uppercase tracking-widest opacity-40"
                  style={{ fontFamily: T.monoFont }}
                >
                  Precio
                </span>
                <div
                  className="text-3xl font-bold mt-1"
                  style={{
                    fontFamily: T.headingFont,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Personalizado
                </div>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {[
                  "Todo lo del plan Avanzado",
                  "Transformación organizacional completa",
                  "Soporte dedicado 12 meses",
                  "Consultoría estratégica C-Level",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm opacity-70"
                    style={{ fontFamily: T.headingFont }}
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: T.moss }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="magnetic-btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-colors border"
                style={{
                  fontFamily: T.headingFont,
                  borderColor: T.moss,
                  color: T.moss,
                }}
              >
                Contactar
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════╗ */}
      {/* ║                     SECTION 6 — FOOTER                     ║ */}
      {/* ╚══════════════════════════════════════════════════════════════╝ */}
      <footer
        ref={footerRef}
        className="relative px-6 md:px-16 lg:px-24 pt-20 pb-12"
        style={{
          backgroundColor: T.charcoal,
          borderRadius: "4rem 4rem 0 0",
        }}
      >
        <div className="footer-content max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
            {/* Brand */}
            <div>
              <h4
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily: T.headingFont,
                  letterSpacing: "-0.02em",
                  color: T.cream,
                }}
              >
                New Era
              </h4>
              <p
                className="text-sm leading-relaxed opacity-40 mb-6 max-w-xs"
                style={{ fontFamily: T.headingFont, color: T.cream }}
              >
                Consultoría de tecnología y transformación digital con AI.
                Experiencia real, resultados medibles.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#4ade80" }}
                />
                <span
                  className="text-xs uppercase tracking-widest opacity-40"
                  style={{ fontFamily: T.monoFont, color: T.cream }}
                >
                  Sistema Operacional
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h5
                className="text-xs uppercase tracking-[0.2em] mb-6 opacity-40"
                style={{ fontFamily: T.monoFont, color: T.cream }}
              >
                Navegación
              </h5>
              <ul className="space-y-3">
                {[
                  "Inicio",
                  "Capacidades",
                  "Proceso",
                  "Precios",
                  "Contacto",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="link-lift text-sm opacity-60 hover:opacity-100 transition-opacity"
                      style={{
                        fontFamily: T.headingFont,
                        color: T.cream,
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / Legal */}
            <div>
              <h5
                className="text-xs uppercase tracking-[0.2em] mb-6 opacity-40"
                style={{ fontFamily: T.monoFont, color: T.cream }}
              >
                Contacto
              </h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5">
                  <Mail size={14} style={{ color: T.clay }} />
                  <a
                    href="mailto:hola@newera.ai"
                    className="link-lift text-sm opacity-60 hover:opacity-100 transition-opacity"
                    style={{
                      fontFamily: T.headingFont,
                      color: T.cream,
                    }}
                  >
                    hola@newera.ai
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} style={{ color: T.clay }} />
                  <span
                    className="text-sm opacity-60"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    +52 55 1234 5678
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin size={14} style={{ color: T.clay }} />
                  <span
                    className="text-sm opacity-60"
                    style={{ fontFamily: T.headingFont, color: T.cream }}
                  >
                    Ciudad de México, MX
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${T.cream}15` }}
          >
            <p
              className="text-xs opacity-30"
              style={{ fontFamily: T.monoFont, color: T.cream }}
            >
              &copy; 2024 New Era. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {["Privacidad", "Términos", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs opacity-30 hover:opacity-60 transition-opacity"
                  style={{ fontFamily: T.monoFont, color: T.cream }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
