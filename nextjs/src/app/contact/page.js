"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    stream: "Engineering",
    slot: "Monday 10AM"
  });
  const [error, setError] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map input element IDs to formData fields
    const key = id.replace("input-", "").replace("select-", "");
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConfirmCallback = async (e) => {
    e.preventDefault();
    setError("");

    const { name, phone, stream, slot } = formData;

    if (!name.trim() || !phone.trim() || !stream || !slot) {
      setError("All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits (e.g. 9876543210).");
      return;
    }

    // Prepare message payload
    const dispatchMessage = `CALLBACK_REQUEST: Name: ${name.trim()}, Phone: ${phone.trim()}, Stream: ${stream}, Slot: ${slot}`;

    // Dispatch dispatchMessage to Next.js chat endpoint (fire-and-forget)
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: dispatchMessage,
        history: [] // empty context
      })
    }).catch(err => {
      console.error("Silently caught route error:", err);
    });

    // Toggle success UI
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Background blobs */}
      <div className="mesh-container">
        <div className="blob blob-blue"></div>
        <div className="blob blob-purple"></div>
      </div>

      {/* Glass Navbar */}
      <nav className="sticky top-0 z-50 w-full glass border-b border-white/20 select-none">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back Arrow */}
            <Link href="/" className="text-on-surface hover:text-primary transition-all duration-150 flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/40 active:scale-90" title="Back to Home">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            {/* Logo */}
            <Link href="/" className="text-xl font-black tracking-tight">
              <span className="text-primary">EduBot</span> <span className="text-on-surface">Admission</span>
            </Link>
          </div>
          
          <Link href="/chat" className="inline-flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform duration-150">
            Chat with Kavin <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <header className="max-w-4xl mx-auto text-center px-6 pt-12 pb-16">
        <h1 className="text-4xl font-black tracking-tight text-on-surface">Contact a Counsellor</h1>
        <p className="text-on-surface-variant text-base mt-2 leading-relaxed">Choose WhatsApp or a scheduled callback for TNEA & NEET Guidance.</p>
      </header>

      {/* Grid Container */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Card: WhatsApp */}
          <div className="group glass rounded-[2rem] p-8 md:p-10 border border-white/30 shadow-md flex flex-col justify-between items-center text-center transform hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.995C16.535 1.866 14.066.837 11.443.837c-5.448 0-9.88 4.417-9.884 9.866-.002 1.79.475 3.537 1.382 5.077l-1.009 3.686 3.77-.988zm12.39-7.518c-.33-.165-1.951-.964-2.252-1.074-.3-.109-.518-.165-.738.165-.219.329-.85.85-1.041 1.07-.19.219-.381.246-.712.082-.33-.165-1.393-.513-2.653-1.636-1.008-.9-1.688-2.012-1.887-2.34-.198-.33-.021-.508.143-.672.149-.147.33-.383.495-.575.166-.192.22-.329.33-.548.11-.219.055-.411-.027-.575-.083-.165-.738-1.782-1.01-2.44-.265-.638-.535-.552-.738-.563-.19-.01-.41-.012-.628-.012-.22 0-.575.082-.876.411-.3.33-1.15 1.123-1.15 2.738 0 1.616 1.176 3.178 1.34 3.4 1.763 2.312 3.038 3.56 5.256 4.42.527.204.937.327 1.258.429.53.167 1.011.144 1.392.087.426-.064 1.302-.533 1.485-1.05.182-.516.182-.96.128-1.05-.054-.09-.22-.165-.55-.33z"/>
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-on-surface">WhatsApp Now</h2>
              <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
                Connect instantly with our help desk. Available Mon-Sat 9AM-7PM. Replies in minutes.
              </p>
            </div>
          </div>

          <div className="mt-8 w-full space-y-3">
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20Tamil%20Nadu%20college%20admissions." target="_blank" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-150">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.995C16.535 1.866 14.066.837 11.443.837c-5.448 0-9.88 4.417-9.884 9.866-.002 1.79.475 3.537 1.382 5.077l-1.009 3.686 3.77-.988zm12.39-7.518c-.33-.165-1.951-.964-2.252-1.074-.3-.109-.518-.165-.738.165-.219.329-.85.85-1.041 1.07-.19.219-.381.246-.712.082-.33-.165-1.393-.513-2.653-1.636-1.008-.9-1.688-2.012-1.887-2.34-.198-.33-.021-.508.143-.672.149-.147.33-.383.495-.575.166-.192.22-.329.33-.548.11-.219.055-.411-.027-.575-.083-.165-.738-1.782-1.01-2.44-.265-.638-.535-.552-.738-.563-.19-.01-.41-.012-.628-.012-.22 0-.575.082-.876.411-.3.33-1.15 1.123-1.15 2.738 0 1.616 1.176 3.178 1.34 3.4 1.763 2.312 3.038 3.56 5.256 4.42.527.204.937.327 1.258.429.53.167 1.011.144 1.392.087.426-.064 1.302-.533 1.485-1.05.182-.516.182-.96.128-1.05-.054-.09-.22-.165-.55-.33z"/>
              </svg>
              <span>Open WhatsApp</span>
            </a>
            <p className="text-[11px] text-on-surface-variant/60">Opens WhatsApp with a pre-filled message</p>
          </div>
        </div>
        
        {/* Right Card: Callback booking / Success Panel */}
        <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/30 shadow-md relative overflow-hidden transition-all duration-300">
          
          {/* Booking Form content */}
          {!isBooked ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-primary flex items-center justify-center shadow-inner flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]">phone_callback</span>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-on-surface">Book a Callback</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">Schedule a free 30-min consultation call</p>
                </div>
              </div>

              <form onSubmit={handleConfirmCallback} className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="input-name" className="text-xs font-bold text-on-surface uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    id="input-name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    placeholder="e.g. Arun Kumar" 
                    className="w-full bg-white/50 border border-[#e0e3e5] rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/40" 
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label htmlFor="input-phone" className="text-xs font-bold text-on-surface uppercase tracking-wider">Mobile Number</label>
                  <input 
                    type="tel" 
                    id="input-phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    maxLength={10} 
                    placeholder="e.g. 9876543210" 
                    className="w-full bg-white/50 border border-[#e0e3e5] rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/40" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Stream Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="select-stream" className="text-xs font-bold text-on-surface uppercase tracking-wider">Admission Stream</label>
                    <select 
                      id="select-stream" 
                      value={formData.stream}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-white/50 border border-[#e0e3e5] rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                    >
                      <option value="Engineering">Engineering (TNEA)</option>
                      <option value="Medical">Medical (NEET)</option>
                    </select>
                  </div>

                  {/* Slot Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="select-slot" className="text-xs font-bold text-on-surface uppercase tracking-wider">Preferred Slot</label>
                    <select 
                      id="select-slot" 
                      value={formData.slot}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-white/50 border border-[#e0e3e5] rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                    >
                      <option value="Monday 10AM">Monday 10AM</option>
                      <option value="Tuesday 2PM">Tuesday 2PM</option>
                      <option value="Wednesday 11AM">Wednesday 11AM</option>
                      <option value="Thursday 3PM">Thursday 3PM</option>
                      <option value="Friday 10AM">Friday 10AM</option>
                    </select>
                  </div>
                </div>

                {/* Validation Error Alert */}
                {error && (
                  <div className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 p-3.5 rounded-xl">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 mt-2">
                  <span className="material-symbols-outlined text-[20px]">event_available</span>
                  <span>Confirm Callback</span>
                </button>
              </form>
            </div>
          ) : (
            /* Success Panel */
            <div className="text-center py-8 space-y-6 animate-pop-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              
              <h3 className="text-2xl font-black text-on-surface">You're booked!</h3>
              
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                Hey <strong>{formData.name}</strong>, we have scheduled your free 30-minute callback for <strong>{formData.stream}</strong> admissions on <strong>{formData.slot}</strong>. Our executive will reach you at <strong>{formData.phone}</strong>.
              </p>
              
              <div className="pt-4">
                <Link href="/chat" className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform duration-150">
                  Continue Chatting <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Banner CTA */}
      <div className="mt-16 w-full glass rounded-[2rem] p-8 border border-white/30 shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-1">
          <h3 className="text-lg font-extrabold text-on-surface">Want instant answers right now?</h3>
          <p className="text-xs text-on-surface-variant">Skip the wait and initiate a conversation with our AI Admission Assistant.</p>
        </div>
        <Link href="/chat" className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-md shadow-primary/10 hover:scale-105 active:scale-95 transition-all duration-150 flex-shrink-0">
          Chat with Kavin <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </main>
  </div>
);
}
