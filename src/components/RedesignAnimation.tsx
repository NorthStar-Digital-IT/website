import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Smartphone, 
  Globe, 
  Lock, 
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

type Stage = "legacy" | "redesigning" | "optimized";

export function RedesignAnimation() {
  const [stage, setStage] = useState<Stage>("legacy");
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setStage((current) => {
        if (current === "legacy") return "redesigning";
        if (current === "redesigning") return "optimized";
        return "legacy";
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleStageChange = (newStage: Stage) => {
    setAutoPlay(false);
    setStage(newStage);
  };

  return (
    <div className="w-full bg-[#fafbff] border border-neutral-200/60 rounded-b-xl shadow-inner overflow-hidden text-left font-sans flex flex-col h-[350px] md:h-[420px] relative select-none" id="redesign-animation-container">
      
      {/* Top Banner indicating custom interactive demo status */}
      <div className="bg-[#0f172a] text-white px-4 py-1.5 text-xs font-mono flex justify-between items-center z-15 shrink-0 border-b border-white/5">
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-300">
          <Layers size={12} className="text-slate-400 animate-pulse" />
          Interactive Redesign Simulation
        </span>
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => handleStageChange("legacy")}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${stage === "legacy" ? "bg-red-500/80 text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            1. Legacy
          </button>
          <button 
            type="button"
            onClick={() => handleStageChange("redesigning")}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${stage === "redesigning" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            2. Rebuilding
          </button>
          <button 
            type="button"
            onClick={() => handleStageChange("optimized")}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${stage === "optimized" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            3. NorthStar
          </button>
        </div>
      </div>

      {/* Main Container Viewport */}
      <div className="flex-1 relative overflow-hidden bg-neutral-900/5">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: LEGACY */}
          {stage === "legacy" && (
            <motion.div
              key="legacy"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-5 flex flex-col justify-between bg-red-50/20"
            >
              {/* Desolate top bar */}
              <div className="border border-red-200 bg-red-100/90 text-red-900 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold gap-2 shadow-xs">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle size={15} className="text-red-600 animate-bounce" />
                  Warning: Core Web Vitals Critical Failures (Slow Load Time, Desecrated UI)
                </span>
                <span className="text-[10px] font-mono bg-red-200 px-1.5 py-0.5 rounded">F- Grade</span>
              </div>

              {/* Main obsolete simulated layout */}
              <div className="my-auto space-y-4 max-w-md mx-auto text-center">
                <h4 className="text-3xl font-serif text-[#aa0000] font-bold tracking-tight uppercase line-through decoration-black">
                  LAKESIDE DENTAL FM !!!
                </h4>
                <p className="text-[11px] text-neutral-500 font-serif leading-none italic max-w-xs mx-auto">
                  "WE OPEN 9 TO 5 ... PLS WRITE EMAIL US TO MAKE TIME FOR APPOINTMENT"
                </p>

                {/* Ugly components */}
                <div className="flex gap-2 justify-center pt-2">
                  <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-xs p-2.5 px-4 font-mono font-bold uppercase rounded-none border-4 border-red-500 animate-pulse cursor-not-allowed">
                    CLICK IF TOOTH HURTS
                  </button>
                  <button type="button" className="bg-yellow-500 text-neutral-900 text-xs p-2.5 px-3 font-mono font-normal rounded-none border border-neutral-600 cursor-not-allowed">
                    UGLY DEFAULT NAVIGATE BUTTON
                  </button>
                </div>
              </div>

              {/* Despair Stats Indicators Bottom Bar */}
              <div className="grid grid-cols-3 gap-3 border-t border-neutral-200/60 pt-4 pb-1">
                <div className="bg-white border border-red-100 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-450 block">Mobile Conversion</span>
                  <span className="text-sm font-extrabold text-red-600 font-mono">0.6%</span>
                </div>
                <div className="bg-white border border-red-100 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-450 block">Page Load Latency</span>
                  <span className="text-sm font-extrabold text-red-600 font-mono">5.2 Seconds</span>
                </div>
                <div className="bg-white border border-red-100 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-450 block">Map Placement</span>
                  <span className="text-xs font-bold text-red-500 font-mono">Page 4 (Hidden)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: REDESIGNING (With sweep lines and checklist) */}
          {stage === "redesigning" && (
            <motion.div
              key="redesigning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-5 bg-slate-950 text-white flex flex-col justify-between"
            >
              {/* Laser line effect */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent shadow-[0_0_15px_rgba(148,163,184,0.4)]"
                style={{ zIndex: 10 }}
                animate={{ top: ["5%", "95%", "5%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Redesigning Header status */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin text-slate-400" size={16} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    NorthStar Rendering Engine Active
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  Running rapid refactoring...
                </span>
              </div>

              {/* Terminal Logs check off animation */}
              <div className="flex-1 my-4 flex flex-col justify-center space-y-3 font-mono text-[11px] max-w-sm mx-auto w-full text-left">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={13} className="text-slate-400" />
                  <span className="text-slate-300">Cleaned legacy DOM structure...</span>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-1 py-0.1 border border-slate-800 rounded font-bold uppercase ml-auto">Fixed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={13} className="text-slate-400" />
                  <span className="text-slate-300">Refactored styles with premium Tailwind CSS...</span>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-1 py-0.1 border border-slate-800 rounded font-bold uppercase ml-auto">Fixed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Loader2 size={13} className="text-slate-400 animate-spin" />
                  <span className="text-white font-semibold flex items-center gap-1">Inlaying semantic modern layout tags...</span>
                  <span className="text-[10px] bg-slate-850 text-slate-300 px-1 py-0.1 border border-slate-700 rounded font-bold uppercase ml-auto animate-pulse">Engaged</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-40">
                  <span className="w-3 h-3 rounded-full border border-slate-650 inline-block" />
                  <span className="text-slate-400 font-sans">Compressing images and media...</span>
                </div>
              </div>

              {/* Status footer with specs */}
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-xs leading-none flex justify-between items-center text-slate-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <Cpu size={14} className="text-slate-400" />
                  <span>Optimizing Page Metrics...</span>
                </div>
                <span className="text-[10px] text-slate-400">TTFB: 18ms</span>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: MODERN MASTERPIECE */}
          {stage === "optimized" && (
            <motion.div
              key="optimized"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-5 flex flex-col justify-between bg-white text-slate-950"
            >
              {/* Premium Top Status Indicator */}
              <div className="border border-emerald-100 bg-emerald-50 text-emerald-850 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold shadow-xs">
                <span className="flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 size={15} className="text-emerald-600 animate-pulse" />
                  Asset Performance Audit: Verified Success (99 Score Masterpiece)
                </span>
                <span className="text-[10px] font-mono bg-emerald-200 text-emerald-950 px-1.5 py-0.5 rounded font-bold">A+ Score</span>
              </div>

              {/* Clean, high-crafted redesigned representation */}
              <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Left Side Redesigned Visual */}
                <div className="md:col-span-8 text-left space-y-2.5">
                  <div className="inline-flex gap-1 items-center px-2 py-0.5 bg-slate-100 text-slate-800 text-[9px] font-bold uppercase rounded-full font-mono tracking-widest leading-none">
                    <Sparkles size={10} /> Lakeside Dental Care
                  </div>
                  <h4 className="text-xl md:text-2xl font-display font-black text-slate-900 tracking-tight leading-none">
                    Redefining Modern Oral Health
                  </h4>
                  <p className="text-[11px] text-slate-550 font-sans max-w-sm leading-relaxed">
                    A customized dental clinic centered in Flower Mound providing same-day treatments and pristine, stress-free care.
                  </p>

                  <div className="flex gap-2 pt-1.5">
                    <button type="button" className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-xs">
                      <Calendar size={12} /> Schedule Online <ArrowRight size={10} />
                    </button>
                    <button type="button" className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold tracking-wider py-2 px-2.5 rounded-lg">
                      Explore Services
                    </button>
                  </div>
                </div>

                {/* Right Side Joy Card Indicators */}
                <div className="md:col-span-4 space-y-2 hidden md:block">
                  <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-xl shadow-xs text-left relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-1 opacity-10">
                      <TrendingUp size={30} className="text-emerald-700" />
                    </div>
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-800 block">Speed standing</span>
                    <span className="text-lg font-black text-emerald-950 font-mono tracking-tighter block mt-0.5">0.3s Instant</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl shadow-xs text-left relative overflow-hidden">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-500 block">Google Map standing</span>
                    <span className="text-xs font-bold text-slate-900 font-sans mt-0.5 block flex items-center gap-1">
                      👑 Rank #1 Flower Mound
                    </span>
                  </div>
                </div>

              </div>

              {/* Optimised Stats Bottom Bar */}
              <div className="grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4 pb-1">
                <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Mobile Score</span>
                  <span className="text-sm font-extrabold text-[#111] font-mono">100 / 100</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">SEO Integrity</span>
                  <span className="text-sm font-extrabold text-[#111] font-mono">99% Absolute</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Client Lead Multiplier</span>
                  <span className="text-xs font-extrabold text-emerald-700 font-mono">+185% Growth</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Manual toggle override indicator bars at the bottom */}
      <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-100/80 text-[10px] text-neutral-500 flex justify-between items-center font-mono shrink-0">
        <button 
          onClick={() => setAutoPlay(!autoPlay)}
          className="hover:text-neutral-800 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${autoPlay ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"}`} />
          {autoPlay ? "Click to Pause Loop" : "Click to Resume Loop"}
        </button>
        <span className="text-neutral-400">Designed with pixel perfection by NorthStar Digital</span>
      </div>

    </div>
  );
}
