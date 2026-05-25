"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// NOTE: metadata must be in a server component; we set the title via document.title in useEffect instead

export default function Chat() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [banners, setBanners] = useState([]);
  const [isEscalated, setIsEscalated] = useState(false);

  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll scrollbar to bottom
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [history, isWaiting]);

  // Dispatch 400ms delayed welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeText = `Vanakkam! I'm Kavin, your AI Admission Counsellor for Tamil Nadu.

I can help you with:
- TNEA Engineering cutoff calculation and college matching
- NEET Medical college matching and course selection
- Diploma and Polytechnic admissions after 10th
- Choosing the right 11th group after 10th standard
- Complete guidance if you are not sure what to do next
- Top 3 college recommendations with department details
- Booking a free counselling call

Tell me — which stream are you interested in? Engineering, Medical, Diploma after 10th, choosing 11th group, or not sure yet?`;
      
      setHistory([{ role: "assistant", content: welcomeText }]);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Handle textarea height resize
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  // Dispatch Chat to Next.js API Route
  const handleSend = async () => {
    const text = message.trim();
    if (!text || isWaiting) return;

    setIsWaiting(true);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Append user message
    const updatedHistory = [...history, { role: "user", content: text }];
    setHistory(updatedHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: history // pass chat history context
        })
      });

      if (!response.ok) {
        throw new Error("API Connection failed");
      }

      const data = await response.json();

      // Append assistant reply
      setHistory(prev => [...prev, { role: "assistant", content: data.reply }]);

      // Check lead capture status
      if (data.leadCaptured) {
        const id = Date.now();
        const lead = data.leadData || {};
        setBanners(prev => [...prev, {
          id,
          type: "lead",
          content: `Lead saved! ${lead.name || "Student"} — ${lead.stream || "Admission"} | Slot: ${lead.slot || "TBD"}`
        }]);
        // Remove lead captured banner after 8 seconds
        setTimeout(() => {
          setBanners(prev => prev.filter(b => b.id !== id));
        }, 8000);
      }

      // Check human escalation status
      if (data.escalated) {
        setIsEscalated(true);
        const id = Date.now();
        setBanners(prev => [...prev, {
          id,
          type: "escalated",
          content: "Session Escalated — Yellow Alert. A human advisor has been requested."
        }]);
      }

    } catch (error) {
      console.error("Chat fetch error:", error);
      setHistory(prev => [...prev, { 
        role: "assistant", 
        content: "⚠️ Connection Error: I couldn't reach the admission server. Please check if the backend is running at http://localhost:5000." 
      }]);
    } finally {
      setIsWaiting(false);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removeBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface text-on-surface">
      {/* Soft Mesh Background Blobs */}
      <div className="mesh-container opacity-25">
        <div className="blob blob-blue"></div>
        <div className="blob blob-purple"></div>
        <div className="blob blob-teal"></div>
      </div>

      {/* Header: Fixed Top style */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-[#e0e3e5] px-6 flex items-center justify-between z-40 shadow-sm select-none">
        <div className="flex items-center gap-3">
          {/* Back Arrow */}
          <Link href="/" className="text-on-surface hover:text-primary transition-all duration-150 flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 active:scale-90" title="Back to Home">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
          
          {/* Kavin Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-inner flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
          </div>
          
          {/* User Info */}
          <div>
            <h2 className="font-extrabold text-sm text-on-surface">Kavin</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* Pulse Dot */}
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEscalated ? "bg-amber-400" : "bg-green-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isEscalated ? "bg-amber-500" : "bg-green-500"}`}></span>
              </span>
              <span className={`text-[11px] font-semibold ${isEscalated ? "text-amber-600" : "text-on-surface-variant"}`}>
                {isEscalated ? "Escalated to human counsellor" : "AI Admission Counsellor · Online"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Book Call link */}
        <Link href="/contact" className="text-sm font-bold text-primary hover:text-secondary hover:underline transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">event_available</span>
          <span>Book Call</span>
        </Link>
      </header>

      {/* Banners Container */}
      <div className="fixed top-[72px] left-0 right-0 px-6 py-3 max-w-3xl mx-auto z-30 space-y-2 pointer-events-none">
        {banners.map((b) => (
          <div 
            key={b.id} 
            className={`pointer-events-auto border p-4 rounded-xl flex items-center gap-3 text-sm shadow-md animate-slide-in ${
              b.type === "lead" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {b.type === "lead" ? "check_circle" : "support_agent"}
            </span>
            <div className="flex-grow">
              {b.type === "lead" ? <strong>Lead saved!</strong> : <strong>Session Escalated</strong>} — {b.content.replace(/^Lead saved!|^Session Escalated/, "").trim()}
            </div>
            <button className="font-bold hover:opacity-85" onClick={() => removeBanner(b.id)}>✕</button>
          </div>
        ))}
      </div>

      {/* Chat Area Scroll Container */}
      <main 
        ref={chatWindowRef}
        className="flex-grow overflow-y-auto pt-[88px] pb-[136px] px-6 max-w-3xl w-full mx-auto scroll-smooth chat-scroll"
      >
        <div className="space-y-6 pt-4">
          {history.map((m, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-3 animate-pop-in ${
                m.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {/* Bot Avatar on Left */}
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 select-none">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`p-4 rounded-[20px] leading-relaxed text-sm style-pre-wrap ${
                  m.role === "assistant" 
                    ? "bg-white border border-[#e0e3e5] text-on-surface rounded-bl-[4px] shadow-sm max-w-[80%]" 
                    : "bg-primary text-white rounded-br-[4px] shadow-md max-w-[80%]"
                }`}
                style={m.role === "user" ? { boxShadow: "0 8px 24px -6px rgba(0, 74, 198, 0.35)" } : undefined}
              >
                {m.content}
              </div>

              {/* User Avatar on Right */}
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0 select-none">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isWaiting && (
            <div className="flex items-start gap-3 animate-pop-in">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 select-none">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <div className="bg-white border border-[#e0e3e5] px-4 py-3.5 rounded-[20px] rounded-bl-[4px] shadow-sm flex items-center gap-1.5 h-11">
                <span className="w-2.5 h-2.5 bg-on-surface-variant/60 rounded-full dot-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2.5 h-2.5 bg-on-surface-variant/60 rounded-full dot-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2.5 h-2.5 bg-on-surface-variant/60 rounded-full dot-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Bar & Footer note */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e3e5] px-6 py-4 z-40 shadow-lg">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <div className="flex items-end gap-3 relative">
            <textarea 
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1} 
              disabled={isWaiting}
              placeholder="Type your message here..." 
              className="flex-grow resize-none bg-surface border border-[#e0e3e5] rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm max-h-[120px] overflow-y-auto leading-relaxed transition-all placeholder-on-surface-variant/40 disabled:bg-slate-50 disabled:opacity-70"
            />
            
            <button 
              onClick={handleSend}
              disabled={isWaiting || !message.trim()}
              className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-150 flex-shrink-0 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none" 
              title="Send message"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
          
          <p className="text-[10px] text-center text-on-surface-variant/60 leading-tight">
            Kavin is an AI — always verify admission details with official sources.
          </p>
        </div>
      </footer>
    </div>
  );
}
