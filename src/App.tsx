import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Laptop, 
  Search, 
  Bot, 
  Calendar, 
  Zap, 
  Smartphone, 
  Mail, 
  BarChart3, 
  MapPin, 
  Phone, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Menu, 
  X, 
  Sparkles, 
  ChevronRight,
  ChevronDown,
  Globe,
  Loader2,
  Bookmark,
  CheckCircle2,
  FileText
} from "lucide-react";

import { 
  DotPattern, 
  BorderBeam, 
  ShinyButton, 
  Marquee, 
  SafariMockup, 
  BlurFade 
} from "./components/MagicUI";
import { InteractiveAudit } from "./components/InteractiveAudit";
import { RedesignAnimation } from "./components/RedesignAnimation";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lead Strategy States
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadService, setLeadService] = useState("Website Redesign");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadStrategy, setLeadStrategy] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleStrategyRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) {
      setLeadError("Please provide your name and email address.");
      return;
    }

    setLeadLoading(true);
    setLeadError(null);
    setLeadStrategy(null);

    try {
      const response = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          service: leadService,
          message: leadMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to contact the strategic planning engine. Please check process.env.GEMINI_API_KEY in Settings.");
      }

      const data = await response.json();
      setLeadStrategy(data.strategyMarkdown);
    } catch (err: any) {
      console.error(err);
      setLeadError(err.message || "An unexpected error occurred while compiling your strategy report.");
    } finally {
      setLeadLoading(false);
    }
  };

  const services = [
    {
      id: "web-redesign",
      title: "Website Redesign",
      description: "Elevate your brand with high-performance, conversion-focused websites that capture your local Highland Village & Flower Mound audiences with pristine responsiveness.",
      icon: <Laptop className="text-[#00677f]" size={28} />,
      features: ["Responsive & Fast Layouts", "Built-in SEO Foundation", "Optimized Landing Pages"],
      isLarge: true,
    },
    {
      id: "local-seo",
      title: "Local SEO",
      description: "Dominate 'near me' organic searches on Google Maps across Denton County and Flower Mound.",
      icon: <Search className="text-[#00677f]" size={20} />,
    },
    {
      id: "ai-assistants",
      title: "AI Chat Assistants",
      description: "Intelligent, 24/7 custom-tailored automated support directly on your website to qualify leads.",
      icon: <Bot className="text-[#00677f]" size={20} />,
    },
    {
      id: "booking",
      title: "Booking Systems",
      description: "Integrated online scheduling frameworks tailored precisely for professional service providers.",
      icon: <Calendar className="text-[#00677f]" size={20} />,
    },
    {
      id: "speed-optimization",
      title: "Speed Optimization",
      description: "Radically decrease load times to exceed Google Core Web Vital expectations with pixel precision.",
      icon: <Zap className="text-[#00677f]" size={20} />,
    },
    {
      id: "mobile-first",
      title: "Mobile First",
      description: "Pristine, responsive design focused on tap-index targeting for optimal modern phone conversions.",
      icon: <Smartphone className="text-[#00677f]" size={20} />,
    },
    {
      id: "email-automation",
      title: "Email Automation",
      description: "Drip campaigns and automated sequences to nurture prospects while you manage your operational flow.",
      icon: <Mail className="text-[#00677f]" size={20} />,
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "High-integrity telemetry dashboards mapping consumer funnel events and conversion bottlenecks.",
      icon: <BarChart3 className="text-[#00677f]" size={20} />,
    },
  ];

  const clientReviews = [
    { name: "Clinch River Dental", role: "Orthodontist practice", text: "Organic client appointments rose 43% within the first 60 days of launching our local SEO campaign." },
    { name: "Lakeside Grill & Bar", role: "Local eatery", text: "Stunning web redesign and custom online ordering system reduced third-party delivery fees dramatically." },
    { name: "Elite Wellness Clinic", role: "Health spa provider", text: "The AI appointment qualifier and booking system works 24/7. It booked 11 new leads this weekend alone." },
    { name: "Flower Mound Legal", role: "Attorneys-at-law", text: "Excellent mobile responsiveness. NorthStar Digital understood exactly how to represent our law firm locally." },
    { name: "Highland Boutique Store", role: "Luxury retailer", text: "Strategic consultation helped us optimize our Google Business Profile and capture the Lakeside DFW market beautifully." }
  ];

  const trustBadges = [
    "Google Analytics 4 Certified",
    "Tailwind CSS Professional Guild",
    "Flower Mound Chamber of Commerce",
    "Gemini Pro AI Partner Services",
    "Framer Motion Certified Solutions",
    "Core Web Vitals Optimized Agency",
    "Lakeside DFW Local Tech Innovator"
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen relative overflow-x-hidden">
      
      {/* Background Dots */}
      <DotPattern width={24} height={24} className="opacity-50" />

      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-20 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          {/* Logo Brand Side-by-Side Centered */}
          <div className="flex items-center gap-3 relative py-1">
            <div className="w-12 h-12 relative overflow-hidden shrink-0 flex items-center justify-center select-none pointer-events-none">
              <img 
                alt="NorthStar Digital Compass Logo" 
                className="absolute max-w-none h-[180%] w-auto top-[-10%] left-1/2 -translate-x-1/2" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0RdPbFSc769fw4EmZZvIr18StVXEOLrgyUKoHDrRIoXD5JRhE2u2D8yPRLr2nm-4wWi-Gn9WALOqu7PJIciO2wxay1kMV9envlGmXRsJ2UEI62Dl3er1JjT9ifhWQ_ikjAQJE9R2GshtFt7sle61Lw-nTxOpJStwmVAcHZlrES3jgc0aC0TbTX93bu6WvpB5PviFU-wB_IcFKW4VoTVUdVZ7upQ0IdTHfS9wKK1drjOEshYaRlJYCKlfeV6EjOG2VXHyhoTvwFz4I"
              />
            </div>
            <span className="font-display font-extrabold text-xl md:text-2xl text-slate-900 tracking-tight">
              NorthStar Digital
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all">
              Services
            </a>
            <a href="#audit-analyzer" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all">
              AI Audit
            </a>
            <a href="#industries" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all">
              Industries
            </a>
            <ShinyButton onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              Free Audit
            </ShinyButton>
          </nav>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-md transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-md md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5 text-left">
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-900 py-2 border-b border-slate-100"
              >
                Services
              </a>
              <a 
                href="#audit-analyzer" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-900 py-2 border-b border-slate-100"
              >
                AI Audit
              </a>
              <a 
                href="#industries" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-900 py-2 border-b border-slate-100"
              >
                Industries
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold text-xs uppercase tracking-wider"
              >
                Get Free Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 md:pt-24 pb-20 md:pb-32 overflow-hidden px-6" id="hero">
          {/* Ambient glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-slate-200/40 blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-12 right-12 w-96 h-96 rounded-full bg-slate-300/10 blur-[120px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Text Content */}
            <div className="md:col-span-6 text-left relative z-10">
              <BlurFade delay={0.1}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-800 text-xs font-mono font-bold uppercase rounded-full tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-705 animate-pulse" /> Local Authority Growth
                </span>
              </BlurFade>

              <BlurFade delay={0.25}>
                <h1 className="font-display font-extrabold text-slate-950 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                  Modernize Your <br />
                  <span className="text-slate-800 font-black">Digital Authority</span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.4}>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-6 mb-10 max-w-lg">
                  Strategic Web Design, Local SEO, and Custom AI Automation specifically engineered for Flower Mound & Highland Village businesses seeking persistent growth, high conversion layouts, and digital authority.
                </p>
              </BlurFade>

              <BlurFade delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ShinyButton 
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto text-center"
                  >
                    Request Strategy Audit
                  </ShinyButton>
                  <button 
                    onClick={() => {
                      const el = document.getElementById("audit-analyzer");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto border border-slate-350 hover:bg-slate-100 text-slate-800 rounded-lg px-6 py-3 font-semibold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Analyze My Website
                  </button>
                </div>
              </BlurFade>
            </div>

            {/* Visual Laptop Mockup Wrapper with Safari frame */}
            <div className="md:col-span-6 relative">
              <BlurFade delay={0.45}>
                <div className="scale-95 lg:scale-100 hover:rotate-1 transition-transform duration-500">
                  <SafariMockup url="rebrand.northstardigital.com">
                    <RedesignAnimation />
                  </SafariMockup>
                </div>
              </BlurFade>
            </div>

          </div>
        </section>

        {/* TRUST BADGE MARQUEE */}
        <section className="bg-white py-6 border-y border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold block mb-4">
              Integrated Platforms & Industry Certification Standards
            </span>
            <Marquee pauseOnHover={true}>
              {trustBadges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="inline-flex items-center gap-1.5 px-4 py-2 mx-2 rounded-full border border-slate-100 bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <ShieldCheck size={14} className="text-slate-705" />
                  {badge}
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* SERVICES SECTION (Bento Style Layout) */}
        <section className="py-20 md:py-32 px-6 bg-slate-100/50" id="services">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-505 font-mono block mb-3">
                Precision Service Ecosystem
              </span>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
                Comprehensive Digital Solutions
              </h2>
              <p className="text-slate-605 mt-4 text-sm md:text-base font-sans">
                Precision-engineered local services planned carefully to navigate the complexities of local growth and digital authority.
              </p>
            </div>

            {/* Services Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className={`relative p-6 md:p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-[#111] flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${
                    svc.isLarge ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                  }`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-slate-900 group-hover:opacity-10 transition-opacity">
                    <Sparkles size={50} />
                  </div>

                  <div>
                    {/* SVG Icon representation */}
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-xl w-fit mb-6 group-hover:scale-105 transition-transform duration-300">
                      {svc.icon}
                    </div>

                    <h3 className={`font-display font-bold text-slate-900 ${
                      svc.isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"
                    } tracking-tight`}>
                      {svc.title}
                    </h3>
                    
                    <p className={`text-slate-600 font-sans mt-3 font-normal leading-relaxed ${
                      svc.isLarge ? "text-xs md:text-sm" : "text-xs"
                    }`}>
                      {svc.description}
                    </p>

                    {svc.features && (
                      <ul className="mt-8 space-y-2 text-xs font-semibold text-left">
                        {svc.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2.5 text-slate-800">
                            <span className="p-0.5 rounded-full bg-slate-50 text-slate-700 block border border-slate-200">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 hidden group-hover:flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span>Learn more</span> 
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* AI WEBSITE AUDIT TOOL SECTION (Dynamic and Real-Time Powered) */}
        <section className="py-20 md:py-32 bg-white px-6 border-y border-slate-200/80" id="audit-analyzer">
          <div className="max-w-7xl mx-auto">
            <InteractiveAudit />
          </div>
        </section>

        {/* EXPERTISE ACROSS SECTORS (Industries) */}
        <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden px-6" id="industries">
          {/* Subtle noise layer pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-cover pointer-events-none pointer" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
              <div className="max-w-xl">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block mb-3">
                  North Texas Industry Alignment
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight text-slate-100">
                  Domain Expertise Across Local Sectors
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                  We understand the unique operational, competitive, and organic requirements of brick-and-mortar local commerce across Denton County and surrounding suburbs.
                </p>
              </div>
            </div>

            {/* Sector Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { name: "Dentists", icon: <Bot size={24} />, delay: 0 },
                { name: "Restaurants", icon: <Laptop size={24} />, delay: 0.1 },
                { name: "Wellness Clinics", icon: <Smartphone size={24} />, delay: 0.2 },
                { name: "Coffee Shops", icon: <Zap size={24} />, delay: 0.3 },
                { name: "Bars & Bistro", icon: <Search size={24} />, delay: 0.4 },
                { name: "Local Retail", icon: <Mail size={24} />, delay: 0.5 },
              ].map((ind, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, backgroundColor: "#0f172a" }}
                  className="p-6 text-center border border-white/10 rounded-xl hover:border-slate-400 transition-all cursor-pointer bg-white/5 active:scale-95"
                >
                  <div className="text-slate-400 mb-4 flex justify-center">
                    {ind.icon}
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-200">
                    {ind.name}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </section>



        {/* FEEDBACK REVIEWS MARQUEE */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/35 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 font-mono block mb-2">
              Highland Village & Flower Mound Partnerships
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
              Verified Local Outcomes
            </h3>
          </div>
          <Marquee reverse={true}>
            {clientReviews.map((rev, index) => (
              <div 
                key={index} 
                className="bg-white p-5 border border-slate-200 rounded-xl w-80 shrink-0 shadow-sm mx-3 flex flex-col justify-between text-left select-none relative whitespace-normal break-words"
              >
                <p className="text-xs text-slate-600 italic leading-relaxed whitespace-normal break-words block">
                  "{rev.text}"
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase">{rev.role}</span>
                </div>
              </div>
            ))}
          </Marquee>
        </section>



        {/* CONTACT SECTION (With real AI Strategy Proposal Generation) */}
        <section className="py-20 md:py-32 bg-white px-6" id="contact">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
              
              {/* Left Contact Elements */}
              <div className="lg:col-span-4 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600 font-mono block mb-3">
                  Initiate Alignment
                </span>
                <h2 className="font-display font-extrabold text-slate-950 text-3xl tracking-tight">
                  Start Your Journey
                </h2>
                <p className="text-slate-600 text-sm mt-3 mb-10 max-w-sm">
                  Ready to modernize? Let's discuss your custom digital strategy audit over a localized coffee in Flower Mound.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-lg">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">HQ Office</h4>
                      <p className="text-xs text-slate-605 mt-1">Lakeside DFW, Flower Mound, TX 75022</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-lg">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Business Inquiries</h4>
                      <p className="text-xs text-slate-605 mt-1">hello@northstardigital.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-slate-100 text-slate-800 rounded-lg">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Direct Hotline</h4>
                      <p className="text-xs text-slate-605 mt-1">(972) 555-0123</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Strategy Form */}
              <div className="lg:col-span-8">
                <div className="glass-panel p-6 md:p-10 rounded-2xl shadow-xl bg-white border border-slate-200 relative overflow-hidden">
                  
                  {/* Real-time strategy response display overlay */}
                  <AnimatePresence>
                    {leadStrategy ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="absolute inset-0 bg-white/95 z-25 p-6 md:p-10 text-left overflow-y-auto"
                      >
                        <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-100">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-slate-700" />
                            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-slate-900">
                              AI Strategic Proposal Generated
                            </h3>
                          </div>
                          <button
                            onClick={() => {
                              setLeadStrategy(null);
                              setLeadName("");
                              setLeadEmail("");
                              setLeadMessage("");
                            }}
                            className="text-xs font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-250 hover:text-slate-900 rounded-md transition-colors cursor-pointer"
                          >
                            New Form Submittal
                          </button>
                        </div>

                        {/* Proposal Markdown renderer placeholder */}
                        <div className="prose prose-xs max-w-none text-slate-600 text-xs leading-relaxed space-y-4 font-sans">
                          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-250 rounded-lg flex items-start gap-2.5 mb-4">
                            <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold">Form Submitted Successfully!</p>
                              <p className="mt-0.5 leading-relaxed text-[11px] text-emerald-700">One of our North Texas web strategists will reach out to schedule your coffee alignment. Here is your immediate, machine-compiled strategy map:</p>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg font-sans border border-slate-200 mt-2 whitespace-pre-wrap leading-relaxed whitespace-pre-line text-[11.5px] text-slate-800">
                            {leadStrategy}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <h3 className="font-display font-bold text-xl text-slate-900 text-left mb-6">
                    Request Bespoke Strategy Proposal
                  </h3>

                  <form onSubmit={handleStrategyRequest} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Full Name</label>
                        <input 
                          className="w-full border-0 border-b border-slate-300 hover:border-slate-500 p-2.5 focus:ring-0 focus:border-slate-805 transition-all bg-transparent font-sans" 
                          id="name" 
                          type="text" 
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="John Doe" 
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Business Email</label>
                        <input 
                          className="w-full border-0 border-b border-slate-300 hover:border-slate-500 p-2.5 focus:ring-0 focus:border-slate-805 transition-all bg-transparent font-sans" 
                          id="email" 
                          type="email" 
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="john@company.com" 
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Interested in</label>
                      <select 
                        className="w-full border-0 border-b border-slate-300 p-2.5 focus:ring-0 focus:border-slate-805 transition-all bg-transparent font-sans cursor-pointer text-slate-600" 
                        id="service"
                        value={leadService}
                        onChange={(e) => setLeadService(e.target.value)}
                      >
                        <option>Website Redesign</option>
                        <option>Local SEO & Map Standing</option>
                        <option>AI Chat Assistance Integration</option>
                        <option>Core Page Speed Optimization</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Tell us about your project</label>
                      <textarea 
                        className="w-full border-0 border-b border-slate-300 hover:border-slate-500 p-2.5 focus:ring-0 focus:border-slate-805 transition-all bg-transparent font-sans" 
                        id="message" 
                        rows={3} 
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder="Share any details about your business goals, target audience, or current bottlenecks..." 
                      />
                    </div>

                    {leadError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg font-sans">
                        {leadError}
                      </div>
                    )}

                    <ShinyButton 
                      type="submit" 
                      disabled={leadLoading}
                      className="w-full uppercase tracking-widest font-mono text-xs"
                    >
                      {leadLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={14} />
                          Formulating strategic plan...
                        </>
                      ) : (
                        "Send Strategy Request"
                      )}
                    </ShinyButton>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white relative border-t border-slate-900">
        <DotPattern className="opacity-[0.03]" width={24} height={24} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-900">
          
          <div className="space-y-4">
            <h3 className="font-display font-black text-slate-105 text-xl tracking-wide">
              NorthStar Digital
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-xs">
              Strategic Consulting for Flower Mound & Highlands. Elevating local brick-and-mortar commerce through conversational AI designs and high conversion speed layouts.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Services
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Organic Geo-SEO</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Client AI Solutions</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Performance Tuning</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Company
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li><a href="#industries" className="hover:text-white transition-colors">Industries Alignment</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#audit-analyzer" className="hover:text-white transition-colors">Free Analytics Audit</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              North Texas Care
            </h5>
            <p className="text-xs text-slate-405 font-sans">
              Flower Mound, TX 75022 <br />
              hello@northstardigital.com
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 font-sans">
            © 2026 NorthStar Digital. All rights reserved. Strategic Local Solutions.
          </p>
          
          <div className="flex gap-4 items-center text-[10px] text-slate-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Engagement</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
