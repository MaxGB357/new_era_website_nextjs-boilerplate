"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const SCENE_URL =
  "https://prod.spline.design/iGPLjOiD0fjgA6nv/scene.splinecode";

// Dynamic import with ssr: false to prevent Next.js hydration errors
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

function shouldLoadSpline(): boolean {
  if (typeof window === "undefined") return false;
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 2;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  return !isMobile && !isLowEnd && !!gl;
}

export default function Spline3DPage() {
  const [loaded, setLoaded] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setCanLoad(shouldLoadSpline());
  }, []);

  // 8-second timeout fallback per Spline Skill best practices
  useEffect(() => {
    if (!canLoad) return;
    const timeout = setTimeout(() => {
      if (!loaded) setTimedOut(true);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [canLoad, loaded]);

  const showSpline = canLoad && !timedOut;

  return (
    <>
      <style>{`
        .spline-page { background: #0a0a0a; }
        .spline-page canvas { display: block; }
      `}</style>

      <div className="spline-page -mt-14">
        {/* Hero — full viewport */}
        <section className="relative w-full" style={{ height: "100dvh" }}>
          {/* Fallback background — always rendered underneath */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)",
              opacity: loaded ? 0 : 1,
              transition: "opacity 0.8s ease",
            }}
          >
            {!loaded && canLoad && !timedOut && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80"
                />
                <span className="text-sm text-white/50 font-mono">
                  Cargando escena 3D...
                </span>
              </div>
            )}
          </div>

          {/* Spline 3D scene */}
          {showSpline && (
            <Spline
              scene={SCENE_URL}
              onLoad={() => setLoaded(true)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
          )}

          {/* Fallback for mobile / low-end / timeout */}
          {!showSpline && (
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop")',
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )}

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-16 md:px-12 md:pb-24">
            <div className="mx-auto max-w-7xl">
              <p
                className="mb-2 text-xs uppercase tracking-[0.3em] text-white/50"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Experiencia 3D Interactiva
              </p>
              <h1
                className="text-4xl font-bold text-white md:text-6xl lg:text-7xl"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                New Era
              </h1>
              <p
                className="mt-4 max-w-lg text-lg text-white/70"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Consultoría de tecnología y transformación digital con
                Inteligencia Artificial.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
