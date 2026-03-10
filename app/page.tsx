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
  Zap,
  Target,
  TrendingUp,
  Bot,
  BarChart3,
  Workflow,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
  Star,
  Menu,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Design Tokens ─── */
const DEEP_VOID = "#0A0A14";
const PLASMA = "#7B61FF";
const PLASMA_HOVER = "#6B4FEE";
const GHOST = "#F0EFF4";
const GRAPHITE = "#18181B";
const FONT_HEADING = "'Sora', sans-serif";
const FONT_DRAMA = "'Instrument Serif', serif";
const FONT_MONO = "'Fira Code', monospace";

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#hero", label: "Inicio" },
    { href: "#benefits", label: "Beneficios" },
    { href: "#services", label: "Servicios" },
    { href: "#protocol", label: "Proceso" },
    { href: "#portfolio", label: "Portafolio" },
    { href: "#testimonials", label: "Testimonios" },
  ];

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] h-16 lg:h-[72px] flex items-center transition-all duration-300"
        style={{
          background: scrolled ? `${DEEP_VOID}d9` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${GHOST}14` : "1px solid transparent",
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
            className="font-extrabold text-xl"
            style={{
              fontFamily: FONT_HEADING,
              background: `linear-gradient(135deg, ${PLASMA}, #c084fc)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            New Era
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
                className="text-sm font-medium uppercase tracking-wider transition-colors"
                style={{ color: `${GHOST}99` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}99`)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="#cta-final"
              onClick={(e) => { e.preventDefault(); handleClick("#cta-final"); }}
              className="text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${PLASMA}, #c084fc)` }}
            >
              Agendar Demo
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" style={{ color: GHOST }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: GHOST }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 transition-transform duration-400"
        style={{
          background: `${DEEP_VOID}f7`,
          backdropFilter: "blur(20px)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
            className="text-xl font-semibold transition-colors"
            style={{ color: GHOST }}
            onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
            onMouseLeave={(e) => (e.currentTarget.style.color = GHOST)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#cta-final"
          onClick={(e) => { e.preventDefault(); handleClick("#cta-final"); }}
          className="text-white font-semibold px-8 py-3 rounded-full mt-4"
          style={{ background: `linear-gradient(135deg, ${PLASMA}, #c084fc)` }}
        >
          Agendar Demo
        </a>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
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
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-12"
      style={{ paddingTop: "64px" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80")',
        }}
      />
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${DEEP_VOID} 0%, ${DEEP_VOID}ee 20%, ${DEEP_VOID}aa 45%, transparent 100%)`,
        }}
      />
      {/* Decorative glows */}
      <div
        className="absolute top-[-30%] right-[-20%] w-[700px] h-[700px] pointer-events-none z-[5]"
        style={{ background: `radial-gradient(circle, ${PLASMA}14 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="flex-1">
          {/* Badge */}
          <div
            className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: `${PLASMA}1a`, color: PLASMA }}
          >
            <Zap className="w-4 h-4" /> Consultoría IA de nueva generación
          </div>

          <h1 className="flex flex-col" style={{ color: GHOST }}>
            <span
              className="hero-text font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2"
              style={{ fontFamily: FONT_HEADING }}
            >
              La inteligencia artificial es la
            </span>
            <span
              className="hero-text italic text-7xl md:text-8xl lg:text-[140px] leading-[0.85] pr-4"
              style={{ fontFamily: FONT_DRAMA, color: PLASMA }}
            >
              evolución.
            </span>
          </h1>
          <p
            className="hero-text mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
            style={{ color: `${GHOST}cc` }}
          >
            Transformamos empresas con soluciones de IA estratégicas. Diagnóstico,
            implementación y optimización para acelerar tu crecimiento digital.
          </p>
          <div className="hero-text mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#cta-final"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#cta-final")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${PLASMA}, #c084fc)`, fontFamily: FONT_HEADING }}
            >
              <Calendar className="w-5 h-5" />
              Agendar una demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#protocol"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#protocol")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition-colors"
              style={{ color: GHOST, fontFamily: FONT_HEADING }}
            >
              Ver cómo funciona
            </a>
          </div>

          {/* Social proof mini */}
          <div className="hero-text mt-8 flex items-center gap-3" style={{ color: `${GHOST}99` }}>
            <div className="flex -space-x-2">
              {["MG", "AL", "CR"].map((initials, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                  style={{
                    borderColor: DEEP_VOID,
                    background: [PLASMA, "#c084fc", "#f472b6"][i],
                  }}
                >
                  {initials}
                </span>
              ))}
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                style={{ borderColor: DEEP_VOID, background: "#34d399" }}
              >
                +
              </span>
            </div>
            <span className="text-sm">Más de 80 empresas ya transformaron sus operaciones</span>
          </div>
        </div>

        {/* Hero visual (desktop) */}
        <div
          className="hidden lg:block flex-shrink-0 w-[400px] aspect-[4/3] rounded-3xl border relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${PLASMA}26, #c084fc1a)`,
            borderColor: `${GHOST}14`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${GHOST}08 1px, transparent 1px), linear-gradient(90deg, ${GHOST}08 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${PLASMA}33 0%, transparent 50%), radial-gradient(circle at 70% 60%, #c084fc26 0%, transparent 50%)`,
            }}
          />
          <span
            className="absolute bottom-6 left-6 text-sm opacity-60"
            style={{ fontFamily: FONT_MONO, color: PLASMA }}
          >
            {"// neural_network.init()"}
          </span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   SOCIAL PROOF
   ═══════════════════════════════════════════════ */

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sp-item", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const logos = ["Globex Corp", "Initech", "NovaTech", "DataPrime", "SynergyAI", "Vertex Labs", "OmniFlow", "Quantum Inc"];

  return (
    <section ref={ref} className="py-12" style={{ background: GRAPHITE }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <p
          className="text-center text-sm uppercase tracking-widest mb-8"
          style={{ color: `${GHOST}66`, fontFamily: FONT_MONO }}
        >
          Empresas que confían en nuestra metodología
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {logos.map((name) => (
            <span
              key={name}
              className="sp-item text-lg font-bold opacity-30 hover:opacity-60 transition-opacity whitespace-nowrap"
              style={{ color: GHOST }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   BENEFITS / VALUE PROP
   ═══════════════════════════════════════════════ */

const Benefits = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".benefit-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: <Target className="w-7 h-7" style={{ color: PLASMA }} />,
      title: "Diagnóstico estratégico",
      desc: "Mapeamos tus procesos para identificar exactamente dónde la IA multiplica tu productividad y reduce costos.",
    },
    {
      icon: <Zap className="w-7 h-7" style={{ color: PLASMA }} />,
      title: "Implementación ágil",
      desc: "De concepto a producción en semanas, no meses. Soluciones que se integran con tu stack tecnológico actual.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" style={{ color: PLASMA }} />,
      title: "ROI comprobado",
      desc: "Promedio de 3.5x retorno de inversión en el primer trimestre. Métricas reales, no promesas vacías.",
    },
  ];

  return (
    <section id="benefits" ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: DEEP_VOID }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span
            className="text-sm uppercase tracking-widest font-semibold block mb-2"
            style={{ color: PLASMA, fontFamily: FONT_MONO }}
          >
            ¿Por qué New Era?
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: FONT_HEADING, color: GHOST }}
          >
            Inteligencia artificial con{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
              propósito empresarial
            </span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            No vendemos tecnología por moda. Implementamos IA donde realmente genera impacto medible en tu operación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="benefit-card rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `${GHOST}05`,
                backdropFilter: "blur(12px)",
                border: `1px solid ${GHOST}14`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${PLASMA}4d`;
                e.currentTarget.style.boxShadow = `0 0 30px ${PLASMA}26`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${GHOST}14`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${PLASMA}1a` }}
              >
                {b.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: FONT_HEADING, color: GHOST }}
              >
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: `${GHOST}99` }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   FEATURES / INTERACTIVE CARDS
   ═══════════════════════════════════════════════ */

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
        setTimeout(() => { i = 0; }, 4000);
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
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PLASMA }} />
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
        <span className="inline-block w-2 h-3 ml-1 animate-pulse" style={{ background: PLASMA }} />
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
        .to(cursorRef.current, { x: 60, y: 40, duration: 0.8, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(dayRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .add(() => setActiveDay(true))
        .to(dayRef.current, { backgroundColor: PLASMA, color: "#fff", duration: 0.1 })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(dayRef.current, { scale: 1, duration: 0.1 }, "<")
        .to(cursorRef.current, { x: 140, y: 100, duration: 0.8, ease: "power2.inOut", delay: 0.2 })
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
      style={{ background: `${PLASMA}08`, border: `1px solid ${PLASMA}20` }}
    >
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            ref={i === 3 ? dayRef : null}
            className="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors"
            style={{
              fontFamily: FONT_MONO,
              background: i === 3 && activeDay ? PLASMA : `${PLASMA}15`,
              color: i === 3 && activeDay ? "white" : `${GHOST}70`,
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
          style={{ fontFamily: FONT_MONO, background: GRAPHITE }}
        >
          Agendar MVP
        </div>
      </div>
      <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none" style={{ transform: "translate(0,0)" }}>
        <MousePointer2 className="w-5 h-5 fill-white drop-shadow-md" style={{ color: PLASMA }} />
      </div>
    </div>
  );
};

const InteractiveFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
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
    <section ref={containerRef} className="py-24 md:py-32 px-6 lg:px-16 max-w-[1200px] mx-auto">
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
        <div className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col" style={{ background: GRAPHITE, border: `1px solid ${PLASMA}20` }}>
          <DiagnosticShuffler />
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-3" style={{ fontFamily: FONT_HEADING, color: GHOST }}>Experiencia Real</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Fundadores con experiencia aplicando AI en operaciones internas. No ofrecemos teoría, sino aplicación directa con resultados.
            </p>
          </div>
        </div>
        <div className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col" style={{ background: GRAPHITE, border: `1px solid ${PLASMA}20` }}>
          <TelemetryTypewriter />
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-3" style={{ fontFamily: FONT_HEADING, color: GHOST }}>Agnósticos al Sistema</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Nos ajustamos a las circunstancias de tu empresa, ya sea Google Suite, Microsoft Office u otros ecosistemas.
            </p>
          </div>
        </div>
        <div className="feature-card rounded-[2rem] p-8 shadow-sm flex flex-col" style={{ background: GRAPHITE, border: `1px solid ${PLASMA}20` }}>
          <CursorProtocolScheduler />
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-3" style={{ fontFamily: FONT_HEADING, color: GHOST }}>Consultoría Empática</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${GHOST}aa` }}>
              Avanzamos mediante prototipos y MVPs para identificar y solucionar todas las preocupaciones del cliente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   SERVICES (Alternating layout)
   ═══════════════════════════════════════════════ */

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".service-row").forEach((row) => {
        const el = row as HTMLElement;
        gsap.from(el.querySelectorAll(".service-content, .service-visual"), {
          scrollTrigger: { trigger: el, start: "top 75%" },
          x: (i) => (i === 0 ? -30 : 30),
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      tag: "Automatización",
      icon: <Bot className="w-12 h-12" style={{ color: PLASMA }} />,
      title: "Agentes de IA conversacionales",
      desc: "Desplegamos agentes inteligentes que atienden clientes, califican leads y gestionan procesos internos las 24 horas.",
      bullets: [
        "Integración con CRM y herramientas existentes",
        "Entrenamiento con tu base de conocimiento",
        "Escalación inteligente a equipo humano",
      ],
    },
    {
      tag: "Analytics",
      icon: <BarChart3 className="w-12 h-12" style={{ color: PLASMA }} />,
      title: "Inteligencia de datos predictiva",
      desc: "Convertimos tus datos en decisiones estratégicas con modelos de machine learning personalizados para tu industria.",
      bullets: [
        "Dashboards ejecutivos en tiempo real",
        "Predicción de demanda y churn",
        "Segmentación avanzada de clientes",
      ],
    },
    {
      tag: "Optimización",
      icon: <Workflow className="w-12 h-12" style={{ color: PLASMA }} />,
      title: "Workflows inteligentes",
      desc: "Rediseñamos procesos operativos integrando IA generativa para eliminar tareas repetitivas y liberar talento humano.",
      bullets: [
        "Automatización de documentos e informes",
        "Procesamiento inteligente de emails",
        "Flujos de aprobación con IA",
      ],
    },
  ];

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: GRAPHITE }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-20">
          <span
            className="text-sm uppercase tracking-widest font-semibold block mb-2"
            style={{ color: PLASMA, fontFamily: FONT_MONO }}
          >
            Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Soluciones IA para cada etapa de tu{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
              transformación
            </span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Desde automatización de procesos hasta modelos predictivos, cubrimos todo el espectro de la IA empresarial.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-row grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`service-content ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <span
                  className="text-sm uppercase tracking-widest font-semibold block mb-2"
                  style={{ color: PLASMA, fontFamily: FONT_MONO }}
                >
                  {s.tag}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
                  {s.title}
                </h3>
                <p className="mb-6 leading-relaxed" style={{ color: `${GHOST}99` }}>{s.desc}</p>
                <ul className="space-y-3">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-3" style={{ color: GHOST }}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: PLASMA }} />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`service-visual aspect-video rounded-2xl border relative overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${PLASMA}1a, #c084fc14)`,
                  borderColor: `${GHOST}14`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(${GHOST}05 1px, transparent 1px), linear-gradient(90deg, ${GHOST}05 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  {s.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   PHILOSOPHY
   ═══════════════════════════════════════════════ */

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
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
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
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden rounded-[3rem] mx-4 md:mx-8 my-12"
      style={{ background: GRAPHITE }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden opacity-15">
        <div
          className="parallax-bg absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop")',
          }}
        />
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20"
        style={{ background: PLASMA }}
      />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="phil-text text-lg md:text-2xl mb-8 max-w-2xl" style={{ color: `${GHOST}99` }}>
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

/* ═══════════════════════════════════════════════
   PROTOCOL (How it works)
   ═══════════════════════════════════════════════ */

const Protocol = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card") as HTMLElement[];
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
            opacity: 0,
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
      desc: "Auditamos tus procesos, datos y tecnología para identificar las oportunidades de mayor impacto con IA.",
      icon: <Disc className="w-16 h-16 animate-[spin_10s_linear_infinite]" style={{ color: PLASMA }} />,
    },
    {
      num: "02",
      title: "Prototipado Ágil",
      desc: "Desplegamos soluciones piloto rápidas, iteramos con tu equipo y escalamos lo que funciona.",
      icon: <ScanLine className="w-16 h-16 animate-pulse" style={{ color: PLASMA }} />,
    },
    {
      num: "03",
      title: "Implementación a Medida",
      desc: "Despliegue de soluciones de IA que generan impacto directo en tus operaciones diarias.",
      icon: <Activity className="w-16 h-16" style={{ color: PLASMA }} />,
    },
  ];

  return (
    <section id="protocol" ref={containerRef} className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative">
      <div className="mb-24 text-center">
        <span
          className="text-sm uppercase tracking-widest font-semibold block mb-4"
          style={{ color: PLASMA, fontFamily: FONT_MONO }}
        >
          Nuestro proceso
        </span>
        <h2
          className="font-bold text-4xl md:text-6xl"
          style={{ fontFamily: FONT_HEADING, color: GHOST }}
        >
          Tres fases para{" "}
          <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
            transformar tu empresa
          </span>
        </h2>
        <p className="mt-4 max-w-lg mx-auto" style={{ color: `${GHOST}99` }}>
          Un protocolo probado que minimiza riesgos y maximiza resultados desde el primer día.
        </p>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <div
            key={i}
            className="protocol-card h-[70vh] w-full rounded-[3rem] shadow-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between mb-8 origin-top"
            style={{ zIndex: i, background: GRAPHITE, border: `1px solid ${PLASMA}20` }}
          >
            <div className="flex-1">
              <span className="text-xl md:text-2xl mb-6 block" style={{ fontFamily: FONT_MONO, color: PLASMA }}>
                [{step.num}]
              </span>
              <h3 className="font-bold text-3xl md:text-5xl mb-6" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
                {step.title}
              </h3>
              <p className="text-lg md:text-xl max-w-md leading-relaxed" style={{ color: `${GHOST}aa` }}>
                {step.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden"
                style={{ background: DEEP_VOID }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: `inset 0 0 40px ${PLASMA}30, 0 0 30px ${PLASMA}15` }}
                />
                {step.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════ */

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Implementamos los agentes conversacionales de New Era hace 4 meses y nuestro equipo de ventas cerró un 180% más de demos. La mejor inversión tecnológica que hemos hecho.",
      name: "María González",
      role: "VP de Ventas, NovaTech",
      initials: "MG",
      color: PLASMA,
    },
    {
      quote: "El diagnóstico de New Era identificó ineficiencias que llevábamos años ignorando. En 6 semanas teníamos un sistema predictivo que redujo nuestros costos operativos en un 35%.",
      name: "Carlos Ruiz",
      role: "COO, DataPrime",
      initials: "CR",
      color: "#c084fc",
    },
    {
      quote: "Lo que diferencia a New Era es que no te venden tecnología por vender. Cada solución tiene un impacto medible y un ROI claro. Son consultores de verdad.",
      name: "Ana López",
      role: "CEO, SynergyAI",
      initials: "AL",
      color: "#f472b6",
    },
  ];

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: GRAPHITE }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Testimonios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Lo que dicen nuestros{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>clientes</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Resultados reales de empresas que transformaron sus operaciones con New Era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-8"
              style={{ background: `${GHOST}05`, backdropFilter: "blur(12px)", border: `1px solid ${GHOST}14` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400" style={{ color: "#f59e0b" }} />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed mb-6" style={{ color: GHOST }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <strong className="block text-sm" style={{ color: GHOST }}>{t.name}</strong>
                  <span className="text-xs" style={{ color: `${GHOST}99` }}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   CASE STUDIES / RESULTS
   ═══════════════════════════════════════════════ */

const CaseStudies = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cases = [
    {
      company: "NovaTech",
      sector: "Sector Fintech",
      metrics: [
        { value: "+240%", label: "Demos agendadas" },
        { value: "-60%", label: "Costo por lead" },
        { value: "3.8x", label: "ROI en 90 días" },
      ],
      quote: "New Era no solo implementó la tecnología, nos enseñó a pensar en términos de IA.",
    },
    {
      company: "Vertex Labs",
      sector: "Sector Logística",
      metrics: [
        { value: "-45%", label: "Tiempos de entrega" },
        { value: "+95%", label: "Precisión predictiva" },
        { value: "$2.3M", label: "Ahorro anual" },
      ],
      quote: "El modelo predictivo de demanda transformó completamente nuestra cadena de suministro.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: DEEP_VOID }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Casos de éxito
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Resultados que hablan{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>por sí solos</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Números reales de transformaciones impulsadas por nuestra metodología.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <div
              key={i}
              className="case-card rounded-[20px] p-8 md:p-10"
              style={{ background: `${GHOST}05`, backdropFilter: "blur(12px)", border: `1px solid ${GHOST}14` }}
            >
              <div className="text-lg font-bold mb-6" style={{ color: GHOST }}>
                {c.company} — <span style={{ color: `${GHOST}99` }}>{c.sector}</span>
              </div>
              <div className="flex flex-wrap gap-8 mb-6">
                {c.metrics.map((m, j) => (
                  <div key={j}>
                    <span
                      className="text-3xl md:text-4xl font-extrabold block leading-tight"
                      style={{
                        background: `linear-gradient(135deg, ${PLASMA}, #c084fc)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {m.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: `${GHOST}99` }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="italic border-l-[3px] pl-4 mb-4"
                style={{ borderColor: PLASMA, color: `${GHOST}99` }}
              >
                &ldquo;{c.quote}&rdquo;
              </p>
              <a href="#" className="text-sm font-semibold transition-colors" style={{ color: PLASMA }}>
                Leer caso completo <ArrowRight className="w-4 h-4 inline ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════ */

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-left > *", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".about-visual", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "80+", label: "Proyectos completados" },
    { value: "50+", label: "Empresas transformadas" },
    { value: "3.5x", label: "ROI promedio" },
  ];

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: GRAPHITE }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="about-left">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Nuestra historia
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Nacimos para cerrar la brecha entre la IA y el{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>
              negocio real
            </span>
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: `${GHOST}99` }}>
            New Era nació de una frustración: demasiadas empresas invirtiendo en tecnología sin estrategia y demasiados proveedores vendiendo soluciones genéricas. Decidimos cambiar eso.
          </p>
          <p className="mb-8 leading-relaxed" style={{ color: `${GHOST}99` }}>
            Nuestro equipo combina experiencia en consultoría estratégica con conocimiento técnico profundo en machine learning, NLP y sistemas de IA generativa. No solo construimos — acompañamos.
          </p>
          <div className="flex gap-8 md:gap-12">
            {stats.map((s, i) => (
              <div key={i}>
                <span
                  className="text-2xl md:text-3xl font-extrabold block"
                  style={{
                    background: `linear-gradient(135deg, ${PLASMA}, #c084fc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-xs" style={{ color: `${GHOST}99` }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="about-visual aspect-[4/3] rounded-2xl border relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${PLASMA}1e, #c084fc14)`,
            borderColor: `${GHOST}14`,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-8xl opacity-10"
            style={{ color: GHOST }}
          >
            ⟐
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   PORTFOLIO
   ═══════════════════════════════════════════════ */

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-item", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const filters = ["Todos", "Automatización", "Analytics", "Chatbots"];

  const projects = [
    { title: "Pipeline IA para Fintech", cat: "Automatización", gradient: `linear-gradient(135deg, ${PLASMA}, #6366f1)` },
    { title: "Chatbot Multicanal Retail", cat: "Chatbots", gradient: "linear-gradient(135deg, #c084fc, #a855f7)" },
    { title: "Predicción de Demanda Logística", cat: "Analytics", gradient: "linear-gradient(135deg, #f472b6, #ec4899)" },
    { title: "NLP para Análisis Legal", cat: "Analytics", gradient: "linear-gradient(135deg, #34d399, #10b981)" },
    { title: "Agente IA de Ventas B2B", cat: "Automatización", gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
    { title: "Dashboard Predictivo Healthcare", cat: "Analytics", gradient: "linear-gradient(135deg, #60a5fa, #3b82f6)" },
  ];

  const filtered = activeFilter === "Todos" ? projects : projects.filter((p) => p.cat === activeFilter);

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: DEEP_VOID }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-10">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Portafolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Proyectos que inspiran{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>confianza</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>Una selección de implementaciones exitosas en distintas industrias.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-all"
              style={{
                background: activeFilter === f ? `${PLASMA}1a` : "transparent",
                color: activeFilter === f ? PLASMA : `${GHOST}99`,
                borderColor: activeFilter === f ? `${PLASMA}4d` : `${GHOST}14`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="portfolio-item rounded-2xl overflow-hidden relative cursor-pointer group">
              <div className="aspect-[4/3] rounded-2xl border" style={{ background: p.gradient, borderColor: `${GHOST}14` }} />
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${DEEP_VOID}cc` }}
              >
                <h3 className="text-lg font-semibold mb-1" style={{ color: GHOST }}>{p.title}</h3>
                <span className="text-sm" style={{ color: PLASMA }}>{p.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   CTA FINAL
   ═══════════════════════════════════════════════ */

const CTAFinal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta-final"
      ref={ref}
      className="py-24 md:py-32 px-6 lg:px-16 text-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${PLASMA}, #c084fc)` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)" }}
      />
      <div className="cta-content relative z-10 max-w-[700px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: FONT_HEADING }}>
          ¿Listo para la nueva era de tu empresa?
        </h2>
        <p className="text-lg text-white/85 mb-8 max-w-[540px] mx-auto">
          Agenda una sesión de diagnóstico gratuita y descubre cómo la IA puede transformar tu operación en semanas.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ color: "#6366f1" }}
        >
          Agendar demo gratuita <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-sm text-white/70 mt-4">Sin compromiso · 30 minutos · 100% personalizado</p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   TEAM
   ═══════════════════════════════════════════════ */

const Team = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-member", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const members = [
    { name: "Ana García", role: "CEO & Fundadora", initials: "AG", gradient: `linear-gradient(135deg, ${PLASMA}, #6366f1)` },
    { name: "Carlos López", role: "CTO — Head of AI", initials: "CL", gradient: "linear-gradient(135deg, #c084fc, #a855f7)" },
    { name: "María Rodríguez", role: "Directora de Estrategia", initials: "MR", gradient: "linear-gradient(135deg, #f472b6, #ec4899)" },
    { name: "David Martín", role: "Lead ML Engineer", initials: "DM", gradient: "linear-gradient(135deg, #34d399, #10b981)" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: GRAPHITE }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Equipo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Las personas detrás de la{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>inteligencia</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Un equipo multidisciplinario que combina estrategia, tecnología y visión de negocio.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <div key={i} className="team-member text-center">
              <div
                className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: m.gradient }}
              >
                {m.initials}
              </div>
              <h3 className="font-semibold" style={{ color: GHOST }}>{m.name}</h3>
              <p className="text-sm" style={{ color: `${GHOST}99` }}>{m.role}</p>
              <div className="flex justify-center gap-3 mt-2">
                <a href="#" className="transition-colors" style={{ color: `${GHOST}99` }} onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)} onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}99`)}>
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="transition-colors" style={{ color: `${GHOST}99` }} onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)} onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}99`)}>
                  {i % 2 === 0 ? <Twitter className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   BLOG PREVIEW
   ═══════════════════════════════════════════════ */

const BlogPreview = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const posts = [
    {
      category: "Estrategia",
      title: "5 señales de que tu empresa necesita IA (y no lo sabe)",
      excerpt: "La mayoría de las empresas pierden oportunidades porque no reconocen los síntomas de procesos que podrían automatizarse.",
      date: "Feb 2026",
      read: "5 min lectura",
      gradient: `linear-gradient(135deg, ${PLASMA}, #6366f1)`,
    },
    {
      category: "Tecnología",
      title: "Agentes de IA vs. Chatbots: por qué la diferencia importa",
      excerpt: "Un chatbot responde preguntas. Un agente de IA toma decisiones, ejecuta acciones y aprende.",
      date: "Ene 2026",
      read: "7 min lectura",
      gradient: "linear-gradient(135deg, #c084fc, #a855f7)",
    },
    {
      category: "Casos de uso",
      title: "Cómo una fintech redujo 60% su costo por lead con IA",
      excerpt: "Análisis detallado de cómo implementamos un sistema de calificación inteligente de leads.",
      date: "Dic 2025",
      read: "8 min lectura",
      gradient: `linear-gradient(135deg, #f472b6, ${PLASMA})`,
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: DEEP_VOID }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Blog
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Perspectivas sobre{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>IA empresarial</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Artículos, guías y análisis para líderes que quieren entender y aplicar la IA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <div
              key={i}
              className="blog-card rounded-2xl overflow-hidden"
              style={{ background: `${GHOST}05`, border: `1px solid ${GHOST}14` }}
            >
              <div className="h-48 w-full" style={{ background: p.gradient }} />
              <div className="p-6">
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                  style={{ background: `${PLASMA}1a`, color: PLASMA }}
                >
                  {p.category}
                </span>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
                  {p.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: `${GHOST}99` }}>{p.excerpt}</p>
                <div className="flex gap-3 text-sm" style={{ color: `${GHOST}66` }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   CAREERS
   ═══════════════════════════════════════════════ */

const Careers = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-item", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const jobs = [
    { title: "Senior ML Engineer", tags: ["Remoto", "Full-time", "IA/ML"] },
    { title: "AI Solutions Consultant", tags: ["Híbrido", "Full-time", "Consultoría"] },
    { title: "Frontend Developer", tags: ["Remoto", "Full-time", "Desarrollo"] },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: GRAPHITE }}>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold block mb-2" style={{ color: PLASMA, fontFamily: FONT_MONO }}>
            Trabaja con nosotros
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Únete a la{" "}
            <span style={{ fontFamily: FONT_DRAMA, fontStyle: "italic", color: PLASMA, fontWeight: "normal" }}>nueva era</span>
          </h2>
          <p style={{ color: `${GHOST}99` }}>
            Buscamos mentes curiosas que quieran construir el futuro de la IA aplicada.
          </p>
        </div>

        <div>
          {jobs.map((j, i) => (
            <div
              key={i}
              className="career-item flex flex-wrap items-center justify-between gap-4 py-6"
              style={{ borderBottom: `1px solid ${GHOST}14` }}
            >
              <div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: FONT_HEADING, color: GHOST }}>{j.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${PLASMA}1a`, color: PLASMA }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-semibold px-6 py-2.5 rounded-full border transition-colors flex items-center gap-2"
                style={{ color: GHOST, borderColor: `${GHOST}14` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = PLASMA;
                  e.currentTarget.style.color = PLASMA;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${GHOST}14`;
                  e.currentTarget.style.color = GHOST;
                }}
              >
                Aplicar <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   LOCATION
   ═══════════════════════════════════════════════ */

const Location = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-left > *", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".loc-map", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-16" style={{ background: DEEP_VOID }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="loc-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: FONT_HEADING, color: GHOST }}>
            Encuéntranos
          </h2>
          <div className="flex items-start gap-3 mb-5">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: PLASMA }} />
            <p style={{ color: `${GHOST}99` }}>
              Av. Reforma 222, Piso 14<br />Col. Juárez, Ciudad de México<br />CP 06600
            </p>
          </div>
          <div className="flex items-start gap-3 mb-5">
            <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: PLASMA }} />
            <p style={{ color: `${GHOST}99` }}>+52 (55) 1234-5678</p>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: PLASMA }} />
            <p style={{ color: `${GHOST}99` }}>hola@newera.ai</p>
          </div>
        </div>
        <div
          className="loc-map aspect-[4/3] rounded-2xl border flex items-center justify-center text-lg"
          style={{ background: GRAPHITE, borderColor: `${GHOST}14`, color: `${GHOST}99` }}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: PLASMA }} />
            Mapa — Ciudad de México
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

