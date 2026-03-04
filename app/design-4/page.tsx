"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MousePointer2,
  Activity,
  Disc,
  ScanLine,
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

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

const Hero = () => {
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
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${DEEP_VOID} 0%, ${DEEP_VOID}ee 20%, ${DEEP_VOID}aa 45%, transparent 100%)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="flex flex-col" style={{ color: GHOST }}>
          <span
            className="hero-text font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2"
            style={{ fontFamily: FONT_HEADING }}
          >
            La Inteligencia Artificial es la
          </span>
          <span
            className="hero-text italic text-7xl md:text-8xl lg:text-[140px] leading-[0.85] pr-4"
            style={{ fontFamily: FONT_DRAMA, color: PLASMA }}
          >
            Evolución.
          </span>
        </h1>
        <p
          className="hero-text mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
          style={{ color: `${GHOST}cc` }}
        >
          Diseñamos e implementamos soluciones de Inteligencia Artificial a
          medida en tu empresa.
        </p>
        <div className="hero-text mt-10 flex flex-col sm:flex-row gap-4">
          <button
            className="btn-magnetic text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3"
            style={{ background: PLASMA, fontFamily: FONT_HEADING }}
          >
            <Calendar className="w-5 h-5" />
            Agendar una reunión
          </button>
          <button
            className="btn-magnetic bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition-colors"
            style={{ color: GHOST, fontFamily: FONT_HEADING }}
          >
            Hablar con Agente AI
          </button>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
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
            className="absolute w-[85%] rounded-2xl p-4 shadow-sm flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              background: `${PLASMA}12`,
              border: `1px solid ${PLASMA}25`,
              transform: `translateY(${isTop ? "0px" : isMiddle ? "16px" : "32px"}) scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9})`,
              opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
              zIndex: 3 - i,
            }}
          >
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ fontFamily: FONT_MONO, color: GHOST }}
            >
              {item}
            </span>
            <Activity className="w-4 h-4" style={{ color: PLASMA }} />
          </div>
        );
      })}
    </div>
  );
};

const TelemetryTypewriter = () => {
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
      style={{ background: DEEP_VOID }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: PLASMA }}
        ></div>
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: FONT_MONO, color: `${GHOST}80` }}
        >
          Live Feed
        </span>
      </div>
      <pre
        className="text-xs whitespace-pre-wrap leading-relaxed"
        style={{ fontFamily: FONT_MONO, color: `${GHOST}cc` }}
      >
        {text}
        <span
          className="inline-block w-2 h-3 ml-1 animate-pulse"
          style={{ background: PLASMA }}
        ></span>
      </pre>
    </div>
  );
};

