"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";

const THEME = {
  red: "#d4252a",
  redDark: "#a91d21",
  black: "#000000",
  charcoal: "#0a0a0a",
  grayLight: "#cecece",
  grayHeading: "#e0e0e0",
  white: "#ffffff",
};

export default function DemoMtcPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".mtc-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".mtc-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".mtc-divider",
          {
            scaleX: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .from(
          ".mtc-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Pulse animation on the arrow indicator
      gsap.to(".mtc-pulse", {
        scale: 1.2,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mtc-demo-page"
      style={{
        minHeight: "100dvh",
        background: `linear-gradient(135deg, ${THEME.black} 0%, ${THEME.charcoal} 50%, #1a0a0a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        color: THEME.white,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${THEME.red}15 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        {/* Logo / Brand badge */}
        <div
          className="mtc-title"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: `${THEME.red}18`,
            border: `1px solid ${THEME.red}40`,
            borderRadius: "999px",
            padding: "0.5rem 1.25rem",
            marginBottom: "2rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: THEME.red,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: THEME.red,
              display: "inline-block",
            }}
          />
          mtc.cl
        </div>

        <h1
          className="mtc-title"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Demo Agente{" "}
          <span style={{ color: THEME.red }}>Conversacional</span>
        </h1>

        <p
          className="mtc-subtitle"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: THEME.grayLight,
            lineHeight: 1.6,
            marginBottom: "2.5rem",
            maxWidth: "550px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Interactúa con nuestro agente de inteligencia artificial.
          Haz clic en el ícono de chat para comenzar la conversación.
        </p>

        <div
          className="mtc-divider"
          style={{
            width: "80px",
            height: "3px",
            background: `linear-gradient(90deg, ${THEME.red}, ${THEME.redDark})`,
            margin: "0 auto 2.5rem",
            borderRadius: "2px",
            transformOrigin: "center",
          }}
        />

        {/* CTA pointing to widget */}
        <div
          className="mtc-cta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            color: THEME.grayHeading,
            fontSize: "0.95rem",
          }}
        >
          <MessageCircle size={20} color={THEME.red} />
          <span>
            El asistente está disponible en la esquina inferior derecha
          </span>
          <span className="mtc-pulse" style={{ display: "inline-flex" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={THEME.red}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${THEME.red}, transparent)`,
        }}
      />
    </div>
  );
}
