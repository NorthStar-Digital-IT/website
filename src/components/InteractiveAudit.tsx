import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AuditResult, CriticalIssue } from "../types";
import { 
  Sparkles, 
  Globe, 
  Loader2, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  Compass, 
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";
import { ShinyButton, BorderBeam } from "./MagicUI";

export function InteractiveAudit() {
  const [url, setUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Local Service");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "scores" | "issues" | "recommendations">("summary");

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !businessName) {
      setError("Please fill out both Business Name and URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setAuditResult(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, businessName, businessType }),
      });

      if (!response.ok) {
        throw new Error("Unable to contact the audit intelligence engine. Check that you have configured GEMINI_API_KEY in Secrets.");
      }

      const result: AuditResult = await response.json();
      setAuditResult(result);
      setActiveTab("scores");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while analyzing your presence.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-populate standard samples for low-friction test
  const loadSample = (sampleUrl: string, sampleName: string, sampleType: string) => {
    setUrl(sampleUrl);
    setBusinessName(sampleName);
    setBusinessType(sampleType);
    setError(null);
  };

  return (
    <div className="relative bg-white border border-neutral-200/70 p-8 md:p-16 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full max-w-7xl mx-auto" id="audit-tool-container">
      <BorderBeam duration={10} size={300} colorFrom="#1e293b" colorTo="#64748b" />
      
      {/* Decorative floating icon */}
      <div className="absolute top-8 right-8 text-neutral-200/10 pointer-events-none">
        <Sparkles size={160} />
      </div>

      <div className="w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono rounded-full mb-4 uppercase tracking-wider font-semibold">
            <Sparkles size={14} className="animate-spin-slow text-slate-500" /> Real-Time Intelligence Engine
          </div>
          <h3 className="font-display text-3xl md:text-4xl text-[#0f172a] font-extrabold tracking-tight">
            Analyze Your Local Competitiveness Instantly
          </h3>
          <p className="text-slate-500 text-sm md:text-base mt-2.5 max-w-2xl mx-auto font-sans">
            Get an instant website analysis and target conversion diagnosis benchmarked directly against active businesses in Flower Mound and Highland Village.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRunAudit} className="space-y-4 mb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Business Name</label>
              <input
                className="w-full bg-slate-50/50 hover:bg-slate-100/55 transition-colors border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 focus:outline-hidden rounded-lg p-3 text-sm shadow-xs"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Lakeside Dental"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Website Address (URL)</label>
              <input
                className="w-full bg-slate-50/50 hover:bg-slate-100/55 transition-colors border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 focus:outline-hidden rounded-lg p-3 text-sm shadow-xs"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. lakesidedentalfm.com"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Business Category</label>
              <select
                className="w-full bg-slate-50/50 hover:bg-slate-100/55 transition-colors border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 focus:outline-hidden rounded-lg p-3 text-sm cursor-pointer shadow-xs"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="Medical/Dental Practice">Medical / Dental Practice</option>
                <option value="Restaurant/Café">Restaurant / Café / Bar</option>
                <option value="Home & Professional Services">Home & Professional Services</option>
                <option value="Retail Boutique">Retail Boutique</option>
                <option value="Fitness & Wellness Studio">Fitness & Wellness Studio</option>
                <option value="Other Service Provider">Other Business</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Sample presets for instant testing */}
            <div className="flex flex-wrap gap-2 items-center text-xs text-slate-500">
              <span className="font-semibold">Quick Test:</span>
              <button
                type="button"
                onClick={() => loadSample("lakesiddentalfm.example.com", "Lakeside Medical Clinic", "Medical Practice")}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-150 text-slate-700 transition-colors rounded-md text-[11px] font-medium"
              >
                Dentistry Sample
              </button>
              <button
                type="button"
                onClick={() => loadSample("flowermoundcafe.example.com", "Highland Bistro", "Restaurant/Café")}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-150 text-slate-700 transition-colors rounded-md text-[11px] font-medium"
              >
                Café Sample
              </button>
            </div>

            <ShinyButton
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={16} />
                  Analyzing Digital Assets...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-white" />
                  Generate AI Website Audit
                </>
              )}
            </ShinyButton>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs text-left mb-6 flex gap-3 items-start shadow-sm"
          >
            <AlertTriangle className="text-red-500 shrink-0 select-none" size={18} />
            <div>
              <p className="font-bold">Audit Request Unsuccessful</p>
              <p className="mt-1 leading-relaxed">{error}</p>
              <p className="mt-2 text-[10px] text-red-600 font-mono">
                💡 TIP: Make sure process.env.GEMINI_API_KEY is configured in the Secrets manager of your AI Studio environment.
              </p>
            </div>
          </motion.div>
        )}

        {/* Audit Results Dashboard */}
        <AnimatePresence>
          {auditResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 text-left mt-8 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 mb-5 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Analysis complete for</span>
                  <h4 className="font-bold text-lg text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Globe size={18} className="text-slate-600" /> {auditResult.seoScore > 0 ? businessName : "Calculated Report"}
                  </h4>
                </div>
                <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full font-mono flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Flower Mound Market Index Verified
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-1.5 border-b border-slate-200 pb-3 mb-6 overflow-x-auto scroller-hidden">
                <button
                  type="button"
                  onClick={() => setActiveTab("scores")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer shrink-0 ${
                    activeTab === "scores"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Gauges & Scores
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer shrink-0 ${
                    activeTab === "summary"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Executive Brief
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("issues")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer shrink-0 ${
                    activeTab === "issues"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Critical Deficits ({auditResult.criticalIssues.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("recommendations")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer shrink-0 ${
                    activeTab === "recommendations"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Organic Action Plan
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[220px]">
                {/* 1. Scores Grid */}
                {activeTab === "scores" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {/* Score Item 1 */}
                    <div className="bg-white border border-slate-150 rounded-xl p-5 text-center relative flex flex-col justify-between shadow-xs overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900" />
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">SEO Score</span>
                      <div className="my-3 flex items-baseline justify-center">
                        <span className="text-4xl font-extrabold text-slate-900 font-mono">{auditResult.seoScore}</span>
                        <span className="text-slate-400 text-xs font-mono ml-0.5">/100</span>
                      </div>
                      <span className="text-xs text-slate-600 font-medium">
                        {auditResult.seoScore > 80 ? "✅ Healthy organic visibility" : "⚠️ Local optimization gap detected"}
                      </span>
                    </div>

                    {/* Score Item 2 */}
                    <div className="bg-white border border-slate-150 rounded-xl p-5 text-center relative flex flex-col justify-between shadow-xs overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600" />
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Performance Index</span>
                      <div className="my-3 flex items-baseline justify-center">
                        <span className="text-4xl font-extrabold text-slate-900 font-mono">{auditResult.performanceScore}</span>
                        <span className="text-slate-400 text-xs font-mono ml-0.5">/100</span>
                      </div>
                      <span className="text-xs text-slate-600 font-medium">
                        {auditResult.performanceScore > 85 ? "🚀 High Core Web Vitals" : "🐢 Resource inflation/heavy elements"}
                      </span>
                    </div>

                    {/* Score Item 3 */}
                    <div className="bg-white border border-slate-150 rounded-xl p-5 text-center relative flex flex-col justify-between shadow-xs overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-500" />
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Design & UX</span>
                      <div className="my-3 flex items-baseline justify-center">
                        <span className="text-4xl font-extrabold text-slate-900 font-mono">{auditResult.designScore}</span>
                        <span className="text-slate-400 text-xs font-mono ml-0.5">/100</span>
                      </div>
                      <span className="text-xs text-slate-600 font-medium">
                        {auditResult.designScore > 80 ? "📱 Native responsive mobile view" : "🧐 CTA & conversion paths can improve"}
                      </span>
                    </div>

                    {/* Combined Score Visual Bar */}
                    <div className="sm:col-span-3 bg-white border border-slate-200 p-5 rounded-xl mt-1 text-sm shadow-xs">
                      <span className="font-bold text-xs text-slate-800 block mb-2 font-mono">NorthStar Overall Standing Estimate & Benchmark</span>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-slate-800 h-full" style={{ width: `${auditResult.seoScore}%` }} />
                        <div className="bg-emerald-600 h-full opacity-70" style={{ width: `${auditResult.performanceScore / 3}%` }} />
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs text-slate-500 font-mono">
                        <span>Low Authority (Urgent Help)</span>
                        <span className="font-bold text-slate-800">Weighted standing: {Math.round((auditResult.seoScore + auditResult.performanceScore + auditResult.designScore) / 3)}%</span>
                        <span>High Authority (Market Leader)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Executive Summary */}
                {activeTab === "summary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
                      <h5 className="text-xs font-bold uppercase text-slate-850 tracking-wider mb-2 font-mono">Competitive Market Opportunity</h5>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans mt-1">
                        {auditResult.summary}
                      </p>
                    </div>

                    <div className="bg-slate-100/50 border border-slate-200 rounded-xl p-5">
                      <h5 className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5 mb-1.5 font-mono">
                        <Compass className="text-slate-700" size={14} /> Highland Village & Flower Mound SEO Briefing
                      </h5>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
                        {auditResult.localSeoBrief}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 3. Critical Issues */}
                {activeTab === "issues" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {auditResult.criticalIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-150 rounded-xl p-5 shadow-xs flex gap-4"
                      >
                        <div className="shrink-0 mt-0.5">
                          {issue.severity === "High" ? (
                            <ShieldAlert className="text-red-500" size={20} />
                          ) : issue.severity === "Medium" ? (
                            <AlertTriangle className="text-amber-500" size={20} />
                          ) : (
                            <Info className="text-slate-500" size={20} />
                          )}
                        </div>
                        <div className="space-y-2 w-full">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-xs md:text-sm text-slate-900">{issue.title}</span>
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono ${
                                issue.severity === "High"
                                  ? "bg-red-50 text-red-600 border border-red-200"
                                  : issue.severity === "Medium"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-slate-50 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {issue.severity} priority
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                            {issue.description}
                          </p>
                          <div className="bg-slate-50 border border-slate-150 p-3 text-xs rounded-lg text-slate-700 mt-2 font-sans">
                            <strong className="text-slate-900 font-bold block mb-1">Recommended Resolution:</strong>
                            {issue.howToFix}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 4. Key Recommendations */}
                {activeTab === "recommendations" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-xs text-slate-500 mb-2 font-mono">
                      Implement these organic adjustments to immediately capture higher placement on local North Texas search results.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {auditResult.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-150 rounded-lg p-3 shadow-xs flex gap-2.5 items-start"
                        >
                          <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className="text-xs text-slate-600 font-sans leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-xl mt-5 flex flex-col md:flex-row justify-between items-center gap-4 border border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Exclusive Local Offer</span>
                        <h6 className="font-bold text-sm mt-0.5">Need help performing these optimizations?</h6>
                        <p className="text-xs text-slate-400 mt-1 max-w-md">Get a free, no-obligation deep-dive technical strategy session with our dental and medical software engineers.</p>
                      </div>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-xs"
                      >
                        Claim Strategy Session <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
