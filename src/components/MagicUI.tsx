import React, { useId, useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

// DotPattern renders a customizable background overlay of repeating dots.
interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}
export function DotPattern({
  className = "",
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 -z-10 h-full w-full fill-neutral-400/20 [mask-image:radial-gradient(ellipse_at_center,white_80%,transparent)] ${className}`}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

// BorderBeam creates a light laser-beam effect rotating around parent container
interface BorderBeamProps {
  duration?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
}
export function BorderBeam({
  duration = 8,
  size = 150,
  colorFrom = "#00677f",
  colorTo = "#00d2ff",
}: BorderBeamProps) {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
      <div
        className="absolute animate-border-beam"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent, transparent)`,
          filter: "blur(8px)",
          top: "-50%",
          left: "-50%",
          "--beam-duration": `${duration}s`,
        } as React.CSSProperties}
      />
    </div>
  );
}

// ShinyButton contains continuous glitter/shine sweep and spring-based scales
interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export function ShinyButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ShinyButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`relative overflow-hidden group font-medium rounded-lg text-sm px-6 py-3 text-center transition-all duration-300 shadow-md ${className}`}
    >
      {/* Background slate shine gradient */}
      <div className="absolute inset-x-0 -top-px -bottom-px rounded-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 opacity-95 group-hover:opacity-100 transition-opacity" />
      
      {/* Moving glass sweep - Optimized using GPU-accelerated x (translateX) instead of left */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
        initial={{ x: "-120%" }}
        animate={{ x: "320%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
        {children}
      </span>
    </motion.button>
  );
}

// Marquee loops items horizontally indefinitely - Optimized using GPU-accelerated CSS animations
interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden flex w-full relative group ${className}`}>
      {/* Left/Right masks for smooth aesthetic fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex shrink-0 gap-6 py-4 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// SafariMockup encapsulates screenshots or visual assets beautifully inside a realistic Mac Safari iframe/container.
interface SafariMockupProps {
  children: React.ReactNode;
  url?: string;
}
export function SafariMockup({ children, url = "northstardigital.com" }: SafariMockupProps) {
  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white shadow-xl overflow-hidden text-left hover:shadow-2xl transition-all duration-300">
      {/* Browser top-bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
        {/* Buttons indicators */}
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        </div>
        
        {/* Address representation tab */}
        <div className="w-1/2 bg-neutral-100/80 rounded-md py-1 px-3 text-xs text-neutral-500 font-mono text-center flex items-center justify-center gap-1">
          <span className="text-emerald-600 text-[10px] font-bold">🔒</span> {url}
        </div>

        {/* Action icons placeholders */}
        <div className="flex gap-1.5 opacity-40">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block" />
        </div>
      </div>

      {/* Frame canvas viewport contents */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// BlurFade causes dynamic scrolling/stagger trigger elements
interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}
export function BlurFade({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: BlurFadeProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(6px)",
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
