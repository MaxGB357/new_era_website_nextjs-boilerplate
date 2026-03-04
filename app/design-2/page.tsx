"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  MousePointer2,
  Activity,
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

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 1 — HERO                                                     */
/* ══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-12"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1920&q=80")',
        }}
      />
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${T.obsidian}, ${T.obsidian}99 40%, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="flex flex-col" style={{ color: T.ivory }}>
          <span
            className="hero-text font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2"
            style={{ fontFamily: T.heading }}
          >
            La Inteligencia Artificial es la
          </span>
          <span
            className="hero-text italic text-7xl md:text-8xl lg:text-[140px] leading-[0.85] pr-4"
            style={{ fontFamily: T.drama, color: T.champagne }}
          >
            Evolución.
          </span>
        </h1>
        <p
          className="hero-text mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
          style={{ color: `${T.ivory}cc` }}
        >
          Diseñamos e implementamos soluciones de Inteligencia Artificial a
          medida en tu empresa.
        </p>
        <div className="hero-text mt-10 flex flex-col sm:flex-row gap-4">
          <button
            className="btn-magnetic px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
            style={{
              background: T.champagne,
              color: T.obsidian,
              fontFamily: T.heading,
            }}
          >
            <Calendar className="w-5 h-5" />
            Agendar una reunión
          </button>
          <button
            className="btn-magnetic backdrop-blur-md px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition-colors"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: T.ivory,
            }}
          >
            Hablar con Agente AI
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  INTERACTIVE CARDS                                                    */
/* ══════════════════════════════════════════════════════════════════════ */

/* ── Card 1: Diagnostic Shuffler ───────────────────────────────────── */
function DiagnosticShuffler() {
  const [items, setItems] = useState([
    "Operaciones Optimizadas",
    "Resultados Directos",
    "Cero Teoría",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        const last = newItems.pop()!;
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 relative flex items-center justify-center overflow-hidden w-full">
      {items.map((item, i) => {
        const isTop = i === 0;
        const isMiddle = i === 1;

        return (
          <div
            key={item}
            className="absolute w-[85%] rounded-2xl p-4 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              background: T.slate,
              border: `1px solid ${T.champagne}20`,
              boxShadow: isTop
                ? `0 4px 24px ${T.champagne}15`
                : "0 2px 12px rgba(0,0,0,0.2)",
              transform: `translateY(${isTop ? "0px" : isMiddle ? "16px" : "32px"}) scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9})`,
              opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
              zIndex: 3 - i,
            }}
          >
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: T.ivory, fontFamily: T.mono }}
            >
              {item}
            </span>
            <Activity className="w-4 h-4" style={{ color: T.champagne }} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Card 2: Telemetry Typewriter ──────────────────────────────────── */
function TelemetryTypewriter() {
  const [text, setText] = useState("");
  const fullText =
    "Integrando Google Suite...\nConectando Microsoft Office...\nAjustando a tu empresa...\n> Sistema Agnóstico Activo.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => {
          i = 0;
        }, 4000);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="h-48 w-full rounded-2xl p-5 flex flex-col relative overflow-hidden"
      style={{ background: T.obsidian, border: `1px solid ${T.champagne}15` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: T.champagne }}
        />
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: `${T.ivory}50`, fontFamily: T.mono }}
        >
          Live Feed
        </span>
      </div>
      <pre
        className="text-xs whitespace-pre-wrap leading-relaxed"
        style={{ color: `${T.ivory}cc`, fontFamily: T.mono }}
      >
        {text}
        <span
          className="inline-block w-2 h-3 ml-1 animate-pulse"
          style={{ background: T.champagne }}
        />
      </pre>
    </div>
  );
}