const CursorProtocolScheduler = () => {
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
          backgroundColor: PLASMA,
          color: "#fff",
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
      className="h-48 w-full rounded-2xl p-5 relative shadow-sm flex flex-col justify-between"
      style={{
        background: `${PLASMA}08`,
        border: `1px solid ${PLASMA}20`,
      }}
    >
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            ref={i === 3 ? dayRef : null}
            className="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors"
            style={{
              fontFamily: FONT_MONO,
              background:
                i === 3 && activeDay ? PLASMA : `${PLASMA}15`,
              color:
                i === 3 && activeDay ? "white" : `${GHOST}70`,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div
          ref={btnRef}
          className="text-white text-[10px] uppercase tracking-wider px-4 py-2 rounded-full"
          style={{
            fontFamily: FONT_MONO,
            background: GRAPHITE,
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
        <MousePointer2 className="w-5 h-5 fill-white drop-shadow-md" style={{ color: PLASMA }} />
      </div>
    </div>
  );
};

const Features = () => {
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
          style={{ fontFamily: FONT_HEADING, color: GHOST }}
        >
          Aplicación directa.
          <br />
          <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
            Resultados reales.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div
          className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col"
          style={{
            background: `${GRAPHITE}`,
            border: `1px solid ${PLASMA}20`,
          }}
        >
          <DiagnosticShuffler />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: FONT_HEADING, color: GHOST }}
            >
              Experiencia Real
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Fundadores con experiencia aplicando AI en operaciones internas. No
              ofrecemos teoría, sino aplicación directa con resultados.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col"
          style={{
            background: `${GRAPHITE}`,
            border: `1px solid ${PLASMA}20`,
          }}
        >
          <TelemetryTypewriter />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: FONT_HEADING, color: GHOST }}
            >
              Agnósticos al Sistema
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Nos ajustamos a las circunstancias de tu empresa, ya sea Google
              Suite, Microsoft Office u otros ecosistemas.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col"
          style={{
            background: `${GRAPHITE}`,
            border: `1px solid ${PLASMA}20`,
          }}
        >
          <CursorProtocolScheduler />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: FONT_HEADING, color: GHOST }}
            >
              Consultoría Empática
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Avanzamos mediante prototipos y MVPs para identificar y solucionar
              todas las preocupaciones del cliente. Sin cajas negras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
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
      style={{ background: GRAPHITE }}
    >
      {/* Background Texture with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-15">
        <div
          className="parallax-bg absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop")',
          }}
        ></div>
      </div>

      {/* Plasma glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20"
        style={{ background: PLASMA }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p
          className="phil-text text-lg md:text-2xl mb-8 max-w-2xl"
          style={{ color: `${GHOST}99` }}
        >
          La mayoría de las consultoras se enfocan en: teoría abstracta y
          soluciones predeterminadas &ldquo;out of the box&rdquo;.
        </p>
        <h2
          className="phil-text font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: FONT_HEADING, color: GHOST }}
        >
          Nosotros nos enfocamos en: <br />
          <span
            className="font-normal text-6xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA }}
          >
            empatía y resultados.
          </span>
        </h2>
      </div>
    </section>
  );
};

const Protocol = () => {
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
      icon: (
        <Disc
          className="w-16 h-16 animate-[spin_10s_linear_infinite]"
          style={{ color: PLASMA }}
        />
      ),
    },
    {
      num: "02",
      title: "Prototipado Ágil",
      desc: "Avanzamos en base a múltiples maquetas y MVPs. Ajustamos la solución a tu ecosistema actual.",
      icon: (
        <ScanLine
          className="w-16 h-16 animate-pulse"
          style={{ color: PLASMA }}
        />
      ),
    },
    {
      num: "03",
      title: "Implementación a Medida",
      desc: "Despliegue de soluciones de IA que generan impacto directo en tus operaciones diarias.",
      icon: <Activity className="w-16 h-16" style={{ color: PLASMA }} />,
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
          style={{ fontFamily: FONT_HEADING, color: GHOST }}
        >
          Nuestro{" "}
          <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
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
              zIndex: i,
              background: GRAPHITE,
              border: `1px solid ${PLASMA}20`,
            }}
          >
            <div className="flex-1">
              <span
                className="text-xl md:text-2xl mb-6 block"
                style={{ fontFamily: FONT_MONO, color: PLASMA }}
              >
                [{step.num}]
              </span>
              <h3
                className="font-bold text-3xl md:text-5xl mb-6"
                style={{ fontFamily: FONT_HEADING, color: GHOST }}
              >
                {step.title}
              </h3>
              <p
                className="text-lg md:text-xl max-w-md leading-relaxed"
                style={{ color: `${GHOST}aa` }}
              >
                {step.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden"
                style={{ background: `${DEEP_VOID}` }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `inset 0 0 40px ${PLASMA}30, 0 0 30px ${PLASMA}15`,
                  }}
                ></div>
                {step.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const VaporFooter = () => {
  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem] mt-24"
      style={{ background: DEEP_VOID, color: GHOST }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2
            className="font-bold text-3xl mb-4"
            style={{ fontFamily: FONT_HEADING }}
          >
            New Era
          </h2>
          <p style={{ color: `${GHOST}99` }} className="max-w-sm">
            Diseñamos e implementamos soluciones de Inteligencia Artificial a
            medida en tu empresa.
          </p>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: FONT_MONO, color: PLASMA }}
          >
            Navegación
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#features"
                className="transition-colors"
                style={{ color: `${GHOST}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
              >
                Soluciones
              </a>
            </li>
            <li>
              <a
                href="#philosophy"
                className="transition-colors"
                style={{ color: `${GHOST}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
              >
                Filosofía
              </a>
            </li>
            <li>
              <a
                href="#protocol"
                className="transition-colors"
                style={{ color: `${GHOST}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
              >
                Protocolo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: FONT_MONO, color: PLASMA }}
          >
            Contacto
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#"
                className="transition-colors"
                style={{ color: `${GHOST}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
              >
                Agendar Reunión
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors"
                style={{ color: `${GHOST}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
              >
                Hablar con Agente AI
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: `1px solid ${GHOST}15` }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: `${GHOST}08`,
            border: `1px solid ${GHOST}15`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span
            className="text-xs uppercase tracking-wider"
            style={{ fontFamily: FONT_MONO, color: `${GHOST}aa` }}
          >
            System Operational
          </span>
        </div>
        <div
          className="text-xs"
          style={{ fontFamily: FONT_MONO, color: `${GHOST}66` }}
        >
          &copy; {new Date().getFullYear()} New Era Consultora AI. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function VaporClinicPage() {
  return (
    <>
      <style>{`
        .vapor-clinic-page {
          --font-heading: ${FONT_HEADING};
          --font-drama: ${FONT_DRAMA};
          --font-mono: ${FONT_MONO};
          background-color: ${DEEP_VOID};
          color: ${GHOST};
        }
        .vapor-clinic-page .font-heading { font-family: var(--font-heading); }
        .vapor-clinic-page .font-drama { font-family: var(--font-drama); }
        .vapor-clinic-page .font-mono { font-family: var(--font-mono); }

        .vapor-clinic-page .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.04;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        .vapor-clinic-page .btn-magnetic {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .vapor-clinic-page .btn-magnetic:hover {
          transform: scale(1.03);
        }

        /* Scrollbar */
        .vapor-clinic-page ::-webkit-scrollbar { width: 8px; }
        .vapor-clinic-page ::-webkit-scrollbar-track { background: ${DEEP_VOID}; }
        .vapor-clinic-page ::-webkit-scrollbar-thumb { background: ${PLASMA}; border-radius: 4px; }
      `}</style>

      <div className="vapor-clinic-page relative w-full min-h-screen -mt-14">
        <div className="noise-overlay"></div>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <VaporFooter />
      </div>
    </>
  );
}
