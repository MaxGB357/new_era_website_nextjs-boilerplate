"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Zap,
  Globe,
  Users,
  Check,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Design Tokens ─── */
const DEEP_VOID = "#0A0A14";
const PLASMA = "#7B61FF";
const GHOST = "#F0EFF4";
const GRAPHITE = "#18181B";
const FONT_HEADING = "'Sora', sans-serif";
const FONT_DRAMA = "'Instrument Serif', serif";
const FONT_MONO = "'Fira Code', monospace";

/* ─── Shared Styles ─── */
const sectionPadding = "px-6 md:px-12 lg:px-20 xl:px-32";

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

/* ── Card 1: Diagnostic Shuffler ── */
function DiagnosticShuffler() {
  const labels = [
    "Automatización de Procesos",
    "Análisis Predictivo",
    "Integración AI",
  ];
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % labels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [labels.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".shuffle-card");
    cards.forEach((card, i) => {
      const offset = ((i - active + labels.length) % labels.length);
      gsap.to(card, {
        y: offset * 16,
        x: offset * 8,
        scale: 1 - offset * 0.06,
        opacity: 1 - offset * 0.25,
        zIndex: labels.length - offset,
        duration: 0.6,
        ease: "elastic.out(1, 0.75)",
      });
    });
  }, [active, labels.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center gap-2">
        <Zap size={16} style={{ color: PLASMA }} />
        <span
          style={{ fontFamily: FONT_MONO, color: PLASMA, fontSize: "0.75rem" }}
        >
          DIAGNÓSTICO
        </span>
      </div>
      <h3
        style={{
          fontFamily: FONT_HEADING,
          letterSpacing: "-0.02em",
          color: GRAPHITE,
        }}
        className="text-xl font-bold mb-2"
      >
        AI Aplicada, No Teoría
      </h3>
      <p className="text-sm mb-6" style={{ color: "#6B6B76" }}>
        Founders con experiencia real implementando AI en operaciones.
      </p>
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[140px]"
      >
        {labels.map((label, i) => (
          <div
            key={label}
            className="shuffle-card absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-md"
            style={{ zIndex: labels.length - i }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${PLASMA}18` }}
            >
              <Zap size={18} style={{ color: PLASMA }} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: FONT_HEADING, color: GRAPHITE }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 2: Telemetry Typewriter ── */
function TelemetryTypewriter() {
  const messages = [
    "Conectando con Google Workspace...",
    "Sincronizando Microsoft 365...",
    "Integrando sistema legacy...",
    "Optimizando flujos de trabajo...",
  ];
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const msg = messages[msgIndex];
    if (charIndex < msg.length) {
      const t = setTimeout(() => {
        setCurrentText(msg.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev.slice(-3), msg]);
        setCurrentText("");
        setCharIndex(0);
        setMsgIndex((m) => (m + 1) % messages.length);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [charIndex, msgIndex, messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center gap-2">
        <Globe size={16} style={{ color: PLASMA }} />
        <span
          style={{ fontFamily: FONT_MONO, color: PLASMA, fontSize: "0.75rem" }}
        >
          TELEMETRÍA
        </span>
      </div>
      <h3
        style={{
          fontFamily: FONT_HEADING,
          letterSpacing: "-0.02em",
          color: GRAPHITE,
        }}
        className="text-xl font-bold mb-2"
      >
        Agnósticos al Sistema
      </h3>
      <p className="text-sm mb-6" style={{ color: "#6B6B76" }}>
        Nos adaptamos a tu stack: Google, Microsoft, o cualquier plataforma.
      </p>
      <div
        className="flex-1 rounded-2xl border border-black/5 bg-[#0A0A14] p-4 overflow-hidden"
        style={{ fontFamily: FONT_MONO }}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
          <span
            className="inline-block h-2 w-2 rounded-full animate-pulse"
            style={{ background: PLASMA }}
          />
          <span className="text-xs" style={{ color: PLASMA }}>
            Live Feed
          </span>
        </div>
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <div
              key={`${i}-${line}`}
              className="text-xs"
              style={{ color: "#F0EFF4", opacity: 0.5 }}
            >
              <span style={{ color: PLASMA }}>{">"}</span> {line}
            </div>
          ))}
          {currentText && (
            <div className="text-xs" style={{ color: "#F0EFF4" }}>
              <span style={{ color: PLASMA }}>{">"}</span> {currentText}
              <span
                className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse"
                style={{ background: PLASMA, verticalAlign: "text-bottom" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Card 3: Cursor Protocol Scheduler ── */
function CursorProtocolScheduler() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"];
  const hours = ["9am", "11am", "1pm", "3pm", "5pm"];
  const [cursorPos, setCursorPos] = useState({ row: 0, col: 0 });
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["1-0", "2-2", "3-1", "0-3", "4-4"])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPos({
        row: Math.floor(Math.random() * hours.length),
        col: Math.floor(Math.random() * days.length),
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [hours.length, days.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const key = `${cursorPos.col}-${cursorPos.row}`;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    }, 600);
    return () => clearTimeout(timeout);
  }, [cursorPos]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center gap-2">
        <Users size={16} style={{ color: PLASMA }} />
        <span
          style={{ fontFamily: FONT_MONO, color: PLASMA, fontSize: "0.75rem" }}
        >
          PROTOCOLO
        </span>
      </div>
      <h3
        style={{
          fontFamily: FONT_HEADING,
          letterSpacing: "-0.02em",
          color: GRAPHITE,
        }}
        className="text-xl font-bold mb-2"
      >
        Co-diseño Empático
      </h3>
      <p className="text-sm mb-6" style={{ color: "#6B6B76" }}>
        Prototipos, MVPs y metodologías centradas en el cliente.
      </p>
      <div className="flex-1 rounded-2xl border border-black/5 bg-white p-4 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-6 gap-1 mb-2">
          <div />
          {days.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-medium"
              style={{ fontFamily: FONT_MONO, color: "#9B9BA5" }}
            >
              {d}
            </div>
          ))}
        </div>
        {/* Grid */}
        {hours.map((h, row) => (
          <div key={h} className="grid grid-cols-6 gap-1 mb-1">
            <div
              className="flex items-center text-[10px]"
              style={{ fontFamily: FONT_MONO, color: "#9B9BA5" }}
            >
              {h}
            </div>
            {days.map((_, col) => {
              const key = `${col}-${row}`;
              const isSelected = selected.has(key);
              const isCursor =
                cursorPos.row === row && cursorPos.col === col;
              return (
                <div
                  key={key}
                  className="aspect-square rounded-lg transition-all duration-500 relative"
                  style={{
                    background: isSelected ? `${PLASMA}22` : "#F5F5F8",
                    border: isSelected
                      ? `1.5px solid ${PLASMA}`
                      : "1.5px solid transparent",
                    boxShadow: isCursor
                      ? `0 0 12px ${PLASMA}66`
                      : "none",
                  }}
                >
                  {isCursor && (
                    <div
                      className="absolute inset-0 rounded-lg animate-ping"
                      style={{
                        border: `1.5px solid ${PLASMA}`,
                        opacity: 0.4,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SVG: Rotating Concentric Circles ── */
function ConcentricCircles() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const circles = ref.current.querySelectorAll(".ring");
    circles.forEach((c, i) => {
      gsap.to(c, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 8 + i * 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });
  }, []);
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{ maxWidth: 180 }}
    >
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={r}
          className="ring"
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={PLASMA}
          strokeWidth="1"
          strokeDasharray={`${4 + i * 2} ${8 + i * 4}`}
          opacity={0.4 + i * 0.15}
        />
      ))}
      <circle cx="100" cy="100" r="4" fill={PLASMA} />
    </svg>
  );
}

/* ── SVG: Scanning Line on Dot Grid ── */
function ScanningGrid() {
  const lineRef = useRef<SVGLineElement>(null);
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { attr: { x1: 0, x2: 0 } },
      {
        attr: { x1: 200, x2: 200 },
        duration: 3,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      }
    );
  }, []);
  const dots = [];
  for (let x = 10; x <= 190; x += 20) {
    for (let y = 10; y <= 190; y += 20) {
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2"
          fill={GHOST}
          opacity="0.3"
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ maxWidth: 180 }}>
      {dots}
      <line
        ref={lineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="200"
        stroke={PLASMA}
        strokeWidth="2"
        opacity="0.7"
      />
    </svg>
  );
}

/* ── SVG: Pulsing Waveform ── */
function PulsingWaveform() {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(pathRef.current, {
      strokeDashoffset: -400,
      duration: 3,
      ease: "none",
    });
  }, []);
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" style={{ maxWidth: 180 }}>
      <path
        ref={pathRef}
        d="M0,50 Q25,10 50,50 Q75,90 100,50 Q125,10 150,50 Q175,90 200,50"
        fill="none"
        stroke={PLASMA}
        strokeWidth="2"
        strokeDasharray="200"
        strokeDashoffset="0"
        opacity="0.8"
      />
      <path
        d="M0,50 Q25,10 50,50 Q75,90 100,50 Q125,10 150,50 Q175,90 200,50"
        fill="none"
        stroke={PLASMA}
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function Design4() {
  /* refs */
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero staggered fade-up ── */
      if (heroRef.current) {
        const heroElements =
          heroRef.current.querySelectorAll(".hero-animate");
        gsap.fromTo(
          heroElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      /* ── Feature cards fade-up ── */
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll(".feature-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      /* ── Philosophy word-by-word reveal ── */
      if (philosophyRef.current) {
        const words =
          philosophyRef.current.querySelectorAll(".philosophy-word");
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      /* ── Protocol sticky stacking cards ── */
      if (protocolRef.current) {
        const cards = protocolRef.current.querySelectorAll(".protocol-card");
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top ${80 + i * 40}px`,
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            id: `protocol-pin-${i}`,
          });

          if (i < cards.length - 1) {
            gsap.fromTo(
              card,
              { scale: 1, filter: "blur(0px)", opacity: 1 },
              {
                scale: 0.9,
                filter: "blur(20px)",
                opacity: 0.5,
                ease: "none",
                scrollTrigger: {
                  trigger: cards[i + 1],
                  start: "top bottom",
                  end: `top ${80 + i * 40}px`,
                  scrub: true,
                  id: `protocol-anim-${i}`,
                },
              }
            );
          }
        });
      }

      /* ── Pricing fade-up ── */
      if (pricingRef.current) {
        const pricingCards =
          pricingRef.current.querySelectorAll(".pricing-card");
        gsap.fromTo(
          pricingCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <div className="noise-overlay" style={{ background: GHOST }}>
      {/* ─────────────── HERO ─────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "100dvh" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt="Bioluminescence space visualization"
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                ${DEEP_VOID} 0%,
                ${DEEP_VOID}ee 20%,
                ${DEEP_VOID}aa 45%,
                transparent 100%
              )`,
            }}
          />
        </div>

        {/* Hero content */}
        <div
          className={`relative z-10 pb-16 md:pb-24 ${sectionPadding} w-full`}
        >
          <div className="max-w-3xl">
            <p
              className="hero-animate mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: FONT_MONO, color: PLASMA }}
            >
              New Era — Transformación Digital con AI
            </p>
            <h1 className="hero-animate mb-1">
              <span
                className="block text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: FONT_HEADING,
                  letterSpacing: "-0.02em",
                  color: GHOST,
                }}
              >
                Intelligence beyond
              </span>
            </h1>
            <h1 className="hero-animate mb-6">
              <span
                className="block text-5xl md:text-7xl lg:text-8xl italic"
                style={{
                  fontFamily: FONT_DRAMA,
                  color: GHOST,
                }}
              >
                Boundaries.
              </span>
            </h1>
            <p
              className="hero-animate max-w-lg text-sm md:text-base leading-relaxed mb-8"
              style={{ color: `${GHOST}bb` }}
            >
              Consultoría de transformación digital con AI — donde la
              tecnología trasciende los límites.
            </p>
            <a
              href="#contact"
              className="hero-animate magnetic-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-3"
              style={{
                background: PLASMA,
                fontFamily: FONT_HEADING,
                letterSpacing: "-0.01em",
              }}
            >
              Agenda una Reunión
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-animate absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: FONT_MONO, color: `${GHOST}66` }}
          >
            Scroll
          </span>
          <div
            className="h-10 w-px"
            style={{
              background: `linear-gradient(to bottom, ${PLASMA}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* ─────────────── FEATURES ─────────────── */}
      <section
        ref={featuresRef}
        className={`py-24 md:py-32 ${sectionPadding}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: FONT_MONO, color: PLASMA }}
            >
              Capacidades
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: FONT_HEADING,
                letterSpacing: "-0.02em",
                color: GRAPHITE,
              }}
            >
              Lo que nos{" "}
              <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic" }}>
                diferencia
              </span>
            </h2>
            <p className="text-base" style={{ color: "#6B6B76" }}>
              Tres pilares que definen nuestra forma de transformar negocios
              con inteligencia artificial.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div
              className="feature-card rounded-[2rem] border border-black/5 p-6 md:p-8 shadow-lg"
              style={{ background: GHOST }}
            >
              <DiagnosticShuffler />
            </div>
            {/* Card 2 */}
            <div
              className="feature-card rounded-[2rem] border border-black/5 p-6 md:p-8 shadow-lg"
              style={{ background: GHOST }}
            >
              <TelemetryTypewriter />
            </div>
            {/* Card 3 */}
            <div
              className="feature-card rounded-[2rem] border border-black/5 p-6 md:p-8 shadow-lg"
              style={{ background: GHOST }}
            >
              <CursorProtocolScheduler />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PHILOSOPHY ─────────────── */}
      <section
        ref={philosophyRef}
        className="relative py-32 md:py-44 overflow-hidden"
        style={{ background: DEEP_VOID }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: 0.06 }}
          />
        </div>

        <div
          className={`relative z-10 mx-auto max-w-5xl ${sectionPadding}`}
        >
          <p
            className="mb-8 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ fontFamily: FONT_MONO, color: PLASMA }}
          >
            Filosofía
          </p>

          {/* Line 1 */}
          <p
            className="mb-6 text-lg md:text-xl leading-relaxed"
            style={{ color: `${GHOST}88` }}
          >
            {"La mayoría de las consultoras: venden soluciones predeterminadas."
              .split(" ")
              .map((word, i) => (
                <span key={i} className="philosophy-word inline-block mr-2">
                  {word}
                </span>
              ))}
          </p>

          {/* Line 2 */}
          <p
            className="text-3xl md:text-5xl lg:text-6xl leading-tight"
            style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: GHOST }}
          >
            {"Nosotros: entendemos tu".split(" ").map((word, i) => (
              <span key={i} className="philosophy-word inline-block mr-3 md:mr-4">
                {word}
              </span>
            ))}
            <span
              className="philosophy-word inline-block font-bold"
              style={{ color: PLASMA }}
            >
              realidad.
            </span>
          </p>
        </div>
      </section>

      {/* ─────────────── PROTOCOL (Sticky Stacking) ─────────────── */}
      <section
        ref={protocolRef}
        className={`py-24 md:py-32 ${sectionPadding}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: FONT_MONO, color: PLASMA }}
            >
              Proceso
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: FONT_HEADING,
                letterSpacing: "-0.02em",
                color: GRAPHITE,
              }}
            >
              Nuestro{" "}
              <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic" }}>
                protocolo
              </span>
            </h2>
          </div>

          {/* Stacking cards container */}
          <div className="space-y-6">
            {/* Card 01 — Diagnóstico */}
            <div
              className="protocol-card rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-xl"
              style={{ background: GHOST }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1">
                  <span
                    className="text-xs font-medium uppercase tracking-[0.3em] mb-4 block"
                    style={{ fontFamily: FONT_MONO, color: PLASMA }}
                  >
                    Paso 01
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{
                      fontFamily: FONT_HEADING,
                      letterSpacing: "-0.02em",
                      color: GRAPHITE,
                    }}
                  >
                    Diagnóstico
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6B6B76" }}>
                    Analizamos tus procesos actuales, identificamos cuellos de
                    botella y mapeamos oportunidades donde la AI genera el
                    mayor impacto. Sin suposiciones — datos reales.
                  </p>
                </div>
                <div className="flex items-center justify-center w-48 h-48 shrink-0">
                  <ConcentricCircles />
                </div>
              </div>
            </div>

            {/* Card 02 — Prototipado */}
            <div
              className="protocol-card rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-xl"
              style={{ background: GHOST }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1">
                  <span
                    className="text-xs font-medium uppercase tracking-[0.3em] mb-4 block"
                    style={{ fontFamily: FONT_MONO, color: PLASMA }}
                  >
                    Paso 02
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{
                      fontFamily: FONT_HEADING,
                      letterSpacing: "-0.02em",
                      color: GRAPHITE,
                    }}
                  >
                    Prototipado
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6B6B76" }}>
                    Construimos MVPs rápidos y funcionales que validan la
                    hipótesis. Iteramos contigo en ciclos cortos. Ves
                    resultados en semanas, no meses.
                  </p>
                </div>
                <div className="flex items-center justify-center w-48 h-48 shrink-0">
                  <ScanningGrid />
                </div>
              </div>
            </div>

            {/* Card 03 — Implementación */}
            <div
              className="protocol-card rounded-[2rem] border border-black/5 p-8 md:p-12 shadow-xl"
              style={{ background: GHOST }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1">
                  <span
                    className="text-xs font-medium uppercase tracking-[0.3em] mb-4 block"
                    style={{ fontFamily: FONT_MONO, color: PLASMA }}
                  >
                    Paso 03
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{
                      fontFamily: FONT_HEADING,
                      letterSpacing: "-0.02em",
                      color: GRAPHITE,
                    }}
                  >
                    Implementación
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6B6B76" }}>
                    Desplegamos la solución en producción con monitoreo
                    continuo. Entrenamos a tu equipo y garantizamos adopción
                    real. El cambio que se mantiene.
                  </p>
                </div>
                <div className="flex items-center justify-center w-48 h-48 shrink-0">
                  <PulsingWaveform />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PRICING ─────────────── */}
      <section
        ref={pricingRef}
        className={`py-24 md:py-32 ${sectionPadding}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: FONT_MONO, color: PLASMA }}
            >
              Planes
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: FONT_HEADING,
                letterSpacing: "-0.02em",
                color: GRAPHITE,
              }}
            >
              Invierte en{" "}
              <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic" }}>
                transformación
              </span>
            </h2>
            <p className="text-base" style={{ color: "#6B6B76" }}>
              Planes diseñados para cada etapa de tu viaje con AI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-start">
            {/* Esencial */}
            <div
              className="pricing-card rounded-[2rem] border border-black/5 p-8 shadow-lg"
              style={{ background: "white" }}
            >
              <div className="mb-6">
                <span
                  className="text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_MONO, color: "#9B9BA5" }}
                >
                  Esencial
                </span>
              </div>
              <div className="mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: FONT_HEADING,
                    letterSpacing: "-0.02em",
                    color: GRAPHITE,
                  }}
                >
                  $2.500
                </span>
                <span className="text-sm ml-1" style={{ color: "#9B9BA5" }}>
                  USD
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Diagnóstico AI inicial",
                  "Roadmap de implementación",
                  "1 sesión de co-diseño",
                  "Informe ejecutivo",
                  "Soporte por email (30 días)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#6B6B76" }}
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: PLASMA }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-semibold transition-colors hover:bg-black/5"
                style={{
                  fontFamily: FONT_HEADING,
                  borderColor: "#E0E0E5",
                  color: GRAPHITE,
                }}
              >
                Comenzar
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Avanzado (featured) */}
            <div
              className="pricing-card rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
              style={{ background: DEEP_VOID }}
            >
              {/* Glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl"
                style={{ background: `${PLASMA}30` }}
              />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ fontFamily: FONT_MONO, color: PLASMA }}
                  >
                    Avanzado
                  </span>
                  <span
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${PLASMA}22`,
                      color: PLASMA,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    <Star size={10} />
                    Popular
                  </span>
                </div>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{
                      fontFamily: FONT_HEADING,
                      letterSpacing: "-0.02em",
                      color: GHOST,
                    }}
                  >
                    $7.500
                  </span>
                  <span className="text-sm ml-1" style={{ color: `${GHOST}88` }}>
                    USD
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Todo lo de Esencial",
                    "Prototipo funcional (MVP)",
                    "4 sesiones de co-diseño",
                    "Integración con tu stack actual",
                    "Entrenamiento de equipo",
                    "Soporte prioritario (90 días)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: `${GHOST}cc` }}
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: PLASMA }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    background: PLASMA,
                    fontFamily: FONT_HEADING,
                  }}
                >
                  Agenda una Reunión
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Enterprise */}
            <div
              className="pricing-card rounded-[2rem] border border-black/5 p-8 shadow-lg"
              style={{ background: "white" }}
            >
              <div className="mb-6">
                <span
                  className="text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_MONO, color: "#9B9BA5" }}
                >
                  Enterprise
                </span>
              </div>
              <div className="mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: FONT_HEADING,
                    letterSpacing: "-0.02em",
                    color: GRAPHITE,
                  }}
                >
                  Personalizado
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Todo lo de Avanzado",
                  "Implementación completa",
                  "Sesiones ilimitadas de co-diseño",
                  "Arquitectura AI a medida",
                  "SLA dedicado",
                  "Account manager personal",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#6B6B76" }}
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: PLASMA }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-semibold transition-colors hover:bg-black/5"
                style={{
                  fontFamily: FONT_HEADING,
                  borderColor: "#E0E0E5",
                  color: GRAPHITE,
                }}
              >
                Contactar
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer
        id="contact"
        className="rounded-t-[4rem] mt-12"
        style={{ background: DEEP_VOID }}
      >
        <div className={`py-20 md:py-28 ${sectionPadding}`}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: FONT_HEADING,
                    letterSpacing: "-0.02em",
                    color: GHOST,
                  }}
                >
                  New Era
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: `${GHOST}77` }}
                >
                  Consultoría de tecnología y transformación digital con AI.
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full animate-pulse"
                    style={{ background: "#22C55E" }}
                  />
                  <span
                    className="text-xs"
                    style={{ fontFamily: FONT_MONO, color: `${GHOST}66` }}
                  >
                    Sistema Operacional
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-[0.2em] mb-5"
                  style={{ fontFamily: FONT_MONO, color: `${GHOST}55` }}
                >
                  Navegación
                </h4>
                <ul className="space-y-3">
                  {["Inicio", "Capacidades", "Proceso", "Planes"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="link-lift text-sm inline-block transition-colors hover:text-white"
                          style={{ color: `${GHOST}88` }}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Servicios */}
              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-[0.2em] mb-5"
                  style={{ fontFamily: FONT_MONO, color: `${GHOST}55` }}
                >
                  Servicios
                </h4>
                <ul className="space-y-3">
                  {[
                    "Diagnóstico AI",
                    "Prototipado MVP",
                    "Implementación",
                    "Entrenamiento",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="link-lift text-sm inline-block transition-colors hover:text-white"
                        style={{ color: `${GHOST}88` }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4
                  className="text-xs font-medium uppercase tracking-[0.2em] mb-5"
                  style={{ fontFamily: FONT_MONO, color: `${GHOST}55` }}
                >
                  Contacto
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Mail size={14} style={{ color: PLASMA }} />
                    <a
                      href="mailto:hola@newera.ai"
                      className="link-lift text-sm transition-colors hover:text-white"
                      style={{ color: `${GHOST}88` }}
                    >
                      hola@newera.ai
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={14} style={{ color: PLASMA }} />
                    <span
                      className="text-sm"
                      style={{ color: `${GHOST}88` }}
                    >
                      +52 55 1234 5678
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: PLASMA }} />
                    <span
                      className="text-sm"
                      style={{ color: `${GHOST}88` }}
                    >
                      Ciudad de México, MX
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
              style={{ borderColor: `${GHOST}15` }}
            >
              <p
                className="text-xs"
                style={{ color: `${GHOST}44`, fontFamily: FONT_MONO }}
              >
                &copy; {new Date().getFullYear()} New Era. Todos los derechos
                reservados.
              </p>
              <div className="flex gap-6">
                {["Privacidad", "Términos", "Cookies"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="link-lift text-xs transition-colors hover:text-white"
                    style={{
                      color: `${GHOST}44`,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
