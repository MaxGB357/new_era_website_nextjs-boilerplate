"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Zap,
  Globe,
  Users,
  ChevronRight,
  Check,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────── DESIGN TOKENS ──────────────────────────── */
const T = {
  obsidian: "#0D0D12",
  champagne: "#C9A84C",
  ivory: "#FAF8F5",
  slate: "#2A2A35",
  heading: "'Inter', sans-serif",
  drama: "'Playfair Display', serif",
  mono: "'JetBrains Mono', monospace",
};

/* ──────────────────────────── HELPER: typing effect ────────────────── */
function useTypingEffect(messages: string[], speed = 45, pause = 1600) {
  const [display, setDisplay] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = messages[msgIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!isDeleting && charIdx === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setMsgIdx((i) => (i + 1) % messages.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, msgIdx, messages, speed, pause]);

  return display;
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 1 — HERO                                                     */
/* ══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.18,
        delay: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1920&q=80)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${T.obsidian}cc 0%, ${T.obsidian}ee 50%, ${T.obsidian} 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-20 sm:px-12 md:px-20 lg:px-28 max-w-[1400px]">
        <p
          data-hero-anim
          className="mb-2 text-xs uppercase tracking-[0.3em]"
          style={{ color: T.champagne, fontFamily: T.mono }}
        >
          Consultoría AI &mdash; Transformación Digital
        </p>

        <h1 data-hero-anim>
          <span
            className="block text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight"
            style={{
              fontFamily: T.heading,
              letterSpacing: "-0.02em",
              color: T.ivory,
            }}
          >
            Vision meets
          </span>
          <span
            className="block text-[clamp(3rem,8vw,5.5rem)] leading-[1.05]"
            style={{
              fontFamily: T.drama,
              fontStyle: "italic",
              color: T.ivory,
            }}
          >
            Precision.
          </span>
        </h1>

        <p
          data-hero-anim
          className="mt-6 max-w-lg text-[clamp(0.9rem,1.5vw,1.1rem)] leading-relaxed"
          style={{ color: `${T.ivory}cc` }}
        >
          Consultoría de transformación digital con AI — precisión artesanal
          para tu empresa.
        </p>

        <div data-hero-anim className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#pricing"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
            style={{
              background: T.champagne,
              color: T.obsidian,
              fontFamily: T.heading,
              letterSpacing: "-0.01em",
            }}
          >
            Agenda una Reunión
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#features"
            className="link-lift inline-flex items-center gap-1.5 text-sm"
            style={{ color: `${T.ivory}99`, fontFamily: T.heading }}
          >
            Conoce el proceso
            <ChevronRight size={14} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-anim
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="block h-10 w-px animate-pulse"
          style={{ background: `${T.champagne}66` }}
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 2 — FEATURES (3 Interactive Cards)                           */
/* ══════════════════════════════════════════════════════════════════════ */

/* ── Card 1: Diagnostic Shuffler ───────────────────────────────────── */
function DiagnosticShuffler() {
  const labels = [
    "Automatización de Procesos",
    "Análisis Predictivo",
    "Integración AI",
  ];
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = setInterval(() => setActive((a) => (a + 1) % 3), 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll("[data-shuffle-card]");
    cards.forEach((card, i) => {
      const offset = ((i - active + 3) % 3);
      gsap.to(card, {
        y: offset * 14,
        x: offset * 6,
        scale: 1 - offset * 0.04,
        zIndex: 3 - offset,
        opacity: 1 - offset * 0.25,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    });
  }, [active]);

  return (
    <div
      className="flex flex-col items-center justify-between h-full p-8 rounded-[2rem] border shadow-lg"
      style={{
        background: T.ivory,
        borderColor: `${T.slate}15`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 self-start mb-4">
        <Zap size={18} style={{ color: T.champagne }} />
        <span
          className="text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: T.slate, fontFamily: T.mono }}
        >
          Diagnóstico
        </span>
      </div>

      <div ref={containerRef} className="relative w-full h-40 flex items-center justify-center my-4">
        {labels.map((label, i) => (
          <div
            key={label}
            data-shuffle-card
            className="absolute w-[85%] rounded-xl px-5 py-6 border cursor-pointer"
            style={{
              background: "white",
              borderColor: active === i ? T.champagne : `${T.slate}15`,
              boxShadow:
                active === i
                  ? `0 4px 24px ${T.champagne}30`
                  : "0 2px 12px rgba(0,0,0,0.04)",
            }}
            onClick={() => setActive(i)}
          >
            <span
              className="text-xs font-medium uppercase tracking-[0.1em]"
              style={{ color: T.champagne, fontFamily: T.mono }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: T.slate, fontFamily: T.heading }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto text-center">
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: T.heading,
            letterSpacing: "-0.02em",
            color: T.slate,
          }}
        >
          AI Aplicada, No Teoría
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
          Founders con experiencia real implementando AI en operaciones.
        </p>
      </div>
    </div>
  );
}

/* ── Card 2: Telemetry Typewriter ──────────────────────────────────── */
function TelemetryTypewriter() {
  const messages = [
    "Conectando con Google Workspace...",
    "Sincronizando Microsoft 365...",
    "Integrando sistema legacy...",
    "Optimizando flujos de trabajo...",
  ];
  const typed = useTypingEffect(messages, 40, 1400);

  return (
    <div
      className="flex flex-col h-full p-8 rounded-[2rem] border shadow-lg"
      style={{
        background: T.ivory,
        borderColor: `${T.slate}15`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Globe size={18} style={{ color: T.champagne }} />
        <span
          className="text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: T.slate, fontFamily: T.mono }}
        >
          Telemetría
        </span>
      </div>

      {/* Terminal */}
      <div
        className="flex-1 rounded-xl p-5 my-4"
        style={{ background: T.obsidian }}
      >
        {/* Status bar */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="block h-2 w-2 rounded-full animate-pulse"
            style={{ background: T.champagne }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.15em] font-medium"
            style={{ color: T.champagne, fontFamily: T.mono }}
          >
            Live Feed
          </span>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: T.ivory, fontFamily: T.mono }}
        >
          <span style={{ color: T.champagne }}>$</span>{" "}
          {typed}
          <span className="inline-block w-[2px] h-4 align-middle ml-0.5 animate-pulse" style={{ background: T.champagne }} />
        </p>

        {/* Faux log lines */}
        <div className="mt-4 space-y-1.5">
          {["OK — Autenticación", "OK — Permisos", "OK — Sincronización"].map(
            (line, i) => (
              <p
                key={i}
                className="text-[11px] opacity-40"
                style={{ color: T.ivory, fontFamily: T.mono }}
              >
                [{String(i + 1).padStart(2, "0")}] {line}
              </p>
            )
          )}
        </div>
      </div>

      <div className="mt-auto text-center">
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: T.heading,
            letterSpacing: "-0.02em",
            color: T.slate,
          }}
        >
          Agnósticos al Sistema
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
          Nos adaptamos a tu stack: Google, Microsoft, o cualquier plataforma.
        </p>
      </div>
    </div>
  );
}

/* ── Card 3: Cursor Protocol Scheduler ─────────────────────────────── */
function CursorScheduler() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const [cursorPos, setCursorPos] = useState({ row: 0, col: 0 });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    let row = 0;
    let col = 0;
    const sequence = [
      [0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 1], [2, 3], [2, 5],
      [3, 0], [3, 2], [3, 4], [3, 6],
    ];
    let step = 0;

    const iv = setInterval(() => {
      const [r, c] = sequence[step % sequence.length];
      row = r;
      col = c;
      setCursorPos({ row, col });
      setSelected((prev) => {
        const next = new Set(prev);
        const key = `${r}-${c}`;
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
      step++;
    }, 900);

    return () => clearInterval(iv);
  }, []);

  const weeks = 4;

  return (
    <div
      className="flex flex-col h-full p-8 rounded-[2rem] border shadow-lg"
      style={{
        background: T.ivory,
        borderColor: `${T.slate}15`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} style={{ color: T.champagne }} />
        <span
          className="text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: T.slate, fontFamily: T.mono }}
        >
          Calendario
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center my-4">
        {/* Header row */}
        <div className="grid grid-cols-7 gap-2 mb-2 w-full max-w-[280px]">
          {days.map((d, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-semibold uppercase"
              style={{ color: `${T.slate}88`, fontFamily: T.mono }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Week rows */}
        {Array.from({ length: weeks }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-2 mb-2 w-full max-w-[280px]">
            {days.map((_, col) => {
              const isSelected = selected.has(`${row}-${col}`);
              const isCursor = cursorPos.row === row && cursorPos.col === col;
              return (
                <div
                  key={col}
                  className="relative aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300"
                  style={{
                    background: isSelected ? T.champagne : "white",
                    color: isSelected ? T.obsidian : `${T.slate}66`,
                    border: `1.5px solid ${isSelected ? T.champagne : `${T.slate}15`}`,
                    fontFamily: T.mono,
                    boxShadow: isSelected
                      ? `0 2px 12px ${T.champagne}40`
                      : "none",
                  }}
                >
                  {row * 7 + col + 1}
                  {/* SVG cursor */}
                  {isCursor && (
                    <svg
                      className="absolute -top-1 -right-1 drop-shadow-md"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M1 1L1 15L5 11L10 18L13 16L8 9L14 9L1 1Z"
                        fill={T.champagne}
                        stroke={T.obsidian}
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-auto text-center">
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: T.heading,
            letterSpacing: "-0.02em",
            color: T.slate,
          }}
        >
          Co-diseño Empático
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
          Prototipos, MVPs y metodologías centradas en el cliente.
        </p>
      </div>
    </div>
  );
}

/* ── Features Section Wrapper ──────────────────────────────────────── */
function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feature-card]", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-12"
      style={{ background: "white" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: T.champagne, fontFamily: T.mono }}
          >
            Capacidades
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-bold"
            style={{
              fontFamily: T.heading,
              letterSpacing: "-0.02em",
              color: T.slate,
            }}
          >
            Lo que nos{" "}
            <span style={{ fontFamily: T.drama, fontStyle: "italic", color: T.champagne }}>
              distingue
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div data-feature-card>
            <DiagnosticShuffler />
          </div>
          <div data-feature-card>
            <TelemetryTypewriter />
          </div>
          <div data-feature-card>
            <CursorScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 3 — PHILOSOPHY                                              */
/* ══════════════════════════════════════════════════════════════════════ */
function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      words.forEach((word) => {
        gsap.from(word, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const firstLine = "La mayoría de las consultoras se enfocan en: vender soluciones predeterminadas.";
  const secondLineA = "Nosotros nos enfocamos en: entender tu";
  const secondLineB = "realidad";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-6 sm:px-12"
      style={{ background: T.obsidian }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* First line */}
        <p className="flex flex-wrap gap-x-[0.35em] gap-y-1 text-[clamp(1rem,2vw,1.3rem)] leading-relaxed mb-10"
          style={{ color: `${T.ivory}99` }}
        >
          {firstLine.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block">
              {w}
            </span>
          ))}
        </p>

        {/* Second line — large */}
        <div className="flex flex-wrap gap-x-[0.35em] gap-y-2 items-baseline">
          {secondLineA.split(" ").map((w, i) => (
            <span
              key={i}
              data-word
              className="inline-block text-[clamp(1.8rem,5vw,3.5rem)] leading-[1.15]"
              style={{
                fontFamily: T.drama,
                fontStyle: "italic",
                color: T.ivory,
              }}
            >
              {w}
            </span>
          ))}
          <span
            data-word
            className="inline-block text-[clamp(1.8rem,5vw,3.5rem)] leading-[1.15] font-bold"
            style={{
              fontFamily: T.drama,
              fontStyle: "italic",
              color: T.champagne,
            }}
          >
            {secondLineB}.
          </span>
        </div>

        {/* Decorative line */}
        <div
          className="mt-16 h-px w-24 opacity-30"
          style={{ background: T.champagne }}
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 4 — PROTOCOL (Sticky Stacking Cards)                        */
/* ══════════════════════════════════════════════════════════════════════ */

/* SVG Animations for each protocol card */
function RotatingCircles() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const circles = ref.current.querySelectorAll("circle");
    circles.forEach((c, i) => {
      gsap.to(c, {
        rotation: 360 * (i % 2 === 0 ? 1 : -1),
        transformOrigin: "50% 50%",
        duration: 8 + i * 3,
        repeat: -1,
        ease: "none",
      });
    });
  }, []);

  return (
    <svg ref={ref} width="200" height="200" viewBox="0 0 200 200" fill="none">
      {[80, 60, 40, 22].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          stroke={i === 0 ? T.champagne : `${T.ivory}30`}
          strokeWidth={i === 0 ? 1.5 : 1}
          strokeDasharray={i === 0 ? "6 6" : i === 2 ? "3 8" : "none"}
          fill="none"
        />
      ))}
      <circle cx="100" cy="100" r="4" fill={T.champagne} />
    </svg>
  );
}

function ScanningGrid() {
  const lineRef = useRef<SVGLineElement>(null);
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      attr: { x1: 200, x2: 200 },
      duration: 2.5,
      repeat: -1,
      ease: "power1.inOut",
      yoyo: true,
    });
  }, []);

  const dots: { x: number; y: number }[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      dots.push({ x: 20 + col * 24, y: 20 + row * 24 });
    }
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2" fill={`${T.ivory}30`} />
      ))}
      <line
        ref={lineRef}
        x1="0"
        y1="0"
        x2="0"
        y2="200"
        stroke={T.champagne}
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  );
}

