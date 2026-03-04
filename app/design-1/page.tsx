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

// --- Constants & Theme ---
const THEME = {
  moss: "#2E4036",
  clay: "#CC5833",
  cream: "#F2F0E9",
  charcoal: "#1A1A1A",
};

// --- Components ---

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
            'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop")',
        }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="flex flex-col text-[#F2F0E9]">
          <span className="hero-text font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2">
            La Inteligencia Artificial es la
          </span>
          <span className="hero-text font-drama italic text-7xl md:text-8xl lg:text-[140px] leading-[0.85] text-[#CC5833] pr-4">
            Evolución.
          </span>
        </h1>
        <p className="hero-text mt-8 max-w-xl text-[#F2F0E9]/80 font-sans text-lg md:text-xl leading-relaxed">
          Diseñamos e implementamos soluciones de Inteligencia Artificial a
          medida en tu empresa.
        </p>
        <div className="hero-text mt-10 flex flex-col sm:flex-row gap-4">
          <button className="btn-magnetic bg-[#CC5833] text-[#F2F0E9] px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3">
            <Calendar className="w-5 h-5" />
            Agendar una reunión
          </button>
          <button className="btn-magnetic bg-white/10 backdrop-blur-md border border-white/20 text-[#F2F0E9] px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition-colors">
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
            className="absolute w-[85%] bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${isTop ? "0px" : isMiddle ? "16px" : "32px"}) scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9})`,
              opacity: isTop ? 1 : isMiddle ? 0.7 : 0.4,
              zIndex: 3 - i,
            }}
          >
            <span className="font-mono text-xs font-medium text-[#2E4036] uppercase tracking-wider">
              {item}
            </span>
            <Activity className="w-4 h-4 text-[#CC5833]" />
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
    <div className="h-48 w-full bg-[#1A1A1A] rounded-2xl p-5 flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse"></div>
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <pre className="font-mono text-xs text-[#F2F0E9]/80 whitespace-pre-wrap leading-relaxed">
        {text}
        <span className="inline-block w-2 h-3 bg-[#CC5833] ml-1 animate-pulse"></span>
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

      // Reset
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 });
      tl.set(dayRef.current, { scale: 1, backgroundColor: "transparent" });
      tl.set(btnRef.current, { scale: 1 });

      // Enter
      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
        // Move to day
        .to(cursorRef.current, {
          x: 60,
          y: 40,
          duration: 0.8,
          ease: "power2.inOut",
        })
        // Click day
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(dayRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .add(() => setActiveDay(true))
        .to(dayRef.current, {
          backgroundColor: "#CC5833",
          color: "#fff",
          duration: 0.1,
        })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(dayRef.current, { scale: 1, duration: 0.1 }, "<")
        // Move to save
        .to(cursorRef.current, {
          x: 140,
          y: 100,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2,
        })
        // Click save
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(btnRef.current, { scale: 1, duration: 0.1 }, "<")
        // Exit
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .add(() => setActiveDay(false));
    });
    return () => ctx.revert();
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="h-48 w-full bg-white rounded-2xl p-5 relative border border-black/5 shadow-sm flex flex-col justify-between">
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            ref={i === 3 ? dayRef : null}
            className={`aspect-square rounded-md flex items-center justify-center text-xs font-mono font-medium transition-colors ${i === 3 && activeDay ? "bg-[#CC5833] text-white" : "bg-[#F2F0E9] text-[#1A1A1A]/50"}`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div
          ref={btnRef}
          className="bg-[#2E4036] text-white text-[10px] uppercase tracking-wider font-mono px-4 py-2 rounded-full"
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
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#1A1A1A] tracking-tight">
          Aplicación directa.
          <br />
          <span className="font-drama italic text-[#CC5833] font-normal">
            Resultados reales.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="feature-card bg-white rounded-[2rem] p-8 shadow-sm border border-black/5 flex flex-col">
          <DiagnosticShuffler />
          <div className="mt-8">
            <h3 className="font-heading font-bold text-xl mb-3">
              Experiencia Real
            </h3>
            <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
              Fundadores con experiencia aplicando AI en operaciones internas. No
              ofrecemos teoría, sino aplicación directa con resultados.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card bg-white rounded-[2rem] p-8 shadow-sm border border-black/5 flex flex-col">
          <TelemetryTypewriter />
          <div className="mt-8">
            <h3 className="font-heading font-bold text-xl mb-3">
              Agnósticos al Sistema
            </h3>
            <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
              Nos ajustamos a las circunstancias de tu empresa, ya sea Google
              Suite, Microsoft Office u otros ecosistemas.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card bg-white rounded-[2rem] p-8 shadow-sm border border-black/5 flex flex-col">
          <CursorProtocolScheduler />
          <div className="mt-8">
            <h3 className="font-heading font-bold text-xl mb-3">
              Consultoría Empática
            </h3>
            <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
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
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#1A1A1A] overflow-hidden rounded-[3rem] mx-4 md:mx-8 my-12"
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
        <p className="phil-text font-sans text-[#F2F0E9]/60 text-lg md:text-2xl mb-8 max-w-2xl">
          La mayoría de las consultoras se enfocan en: teoría abstracta y
          soluciones predeterminadas &ldquo;out of the box&rdquo;.
        </p>
        <h2 className="phil-text font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-[#F2F0E9] leading-tight">
          Nosotros nos enfocamos en: <br />
          <span className="font-drama italic text-[#CC5833] font-normal text-6xl md:text-8xl lg:text-9xl">
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
        <Disc className="w-16 h-16 text-[#CC5833] animate-[spin_10s_linear_infinite]" />
      ),
    },
    {
      num: "02",
      title: "Prototipado Ágil",
      desc: "Avanzamos en base a múltiples maquetas y MVPs. Ajustamos la solución a tu ecosistema actual.",
      icon: <ScanLine className="w-16 h-16 text-[#CC5833] animate-pulse" />,
    },
    {
      num: "03",
      title: "Implementación a Medida",
      desc: "Despliegue de soluciones de IA que generan impacto directo en tus operaciones diarias.",
      icon: <Activity className="w-16 h-16 text-[#CC5833]" />,
    },
  ];

  return (
    <section
      id="protocol"
      ref={containerRef}
      className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative"
    >
      <div className="mb-24 text-center">
        <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#1A1A1A]">
          Nuestro{" "}
          <span className="font-drama italic text-[#2E4036] font-normal">
            Protocolo
          </span>
        </h2>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <div
            key={i}
            className="protocol-card h-[70vh] w-full bg-white rounded-[3rem] shadow-xl border border-black/5 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between mb-8 origin-top"
            style={{ zIndex: i }}
          >
            <div className="flex-1">
              <span className="font-mono text-[#CC5833] text-xl md:text-2xl mb-6 block">
                [{step.num}]
              </span>
              <h3 className="font-heading font-bold text-3xl md:text-5xl text-[#1A1A1A] mb-6">
                {step.title}
              </h3>
              <p className="text-[#1A1A1A]/70 text-lg md:text-xl max-w-md leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
              <div className="w-48 h-48 rounded-full bg-[#F2F0E9] flex items-center justify-center shadow-inner relative overflow-hidden">
                {step.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const OrganicFooter = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#F2F0E9] pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem] mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2 className="font-heading font-bold text-3xl mb-4">New Era</h2>
          <p className="text-[#F2F0E9]/60 max-w-sm font-sans">
            Diseñamos e implementamos soluciones de Inteligencia Artificial a
            medida en tu empresa.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#CC5833] mb-6">
            Navegación
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a
                href="#features"
                className="hover:text-[#CC5833] transition-colors"
              >
                Soluciones
              </a>
            </li>
            <li>
              <a
                href="#philosophy"
                className="hover:text-[#CC5833] transition-colors"
              >
                Filosofía
              </a>
            </li>
            <li>
              <a
                href="#protocol"
                className="hover:text-[#CC5833] transition-colors"
              >
                Protocolo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#CC5833] mb-6">
            Contacto
          </h4>
          <ul className="space-y-4 font-medium text-sm">
            <li>
              <a href="#" className="hover:text-[#CC5833] transition-colors">
                Agendar Reunión
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#CC5833] transition-colors">
                Hablar con Agente AI
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-xs uppercase tracking-wider text-white/70">
            System Operational
          </span>
        </div>
        <div className="text-xs text-white/40 font-mono">
          © {new Date().getFullYear()} New Era Consultora AI. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Page ---

export default function OrganicTechPage() {
  return (
    <>
      <style>{`
        .organic-tech-page {
          --font-sans: "Plus Jakarta Sans", "Outfit", sans-serif;
          --font-heading: "Outfit", "Plus Jakarta Sans", sans-serif;
          --font-drama: "Cormorant Garamond", serif;
          --font-mono: "IBM Plex Mono", monospace;
          background-color: #F2F0E9;
          color: #1A1A1A;
        }
        .organic-tech-page .font-sans { font-family: var(--font-sans); }
        .organic-tech-page .font-heading { font-family: var(--font-heading); }
        .organic-tech-page .font-drama { font-family: var(--font-drama); }
        .organic-tech-page .font-mono { font-family: var(--font-mono); }

        .organic-tech-page .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.05;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        .organic-tech-page .btn-magnetic {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .organic-tech-page .btn-magnetic:hover {
          transform: scale(1.03);
        }

        .organic-tech-page .link-lift {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .organic-tech-page .link-lift:hover {
          transform: translateY(-1px);
        }

        /* Scrollbar */
        .organic-tech-page ::-webkit-scrollbar { width: 8px; }
        .organic-tech-page ::-webkit-scrollbar-track { background: #F2F0E9; }
        .organic-tech-page ::-webkit-scrollbar-thumb { background: #2E4036; border-radius: 4px; }
      `}</style>

      <div className="organic-tech-page relative w-full min-h-screen -mt-14">
        <div className="noise-overlay"></div>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <OrganicFooter />
      </div>
    </>
  );
}
