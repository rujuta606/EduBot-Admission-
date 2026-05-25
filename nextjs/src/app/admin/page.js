"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const [allLeads, setAllLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [streamFilter, setStreamFilter] = useState("All");
  const [escFilter, setEscFilter] = useState("All");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch leads from Next.js api endpoint
  const loadLeads = async () => {
    setIsError(false);
    try {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to load leads");
      }
      const data = await response.json();
      setAllLeads(data);
    } catch (error) {
      console.error("Dashboard load error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Mount logic & loop refresh interval (30 seconds)
  useEffect(() => {
    loadLeads();
    const interval = setInterval(loadLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter leads based on user query states
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = allLeads.filter(lead => {
      // Text Match
      const nameMatch = (lead.name || "").toLowerCase().includes(query);
      const phoneMatch = (lead.phone || "").includes(query);
      const textMatch = nameMatch || phoneMatch;

      // Stream Match
      let streamMatch = true;
      if (streamFilter !== "All") {
        streamMatch = lead.stream === streamFilter;
      }

      // Status Match
      let escMatch = true;
      if (escFilter === "Escalated") {
        escMatch = lead.escalated === true;
      } else if (escFilter === "Normal") {
        escMatch = lead.escalated !== true;
      }

      return textMatch && streamMatch && escMatch;
    });

    setFilteredLeads(filtered);
  }, [allLeads, searchQuery, streamFilter, escFilter]);

  // Compute live stats during rendering
  const totalCount = allLeads.length;
  const engCount = allLeads.filter(l => l.stream === "Engineering").length;
  const medCount = allLeads.filter(l => l.stream === "Medical").length;
  const diplCount = allLeads.filter(l => l.stream === "Diploma").length;
  const escCount = allLeads.filter(l => l.escalated === true).length;

  // Format timestamp helper (Indian standard locale format)
  const formatTime = (ts) => {
    try {
      const date = new Date(ts);
      if (isNaN(date.getTime())) return "—";
      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return "—";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 relative">
      {/* Subtle Mesh Background Blobs */}
      <div className="mesh-container opacity-18">
        <div className="blob blob-blue"></div>
        <div className="blob blob-purple"></div>
      </div>

      {/* Header Panel (Sticky) */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/[0.05] h-20 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 text-primary border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight"><span className="text-white">EduBot</span> <span className="text-primary">Admin</span></h1>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mt-0.5">Lead Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-xs text-white/40">Auto-refresh: 30s</span>
          <button onClick={loadLeads} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/80 text-white text-xs font-bold rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 duration-150">
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Refresh</span>
          </button>
          <Link href="/" className="text-xs font-bold text-white/60 hover:text-white transition-colors">&larr; Back to Site</Link>
        </div>
      </header>

      {/* Content Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 space-y-8 animate-pop-in">
        
        {/* Metric Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Card 1: Total Leads */}
          <div className="glass-dark rounded-2xl p-6 transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Total Leads</p>
            <p className="text-3xl font-black text-white mt-3">{totalCount}</p>
            <p className="text-[10px] text-white/30 mt-1.5">Consolidated query records</p>
          </div>

          {/* Card 2: Engineering */}
          <div className="glass-dark rounded-2xl p-6 transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Engineering</p>
            <p className="text-3xl font-black text-primary mt-3">{engCount}</p>
            <p className="text-[10px] text-white/40 mt-1.5">TNEA students</p>
          </div>

          {/* Card 3: Medical */}
          <div className="glass-dark rounded-2xl p-6 transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Medical</p>
            <p className="text-3xl font-black text-[#a855f7] mt-3">{medCount}</p>
            <p className="text-[10px] text-white/40 mt-1.5">NEET students</p>
          </div>

          {/* Card 3b: Diploma */}
          <div className="glass-dark rounded-2xl p-6 transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Diploma</p>
            <p className="text-3xl font-black text-[#10b981] mt-3">{diplCount}</p>
            <p className="text-[10px] text-white/40 mt-1.5">Polytechnic students</p>
          </div>

          {/* Card 4: Escalated */}
          <div className="glass-dark rounded-2xl p-6 transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Escalated</p>
            <p className="text-3xl font-black text-yellow-400 mt-3">{escCount}</p>
            <p className="text-[10px] text-white/40 mt-1.5">Need human follow-up</p>
          </div>
        </section>

        {/* Filters Controls Row */}
        <section className="flex flex-col md:flex-row gap-4 items-stretch justify-between">
          <div className="flex-grow max-w-md relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name or phone number..." 
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-primary/50 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/50 focus:outline-none" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Stream Filter */}
            <select 
              value={streamFilter} 
              onChange={(e) => setStreamFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#0f172a]">All Streams</option>
              <option value="Engineering" className="bg-[#0f172a]">Engineering</option>
              <option value="Medical" className="bg-[#0f172a]">Medical</option>
              <option value="Diploma" className="bg-[#0f172a]">Diploma</option>
            </select>

            {/* Status Filter */}
            <select 
              value={escFilter} 
              onChange={(e) => setEscFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#0f172a]">All Status</option>
              <option value="Escalated" className="bg-[#0f172a]">Escalated Only</option>
              <option value="Normal" className="bg-[#0f172a]">Normal Only</option>
            </select>
          </div>
        </section>

        {/* Leads Table Container */}
        <section className="glass-dark rounded-2xl border border-white/[0.05] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white">Student Leads</h3>
            <span className="bg-white/[0.08] text-white/80 px-3 py-1 rounded-full text-xs font-semibold">
              {filteredLeads.length} {filteredLeads.length === 1 ? "Lead" : "Leads"}
            </span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/40 text-xs font-semibold">Loading dashboard data...</p>
            </div>
          )}

          {/* Error Offline State */}
          {!isLoading && isError && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center max-w-md mx-auto px-6 select-none animate-pop-in">
              <div className="w-16 h-16 bg-red-500/10 rounded-full border border-red-500/20 flex items-center justify-center text-red-400">
                <span className="material-symbols-outlined text-[36px]">warning</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold text-base">Server Offline</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Unable to connect to the backend server. Verify the server is running on <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white font-mono">http://localhost:5000</code>.
                </p>
              </div>
              <div className="w-full text-left bg-black/40 rounded-xl p-4 border border-white/[0.05] space-y-2 select-all">
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Start Command</p>
                <code className="text-xs text-green-400 font-mono block">cd backend<br />npm run dev</code>
              </div>
              <button onClick={loadLeads} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-transform duration-150">
                <span className="material-symbols-outlined text-[16px]">refresh</span> Retry Connection
              </button>
            </div>
          )}

          {/* Empty Records State */}
          {!isLoading && !isError && allLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center select-none animate-pop-in">
              <div className="w-16 h-16 bg-white/[0.03] rounded-full border border-white/[0.05] flex items-center justify-center text-white/30">
                <span className="material-symbols-outlined text-[36px]">inbox</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-base">No Leads Saved</h4>
                <p className="text-white/40 text-xs mt-1">Student details will reflect here once processed by Kavin.</p>
              </div>
              <Link href="/chat" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-transform duration-150">
                Open Chatbot <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          )}

          {/* Table populated content */}
          {!isLoading && !isError && allLeads.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.05] text-white/50 text-xs font-bold uppercase tracking-wider select-none">
                    <th className="p-4">#</th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Stream</th>
                    <th className="p-4">Cutoff</th>
                    <th className="p-4">Dept / Course</th>
                    <th className="p-4">Colleges Suggested</th>
                    <th className="p-4">Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03] text-sm text-white/80">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-6 text-center text-white/30 font-medium">
                        No records match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((l, index) => {
                      const streamClass = l.stream === "Engineering"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : l.stream === "Medical"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : l.stream === "Diploma"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-white/10 text-white/60 border border-white/20";
                      
                      return (
                        <tr key={index} className="hover:bg-white/[0.02] transition-colors duration-100">
                          <td className="p-4 font-semibold text-white/30">{index + 1}</td>
                          <td className="p-4 font-bold text-white">{l.name || "N/A"}</td>
                          <td className="p-4 font-mono text-white/70">{l.phone || "N/A"}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${streamClass}`}>
                              {l.stream || "N/A"}
                            </span>
                          </td>
                          <td className="p-4 font-extrabold text-white">{l.cutoff || "—"}</td>
                          <td className="p-4 max-w-[180px] truncate text-white/70" title={l.deptOrCourse || ""}>
                            {l.deptOrCourse || "—"}
                          </td>
                          <td className="p-4 max-w-[200px] truncate text-white/70" title={l.colleges || ""}>
                            {l.colleges || "—"}
                          </td>
                          <td className="p-4 text-white/70 font-medium">{l.slot || "—"}</td>
                          <td className="p-4">
                            {l.escalated ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                <span className="material-symbols-outlined text-[14px]">warning</span> ESCALATED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                OK
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-xs font-medium text-white/40 whitespace-nowrap">
                            {formatTime(l.timestamp)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