function PulsingWaveform() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll("rect");
    bars.forEach((bar, i) => {
      gsap.to(bar, {
        scaleY: gsap.utils.random(0.3, 1.5),
        transformOrigin: "50% 100%",
        duration: gsap.utils.random(0.4, 0.9),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.06,
      });
    });
  }, []);

  return (
    <svg ref={ref} width="200" height="100" viewBox="0 0 200 100" fill="none">
      {Array.from({ length: 20 }).map((_, i) => (
        <rect
          key={i}
          x={i * 10 + 2}
          y={30}
          width="5"
          height={gsap.utils.random(20, 60)}
          rx="2"
          fill={i % 3 === 0 ? T.champagne : `${T.ivory}30`}
        />
      ))}
    </svg>
  );
}

function Protocol() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-protocol-card]");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Skip last card

        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(card, {
              scale: 1 - progress * 0.1,
              filter: `blur(${progress * 20}px)`,
              opacity: 1 - progress * 0.5,
              duration: 0.1,
              overwrite: "auto",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      num: "01",
      title: "Diagnóstico",
      desc: "Analizamos tu infraestructura actual, identificamos oportunidades de AI y construimos un mapa de transformación personalizado.",
      Visual: RotatingCircles,
      bg: T.obsidian,
    },
    {
      num: "02",
      title: "Prototipado",
      desc: "Diseñamos y validamos prototipos funcionales. Iteramos rápidamente con feedback real de tu equipo.",
      Visual: ScanningGrid,
      bg: "#111118",
    },
    {
      num: "03",
      title: "Implementación",
      desc: "Desplegamos soluciones robustas, capacitamos a tu equipo y aseguramos adopción progresiva en toda la organización.",
      Visual: PulsingWaveform,
      bg: "#16161D",
    },
  ];

  return (
    <section ref={sectionRef} className="relative">
      <div
        className="py-20 px-6 sm:px-12 text-center"
        style={{ background: "white" }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: T.champagne, fontFamily: T.mono }}
        >
          Protocolo
        </p>
        <h2
          className="text-[clamp(2rem,4vw,3rem)] font-bold"
          style={{
            fontFamily: T.heading,
            letterSpacing: "-0.02em",
            color: T.slate,
          }}
        >
          Tres fases,{" "}
          <span style={{ fontFamily: T.drama, fontStyle: "italic", color: T.champagne }}>
            un resultado
          </span>
        </h2>
      </div>

      {protocols.map((p, i) => (
        <div
          key={i}
          data-protocol-card
          className="relative flex flex-col items-center justify-center px-6 sm:px-12 overflow-hidden"
          style={{
            background: p.bg,
            minHeight: "100vh",
          }}
        >
          <div className="mx-auto max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Visual */}
            <div className="flex-shrink-0 flex items-center justify-center w-[200px] h-[200px]">
              <p.Visual />
            </div>

            {/* Text */}
            <div>
              <span
                className="text-xs uppercase tracking-[0.3em] font-medium"
                style={{ color: T.champagne, fontFamily: T.mono }}
              >
                Fase {p.num}
              </span>
              <h3
                className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
                style={{
                  fontFamily: T.heading,
                  letterSpacing: "-0.02em",
                  color: T.ivory,
                }}
              >
                {p.title}
              </h3>
              <p
                className="mt-5 max-w-md text-base leading-relaxed"
                style={{ color: `${T.ivory}99` }}
              >
                {p.desc}
              </p>
            </div>
          </div>

          {/* Large watermark number */}
          <span
            className="absolute bottom-6 right-8 text-[12rem] font-bold leading-none select-none pointer-events-none"
            style={{
              fontFamily: T.heading,
              color: `${T.ivory}06`,
              letterSpacing: "-0.04em",
            }}
          >
            {p.num}
          </span>
        </div>
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 5 — PRICING                                                  */
/* ══════════════════════════════════════════════════════════════════════ */
function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-pricing-card]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: "Esencial",
      price: "Desde $2.500 USD",
      desc: "Diagnóstico inicial + Roadmap AI",
      features: [
        "Auditoría de procesos actuales",
        "Identificación de oportunidades AI",
        "Roadmap de transformación",
        "Reporte ejecutivo",
      ],
      featured: false,
    },
    {
      name: "Avanzado",
      price: "Desde $7.500 USD",
      desc: "Implementación guiada + Prototipos",
      features: [
        "Todo lo de Esencial",
        "Prototipo funcional (MVP)",
        "Integración con sistemas existentes",
        "Capacitación del equipo",
        "Soporte por 30 días",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      desc: "Transformación integral + Soporte",
      features: [
        "Todo lo de Avanzado",
        "Múltiples líneas de negocio",
        "Arquitectura AI a medida",
        "Soporte dedicado continuo",
        "SLA garantizado",
      ],
      featured: false,
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-12"
      style={{ background: T.ivory }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: T.champagne, fontFamily: T.mono }}
          >
            Planes
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-bold"
            style={{
              fontFamily: T.heading,
              letterSpacing: "-0.02em",
              color: T.slate,
            }}
          >
            Inversión a la medida de tu{" "}
            <span style={{ fontFamily: T.drama, fontStyle: "italic", color: T.champagne }}>
              ambición
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-pricing-card
              className="relative flex flex-col rounded-[2rem] p-8 border transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: plan.featured ? T.obsidian : "white",
                borderColor: plan.featured ? T.champagne : `${T.slate}15`,
                boxShadow: plan.featured
                  ? `0 12px 48px ${T.champagne}20`
                  : "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{
                    background: T.champagne,
                    color: T.obsidian,
                    fontFamily: T.mono,
                  }}
                >
                  Popular
                </span>
              )}

              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: T.heading,
                  letterSpacing: "-0.02em",
                  color: plan.featured ? T.ivory : T.slate,
                }}
              >
                {plan.name}
              </h3>
              <p
                className="mt-1 text-sm"
                style={{ color: plan.featured ? `${T.ivory}88` : `${T.slate}77` }}
              >
                {plan.desc}
              </p>

              <p
                className="mt-6 text-2xl font-bold"
                style={{
                  fontFamily: T.heading,
                  letterSpacing: "-0.02em",
                  color: plan.featured ? T.champagne : T.slate,
                }}
              >
                {plan.price}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check
                      size={15}
                      className="mt-0.5 flex-shrink-0"
                      style={{
                        color: plan.featured ? T.champagne : `${T.slate}88`,
                      }}
                    />
                    <span
                      style={{
                        color: plan.featured ? `${T.ivory}cc` : `${T.slate}bb`,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="magnetic-btn mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300"
                style={{
                  background: plan.featured ? T.champagne : "transparent",
                  color: plan.featured ? T.obsidian : T.slate,
                  border: plan.featured ? "none" : `1.5px solid ${T.slate}30`,
                  fontFamily: T.heading,
                }}
              >
                {plan.name === "Enterprise" ? "Contactar" : "Agenda una Reunión"}
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 6 — FOOTER                                                   */
/* ══════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="relative rounded-t-[4rem] px-6 py-20 sm:px-12"
      style={{ background: T.obsidian }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Col 1 — Brand */}
          <div>
            <h4
              className="text-2xl font-bold"
              style={{
                fontFamily: T.heading,
                letterSpacing: "-0.02em",
                color: T.ivory,
              }}
            >
              New Era
            </h4>
            <p
              className="mt-3 text-sm leading-relaxed max-w-xs"
              style={{ color: `${T.ivory}77` }}
            >
              Consultoría de tecnología y transformación digital con AI.
              Precisión artesanal para tu empresa.
            </p>

            {/* Operational status */}
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-medium"
              style={{
                border: `1px solid ${T.ivory}15`,
                color: `${T.ivory}88`,
                fontFamily: T.mono,
              }}
            >
              <span
                className="block h-2 w-2 rounded-full animate-pulse"
                style={{ background: "#34D399" }}
              />
              Sistema Operacional
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h5
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ color: `${T.ivory}55`, fontFamily: T.mono }}
            >
              Navegación
            </h5>
            <ul className="space-y-3">
              {[
                { label: "Capacidades", href: "#features" },
                { label: "Protocolo", href: "#protocol" },
                { label: "Planes", href: "#pricing" },
                { label: "Agenda una Reunión", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="link-lift inline-flex items-center gap-1 text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: `${T.ivory}88` }}
                  >
                    {link.label}
                    <ExternalLink size={11} className="opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h5
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ color: `${T.ivory}55`, fontFamily: T.mono }}
            >
              Legal
            </h5>
            <ul className="space-y-3">
              {["Términos de Servicio", "Política de Privacidad", "Aviso Legal"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="link-lift inline-block text-sm transition-colors duration-200 hover:opacity-100"
                      style={{ color: `${T.ivory}55` }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: `1px solid ${T.ivory}10`,
            color: `${T.ivory}44`,
            fontFamily: T.mono,
          }}
        >
          <span>&copy; {new Date().getFullYear()} New Era. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1.5">
            Hecho con
            <span style={{ color: T.champagne }}>&#9830;</span>
            precisión
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  PAGE — Main Composition                                              */
/* ══════════════════════════════════════════════════════════════════════ */
export default function Design2() {
  useEffect(() => {
    /* Refresh ScrollTrigger after all content is painted */
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="noise-overlay" style={{ background: "white" }}>
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}