/* ── Card 3: Cursor Protocol Scheduler ─────────────────────────────── */
function CursorProtocolScheduler() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 });
      tl.set(dayRef.current, { scale: 1, backgroundColor: "transparent" });
      tl.set(btnRef.current, { scale: 1 });

      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, {
          x: 60,
          y: 40,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(dayRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .add(() => setActiveDay(true))
        .to(dayRef.current, {
          backgroundColor: T.champagne,
          color: T.obsidian,
          duration: 0.1,
        })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(dayRef.current, { scale: 1, duration: 0.1 }, "<")
        .to(cursorRef.current, {
          x: 140,
          y: 100,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2,
        })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(btnRef.current, { scale: 1, duration: 0.1 }, "<")
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .add(() => setActiveDay(false));
    });
    return () => ctx.revert();
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      className="h-48 w-full rounded-2xl p-5 relative flex flex-col justify-between"
      style={{
        background: T.slate,
        border: `1px solid ${T.champagne}15`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            ref={i === 3 ? dayRef : null}
            className="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors"
            style={{
              background:
                i === 3 && activeDay ? T.champagne : `${T.ivory}10`,
              color:
                i === 3 && activeDay ? T.obsidian : `${T.ivory}50`,
              fontFamily: T.mono,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div
          ref={btnRef}
          className="text-[10px] uppercase tracking-wider px-4 py-2 rounded-full"
          style={{
            background: T.champagne,
            color: T.obsidian,
            fontFamily: T.mono,
            fontWeight: 600,
          }}
        >
          Agendar MVP
        </div>
      </div>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{ transform: "translate(0,0)" }}
      >
        <MousePointer2
          className="w-5 h-5 drop-shadow-md"
          style={{ color: T.obsidian, fill: T.ivory }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 2 — FEATURES                                                */
/* ══════════════════════════════════════════════════════════════════════ */
function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <h2
          className="font-bold text-3xl md:text-5xl tracking-tight"
          style={{ fontFamily: T.heading, color: T.slate }}
        >
          Aplicación directa.
          <br />
          <span
            className="italic font-normal"
            style={{ fontFamily: T.drama, color: T.champagne }}
          >
            Resultados reales.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div
          className="feature-card rounded-[2rem] p-8 flex flex-col"
          style={{
            background: T.ivory,
            border: `1px solid ${T.slate}15`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          <DiagnosticShuffler />
          <div className="mt-8">
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: T.heading, color: T.slate }}
            >
              Experiencia Real
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
              Fundadores con experiencia aplicando AI en operaciones internas. No
              ofrecemos teoría, sino aplicación directa con resultados.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="feature-card rounded-[2rem] p-8 flex flex-col"
          style={{
            background: T.ivory,
            border: `1px solid ${T.slate}15`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          <TelemetryTypewriter />
          <div className="mt-8">
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: T.heading, color: T.slate }}
            >
              Agnósticos al Sistema
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
              Nos ajustamos a las circunstancias de tu empresa, ya sea Google
              Suite, Microsoft Office u otros ecosistemas.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="feature-card rounded-[2rem] p-8 flex flex-col"
          style={{
            background: T.ivory,
            border: `1px solid ${T.slate}15`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          <CursorProtocolScheduler />
          <div className="mt-8">
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: T.heading, color: T.slate }}
            >
              Consultoría Empática
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
              Avanzamos mediante prototipos y MVPs para identificar y solucionar
              todas las preocupaciones del cliente. Sin cajas negras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 3 — PHILOSOPHY (Parallax Background)                        */
/* ══════════════════════════════════════════════════════════════════════ */
function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        ease: "none",
      });

      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden rounded-[3rem] mx-4 md:mx-8 my-12"
      style={{ background: T.obsidian }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.08]">
        <div
          className="parallax-bg absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p
          className="phil-text text-lg md:text-2xl mb-8 max-w-2xl"
          style={{ color: `${T.ivory}99` }}
        >
          La mayoría de las consultoras se enfocan en: teoría abstracta y
          soluciones predeterminadas &ldquo;out of the box&rdquo;.
        </p>
        <h2
          className="phil-text font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: T.heading, color: T.ivory }}
        >
          Nosotros nos enfocamos en: <br />
          <span
            className="italic font-normal text-6xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: T.drama, color: T.champagne }}
          >
            empatía y resultados.
          </span>
        </h2>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  SECTION 4 — PROTOCOL (Sticky Stacking Cards)                        */
/* ══════════════════════════════════════════════════════════════════════ */

/* SVG Animations */
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".protocol-card"
      ) as HTMLElement[];

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.9 - i * 0.05,
            opacity: 0.5,
            filter: "blur(10px)",
            ease: "none",
          }),
          scrub: true,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Diagnóstico Profundo",
      desc: "Identificamos las preocupaciones reales de tu empresa antes de escribir una sola línea de código.",
      Visual: RotatingCircles,
    },
    {
      num: "02",
      title: "Prototipado Ágil",
      desc: "Avanzamos en base a múltiples maquetas y MVPs. Ajustamos la solución a tu ecosistema actual.",
      Visual: ScanningGrid,
    },
    {
      num: "03",
      title: "Implementación a Medida",
      desc: "Despliegue de soluciones de IA que generan impacto directo en tus operaciones diarias.",
      Visual: PulsingWaveform,
    },
  ];

  return (
    <section
      id="protocol"
      ref={containerRef}
      className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative"
    >
      <div className="mb-24 text-center">
        <h2
          className="font-bold text-4xl md:text-6xl"
          style={{ fontFamily: T.heading, color: T.slate }}
        >
          Nuestro{" "}
          <span
            className="italic font-normal"
            style={{ fontFamily: T.drama, color: T.champagne }}
          >
            Protocolo
          </span>
        </h2>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <div
            key={i}
            className="protocol-card h-[70vh] w-full rounded-[3rem] shadow-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between mb-8 origin-top"
            style={{
              background: T.obsidian,
              border: `1px solid ${T.champagne}15`,
              zIndex: i,
            }}
          >
            <div className="flex-1">
              <span
                className="text-xl md:text-2xl mb-6 block"
                style={{ color: T.champagne, fontFamily: T.mono }}
              >
                [{step.num}]
              </span>
              <h3
                className="font-bold text-3xl md:text-5xl mb-6"
                style={{ fontFamily: T.heading, color: T.ivory }}
              >
                {step.title}
              </h3>
              <p
                className="text-lg md:text-xl max-w-md leading-relaxed"
                style={{ color: `${T.ivory}99` }}
              >
                {step.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden"
                style={{ background: T.slate }}
              >
                <step.Visual />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  FOOTER                                                               */
/* ══════════════════════════════════════════════════════════════════════ */
function MidnightFooter() {
  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem] mt-24"
      style={{ background: T.obsidian, color: T.ivory }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2
            className="font-bold text-3xl mb-4"
            style={{ fontFamily: T.heading }}
          >
            New Era
          </h2>
          <p
            className="max-w-sm"
            style={{ color: `${T.ivory}99` }}
          >
            Diseñamos e implementamos soluciones de Inteligencia Artificial a
            medida en tu empresa.
          </p>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: T.champagne, fontFamily: T.mono }}
          >
            Navegación
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#features"
                className="link-lift transition-colors"
                style={{ color: `${T.ivory}cc` }}
              >
                Soluciones
              </a>
            </li>
            <li>
              <a
                href="#philosophy"
                className="link-lift transition-colors"
                style={{ color: `${T.ivory}cc` }}
              >
                Filosofía
              </a>
            </li>
            <li>
              <a
                href="#protocol"
                className="link-lift transition-colors"
                style={{ color: `${T.ivory}cc` }}
              >
                Protocolo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: T.champagne, fontFamily: T.mono }}
          >
            Contacto
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#"
                className="link-lift transition-colors"
                style={{ color: `${T.ivory}cc` }}
              >
                Agendar Reunión
              </a>
            </li>
            <li>
              <a
                href="#"
                className="link-lift transition-colors"
                style={{ color: `${T.ivory}cc` }}
              >
                Hablar con Agente AI
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: `1px solid ${T.ivory}15` }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{ border: `1px solid ${T.ivory}15`, background: `${T.ivory}08` }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: `${T.ivory}aa`, fontFamily: T.mono }}
          >
            System Operational
          </span>
        </div>
        <div
          className="text-xs"
          style={{ color: `${T.ivory}44`, fontFamily: T.mono }}
        >
          &copy; {new Date().getFullYear()} New Era Consultora AI. All rights
          reserved.
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
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .midnight-luxe-page {
          --font-sans: 'Inter', sans-serif;
          --font-heading: 'Inter', sans-serif;
          --font-drama: 'Playfair Display', serif;
          --font-mono: 'JetBrains Mono', monospace;
          background-color: ${T.ivory};
          color: ${T.slate};
        }
        .midnight-luxe-page .font-sans { font-family: var(--font-sans); }
        .midnight-luxe-page .font-heading { font-family: var(--font-heading); }
        .midnight-luxe-page .font-drama { font-family: var(--font-drama); }
        .midnight-luxe-page .font-mono { font-family: var(--font-mono); }

        .midnight-luxe-page .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        .midnight-luxe-page .btn-magnetic {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .midnight-luxe-page .btn-magnetic:hover {
          transform: scale(1.03);
        }

        .midnight-luxe-page .link-lift {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .midnight-luxe-page .link-lift:hover {
          transform: translateY(-1px);
          color: ${T.champagne} !important;
        }

        /* Scrollbar */
        .midnight-luxe-page ::-webkit-scrollbar { width: 8px; }
        .midnight-luxe-page ::-webkit-scrollbar-track { background: ${T.ivory}; }
        .midnight-luxe-page ::-webkit-scrollbar-thumb { background: ${T.slate}; border-radius: 4px; }
      `}</style>

      <div className="midnight-luxe-page relative w-full min-h-screen -mt-14">
        <div className="noise-overlay" />
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <MidnightFooter />
      </div>
    </>
  );
}