const Footer = () => {
  return (
    <footer className="pt-24 pb-8 px-6 lg:px-16" style={{ background: GRAPHITE, color: GHOST }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span
              className="font-extrabold text-xl inline-block mb-2"
              style={{
                fontFamily: FONT_HEADING,
                background: `linear-gradient(135deg, ${PLASMA}, #c084fc)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              New Era
            </span>
            <p className="text-sm mb-4 max-w-[300px]" style={{ color: `${GHOST}99` }}>
              Consultoría de inteligencia artificial para empresas que quieren liderar la transformación digital.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: `${GHOST}14`, color: `${GHOST}99` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = PLASMA;
                    e.currentTarget.style.borderColor = `${PLASMA}4d`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${GHOST}99`;
                    e.currentTarget.style.borderColor = `${GHOST}14`;
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            {
              title: "Servicios",
              links: [
                { label: "Agentes IA", href: "#services" },
                { label: "Analytics Predictivo", href: "#services" },
                { label: "Workflows Inteligentes", href: "#services" },
                { label: "Nuestro Proceso", href: "#protocol" },
              ],
            },
            {
              title: "Empresa",
              links: [
                { label: "Sobre nosotros", href: "#about" },
                { label: "Blog", href: "#" },
                { label: "Trabaja con nosotros", href: "#" },
                { label: "Contacto", href: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Política de privacidad", href: "#" },
                { label: "Términos de servicio", href: "#" },
                { label: "Política de cookies", href: "#" },
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4
                className="text-xs uppercase tracking-widest mb-6 font-semibold"
                style={{ fontFamily: FONT_MONO, color: PLASMA }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: `${GHOST}cc` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = PLASMA)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${GHOST}cc`)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${GHOST}15` }}
        >
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full"
            style={{ background: `${GHOST}08`, border: `1px solid ${GHOST}15` }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider" style={{ fontFamily: FONT_MONO, color: `${GHOST}aa` }}>
              System Operational
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs" style={{ fontFamily: FONT_MONO, color: `${GHOST}66` }}>
            <span>&copy; {new Date().getFullYear()} New Era. Todos los derechos reservados.</span>
            <span>Hecho con inteligencia (artificial y humana)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <style>{`
        .new-era-page {
          --font-heading: ${FONT_HEADING};
          --font-drama: ${FONT_DRAMA};
          --font-mono: ${FONT_MONO};
          background-color: ${DEEP_VOID};
          color: ${GHOST};
        }

        .new-era-page .noise-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.04;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        /* Scrollbar */
        .new-era-page ::-webkit-scrollbar { width: 8px; }
        .new-era-page ::-webkit-scrollbar-track { background: ${DEEP_VOID}; }
        .new-era-page ::-webkit-scrollbar-thumb { background: ${PLASMA}; border-radius: 4px; }
      `}</style>

      <div className="new-era-page relative w-full min-h-screen">
        <div className="noise-overlay" />
        <Navbar />
        <Hero />
        <SocialProof />
        <Benefits />
        <InteractiveFeatures />
        <Services />
        <Philosophy />
        <Protocol />
        <Testimonials />
        <CaseStudies />
        <About />
        <Portfolio />
        <CTAFinal />
        <Team />
        <BlogPreview />
        <Careers />
        <Location />
        <Footer />
      </div>
    </>
  );
}
