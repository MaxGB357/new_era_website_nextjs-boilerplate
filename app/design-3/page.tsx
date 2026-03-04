"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  MousePointer2,
  Activity,
  Disc,
  ScanLine,
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

/* ─────────────────────── COMPONENTS ─────────────────────── */

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
            'url("https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${BLACK} 0%, ${BLACK}dd 25%, ${BLACK}88 50%, ${PAPER}44 75%, ${PAPER}22 100%)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="flex flex-col" style={{ color: PAPER }}>
          <span
            className="hero-text font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2"
            style={{ fontFamily: HEADING }}
          >
            La Inteligencia Artificial es la
          </span>
          <span
            className="hero-text italic text-7xl md:text-8xl lg:text-[140px] leading-[0.85] pr-4"
            style={{ fontFamily: DRAMA, color: RED }}
          >
            Evoluci&oacute;n.
          </span>
        </h1>
        <p
          className="hero-text mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
          style={{ color: `${PAPER}cc` }}
        >
          Dise&ntilde;amos e implementamos soluciones de Inteligencia Artificial a
          medida en tu empresa.
        </p>
        <div className="hero-text mt-10 flex flex-col sm:flex-row gap-4">
          <button
            className="btn-magnetic px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3"
            style={{ backgroundColor: RED, color: "#fff" }}
          >
            <Calendar className="w-5 h-5" />
            Agendar una reuni&oacute;n
          </button>
          <button
            className="btn-magnetic backdrop-blur-md border px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: PAPER,
            }}
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
    "Cero Teor\u00eda",
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
            className="absolute w-[85%] p-4 flex items-center justify-between border border-black/10"
            style={{
              background: isTop ? "#fff" : isMiddle ? OFFWHITE : PAPER,
              fontFamily: MONO,
              fontSize: "0.75rem",
              fontWeight: isTop ? 700 : 400,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: BLACK,
              transform: `translateY(${isTop ? "0px" : isMiddle ? "16px" : "32px"}) scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9}) rotate(${isTop ? "-1deg" : isMiddle ? "2deg" : "-3deg"})`,
              opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
              zIndex: 3 - i,
              transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <span>{item}</span>
            <Activity className="w-4 h-4" style={{ color: RED }} />
          </div>
        );
      })}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState("");
  const fullText =
    "Integrando Google Suite...\nConectando Microsoft Office...\nAjustando a tu empresa...\n> Sistema Agn\u00f3stico Activo.";

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
      className="h-48 w-full p-5 flex flex-col relative overflow-hidden"
      style={{ backgroundColor: BLACK }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: RED }}
        ></div>
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: MONO, color: `${PAPER}80` }}
        >
          Live Feed
        </span>
      </div>
      <pre
        className="text-xs whitespace-pre-wrap leading-relaxed"
        style={{ fontFamily: MONO, color: `${PAPER}cc` }}
      >
        {text}
        <span
          className="inline-block w-2 h-3 ml-1 animate-pulse"
          style={{ backgroundColor: RED }}
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
          backgroundColor: RED,
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
      className="h-48 w-full p-5 relative border border-black/5 flex flex-col justify-between"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            ref={i === 3 ? dayRef : null}
            className="aspect-square flex items-center justify-center text-xs font-medium transition-colors"
            style={{
              fontFamily: MONO,
              backgroundColor:
                i === 3 && activeDay ? RED : OFFWHITE,
              color: i === 3 && activeDay ? "#fff" : `${BLACK}50`,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div
          ref={btnRef}
          className="text-[10px] uppercase tracking-wider px-4 py-2"
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            backgroundColor: BLACK,
            color: "#fff",
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
        <MousePointer2 className="w-5 h-5 text-black fill-white drop-shadow-md" />
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
          style={{ fontFamily: HEADING, color: BLACK }}
        >
          Aplicaci&oacute;n directa.
          <br />
          <span style={{ fontFamily: DRAMA, fontStyle: "italic", color: RED, fontWeight: 400 }}>
            Resultados reales.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div
          className="feature-card p-8 border border-black/10 flex flex-col"
          style={{ backgroundColor: OFFWHITE }}
        >
          <DiagnosticShuffler />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: HEADING }}
            >
              Experiencia Real
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${BLACK}b3` }}>
              Fundadores con experiencia aplicando AI en operaciones internas. No
              ofrecemos teor&iacute;a, sino aplicaci&oacute;n directa con resultados.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="feature-card p-8 border border-black/10 flex flex-col"
          style={{ backgroundColor: OFFWHITE }}
        >
          <TelemetryTypewriter />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: HEADING }}
            >
              Agn&oacute;sticos al Sistema
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${BLACK}b3` }}>
              Nos ajustamos a las circunstancias de tu empresa, ya sea Google
              Suite, Microsoft Office u otros ecosistemas.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="feature-card p-8 border border-black/10 flex flex-col"
          style={{ backgroundColor: OFFWHITE }}
        >
          <CursorProtocolScheduler />
          <div className="mt-8">
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: HEADING }}
            >
              Consultor&iacute;a Emp&aacute;tica
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: `${BLACK}b3` }}>
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
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden mx-4 md:mx-8 my-12"
      style={{ backgroundColor: BLACK }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div
          className="parallax-bg absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop")',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p
          className="phil-text text-lg md:text-2xl mb-8 max-w-2xl"
          style={{ color: `${PAPER}99` }}
        >
          La mayor&iacute;a de las consultoras se enfocan en: teor&iacute;a abstracta y
          soluciones predeterminadas &ldquo;out of the box&rdquo;.
        </p>
        <h2
          className="phil-text font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: HEADING, color: PAPER }}
        >
          Nosotros nos enfocamos en: <br />
          <span
            style={{
              fontFamily: DRAMA,
              fontStyle: "italic",
              color: RED,
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 8rem)",
            }}
          >
            empat&iacute;a y resultados.
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
      title: "Diagn\u00f3stico Profundo",
      desc: "Identificamos las preocupaciones reales de tu empresa antes de escribir una sola l\u00ednea de c\u00f3digo.",
      icon: (
        <Disc
          className="w-16 h-16"
          style={{
            color: RED,
            animation: "spin 10s linear infinite",
          }}
        />
      ),
    },
    {
      num: "02",
      title: "Prototipado \u00c1gil",
      desc: "Avanzamos en base a m\u00faltiples maquetas y MVPs. Ajustamos la soluci\u00f3n a tu ecosistema actual.",
      icon: (
        <ScanLine className="w-16 h-16 animate-pulse" style={{ color: RED }} />
      ),
    },
    {
      num: "03",
      title: "Implementaci\u00f3n a Medida",
      desc: "Despliegue de soluciones de IA que generan impacto directo en tus operaciones diarias.",
      icon: <Activity className="w-16 h-16" style={{ color: RED }} />,
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
          style={{ fontFamily: HEADING, color: BLACK }}
        >
          Nuestro{" "}
          <span style={{ fontFamily: DRAMA, fontStyle: "italic", fontWeight: 400, color: `${BLACK}cc` }}>
            Protocolo
          </span>
        </h2>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <div
            key={i}
            className="protocol-card h-[70vh] w-full border border-black/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between mb-8 origin-top shadow-xl"
            style={{ backgroundColor: "#fff", zIndex: i }}
          >
            <div className="flex-1">
              <span
                className="text-xl md:text-2xl mb-6 block"
                style={{ fontFamily: MONO, color: RED }}
              >
                [{step.num}]
              </span>
              <h3
                className="font-bold text-3xl md:text-5xl mb-6"
                style={{ fontFamily: HEADING, color: BLACK }}
              >
                {step.title}
              </h3>
              <p
                className="text-lg md:text-xl max-w-md leading-relaxed"
                style={{ color: `${BLACK}b3` }}
              >
                {step.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
              <div
                className="w-48 h-48 flex items-center justify-center shadow-inner relative overflow-hidden"
                style={{ backgroundColor: OFFWHITE }}
              >
                {step.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BrutalistFooter = () => {
  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-12 mt-24"
      style={{ backgroundColor: BLACK, color: PAPER }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2
            className="font-bold text-3xl mb-4"
            style={{ fontFamily: HEADING }}
          >
            New Era
          </h2>
          <p style={{ color: `${PAPER}99`, maxWidth: "24rem" }}>
            Dise&ntilde;amos e implementamos soluciones de Inteligencia Artificial a
            medida en tu empresa.
          </p>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: MONO, color: RED }}
          >
            Navegaci&oacute;n
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#features"
                className="transition-colors"
                style={{ color: `${PAPER}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PAPER}cc`)}
              >
                Soluciones
              </a>
            </li>
            <li>
              <a
                href="#philosophy"
                className="transition-colors"
                style={{ color: `${PAPER}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PAPER}cc`)}
              >
                Filosof&iacute;a
              </a>
            </li>
            <li>
              <a
                href="#protocol"
                className="transition-colors"
                style={{ color: `${PAPER}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PAPER}cc`)}
              >
                Protocolo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            className="text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: MONO, color: RED }}
          >
            Contacto
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#"
                className="transition-colors"
                style={{ color: `${PAPER}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PAPER}cc`)}
              >
                Agendar Reuni&oacute;n
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors"
                style={{ color: `${PAPER}cc` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${PAPER}cc`)}
              >
                Hablar con Agente AI
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: `1px solid ${PAPER}1a` }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2 border"
          style={{
            backgroundColor: `${PAPER}0d`,
            borderColor: `${PAPER}1a`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span
            className="text-xs uppercase tracking-wider"
            style={{ fontFamily: MONO, color: `${PAPER}b3` }}
          >
            System Operational
          </span>
        </div>
        <div
          className="text-xs"
          style={{ fontFamily: MONO, color: `${PAPER}66` }}
        >
          &copy; {new Date().getFullYear()} New Era Consultora AI. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────── PAGE ─────────────────────── */

export default function BrutalistSignalPage() {
  return (
    <>
      <style>{`
        .brutalist-page {
          --font-heading: 'Space Grotesk', sans-serif;
          --font-drama: 'DM Serif Display', serif;
          --font-mono: 'Space Mono', monospace;
          background-color: ${OFFWHITE};
          color: ${BLACK};
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
        }

        .brutalist-page .noise-overlay {
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

        .brutalist-page .btn-magnetic {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .brutalist-page .btn-magnetic:hover {
          transform: scale(1.03);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Scrollbar */
        .brutalist-page ::-webkit-scrollbar { width: 8px; }
        .brutalist-page ::-webkit-scrollbar-track { background: ${OFFWHITE}; }
        .brutalist-page ::-webkit-scrollbar-thumb { background: ${BLACK}; border-radius: 0; }
      `}</style>

      <div className="brutalist-page relative w-full min-h-screen -mt-14">
        <div className="noise-overlay"></div>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <BrutalistFooter />
      </div>
    </>
  );
}
