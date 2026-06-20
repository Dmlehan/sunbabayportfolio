import React, { useState, useEffect, useRef } from 'react';
import { Code2, BrainCircuit, Wifi, Menu, X, ChevronRight, CheckCircle2, Mail, User, Briefcase, MessageSquare, Linkedin, Github, Plane, Target, TrendingUp, Users, Lightbulb } from 'lucide-react';
import logo from '../image.png';
import aboutImg from '../about.png';

// ----------------------------------------------------
// Animated Constellation Canvas Background Component
// ----------------------------------------------------
const ConstellationCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 13000));
    const connectionDistance = 140;
    const mouse = { x: null, y: null, radius: 170 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.3 ? 'rgba(100, 215, 228, 0.7)' : 'rgba(0, 174, 239, 0.8)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 3, width * 0.8);
      gradient.addColorStop(0, 'rgba(21, 42, 91, 0.35)');
      gradient.addColorStop(0.5, 'rgba(10, 17, 40, 0.15)');
      gradient.addColorStop(1, 'rgba(6, 11, 30, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 215, 228, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 174, 239, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-75" />;
};

// ----------------------------------------------------
// Clean Logo Component (Uses image.png with golden border and yellow glow)
// ----------------------------------------------------
const CleanLogo = () => {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[240px] sm:max-w-[280px] aspect-square mx-auto animate-float">
      {/* Background yellow radial glow */}
      <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Circular Image Container with Golden Border and Yellow Glow */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-400/80 bg-navy-950 shadow-[0_0_35px_rgba(245,158,11,0.7)] z-10 p-0.5">
        <img
          src={logo}
          alt="Sun Baby Solutions Logo"
          className="w-full h-full object-contain rounded-full bg-navy-950 filter brightness-110 contrast-105 saturate-110"
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Main App Component
// ----------------------------------------------------
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Software Development',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteModalOpen(false);
      setFormData({ name: '', email: '', service: 'Software Development', message: '' });
    }, 2500);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-200 overflow-hidden font-sans">
      
      {/* -------------------- HEADER / NAVIGATION -------------------- */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-md border-b border-navy-700/50 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/40 bg-navy-900/80 flex items-center justify-center p-1 shadow-md hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Sun Baby Solutions Logo" className="w-full h-full object-contain bg-navy-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-wider leading-none text-base sm:text-lg">
                Sun Baby
              </span>
              <span className="text-cyan-400 font-medium text-xs tracking-widest uppercase">
                Solutions
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Resources
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-bold rounded-full text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get a Quote
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-navy-950 border-l border-navy-700/80 shadow-2xl p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Sun Baby Logo" className="w-8 h-8 rounded-full border border-cyan-400/40 p-0.5 bg-navy-950" />
            <span className="text-white font-bold tracking-wide">Sun Baby Solutions</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-cyan-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-6">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors border-b border-navy-800 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors border-b border-navy-800 pb-2"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors border-b border-navy-800 pb-2"
          >
            Resources
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors border-b border-navy-800 pb-2"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors border-b border-navy-800 pb-2"
          >
            Contact
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setQuoteModalOpen(true);
            }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-navy-950 font-bold rounded-xl text-center shadow-lg shadow-cyan-500/20"
          >
            Get a Quote
          </button>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}


      {/* -------------------- HERO SECTION (HIGH-FIDELITY RECREATION OF BANNER) -------------------- */}
      <section className="relative min-h-[95vh] bg-hero-gradient flex items-center justify-center pt-28 pb-24 px-6 sm:px-12 lg:px-20">
        
        {/* Interactive Constellation Mesh Overlay */}
        <ConstellationCanvas />
        
        {/* Subtle radial lights */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />

        {/* Banner Container */}
        <div className="relative w-full max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between">
            
            {/* LEFT COLUMN: Learn, Grow, Inspire */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              
              {/* Stacked bordered text */}
              <div className="flex flex-col items-center lg:items-start border-l-[6px] border-cyan-500 pl-6 md:pl-8 text-left py-2">
                <h1 className="text-white text-5xl sm:text-6xl md:text-[68px] font-extrabold tracking-wide leading-none select-none">
                  LEARN
                </h1>
                <h1 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-5xl sm:text-6xl md:text-[68px] font-extrabold tracking-wide leading-none my-3 select-none">
                  GROW
                </h1>
                <h1 className="text-white text-5xl sm:text-6xl md:text-[68px] font-extrabold tracking-wide leading-none select-none">
                  INSPIRE
                </h1>
              </div>

              {/* Tagline text and Heart */}
              <div className="space-y-4">
                <p className="text-slate-300 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase flex items-center justify-center lg:justify-start gap-2">
                  Together as a Team 
                  <span className="text-cyan-400 filter drop-shadow-[0_0_5px_rgba(0,174,239,0.5)]">♡</span>
                </p>
                
                {/* Social Icons row */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-cyan-600/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-navy-950 rounded-full flex items-center justify-center text-cyan-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-cyan-600/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-navy-950 rounded-full flex items-center justify-center text-cyan-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="#explore"
                    onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                    className="w-11 h-11 bg-cyan-600/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-navy-950 rounded-full flex items-center justify-center text-cyan-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <Plane size={20} className="transform -rotate-45" />
                  </a>
                </div>
              </div>

            </div>

            {/* CENTER COLUMN: Clean Logo image.png Logo with Color Balance and Glow */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <CleanLogo />
            </div>

            {/* RIGHT COLUMN: Sun Baby Family, Pillars, and Email */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
              
              {/* Cursive Family title */}
              <div className="space-y-1">
                <h3 className="cursive-title text-white text-4xl sm:text-[46px] font-normal tracking-wide drop-shadow-sm select-none">
                  Sun Baby Family
                </h3>
                <h4 className="text-cyan-400 font-extrabold tracking-widest text-sm sm:text-base select-none uppercase">
                  (A TEAM)
                </h4>
              </div>

              {/* Heart divider lines */}
              <div className="flex items-center justify-center lg:justify-end w-full space-x-3">
                <div className="w-14 h-[1px] bg-cyan-500/30" />
                <span className="text-cyan-400 filter drop-shadow-[0_0_4px_rgba(0,174,239,0.5)]">♡</span>
                <div className="w-14 h-[1px] bg-cyan-500/30" />
              </div>

              {/* Focus, Growth, Teamwork, Innovation Horizontal Row */}
              <div className="grid grid-cols-7 gap-1 items-center justify-center w-full max-w-sm text-slate-300 pt-2">
                <div className="col-span-1 flex flex-col items-center group cursor-pointer" onClick={() => scrollToSection('about')}>
                  <Target size={20} className="text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[10px] font-bold tracking-wider text-slate-400">FOCUS</span>
                </div>
                
                <div className="col-span-1 flex justify-center text-navy-700/60 font-light select-none">|</div>

                <div className="col-span-1 flex flex-col items-center group cursor-pointer" onClick={() => scrollToSection('services')}>
                  <TrendingUp size={20} className="text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[10px] font-bold tracking-wider text-slate-400">GROWTH</span>
                </div>

                <div className="col-span-1 flex justify-center text-navy-700/60 font-light select-none">|</div>

                <div className="col-span-1 flex flex-col items-center group cursor-pointer" onClick={() => scrollToSection('about')}>
                  <Users size={20} className="text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[10px] font-bold tracking-wider text-slate-400">TEAMWORK</span>
                </div>

                <div className="col-span-1 flex justify-center text-navy-700/60 font-light select-none">|</div>

                <div className="col-span-1 flex flex-col items-center group cursor-pointer" onClick={() => scrollToSection('services')}>
                  <Lightbulb size={20} className="text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[10px] font-bold tracking-wider text-slate-400">INNOVATION</span>
                </div>
              </div>

              {/* Email Pill Badge */}
              <div className="pt-2">
                <a
                  href="mailto:sunbabyteam@gmail.com"
                  className="flex items-center space-x-3 bg-navy-950/60 hover:bg-navy-950/90 border border-navy-700/80 hover:border-cyan-400 px-6 py-2.5 rounded-full text-slate-300 hover:text-cyan-400 transition-all duration-300 shadow-md group"
                >
                  <Mail size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider">sunbabyteam@gmail.com</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Curve bottom divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,86.68,26.47Z" fill="#F0F4F8"></path>
          </svg>
        </div>
      </section>


      {/* -------------------- SERVICES SECTION (MIDDLE LIGHT PANEL) -------------------- */}
      <section id="services" className="relative bg-lightBg py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="cursive-title text-navy-900 text-5xl sm:text-6xl font-normal drop-shadow-sm select-none">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Software Development */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                  <Code2 size={28} />
                </div>
                <h3 className="text-navy-900 font-extrabold text-xl mb-4 group-hover:text-cyan-500 transition-colors duration-200">
                  Software Development
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Develop the custom and software development to promote and software development solutions and services.
                </p>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex items-center text-cyan-600 hover:text-cyan-500 font-bold text-sm group/btn mt-auto"
              >
                Learn More <ChevronRight size={16} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: AI Solutions */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                  <BrainCircuit size={28} />
                </div>
                <h3 className="text-navy-900 font-extrabold text-xl mb-4 group-hover:text-cyan-500 transition-colors duration-200">
                  AI Solutions
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  AI Solutions we specialize for interesting solutions and basic AI solutions.
                </p>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex items-center text-cyan-600 hover:text-cyan-500 font-bold text-sm group/btn mt-auto"
              >
                Learn More <ChevronRight size={16} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: IoT Networks */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                  <Wifi size={28} />
                </div>
                <h3 className="text-navy-900 font-extrabold text-xl mb-4 group-hover:text-cyan-500 transition-colors duration-200">
                  IoT Networks
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We deliver innovative connectivities and network solutions and accessories.
                </p>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex items-center text-cyan-600 hover:text-cyan-500 font-bold text-sm group/btn mt-auto"
              >
                Learn More <ChevronRight size={16} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Curves */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform rotate-180">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,86.68,26.47Z" fill="#0A1128"></path>
          </svg>
        </div>
      </section>


      {/* -------------------- ABOUT SECTION (LOWER DARK PANEL) -------------------- */}
      <section id="about" className="relative bg-navy-900 py-24 px-6 z-10 border-b border-navy-800">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none transform -translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          
          <div className="mb-14">
            <h2 className="cursive-title text-white text-5xl sm:text-6xl font-normal drop-shadow-sm select-none">
              About Us
            </h2>
            <div className="w-14 h-1 bg-cyan-400 mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Image (Left) */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-cyan-500/20 bg-navy-950 shadow-[0_0_30px_rgba(0,174,239,0.3)] animate-float p-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <img
                  src={aboutImg}
                  alt="About Sun Baby Solutions"
                  className="w-full h-full object-contain rounded-xl z-10 filter brightness-105 contrast-105"
                />
              </div>
            </div>

            {/* Paragraphs (Middle) */}
            <div className="lg:col-span-4 space-y-6">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                Sun Baby Solutions is bridging the company to economic business needs and technologies through the years.
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light border-l-2 border-cyan-400 pl-4 bg-cyan-500/5 py-2 rounded-r-lg">
                Sun Baby Solutions maintains standard connections to connecting things today.
              </p>
            </div>

            {/* Bullets & Pluses (Right) */}
            <div className="lg:col-span-4 space-y-8 lg:pl-6 border-t lg:border-t-0 lg:border-l border-navy-700/60 pt-8 lg:pt-0">
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm sm:text-base font-light">
                    We will produce innovative tools and methodologies.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm sm:text-base font-light">
                    You need connections to generate and test innovations.
                  </span>
                </li>
              </ul>

              <div>
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-extrabold rounded-full text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:-translate-y-0.5 tracking-wider"
                >
                  Get a Quote
                </button>
              </div>

              <div className="flex items-center space-x-3 text-right justify-end pt-4 opacity-80">
                <span className="text-cyan-400/60 text-lg">✦</span>
                <span className="text-slate-400 font-extralight tracking-widest text-sm uppercase">Since</span>
                <span className="text-cyan-400 font-bold tracking-widest text-base sm:text-lg text-glow">
                  MMXXV
                </span>
                <span className="text-cyan-400/60 text-lg">✦</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- FOOTER (DARK FOOTER BOTTOM) -------------------- */}
      <footer id="footer" className="relative bg-navy-950 py-16 px-6 z-10 border-t border-navy-800/60">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Brand details */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Sun Baby Logo" className="w-8 h-8 rounded-full border border-cyan-400/40 p-0.5 bg-navy-950" />
              <span className="text-white font-extrabold tracking-wide text-lg">Sun Baby Solutions</span>
            </div>
            <div className="text-slate-400 text-xs sm:text-sm font-light space-y-1">
              <p>📍 Establishing connections globally</p>
              <p>💻 Software Development | 🧠 AI Solutions | 📶 IoT Networks</p>
            </div>
          </div>

          {/* Center Bezel Title */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            <span className="cursive-title text-slate-300 text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-glow select-none hover:text-cyan-400 transition-colors duration-500">
              Latest Innovations
            </span>
          </div>

          {/* Right Since MMXXV */}
          <div className="md:col-span-4 flex items-center justify-center md:justify-end space-x-3 text-slate-400 font-light">
            <span className="text-cyan-400 font-bold text-xl">+</span>
            <span className="tracking-widest text-sm uppercase">Since</span>
            <span className="text-white font-extrabold text-lg sm:text-xl tracking-widest text-glow-bright bg-navy-800 px-3 py-1 rounded border border-navy-700">
              MMXXV
            </span>
            <span className="text-cyan-400 font-bold text-xl">+</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-navy-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sun Baby Solutions (pvt ltd). All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </footer>


      {/* -------------------- GET A QUOTE INTERACTIVE MODAL -------------------- */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQuoteModalOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative bg-navy-900 border border-navy-700/80 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 transform transition-all overflow-hidden glow-box-cyan">
            
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Request a Custom Quote
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                Tell us about your requirements and establish premium connections.
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="w-16 h-16 bg-cyan-400/10 text-cyan-400 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-lg font-bold text-white">Request Received Successfully!</h4>
                <p className="text-slate-400 text-sm max-w-xs font-light">
                  Thank you! Our Sun Baby Solutions engineers will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Sun Baby"
                      className="w-full bg-navy-950 border border-navy-700/80 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sun@babysolutions.com"
                      className="w-full bg-navy-950 border border-navy-700/80 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="service" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Select Service Interest
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-navy-950 border border-navy-700/80 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="IoT Networks">IoT Networks</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Tell us about your project
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your design and connection needs..."
                      className="w-full bg-navy-950 border border-navy-700/80 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-bold rounded-xl text-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-300"
                  >
                    Submit Quote Request
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
