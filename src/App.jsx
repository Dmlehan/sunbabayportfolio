import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Palette, 
  LineChart, 
  Briefcase, 
  Coffee,
  Activity,
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Mail, 
  Phone,
  MessageSquare, 
  Linkedin, 
  Github, 
  Zap, 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import logo from '../image.png';
import aboutImg from '../about.png';

// ----------------------------------------------------
// Animated Electric Blue Constellation Canvas Component
// ----------------------------------------------------
const ElectricConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    // Calculate density based on screen size
    const particleCount = Math.min(100, Math.floor((width * height) / 12000));
    const connectionDistance = 150;
    const mouse = { x: null, y: null, radius: 180 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        // 70% standard light electric blue, 30% brighter neon electric blue
        this.color = Math.random() > 0.3 ? 'rgba(0, 163, 255, 0.45)' : 'rgba(51, 181, 255, 0.7)';
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

      // Subtle radial ambient dark blue glow in center
      const gradient = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 3, width * 0.7);
      gradient.addColorStop(0, 'rgba(7, 15, 36, 0.4)');
      gradient.addColorStop(0.5, 'rgba(3, 5, 12, 0.2)');
      gradient.addColorStop(1, 'rgba(3, 5, 12, 0)');
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
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse hover interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${alpha})`;
            ctx.lineWidth = 1.0;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-80" />;
};

// ----------------------------------------------------
// Stat Item component (Animate counting on view)
// ----------------------------------------------------
const StatItem = ({ targetValue, suffix, label }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(targetValue, 10);
          if (start === end) {
            setCount(end);
            return;
          }
          const duration = 2000; // ms
          const incrementTime = Math.max(10, Math.floor(duration / end));
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [targetValue, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card text-center group transition-all duration-300 hover:border-electric/40">
      <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
        <span className="text-neon-glow text-electric">{count}</span>
        <span className="text-electric-light">{suffix}</span>
      </div>
      <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">{label}</p>
    </div>
  );
};

// ----------------------------------------------------
// Main App Component
// ----------------------------------------------------
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Testimonials Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsInterval = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Nav Scroll Monitor
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // height of sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Testimonials Data
  const testimonials = [
    {
      name: "Alexander Mercer",
      role: "CTO, FinTech Matrix",
      quote: "Sun Baby Solution delivered our enterprise banking application with absolute security and modern architecture. Their Spring Boot microservices run flawlessly, handling millions of requests daily.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Sophia Vance",
      role: "Founder, Bloom Digital",
      quote: "The React application built by Sun Baby Solution is lightning fast and visually breathtaking. Our clients have commented on the smooth transitions and premium responsive experience.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "David Kim",
      role: "VP of Product, HyperScale Co",
      quote: "From the initial UI/UX blueprints to the final deployment, Sun Baby Solution proved to be an outstanding software partner. Their agile delivery and clean code exceed industry standards.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  // Auto-play testimonials
  useEffect(() => {
    startTestimonialsTimer();
    return () => stopTestimonialsTimer();
  }, []);

  const startTestimonialsTimer = () => {
    stopTestimonialsTimer();
    testimonialsInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const stopTestimonialsTimer = () => {
    if (testimonialsInterval.current) {
      clearInterval(testimonialsInterval.current);
    }
  };

  const handleTestimonialNav = (direction) => {
    stopTestimonialsTimer();
    if (direction === 'prev') {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
    startTestimonialsTimer();
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', service: 'Web Development', message: '' });
    }, 3000);
  };

  // Services list
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Creating highly interactive, secure, and responsive web portals built using modern architectures and SEO best practices.",
      icon: Code2
    },
    {
      id: 2,
      title: "Java Development",
      description: "Building enterprise-level backends, high-performance engines, and reliable corporate system environments.",
      icon: Coffee
    },
    {
      id: 3,
      title: "Spring Boot Solutions",
      description: "Developing lightweight, standalone microservices, secured by Spring Security, featuring production-ready telemetry.",
      icon: Layers
    },
    {
      id: 4,
      title: "React Development",
      description: "Crafting beautiful Single Page Applications (SPAs) and Server-Side Rendered (SSR) projects with rich animations.",
      icon: Activity
    },
    {
      id: 5,
      title: "Mobile Applications",
      description: "Engineering native and cross-platform mobile apps for iOS and Android, featuring offline sync capabilities.",
      icon: Smartphone
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Prototyping responsive journeys and premium modern visuals that maximize user engagement and retention.",
      icon: Palette
    },
    {
      id: 7,
      title: "Digital Marketing",
      description: "Amplifying your online visibility, targeting relevant traffic, and building automated conversion pipelines.",
      icon: LineChart
    },
    {
      id: 8,
      title: "Custom Software Development",
      description: "Tailor-making secure, scalable software systems designed specifically to match your internal business models.",
      icon: Briefcase
    }
  ];

  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Apex CRM Platform",
      category: "Web Development",
      technologies: ["React", "Spring Boot", "Tailwind CSS", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      description: "A cloud-based CRM built for sales management, featuring dynamic graphs and Framer Motion panels."
    },
    {
      id: 2,
      title: "Nova E-Commerce Suite",
      category: "Spring Boot Solutions",
      technologies: ["Spring Boot", "React", "Docker", "Stripe API"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80",
      description: "High-performance online store complete with robust multi-vendor portals and secure checkout routes."
    },
    {
      id: 3,
      title: "Quantum Mobile App",
      category: "Mobile Applications",
      technologies: ["React Native", "Node.js", "Firebase", "Redux"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
      description: "Cross-platform mobile wallet app showcasing beautiful interactive charts and bio-metric authentication."
    },
    {
      id: 4,
      title: "Hyperion AI Dashboard",
      category: "Custom Software",
      technologies: ["React", "Tailwind CSS", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      description: "Real-time AI telemetry monitor designed for predictive analytics with high-frequency charting."
    },
    {
      id: 5,
      title: "Zion Healthcare Portal",
      category: "Web Development",
      technologies: ["React", "Java", "Spring Boot", "MySQL"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      description: "A HIPAA-compliant patient dashboard allowing appointment booking and digital prescription retrieval."
    },
    {
      id: 6,
      title: "Vortex Digital Ads",
      category: "Digital Marketing",
      technologies: ["SEO", "AdSense", "React", "Google Analytics"],
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80",
      description: "A comprehensive digital conversion dashboard displaying campaign metrics, CTRs, and ROI projections."
    }
  ];

  const categories = ['All', 'Web Development', 'Spring Boot Solutions', 'Mobile Applications', 'Custom Software', 'Digital Marketing'];

  const filteredPortfolio = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="relative min-h-screen text-slate-100 bg-navy-950 overflow-hidden font-sans select-none">
      
      {/* Interactive Cyber grid & particle background */}
      <div className="absolute inset-0 bg-mesh-grid opacity-30 pointer-events-none" />
      <ElectricConstellation />

      {/* Radiant spotlights */}
      <div className="spotlight top-[-100px] left-[-100px] opacity-60" />
      <div className="spotlight bottom-[20%] right-[-100px] opacity-40" />
      <div className="spotlight-purple top-[40%] right-[10%] opacity-50" />

      {/* -------------------- HEADER / NAVIGATION -------------------- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/80 backdrop-blur-md border-b border-navy-700/50 py-4 shadow-lg shadow-black/30'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-electric/40 bg-navy-900 flex items-center justify-center p-1 shadow-md shadow-electric/15 hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Sun Baby Solution Logo" className="w-full h-full object-contain rounded-full bg-navy-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-wider leading-none text-base sm:text-lg">
                Sun Baby
              </span>
              <span className="text-electric font-bold text-xs tracking-widest uppercase">
                Solution
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Why Choose Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
                  else scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="text-sm font-medium text-slate-300 hover:text-electric transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-electric to-electric-light hover:from-electric-light hover:to-electric text-white font-bold rounded-full text-sm shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-electric transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-navy-900 border-l border-navy-700/80 shadow-2xl p-6 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <img src={logo} alt="Sun Baby Logo" className="w-8 h-8 rounded-full border border-electric/40 p-0.5 bg-navy-950" />
                    <span className="text-white font-bold tracking-wide">Sun Baby Solution</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-electric">
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {['Home', 'About', 'Services', 'Portfolio', 'Why Choose Us', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
                        else scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-base font-semibold text-slate-300 hover:text-electric transition-colors border-b border-navy-800 pb-2"
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="w-full py-3 bg-gradient-to-r from-electric to-electric-light text-white font-bold rounded-xl text-center shadow-lg shadow-electric/20"
              >
                Get Started
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* -------------------- HERO SECTION -------------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-electric/10 border border-electric/30 px-4 py-1.5 rounded-full text-electric-light text-xs font-semibold uppercase tracking-wider">
              <Zap size={14} className="animate-pulse" />
              <span>Next-Gen Software Development</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
              <span className="text-white">Transforming Ideas Into </span>
              <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent text-neon-glow">
                Digital Reality
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              We engineer enterprise software, immersive web platforms, and mobile apps that empower businesses to scale, innovate, and lead in a hyper-connected digital landscape.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-3.5 bg-electric hover:bg-electric-hover text-white font-bold rounded-full shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
              
              <button
                onClick={() => scrollToSection('portfolio')}
                className="w-full sm:w-auto px-8 py-3.5 bg-navy-900 border border-navy-700 hover:border-electric/50 text-slate-200 hover:text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>View Portfolio</span>
              </button>
            </div>

            {/* Social handles */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4 text-slate-400">
              <span className="text-xs uppercase tracking-widest font-semibold">Connect with us:</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-electric transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-electric transition-colors">
                <Github size={20} />
              </a>
            </div>
          </motion.div>

          {/* Hero Right Logo Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
              {/* Spinning tech orbits */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-electric/10 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-electric/20 animate-pulse pointer-events-none" />
              <div className="absolute inset-8 rounded-full bg-electric/5 blur-3xl pointer-events-none" />

              {/* Main Glowing Cyber-Frame container */}
              <div className="relative w-48 sm:w-56 md:w-64 aspect-square rounded-full overflow-hidden border-2 border-electric bg-navy-950/80 shadow-[0_0_50px_rgba(0,163,255,0.4)] p-1 group cursor-pointer transition-transform duration-500 hover:scale-105">
                <img
                  src={logo}
                  alt="Sun Baby Solution Hero Logo"
                  className="w-full h-full object-contain rounded-full bg-navy-950 transition-all duration-500 group-hover:brightness-110"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* -------------------- ABOUT SECTION -------------------- */}
      <section id="about" className="relative py-24 px-6 md:px-12 border-t border-navy-800/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Image Frame */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-navy-700 bg-navy-900 p-2 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[-2px] border border-electric/30 rounded-2xl pointer-events-none group-hover:scale-102 transition-transform duration-300" />
                
                <img
                  src={aboutImg}
                  alt="About Sun Baby Solution"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* About Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-electric" />
                <span>Who We Are</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Pioneering Innovation and Digital Transformation
              </h2>

              <p className="text-slate-300 text-base leading-relaxed font-light">
                Sun Baby Solution stands at the forefront of software engineering, bridging critical business goals with futuristic technology. As a dedicated software development company, our mission revolves around innovation, custom quality, and bulletproof security.
              </p>

              <p className="text-slate-300 text-base leading-relaxed font-light border-l-2 border-electric pl-4 bg-electric/5 py-2 rounded-r-lg">
                We believe in forging resilient code, user journeys that inspire, and long-term client partnerships built on transparency and technical excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 text-slate-200">
                  <CheckCircle2 className="text-electric w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Agile Delivery Processes</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-200">
                  <CheckCircle2 className="text-electric w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Standard Code Security Metrics</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-200">
                  <CheckCircle2 className="text-electric w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Certified Engineers & Designers</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-200">
                  <CheckCircle2 className="text-electric w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Robust Microservices Architecture</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* -------------------- SERVICES SECTION -------------------- */}
      <section id="services" className="relative py-24 px-6 md:px-12 border-t border-navy-800/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-electric" />
              <span>What We Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              End-to-End Development Services
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Explore our core software capacities designed to scale and optimize your company pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl glass-card glass-card-hover p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center text-electric mb-5 group-hover:bg-electric group-hover:text-white transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-electric transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
                      {service.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center text-electric text-xs font-semibold hover:text-electric-light transition-colors group/btn mt-auto"
                  >
                    <span>Request Quote</span>
                    <ChevronRight size={14} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* -------------------- PORTFOLIO SECTION -------------------- */}
      <section id="portfolio" className="relative py-24 px-6 md:px-12 border-t border-navy-800/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-electric" />
                <span>Our Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Showcasing Digital Excellence
              </h2>
            </div>
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-electric border-electric text-white shadow-lg shadow-electric/20'
                      : 'bg-navy-900 border-navy-700 text-slate-400 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="rounded-2xl glass-card overflow-hidden group flex flex-col"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-video overflow-hidden border-b border-navy-850">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 bg-navy-950/80 border border-electric/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-electric-light uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-lg group-hover:text-electric transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="bg-navy-900 border border-navy-700/50 px-2 py-0.5 rounded text-[10px] font-medium text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="w-full py-2 bg-navy-900 hover:bg-electric border border-navy-700 hover:border-electric text-slate-300 hover:text-white font-semibold text-xs rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5"
                      >
                        <span>Discuss Similar Project</span>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>


      {/* -------------------- WHY CHOOSE US & STATS -------------------- */}
      <section id="why-choose-us" className="relative py-24 px-6 md:px-12 border-t border-navy-800/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-electric" />
                <span>Our Edge</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Why Work With Sun Baby Solution?
              </h2>
              <p className="text-slate-300 font-light text-base leading-relaxed">
                We synthesize process discipline and software expertise to yield outcomes that accelerate growth and guarantee data security.
              </p>

              {/* Pillars list */}
              <div className="space-y-4 pt-2">
                {[
                  { title: "Fast Delivery", desc: "Rigorous milestone-based planning ensure systems ship on time.", icon: Clock },
                  { title: "Modern Technology", desc: "Always building on robust setups like Java, Spring Boot, React, and Next.js.", icon: Zap },
                  { title: "Scalable Solutions", desc: "Containerized deploy structures ensure effortless cluster growth.", icon: Layers },
                  { title: "Secure Development", desc: "Encryption standards protect user data and backend transactions.", icon: ShieldCheck },
                  { title: "Dedicated Support", desc: "Post-launch debugging and standard optimizations whenever required.", icon: Users },
                ].map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-navy-900/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center text-electric flex-shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{pillar.title}</h4>
                        <p className="text-slate-400 text-xs font-light leading-relaxed mt-0.5">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right statistics Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              
              <div className="text-center lg:text-left max-w-md mx-auto lg:mx-0">
                <h3 className="text-2xl font-extrabold text-white mb-2">Our Numerical Impact</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Proven reliability represented by real milestones accomplished across global client networks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatItem targetValue="100" suffix="+" label="Projects Delivered" />
                <StatItem targetValue="50" suffix="+" label="Happy Clients" />
                <StatItem targetValue="5" suffix="+" label="Years Experience" />
                <StatItem targetValue="99" suffix="%" label="Client Satisfaction" />
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- TESTIMONIALS SECTION -------------------- */}
      <section className="relative py-24 px-6 md:px-12 border-t border-navy-800/40 bg-navy-950/40">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-electric" />
              <span>Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Trusted by Leading Tech Teams
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="relative">
            <div className="absolute inset-0 bg-electric/5 blur-3xl pointer-events-none" />
            
            <div className="relative rounded-2xl glass-card p-8 sm:p-12 overflow-hidden shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-center"
                >
                  {/* Rating stars */}
                  <div className="flex justify-center space-x-1 text-yellow-500">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-base sm:text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[currentTestimonial].quote}"
                  </p>

                  {/* User Profile */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover border border-electric/30 p-0.5" 
                    />
                    <div className="text-center sm:text-left">
                      <h4 className="text-white font-bold text-sm">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-slate-400 text-xs">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <div className="flex items-center justify-center space-x-4 mt-8 pt-4 border-t border-navy-850">
                <button
                  onClick={() => handleTestimonialNav('prev')}
                  className="p-2 border border-navy-700 hover:border-electric text-slate-400 hover:text-white rounded-full bg-navy-900 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex space-x-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        stopTestimonialsTimer();
                        setCurrentTestimonial(idx);
                        startTestimonialsTimer();
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentTestimonial === idx ? 'bg-electric w-6' : 'bg-navy-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleTestimonialNav('next')}
                  className="p-2 border border-navy-700 hover:border-electric text-slate-400 hover:text-white rounded-full bg-navy-900 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* -------------------- CONTACT SECTION -------------------- */}
      <section id="contact" className="relative py-24 px-6 md:px-12 border-t border-navy-800/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-electric font-bold text-sm uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-electric" />
                  <span>Connect</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Let's Build Something Exceptional
                </h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Whether you require an enterprise database restructure, microservices design, or frontend polish, we stand ready to architect your solution.
                </p>
              </div>

              {/* Details list */}
              <div className="space-y-4">
                <a 
                  href="mailto:sunbabyteam@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-navy-900/40 border border-navy-850 hover:border-electric/30 hover:bg-navy-900 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-electric/10 text-electric flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Email Address</span>
                    <span className="text-white text-sm font-bold">sunbabyteam@gmail.com</span>
                  </div>
                </a>

                <div 
                  className="flex items-center space-x-4 p-4 rounded-xl bg-navy-900/40 border border-navy-850"
                >
                  <div className="w-10 h-10 rounded-lg bg-electric/10 text-electric flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Quick Phone Support</span>
                    <span className="text-white text-sm font-bold">+94 77 123 4567</span>
                  </div>
                </div>
              </div>

              {/* Chat on WhatsApp */}
              <div className="pt-2">
                <a
                  href="https://wa.me/94771234567?text=Hello%20Sun%20Baby%2520Solution,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Right Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl glass-card p-6 sm:p-8 relative">
                
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-electric/10 text-electric flex items-center justify-center animate-bounce">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-white font-bold text-xl">Inquiry Submitted Successfully</h4>
                    <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
                      Thank you! Our engineering team will review your project parameters and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <h3 className="text-white font-bold text-xl tracking-tight">Request a Proposal</h3>
                    
                    {formError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-lg font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jane Doe"
                          required
                          className="w-full bg-navy-900 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jane@company.com"
                          required
                          className="w-full bg-navy-900 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Project Domain</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-navy-900 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric cursor-pointer appearance-none"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Java Development">Java Development</option>
                        <option value="Spring Boot Solutions">Spring Boot Solutions</option>
                        <option value="React Development">React Development</option>
                        <option value="Mobile Applications">Mobile Applications</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Custom Software Development">Custom Software Development</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Project Scope *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="Detail your requirements, user estimates, and target deadlines..."
                        className="w-full bg-navy-900 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-electric hover:bg-electric-hover text-white font-bold rounded-xl shadow-lg shadow-electric/20 hover:shadow-electric/35 transition-all duration-300"
                    >
                      Submit Secure Request
                    </button>

                  </form>
                )}

              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* -------------------- FOOTER -------------------- */}
      <footer className="relative py-16 px-6 md:px-12 border-t border-navy-800 bg-navy-950/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1 Brand */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <img src={logo} alt="Sun Baby Logo" className="w-8 h-8 rounded-full border border-electric/40 p-0.5 bg-navy-950" />
              <span className="text-white font-extrabold tracking-wide text-lg">Sun Baby Solution</span>
            </div>
            <p className="text-slate-400 text-xs font-light leading-relaxed max-w-xs mx-auto lg:mx-0">
              Transforming complex operational problems into scalable, production-ready software solutions.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Home', 'About', 'Portfolio', 'Why Choose Us'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      if (item === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
                      else scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                    }} 
                    className="hover:text-electric transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 Services */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Our Focus</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Web & Mobile Systems</li>
              <li>Enterprise Java Solutions</li>
              <li>Spring Boot Microservices</li>
              <li>UI/UX Design Systems</li>
            </ul>
          </div>

          {/* Col 4 Info */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>📧 sunbabyteam@gmail.com</li>
              <li>📞 +94 77 123 4567</li>
              <li>📍 Colombo, Sri Lanka</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Sun Baby Solution. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-electric transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-electric transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
