import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, 
  Camera, 
  Settings, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronRight, 
  Zap, 
  Eye, 
  Monitor, 
  Cpu,
  Star,
  ExternalLink,
  Globe,
  Layout,
  ArrowLeft
} from 'lucide-react';

// --- Helper Components ---

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);
  return null;
};

const Reveal = ({ children, delay = 0, x = 0, y = 30 }: { children: React.ReactNode, delay?: number, x?: number, y?: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Ventures', href: '/#ventures' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-dark' : 'py-6 bg-transparent'}`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-lg transition-transform overflow-hidden border border-white/10"
          >
            <img 
              src={logo} 
              alt="Meena CCTV Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="text-brand-primary font-bold text-xl">M</div>';
              }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight leading-none">MEENA</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">CCTV SERVICES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/#contact" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all active:scale-95">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-lg font-medium text-white/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/#contact" 
                className="w-full py-4 bg-brand-primary text-white font-semibold rounded-xl mt-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          style={{ y: y2, opacity, scale }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" />
            <span>A Venture by Meena Technologies</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
            Secure What Matters. <br />
            <span className="text-gradient">Smart CCTV Solutions</span> <br />
            for Modern Spaces.
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            From supply to installation — we handle everything. Zero hassle. 
            Professional grade security with 1-year free service and support.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/#contact" className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <motion.a 
                href="https://wa.me/918657664599?text=Hi, I want CCTV installation service." 
                target="_blank" 
                animate={{ 
                  boxShadow: [
                    "0 0 0 0px rgba(37, 211, 102, 0.4)",
                    "0 0 0 10px rgba(37, 211, 102, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </motion.a>
            </motion.div>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">100+</span>
              <span className="text-[10px] uppercase tracking-wider">Installs</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">24/7</span>
              <span className="text-[10px] uppercase tracking-wider">Support</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">1yr</span>
              <span className="text-[10px] uppercase tracking-wider">Warranty</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 glass p-4 rounded-[40px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800" 
              alt="CCTV Dashboard" 
              className="rounded-[32px] w-full shadow-inner"
              referrerPolicy="no-referrer"
            />
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
                <CheckCircle2 />
              </div>
              <div>
                <p className="text-xs font-bold">System Online</p>
                <p className="text-[10px] text-white/50">All cameras active</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center text-brand-primary">
                <Eye />
              </div>
              <div>
                <p className="text-xs font-bold">Live Monitoring</p>
                <p className="text-[10px] text-white/50">High Definition Stream</p>
              </div>
            </motion.div>
          </div>
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      id: "cctv-installation",
      title: "CCTV Installation",
      desc: "Professional placement and wiring for maximum coverage and zero blind spots.",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-blue-500",
      details: [
        "Strategic camera placement for 360° coverage",
        "High-quality weather-proof wiring",
        "Integration with existing network infrastructure",
        "Mobile & Desktop remote access setup",
        "Night vision optimization"
      ]
    },
    {
      id: "home-security",
      title: "Home Security",
      desc: "Smart integration with mobile alerts to keep your family safe 24/7.",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-indigo-500",
      details: [
        "Smart door locks & video doorbells",
        "Motion sensor integration",
        "Instant mobile push notifications",
        "Family access sharing",
        "Emergency alarm systems"
      ]
    },
    {
      id: "office-surveillance",
      title: "Office Surveillance",
      desc: "Scalable enterprise solutions for multi-floor monitoring and access control.",
      icon: <Monitor className="w-6 h-6" />,
      color: "bg-purple-500",
      details: [
        "Multi-camera centralized monitoring",
        "Employee access control systems",
        "Server-room security & monitoring",
        "High-capacity NVR/DVR storage",
        "Remote management for branch offices"
      ]
    },
    {
      id: "amc-maintenance",
      title: "AMC & Maintenance",
      desc: "Regular health checks and cleaning to ensure your system never fails.",
      icon: <Settings className="w-6 h-6" />,
      color: "bg-emerald-500",
      details: [
        "Quarterly health checkups",
        "Camera lens cleaning & refocusing",
        "Hard drive health monitoring",
        "Firmware & software updates",
        "Priority support & fast replacements"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Premium Security Services</h3>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-3xl group cursor-pointer transition-all hover:bg-white/10 h-full flex flex-col"
              >
                <div className={`w-14 h-14 ${service.color}/20 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                <Link 
                  to={`/service/${service.id}`}
                  className="flex items-center gap-2 text-brand-primary font-bold text-sm group/btn"
                >
                  Learn More <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Contact Us", desc: "Reach out via form or WhatsApp for a quick chat." },
    { title: "Site Inspection", desc: "Our experts visit your space to identify security gaps." },
    { title: "Custom Plan", desc: "We design a tailored setup that fits your budget." },
    { title: "Installation", desc: "Fast, clean, and professional setup by our team." },
    { title: "1-Year Support", desc: "Enjoy peace of mind with free maintenance." }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">The Process</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">How We Secure You</h3>
            </div>
            <p className="text-white/50 max-w-md">
              We've streamlined our workflow to ensure you get the best security with zero hassle.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden lg:block" />
          
          {/* Timeline Line - Mobile */}
          <div className="absolute top-0 bottom-0 left-12 w-px bg-white/10 lg:hidden" />
          
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative z-10 flex lg:flex-col items-start lg:items-start gap-6 lg:gap-0 p-6 lg:p-0 rounded-[2rem] lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-none group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-2xl lg:rounded-full bg-brand-primary flex items-center justify-center font-bold shadow-lg shadow-brand-primary/20 text-white z-10 relative group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    {/* Mobile glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-primary/30 blur-xl rounded-full lg:hidden" />
                  </div>
                  
                  <div className="lg:mt-6">
                    <h4 className="text-lg font-bold mb-2 text-white group-hover:text-brand-primary transition-colors">{step.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: "1-Year Free Service", icon: <Clock /> },
    { title: "Expert Installation", icon: <Settings /> },
    { title: "Affordable Packages", icon: <Zap /> },
    { title: "Latest Technology", icon: <Cpu /> }
  ];

  return (
    <section id="why-us" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal x={-30}>
          <div>
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Why Meena CCTV</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">Trust Built on <br /> Reliability & Tech</h3>
            <p className="text-white/60 mb-10 leading-relaxed">
              We don't just sell cameras; we provide peace of mind. Our team uses modern surveillance technology to ensure your property is monitored with precision.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    {f.icon}
                  </div>
                  <span className="font-semibold text-sm">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal x={30}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400" 
                className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl" 
                referrerPolicy="no-referrer" 
              />
              <div className="glass p-6 rounded-3xl">
                <p className="text-3xl font-bold mb-1">99.9%</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">Uptime Guaranteed</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-brand-primary p-6 rounded-3xl text-white shadow-xl shadow-brand-primary/20">
                <Star className="fill-white mb-4" />
                <p className="text-lg font-bold leading-tight">Top Rated Security Partner in the Region</p>
              </div>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400" 
                className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const { scrollYProgress } = useScroll();
  const scannerY = useTransform(scrollYProgress, [0.4, 0.6], ["-100%", "200%"]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="glass p-8 md:p-12 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/10 blur-[100px] -z-10" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Monitor Anywhere, <br /> Anytime.</h3>
                <p className="text-white/60 mb-8">
                  Our systems integrate seamlessly with your mobile devices. Stay connected to your property from anywhere in the world with high-definition live streams and reliable remote access.
                </p>
                <Link to="/#contact" className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20">
                  Get a Free Quote
                </Link>
              </div>

              <div className="relative group">
                <div className="glass-dark p-2 rounded-3xl shadow-2xl overflow-hidden border-white/10 relative">
                  <div className="bg-black/80 aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-40" />
                    
                    {/* Scanner Effect */}
                    <motion.div 
                      style={{ top: scannerY }}
                      className="absolute left-0 right-0 h-1 bg-brand-primary shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20 pointer-events-none"
                    />
                    <motion.div 
                      style={{ top: scannerY }}
                      className="absolute left-0 right-0 h-20 bg-gradient-to-b from-brand-primary/20 to-transparent z-10 pointer-events-none -translate-y-full"
                    />

                    <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-red-500 rounded text-[10px] font-bold animate-pulse z-30">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                    </div>
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/50 z-30">
                      CAM_04 // FRONT_ENTRANCE
                    </div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer z-30">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-primary/30 rounded-tr-3xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-primary/30 rounded-bl-3xl" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Rahul Sharma", role: "Home Owner", text: "The installation was super clean. No wires visible and the app works perfectly. Highly recommended!" },
    { name: "Anita Desai", role: "Store Manager", text: "Meena CCTV team is professional. They suggested the best spots for cameras and the night vision is amazing." },
    { name: "Vikram Singh", role: "Office Admin", text: "We've been using their AMC service for a year now. Very prompt response whenever we need help." }
  ];

  return (
    <section className="py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Testimonials</h2>
            <h3 className="text-4xl font-display font-bold">What Our Clients Say</h3>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-[32px] relative h-full"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                <p className="text-lg mb-8 text-white/80 leading-relaxed italic">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center font-bold text-brand-primary">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <p className="text-xs text-white/50">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const OtherVentures = () => {
  const ventures = [
    { name: "Meena Optics", desc: "Premium eyewear and clinical eye care solutions.", icon: <Eye />, link: "https://meena-optics.vercel.app/" },
    { name: "Meena Software", desc: "Custom web and mobile app development for businesses.", icon: <Globe />, link: "https://meenatechnologies.vercel.app/" },
    { name: "Meena PC Builds", desc: "High-performance custom workstations and gaming rigs.", icon: <Layout />, link: "https://forge-pc-builds.preview.emergentagent.com/" }
  ];

  return (
    <section id="ventures" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Ecosystem</h2>
              <h3 className="text-4xl font-display font-bold">A Venture by Meena Technologies</h3>
            </div>
            <p className="text-white/50 max-w-md">
              Explore our other specialized technology ventures delivering excellence across industries.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {ventures.map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.a 
                key={i}
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-3xl group block h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all mb-6">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{v.name}</h4>
                <p className="text-sm text-white/50 mb-6 leading-relaxed">{v.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:text-brand-primary transition-colors">
                  Explore Venture <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', requirement: '' });
  const [isSent, setIsSent] = useState(false);

  const handleWhatsApp = (data = formData) => {
    const message = `Hi, I want CCTV installation service.\nName: ${data.name}\nPhone: ${data.phone}\nLocation: ${data.location}\nRequirement: ${data.requirement}`;
    window.open(`https://wa.me/918657664599?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger WhatsApp in new tab
    handleWhatsApp();
    // Show success message
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal y={50}>
          <div className="glass p-8 md:p-16 rounded-[40px] grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-display font-bold mb-6">Ready to Secure <br /> Your Space?</h3>
              <p className="text-white/60 mb-10">
                Fill out the form and our team will get back to you within 2 hours for a free site inspection.
              </p>
              
              <div className="space-y-6 mb-10">
                <a href="tel:9920300750" className="flex items-center gap-4 hover:bg-white/5 p-2 rounded-2xl transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest">Call Us</p>
                    <p className="font-bold">9920300750</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest">Visit Us</p>
                    <p className="font-bold">Kandivali, Mumbai</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp Now
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input 
                  required
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  required
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <input 
                required
                type="text" 
                placeholder="Location" 
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-colors"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              <textarea 
                required
                placeholder="Your Requirement (e.g. 4 Cameras for Home)" 
                rows={4}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-colors resize-none"
                onChange={(e) => setFormData({...formData, requirement: e.target.value})}
              ></textarea>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSent}
                className={`w-full py-4 font-bold rounded-2xl transition-all shadow-xl ${isSent ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-brand-primary/20'}`}
              >
                {isSent ? 'Message Sent Successfully!' : 'Send Inquiry'}
              </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
              <img 
                src={logo} 
                alt="Meena CCTV Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="text-brand-primary font-bold">M</div>';
                }}
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">MEENA CCTV</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          <div className="text-sm text-white/30">
            © 2026 Powered by Meena Technologies
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Service Detail Page ---

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const services = [
    {
      id: "cctv-installation",
      title: "CCTV Installation",
      desc: "Professional placement and wiring for maximum coverage and zero blind spots.",
      icon: <Camera className="w-8 h-8" />,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Strategic camera placement for 360° coverage",
        "High-quality weather-proof wiring",
        "Integration with existing network infrastructure",
        "Mobile & Desktop remote access setup",
        "Night vision optimization"
      ]
    },
    {
      id: "home-security",
      title: "Home Security",
      desc: "Smart integration with mobile alerts to keep your family safe 24/7.",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Smart door locks & video doorbells",
        "Motion sensor integration",
        "Instant mobile push notifications",
        "Family access sharing",
        "Emergency alarm systems"
      ]
    },
    {
      id: "office-surveillance",
      title: "Office Surveillance",
      desc: "Scalable enterprise solutions for multi-floor monitoring and access control.",
      icon: <Monitor className="w-8 h-8" />,
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Multi-camera centralized monitoring",
        "Employee access control systems",
        "Server-room security & monitoring",
        "High-capacity NVR/DVR storage",
        "Remote management for branch offices"
      ]
    },
    {
      id: "amc-maintenance",
      title: "AMC & Maintenance",
      desc: "Regular health checks and cleaning to ensure your system never fails.",
      icon: <Settings className="w-8 h-8" />,
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Quarterly health checkups",
        "Camera lens cleaning & refocusing",
        "Hard drive health monitoring",
        "Firmware & software updates",
        "Priority support & fast replacements"
      ]
    }
  ];

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-brand-primary rounded-xl font-bold">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/#services" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={`w-16 h-16 ${service.color}/20 rounded-2xl flex items-center justify-center text-white mb-8`}>
              {service.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              {service.desc}
            </p>

            <div className="space-y-8 mb-12">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <div className="w-1 h-6 bg-brand-primary rounded-full" />
                What's Included
              </h3>
              <div className="grid gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20">
              Inquire About This Service <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="glass p-4 rounded-[40px] overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title} 
                className="rounded-[32px] w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl shadow-2xl max-w-[240px]">
              <p className="text-sm font-bold mb-2">1-Year Free Support</p>
              <p className="text-xs text-white/50">Included with every {service.title} project.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Landing Page ---

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <DemoSection />
      <Testimonials />
      <OtherVentures />
      <Contact />
    </>
  );
};

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans selection:bg-brand-primary selection:text-white">
        <ScrollToHash />
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating WhatsApp CTA */}
        <motion.a
          href="https://wa.me/918657664599?text=Hi, I want CCTV installation service."
          target="_blank"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: [
              "0 0 0 0px rgba(37, 211, 102, 0.4)",
              "0 0 0 20px rgba(37, 211, 102, 0)",
            ]
          }}
          transition={{
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl z-40 group"
        >
          <MessageSquare className="text-white w-8 h-8" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            Chat with us
          </span>
        </motion.a>
      </div>
    </BrowserRouter>
  );
}
