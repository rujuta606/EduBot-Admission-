"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    reveals.forEach(el => revealObserver.observe(el));
    
    return () => {
      reveals.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated Mesh Background Blobs */}
      <div className="mesh-container">
        <div className="blob blob-blue"></div>
        <div className="blob blob-purple"></div>
        <div className="blob blob-teal"></div>
      </div>

      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-50 w-full glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight select-none">
            <span className="text-primary">EduBot</span> <span className="text-on-surface">Admission</span>
          </Link>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <a href="#colleges" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Colleges</a>
            <Link href="/admin" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Admin</Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors px-4 py-2">Contact</Link>
            <Link href="/chat" className="inline-flex items-center gap-1 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform duration-150 glow-primary">
              Start Free Chat <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span className="text-xs font-bold tracking-wider text-primary uppercase">Tamil Nadu's #1 AI Counsellor</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-none">
            Your AI-Powered <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tamil Nadu</span> Admission Counsellor
          </h1>

          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
            Expert guidance for Engineering (TNEA), Medical (NEET), Diploma after 10th, and 11th group selection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/chat" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform duration-150">
              Chat with Kavin <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 glass text-on-surface font-semibold rounded-full border border-white/50 shadow-sm hover:bg-white/40 hover:scale-105 active:scale-95 transition-all duration-150">
              Book a Call
            </Link>
          </div>

          <div className="pt-8 border-t border-white/20 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Trusted by students targeting</p>
            <div className="flex flex-wrap items-center gap-6 opacity-75">
              <span className="font-extrabold text-xl tracking-tight text-on-surface">VIT</span>
              <span className="font-black text-xl tracking-tight text-on-surface">SASTRA</span>
              <span className="font-extrabold text-xl tracking-widest text-on-surface">NIT</span>
              <span className="text-xs font-bold text-on-surface bg-white/40 border border-white/50 backdrop-blur-md px-3 py-1 rounded-full">500+ Colleges</span>
            </div>
          </div>
        </div>

        {/* Right Column — AI Mentor Hero Image */}
        <div className="relative w-full max-w-lg mx-auto flex items-center justify-center">
          {/* Floating Badge 1 */}
          <div className="absolute -top-4 left-0 floating glass px-4 py-3 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <div>
              <div className="font-black text-on-surface text-sm">3L+</div>
              <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Students Helped</div>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div className="absolute -bottom-4 right-0 floating-delayed glass px-4 py-3 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <div className="font-black text-on-surface text-sm">Instant</div>
              <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Cutoff Prediction</div>
            </div>
          </div>

          {/* AI Mentor Illustration — floating */}
          <div className="floating w-full">
            {/* Subtle glow ring behind image */}
            <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <img
              src="/ai-mentor.png"
              alt="AI Mentor helping students with Tamil Nadu college admissions"
              className="relative w-full h-auto object-contain drop-shadow-2xl select-none"
              draggable={false}
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="reveal max-w-7xl mx-auto px-6 py-24 border-t border-white/20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Powerful Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mt-2">Precision Admissions Tools</h2>
          <p className="text-on-surface-variant text-base mt-3 leading-relaxed">Everything you need to successfully navigate TNEA and NEET counseling cycles, powered by AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Cutoff Calculator */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">calculate</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Cutoff Calculator</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Instant TNEA and NEET score calculation</p>
          </div>

          {/* 2. College Matching */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">school</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">College Matching</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">3 colleges matched by cutoff, category, district, budget</p>
          </div>

          {/* 3. Call Booking */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-tertiary/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-tertiary/10 text-tertiary transition-all duration-300 group-hover:bg-tertiary group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">event_available</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Call Booking</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Book counselling call, Kavin confirms automatically</p>
          </div>

          {/* 4. Human Escalation */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Human Escalation</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Say I want to talk to someone, Kavin flags you</p>
          </div>

          {/* 5. TNEA + NEET Both */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-green-500/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-500/10 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">medical_services</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">TNEA + NEET Both</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Engineering, Medical, Diploma, and Group Selection</p>
          </div>

          {/* 6. Natural Conversation */}
          <div className="group glass p-8 rounded-3xl border border-white/30 hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white mb-6">
              <span className="material-symbols-outlined text-[28px]">chat</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Natural Conversation</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Understands English, Tamil-English mix, typos</p>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section id="colleges" className="reveal max-w-7xl mx-auto px-6 py-24 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Premier Institutions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mt-2">Find Your Target College</h2>
            <p className="text-on-surface-variant text-base mt-2 max-w-xl leading-relaxed">Explore seat options at the state's most sought-after medical, engineering, diploma, and polytechnic campuses.</p>
          </div>
          <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/40 border border-white/50 backdrop-blur-md text-primary font-bold rounded-full shadow-sm hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-150">
            Find Your Match <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CEG Card */}
          <div className="group glass rounded-3xl overflow-hidden border border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2">
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src="/ceg-college.png"
                alt="College of Engineering Guindy, Anna University"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* CEG label badge */}
              <span className="absolute bottom-3 left-4 text-2xl font-black text-white drop-shadow-lg tracking-wider select-none">CEG</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">Anna University Guindy</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-6">
                  <span className="material-symbols-outlined text-[18px]">location_on</span> Guindy, Chennai
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">Cutoff (TNEA)</p>
                  <p className="text-lg font-black text-primary">199.5</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">Annual Fees</p>
                  <p className="text-lg font-black text-on-surface">₹50,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* PSG Card */}
          <div className="group glass rounded-3xl overflow-hidden border border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2">
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src="/psg-college.png"
                alt="PSG College of Technology, Coimbatore"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* PSG label badge */}
              <span className="absolute bottom-3 left-4 text-2xl font-black text-white drop-shadow-lg tracking-wider select-none">PSG</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">PSG College of Tech</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-6">
                  <span className="material-symbols-outlined text-[18px]">location_on</span> Peelamedu, Coimbatore
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">Cutoff (TNEA)</p>
                  <p className="text-lg font-black text-secondary">200.0</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">Annual Fees</p>
                  <p className="text-lg font-black text-on-surface">₹75,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* MMC Card */}
          <div className="group glass rounded-3xl overflow-hidden border border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2">
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src="/mmc-college.png"
                alt="Madras Medical College, Chennai"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* MMC label badge */}
              <span className="absolute bottom-3 left-4 text-2xl font-black text-white drop-shadow-lg tracking-wider select-none">MMC</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">Madras Medical College</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-6">
                  <span className="material-symbols-outlined text-[18px]">location_on</span> Park Town, Chennai
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">NEET score</p>
                  <p className="text-lg font-black text-tertiary">604+</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-0.5">Annual Fees</p>
                  <p className="text-lg font-black text-on-surface">₹15,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="reveal py-12 px-6 max-w-5xl mx-auto w-full">
        <div className="relative bg-gradient-to-r from-primary to-secondary rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">Ready to Find Your College?</h2>
            <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed">
              Start your counseling and predicted cutoff search today with our conversational AI counsellor Kavin.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat" className="px-8 py-4 bg-white text-primary font-bold rounded-full shadow-lg shadow-white/10 w-full sm:w-auto hover:scale-105 active:scale-95 transition-transform duration-150">
                Chat with Kavin &rarr;
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 backdrop-blur-sm w-full sm:w-auto hover:scale-105 active:scale-95 transition-all duration-150">
                Talk to a Human
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/5 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tight"><span className="text-primary">EduBot</span> <span className="text-white">Admission</span></div>
            <p className="text-sm leading-relaxed text-slate-400">
              Elevating educational futures through cutting-edge AI and precision data-driven counselling for all Tamil Nadu aspirants.
            </p>
          </div>
          
          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/chat" className="hover:text-primary transition-colors">AI Assistant</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Book a Call</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Console</Link></li>
            </ul>
          </div>
          
          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Admissions</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li><span className="hover:text-primary transition-colors cursor-pointer">TNEA Engineering</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">NEET Medical</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Diploma Polytechnic</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">11th Group Selection</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Counselling Procedure</span></li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">alternate_email</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 EduBot Admission. Built with ❤️ for Tamil Nadu students.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
