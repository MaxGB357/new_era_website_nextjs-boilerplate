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
  Phone,
  MapPin,
  ChevronRight,
  Calendar,
  Save,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── DESIGN TOKENS ─────────────────────── */
const PAPER = "#E8E4DD";
const RED = "#E63B2E";
const OFFWHITE = "#F5F3EE";
const BLACK = "#111111";
const HEADING = "'Space Grotesk', sans-serif";
const DRAMA = "'DM Serif Display', serif";
const MONO = "'Space Mono', monospace";

/* ─────────────────────── DIAGNOSTIC SHUFFLER ─────────────────────── */
function DiagnosticShuffler() {
  const [activeIndex, setActiveIndex] = useState(0);
  const labels = [
    "Automatización de Procesos",
    "Análisis Predictivo",
    "Integración AI",
  ];
  const colors = ["#E63B2E", "#111111", "#8B7355"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {labels.map((label, i) => {
        const offset = (i - activeIndex + 3) % 3;
        const isTop = offset === 0;
        const isMid = offset === 1;
        return (
          <div
            key={label}
            className="absolute rounded-xl border border-black/10 px-6 py-5 shadow-lg"
            style={{
              fontFamily: MONO,
              fontSize: "0.8rem",
              background: isTop ? "#fff" : isMid ? OFFWHITE : PAPER,
              color: colors[i],
              fontWeight: isTop ? 700 : 400,
              zIndex: isTop ? 30 : isMid ? 20 : 10,
              transform: isTop
                ? "translateY(0px) rotate(-1deg) scale(1)"
                : isMid
                  ? "translateY(14px) rotate(2deg) scale(0.96)"
                  : "translateY(28px) rotate(-3deg) scale(0.92)",
              opacity: isTop ? 1 : isMid ? 0.7 : 0.4,
              transition:
                "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              width: "80%",
              maxWidth: "260px",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "#999", fontFamily: MONO }}
            >
              Diagnóstico #{String(i + 1).padStart(2, "0")}
            </div>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────── TELEMETRY TYPEWRITER ─────────────────────── */
function TelemetryTypewriter() {
  const messages = [
    "Conectando con Google Workspace...",
    "Sincronizando Microsoft 365...",
    "Integrando sistema legacy...",
    "Optimizando flujos de trabajo...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [dotPulse, setDotPulse] = useState(true);

  useEffect(() => {
    const pulseInterval = setInterval(
      () => setDotPulse((p) => !p),
      800
    );
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    const msg = messages[msgIndex];
    if (charIndex < msg.length) {
      const timeout = setTimeout(() => {
        setCurrentText(msg.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 40 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev.slice(-2), msg]);
        setCurrentText("");
        setCharIndex(0);
        setMsgIndex((m) => (m + 1) % messages.length);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, msgIndex]);

  return (
    <div
      className="h-48 flex flex-col justify-between"
      style={{ fontFamily: MONO }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            backgroundColor: RED,
            opacity: dotPulse ? 1 : 0.3,
            transition: "opacity 0.3s",
          }}
        />
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: RED }}
        >
          Live Feed
        </span>
      </div>
      <div className="flex-1 overflow-hidden text-xs leading-6">
        {lines.map((line, i) => (
          <div key={i} className="opacity-40" style={{ color: BLACK }}>
            <span style={{ color: "#999" }}>
              [{String(i + 1).padStart(2, "0")}]{" "}
            </span>
            {line}
          </div>
        ))}
        <div style={{ color: BLACK }}>
          <span style={{ color: RED }}>{">"} </span>
          {currentText}
          <span
            className="inline-block w-[6px] h-[14px] ml-[2px] align-middle"
            style={{
              backgroundColor: RED,
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── CURSOR PROTOCOL SCHEDULER ─────────────────────── */
function CursorScheduler() {
  const days = ["LUN", "MAR", "MIÉ", "JUE", "VIE"];
  const hours = ["9:00", "11:00", "14:00", "16:00"];
  const [cursorPos, setCursorPos] = useState({ day: 0, hour: 0 });
  const [selected, setSelected] = useState<
    { day: number; hour: number }[]
  >([]);
  const [phase, setPhase] = useState<"selecting" | "saving">(
    "selecting"
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sequence = [
      { day: 1, hour: 1 },
      { day: 3, hour: 2 },
      { day: 0, hour: 3 },
      { day: 4, hour: 0 },
      { day: 2, hour: 1 },
    ];
    let step = 0;
    setSaved(false);
    setSelected([]);
    setPhase("selecting");

    const interval = setInterval(() => {
      if (step < sequence.length) {
        const s = sequence[step];
        setCursorPos(s);
        setSelected((prev) => [...prev, s]);
        step++;
      } else if (phase === "selecting") {
        setPhase("saving");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "saving") {
      const timeout = setTimeout(() => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setSelected([]);
          setPhase("selecting");
          setCursorPos({ day: 0, hour: 0 });

          const sequence = [
            { day: 1, hour: 1 },
            { day: 3, hour: 2 },
            { day: 0, hour: 3 },
            { day: 4, hour: 0 },
            { day: 2, hour: 1 },
          ];
          let step = 0;
          const interval = setInterval(() => {
            if (step < sequence.length) {
              const s = sequence[step];
              setCursorPos(s);
              setSelected((prev) => [...prev, s]);
              step++;
            } else {
              setPhase("saving");
              clearInterval(interval);
            }
          }, 1000);
        }, 2000);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  const isSelected = (d: number, h: number) =>
    selected.some((s) => s.day === d && s.hour === h);
  const isCursor = (d: number, h: number) =>
    cursorPos.day === d && cursorPos.hour === h;

  return (
    <div className="h-48 flex flex-col" style={{ fontFamily: MONO }}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={12} style={{ color: RED }} />
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "#999" }}
        >
          Protocolo de Agenda
        </span>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-6 gap-[2px] text-[9px]">
          <div />
          {days.map((d) => (
            <div
              key={d}
              className="text-center py-1 font-bold"
              style={{ color: "#999" }}
            >
              {d}
            </div>
          ))}
          {hours.map((h, hi) => (
            <>
              <div
                key={`h-${hi}`}
                className="text-right pr-1 py-1"
                style={{ color: "#999", fontSize: "8px" }}
              >
                {h}
              </div>
              {days.map((_, di) => (
                <div
                  key={`${di}-${hi}`}
                  className="aspect-square rounded-sm flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isSelected(di, hi)
                      ? RED
                      : isCursor(di, hi)
                        ? `${RED}30`
                        : "#f0ede7",
                    border: isCursor(di, hi)
                      ? `1.5px solid ${RED}`
                      : "1px solid transparent",
                    transform: isCursor(di, hi)
                      ? "scale(1.15)"
                      : "scale(1)",
                  }}
                >
                  {isSelected(di, hi) && (
                    <Check size={8} color="#fff" strokeWidth={3} />
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          className="flex items-center gap-1 px-3 py-1 rounded-md text-[10px] font-bold transition-all duration-300"
          style={{
            backgroundColor:
              phase === "saving"
                ? saved
                  ? "#22c55e"
                  : RED
                : "#e0ddd6",
            color: phase === "saving" ? "#fff" : "#999",
            transform:
              phase === "saving" && !saved ? "scale(1.05)" : "scale(1)",
          }}
        >
          <Save size={10} />
          {saved ? "¡Guardado!" : "Guardar"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── SVG ANIMATIONS ─────────────────────── */
function RotatingGeometric() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20">
      <g transform="translate(60,60)">
        {[40, 30, 20].map((r, i) => (
          <circle
            key={i}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke={i === 0 ? RED : i === 1 ? BLACK : "#999"}
            strokeWidth={1.5}
            strokeDasharray={i === 1 ? "4 4" : "none"}
            style={{
              transformOrigin: "center",
              animation: `spin${i % 2 === 0 ? "" : "Reverse"} ${3 + i * 2}s linear infinite`,
            }}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill={RED} />
      </g>
    </svg>
  );
}

function ScanningGrid() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20">
      {/* grid */}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <line
            x1={20 + i * 16}
            y1="20"
            x2={20 + i * 16}
            y2="100"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1={20 + i * 16}
            x2="100"
            y2={20 + i * 16}
            stroke="#ddd"
            strokeWidth="0.5"
          />
        </g>
      ))}
      {/* dots at intersections */}
      {[
        [36, 36],
        [68, 52],
        [52, 84],
        [84, 36],
        [36, 68],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={RED} opacity={0.7} />
      ))}
      {/* scan line */}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="100"
        stroke={RED}
        strokeWidth="2"
        opacity="0.6"
        style={{ animation: "scanLine 2.5s ease-in-out infinite" }}
      />
    </svg>
  );
}

function PulsingWaveform() {
  return (
    <svg viewBox="0 0 120 40" className="w-24 h-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <rect
          key={i}
          x={6 + i * 5.5}
          y={20 - Math.sin(i * 0.7) * 12}
          width="3"
          rx="1.5"
          height={Math.abs(Math.sin(i * 0.7)) * 24 + 2}
          fill={i % 3 === 0 ? RED : BLACK}
          opacity={0.6 + Math.sin(i * 0.7) * 0.4}
          style={{
            animation: `waveBar 1.5s ease-in-out ${i * 0.08}s infinite alternate`,
          }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */
export default function Design3() {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const protocolRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── HERO ── */
      const heroEls = heroRef.current?.querySelectorAll(".hero-anim");
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      /* ── FEATURES ── */
      const featureCards =
        featuresRef.current?.querySelectorAll(".feature-card");
      if (featureCards) {
        gsap.fromTo(
          featureCards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 75%",
            },
          }
        );
      }

      /* ── PHILOSOPHY — word-by-word reveal ── */
      const philWords =
        philosophyRef.current?.querySelectorAll(".phil-word");
      if (philWords) {
        gsap.fromTo(
          philWords,
          { opacity: 0.08, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 0.8,
            },
          }
        );
      }

      /* ── PROTOCOL — Sticky Stacking Cards ── */
      const protocolCards = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
      ];
      protocolCards.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 15%",
          end: "bottom 15%",
          pin: true,
          pinSpacing: i === protocolCards.length - 1,
          endTrigger:
            i < protocolCards.length - 1
              ? protocolCards[protocolCards.length - 1]!
              : undefined,
        });

        if (i < protocolCards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: "blur(20px)",
            opacity: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: protocolCards[i + 1]!,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });

      /* ── PRICING ── */
      const pricingCards =
        pricingRef.current?.querySelectorAll(".pricing-card");
      if (pricingCards) {
        gsap.fromTo(
          pricingCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 70%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  /* ── Philosophy word splitting ── */
  const philLine1 =
    "La mayoría de las consultoras: venden soluciones predeterminadas.";
  const philLine2Words = [
    { text: "Nosotros:", highlight: false },
    { text: " entendemos", highlight: false },
    { text: " tu", highlight: false },
    { text: " realidad.", highlight: true },
  ];

  return (
    <div
      className="noise-overlay"
      style={{
        background: OFFWHITE,
        color: BLACK,
        fontFamily: HEADING,
        letterSpacing: "-0.02em",
      }}
    >
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes scanLine {
          0% { transform: translateX(0px); }
          50% { transform: translateX(80px); }
          100% { transform: translateX(0px); }
        }
        @keyframes waveBar {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* ═════════════════════ 1. HERO ═════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?auto=format&fit=crop&w=1920&q=80)`,
          }}
        />
        {/* Heavy gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BLACK} 0%, ${BLACK}dd 25%, ${BLACK}88 50%, ${PAPER}44 75%, ${PAPER}22 100%)`,
          }}
        />
        {/* Content — bottom-left */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-16 md:pb-24 max-w-5xl">
          <div
            className="hero-anim text-xs uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: MONO, color: RED }}
          >
            New Era — Consultoría AI
          </div>
          <h1 className="hero-anim">
            <span
              className="block text-xl sm:text-2xl font-bold"
              style={{
                fontFamily: HEADING,
                color: PAPER,
              }}
            >
              Transform the
            </span>
            <span
              className="block leading-none"
              style={{
                fontFamily: DRAMA,
                fontStyle: "italic",
                color: PAPER,
                fontSize: "clamp(3rem, 8vw, 5rem)",
              }}
            >
              System.
            </span>
          </h1>
          <p
            className="hero-anim mt-6 max-w-lg text-sm sm:text-base leading-relaxed"
            style={{ color: `${PAPER}cc` }}
          >
            Consultoría sin adornos. AI aplicada con precisión quirúrgica.
          </p>
          <div className="hero-anim mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#pricing"
              className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all"
              style={{
                backgroundColor: RED,
                color: "#fff",
              }}
            >
              Agenda una Reunión
              <ArrowRight size={16} />
            </a>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: `${PAPER}88`, fontFamily: MONO }}
            >
              Scroll para explorar ↓
            </span>
          </div>
        </div>
      </section>

      {/* ═════════════════════ 2. FEATURES ═════════════════════ */}
      <section
        ref={featuresRef}
        className="py-24 md:py-32 px-6 sm:px-10 md:px-16"
        style={{ background: PAPER }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-xl">
            <span
              className="text-xs uppercase tracking-[0.3em] block mb-3"
              style={{ fontFamily: MONO, color: RED }}
            >
              Capacidades
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: HEADING }}
            >
              Lo que hacemos
              <span style={{ color: RED }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Diagnostic Shuffler */}
            <div
              className="feature-card p-6 border border-black/10 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                background: OFFWHITE,
                borderRadius: "2rem",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} style={{ color: RED }} />
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: "#999", fontFamily: MONO }}
                >
                  AI Aplicada, No Teoría
                </span>
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: HEADING }}
              >
                Diagnóstico Inteligente
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "#777" }}
              >
                Founders con experiencia real implementando AI en
                operaciones.
              </p>
              <DiagnosticShuffler />
            </div>

            {/* Card 2 — Telemetry Typewriter */}
            <div
              className="feature-card p-6 border border-black/10 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                background: OFFWHITE,
                borderRadius: "2rem",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Globe size={16} style={{ color: RED }} />
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: "#999", fontFamily: MONO }}
                >
                  Agnósticos al Sistema
                </span>
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: HEADING }}
              >
                Telemetría en Vivo
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "#777" }}
              >
                Nos adaptamos a tu stack: Google, Microsoft, o cualquier
                plataforma.
              </p>
              <TelemetryTypewriter />
            </div>

            {/* Card 3 — Cursor Protocol Scheduler */}
            <div
              className="feature-card p-6 border border-black/10 shadow-sm hover:shadow-lg transition-shadow duration-500"
              style={{
                background: OFFWHITE,
                borderRadius: "2rem",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} style={{ color: RED }} />
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: "#999", fontFamily: MONO }}
                >
                  Co-diseño Empático
                </span>
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ fontFamily: HEADING }}
              >
                Protocolo de Agenda
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "#777" }}
              >
                Prototipos, MVPs y metodologías centradas en el cliente.
              </p>
              <CursorScheduler />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════ 3. PHILOSOPHY ═════════════════════ */}
      <section
        ref={philosophyRef}
        className="relative py-32 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden"
        style={{ background: BLACK }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1520608421741-68228b76b6df?auto=format&fit=crop&w=1920&q=80)`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Line 1 — smaller */}
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: `${PAPER}99` }}
          >
            {philLine1.split(" ").map((word, i) => (
              <span key={i} className="phil-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
          {/* Line 2 — large DM Serif Display */}
          <div
            className="leading-tight"
            style={{
              fontFamily: DRAMA,
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            {philLine2Words.map((w, i) => (
              <span
                key={i}
                className="phil-word inline-block mr-[0.25em]"
                style={{
                  color: w.highlight ? RED : PAPER,
                  fontWeight: w.highlight ? 700 : 400,
                }}
              >
                {w.text}
              </span>
            ))}
          </div>
          {/* Divider line */}
          <div
            className="mt-16 w-16 h-[2px]"
            style={{ background: RED }}
          />
          <p
            className="mt-6 text-sm max-w-md"
            style={{ color: `${PAPER}77`, fontFamily: MONO }}
          >
            Consultoría de tecnología y transformación digital con AI —
            diseñada desde la empatía.
          </p>
        </div>
      </section>

      {/* ═════════════════════ 4. PROTOCOL ═════════════════════ */}
      <section
        ref={protocolRef}
        className="py-24 md:py-32 px-6 sm:px-10 md:px-16"
        style={{ background: OFFWHITE }}
      >
        <div className="max-w-5xl mx-auto mb-16">
          <span
            className="text-xs uppercase tracking-[0.3em] block mb-3"
            style={{ fontFamily: MONO, color: RED }}
          >
            Metodología
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: HEADING }}
          >
            Protocolo de Transformación
            <span style={{ color: RED }}>.</span>
          </h2>
        </div>

        {/* Stacking Protocol Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Card 01 — Diagnóstico */}
          <div
            ref={card1Ref}
            className="rounded-[2rem] border border-black/10 p-8 sm:p-12 shadow-md"
            style={{ background: "#fff" }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="flex-1">
                <span
                  className="text-xs uppercase tracking-[0.3em] block mb-2"
                  style={{ fontFamily: MONO, color: RED }}
                >
                  Fase
                </span>
                <h3
                  className="text-4xl sm:text-5xl font-bold mb-4"
                  style={{ fontFamily: HEADING }}
                >
                  01{" "}
                  <span
                    style={{
                      fontFamily: DRAMA,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    Diagnóstico
                  </span>
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: "#777" }}
                >
                  Analizamos tu ecosistema tecnológico actual,
                  identificamos oportunidades de automatización y creamos
                  un mapa de transformación personalizado.
                </p>
              </div>
              <div
                className="flex items-center justify-center w-32 h-32 rounded-2xl"
                style={{ background: OFFWHITE }}
              >
                <RotatingGeometric />
              </div>
            </div>
          </div>

          {/* Card 02 — Prototipado */}
          <div
            ref={card2Ref}
            className="rounded-[2rem] border border-black/10 p-8 sm:p-12 shadow-md"
            style={{ background: "#fff" }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="flex-1">
                <span
                  className="text-xs uppercase tracking-[0.3em] block mb-2"
                  style={{ fontFamily: MONO, color: RED }}
                >
                  Fase
                </span>
                <h3
                  className="text-4xl sm:text-5xl font-bold mb-4"
                  style={{ fontFamily: HEADING }}
                >
                  02{" "}
                  <span
                    style={{
                      fontFamily: DRAMA,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    Prototipado
                  </span>
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: "#777" }}
                >
                  Construimos MVPs funcionales en sprints cortos.
                  Validamos con usuarios reales antes de escalar — sin
                  desperdiciar recursos.
                </p>
              </div>
              <div
                className="flex items-center justify-center w-32 h-32 rounded-2xl"
                style={{ background: OFFWHITE }}
              >
                <ScanningGrid />
              </div>
            </div>
          </div>

          {/* Card 03 — Implementación */}
          <div
            ref={card3Ref}
            className="rounded-[2rem] border border-black/10 p-8 sm:p-12 shadow-md"
            style={{ background: "#fff" }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="flex-1">
                <span
                  className="text-xs uppercase tracking-[0.3em] block mb-2"
                  style={{ fontFamily: MONO, color: RED }}
                >
                  Fase
                </span>
                <h3
                  className="text-4xl sm:text-5xl font-bold mb-4"
                  style={{ fontFamily: HEADING }}
                >
                  03{" "}
                  <span
                    style={{
                      fontFamily: DRAMA,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    Implementación
                  </span>
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: "#777" }}
                >
                  Desplegamos la solución en producción con
                  acompañamiento continuo, monitoreo y transferencia de
                  conocimiento a tu equipo.
                </p>
              </div>
              <div
                className="flex items-center justify-center w-32 h-32 rounded-2xl"
                style={{ background: OFFWHITE }}
              >
                <PulsingWaveform />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════ 5. PRICING ═════════════════════ */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-24 md:py-32 px-6 sm:px-10 md:px-16"
        style={{ background: PAPER }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs uppercase tracking-[0.3em] block mb-3"
              style={{ fontFamily: MONO, color: RED }}
            >
              Inversión
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: HEADING }}
            >
              Planes de Consultoría
              <span style={{ color: RED }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Esencial */}
            <div
              className="pricing-card rounded-[2rem] border border-black/10 p-8 flex flex-col"
              style={{ background: OFFWHITE }}
            >
              <span
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: "#999" }}
              >
                Plan
              </span>
              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: HEADING }}
              >
                Esencial
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{ fontFamily: HEADING }}
                >
                  $2.500
                </span>
                <span
                  className="text-sm"
                  style={{ color: "#999", fontFamily: MONO }}
                >
                  USD
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Diagnóstico inicial AI",
                  "Mapa de oportunidades",
                  "1 sesión de estrategia",
                  "Reporte ejecutivo",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#555" }}
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: RED }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="magnetic-btn block text-center py-3 rounded-full text-sm font-bold border transition-all hover:shadow-md"
                style={{
                  borderColor: BLACK,
                  color: BLACK,
                }}
              >
                Comenzar
              </a>
            </div>

            {/* Avanzado — Featured */}
            <div
              className="pricing-card rounded-[2rem] border-2 p-8 flex flex-col relative overflow-hidden shadow-xl"
              style={{
                background: BLACK,
                borderColor: RED,
              }}
            >
              <div
                className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold"
                style={{
                  background: RED,
                  color: "#fff",
                  fontFamily: MONO,
                }}
              >
                Popular
              </div>
              <span
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: `${PAPER}66` }}
              >
                Plan
              </span>
              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: HEADING, color: PAPER }}
              >
                Avanzado
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{ fontFamily: HEADING, color: PAPER }}
                >
                  $7.500
                </span>
                <span
                  className="text-sm"
                  style={{ color: `${PAPER}66`, fontFamily: MONO }}
                >
                  USD
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Todo en Esencial",
                  "Prototipo funcional (MVP)",
                  "4 sesiones de co-diseño",
                  "Integración con tu stack",
                  "Soporte por 30 días",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: `${PAPER}bb` }}
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: RED }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="magnetic-btn block text-center py-3 rounded-full text-sm font-bold transition-all hover:brightness-110"
                style={{
                  background: RED,
                  color: "#fff",
                }}
              >
                Agenda una Reunión
              </a>
            </div>

            {/* Enterprise */}
            <div
              className="pricing-card rounded-[2rem] border border-black/10 p-8 flex flex-col"
              style={{ background: OFFWHITE }}
            >
              <span
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: "#999" }}
              >
                Plan
              </span>
              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: HEADING }}
              >
                Enterprise
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: DRAMA,
                    fontStyle: "italic",
                  }}
                >
                  Personalizado
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Todo en Avanzado",
                  "Implementación completa",
                  "Equipo dedicado",
                  "Transferencia de conocimiento",
                  "SLA personalizado",
                  "Soporte continuo",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#555" }}
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: RED }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="magnetic-btn block text-center py-3 rounded-full text-sm font-bold border transition-all hover:shadow-md"
                style={{
                  borderColor: BLACK,
                  color: BLACK,
                }}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════ 6. FOOTER ═════════════════════ */}
      <footer
        className="px-6 sm:px-10 md:px-16 pt-16 md:pt-24 pb-8"
        style={{
          background: BLACK,
          borderTopLeftRadius: "4rem",
          borderTopRightRadius: "4rem",
          color: PAPER,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <h4
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: HEADING }}
              >
                New Era
                <span style={{ color: RED }}>.</span>
              </h4>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: `${PAPER}88` }}
              >
                Consultoría de tecnología y transformación digital con AI.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{
                    background: "#22c55e",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{
                    fontFamily: MONO,
                    color: `${PAPER}66`,
                  }}
                >
                  Sistema Operacional
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h5
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: RED }}
              >
                Navegación
              </h5>
              <ul className="space-y-3">
                {[
                  "Capacidades",
                  "Metodología",
                  "Planes",
                  "Contacto",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="link-lift text-sm inline-flex items-center gap-1 transition-colors"
                      style={{ color: `${PAPER}88` }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = PAPER)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = `${PAPER}88`)
                      }
                    >
                      <ChevronRight size={12} style={{ color: RED }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: RED }}
              >
                Contacto
              </h5>
              <ul className="space-y-3">
                <li
                  className="flex items-center gap-2 text-sm"
                  style={{ color: `${PAPER}88` }}
                >
                  <Mail size={14} style={{ color: RED }} />
                  hola@newera.ai
                </li>
                <li
                  className="flex items-center gap-2 text-sm"
                  style={{ color: `${PAPER}88` }}
                >
                  <Phone size={14} style={{ color: RED }} />
                  +52 55 1234 5678
                </li>
                <li
                  className="flex items-center gap-2 text-sm"
                  style={{ color: `${PAPER}88` }}
                >
                  <MapPin size={14} style={{ color: RED }} />
                  Ciudad de México
                </li>
              </ul>
            </div>

            {/* Status */}
            <div>
              <h5
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ fontFamily: MONO, color: RED }}
              >
                Estado del Sistema
              </h5>
              <div
                className="rounded-xl p-4 border"
                style={{
                  background: `${PAPER}08`,
                  borderColor: `${PAPER}15`,
                }}
              >
                <div className="space-y-2">
                  {[
                    { label: "API Gateway", status: "Operativo" },
                    { label: "AI Engine", status: "Operativo" },
                    { label: "Dashboard", status: "Operativo" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between"
                    >
                      <span
                        className="text-[10px]"
                        style={{
                          fontFamily: MONO,
                          color: `${PAPER}66`,
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="text-[10px] flex items-center gap-1"
                        style={{ fontFamily: MONO, color: "#22c55e" }}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: `${PAPER}15` }}
          >
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ fontFamily: MONO, color: `${PAPER}44` }}
            >
              &copy; {new Date().getFullYear()} New Era. Todos los
              derechos reservados.
            </span>
            <div
              className="flex gap-6 text-[10px] uppercase tracking-widest"
              style={{ fontFamily: MONO, color: `${PAPER}44` }}
            >
              <a
                href="#"
                className="link-lift transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = PAPER)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = `${PAPER}44`)
                }
              >
                Privacidad
              </a>
              <a
                href="#"
                className="link-lift transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = PAPER)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = `${PAPER}44`)
                }
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
