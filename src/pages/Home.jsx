import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";

// ---------- tiny helpers ----------
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

// ---------- SVG illustrations ----------
function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
      {/* background card */}
      <rect x="30" y="40" width="460" height="340" rx="24" fill="#EFF6FF" />
      {/* top bar */}
      <rect x="30" y="40" width="460" height="52" rx="24" fill="#2563EB" />
      <rect x="30" y="68" width="460" height="24" fill="#2563EB" />
      <circle cx="62" cy="66" r="8" fill="#93C5FD" />
      <circle cx="86" cy="66" r="8" fill="#BFDBFE" />
      <circle cx="110" cy="66" r="8" fill="#DBEAFE" />
      <text x="200" y="71" fill="white" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600">SkillBridge AI Dashboard</text>

      {/* resume score card */}
      <rect x="54" y="112" width="170" height="120" rx="14" fill="white" filter="url(#shadow)" />
      <text x="74" y="136" fill="#0F172A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">ATS Score</text>
      <circle cx="139" cy="186" r="34" fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle cx="139" cy="186" r="34" fill="none" stroke="#2563EB" strokeWidth="6"
        strokeDasharray="154" strokeDashoffset="38" strokeLinecap="round"
        transform="rotate(-90 139 186)" />
      <text x="139" y="191" fill="#0F172A" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">87%</text>

      {/* roadmap card */}
      <rect x="238" y="112" width="220" height="120" rx="14" fill="white" filter="url(#shadow)" />
      <text x="258" y="136" fill="#0F172A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">Your Roadmap</text>
      {[
        { y: 156, label: "HTML & CSS", done: true },
        { y: 176, label: "JavaScript", done: true },
        { y: 196, label: "React.js", done: false },
        { y: 216, label: "Node.js", done: false },
      ].map((step, i) => (
        <g key={i}>
          <circle cx="268" cy={step.y} r="6" fill={step.done ? "#2563EB" : "#E2E8F0"} />
          {step.done && <path d={`M265 ${step.y} l2 2 4-4`} stroke="white" strokeWidth="1.5" strokeLinecap="round" />}
          <text x="282" y={step.y + 4} fill={step.done ? "#0F172A" : "#94A3B8"} fontSize="11" fontFamily="Inter, sans-serif">{step.label}</text>
        </g>
      ))}

      {/* interview questions card */}
      <rect x="54" y="248" width="170" height="110" rx="14" fill="white" filter="url(#shadow)" />
      <text x="74" y="272" fill="#0F172A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">AI Interview Prep</text>
      <rect x="74" y="284" width="130" height="18" rx="4" fill="#EFF6FF" />
      <text x="82" y="297" fill="#2563EB" fontSize="9" fontFamily="Inter, sans-serif">Tell me about yourself...</text>
      <rect x="74" y="308" width="110" height="18" rx="4" fill="#EFF6FF" />
      <text x="82" y="321" fill="#2563EB" fontSize="9" fontFamily="Inter, sans-serif">Your biggest strength?</text>
      <rect x="74" y="330" width="120" height="16" rx="4" fill="#06B6D4" opacity="0.15" />
      <text x="82" y="342" fill="#0891B2" fontSize="9" fontFamily="Inter, sans-serif">Practice 3 more →</text>

      {/* jobs card */}
      <rect x="238" y="248" width="220" height="110" rx="14" fill="white" filter="url(#shadow)" />
      <text x="258" y="272" fill="#0F172A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">Job Matches</text>
      {[
        { role: "Frontend Dev", co: "Infosys", match: "94%" },
        { role: "React Engineer", co: "Wipro", match: "89%" },
      ].map((job, i) => (
        <g key={i}>
          <rect x="258" y={287 + i * 32} width="180" height="24" rx="6" fill="#F8FAFC" />
          <text x="268" y={303 + i * 32} fill="#0F172A" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">{job.role}</text>
          <text x="268" y={315 + i * 32} fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">{job.co}</text>
          <rect x="390" y={290 + i * 32} width="38" height="16" rx="8" fill="#DCFCE7" />
          <text x="409" y={302 + i * 32} fill="#16A34A" fontSize="9" fontFamily="Inter, sans-serif" textAnchor="middle" fontWeight="600">{job.match}</text>
        </g>
      ))}

      {/* floating badge */}
      <rect x="340" y="56" width="120" height="28" rx="14" fill="#06B6D4" />
      <text x="400" y="74" fill="white" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">✦ AI-Powered</text>

      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
      </defs>
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#EFF6FF" />
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#BFDBFE" />
      <rect x="16" y="16" width="16" height="2" rx="1" fill="#2563EB" />
      <rect x="16" y="21" width="12" height="2" rx="1" fill="#93C5FD" />
      <rect x="16" y="26" width="14" height="2" rx="1" fill="#93C5FD" />
      <rect x="16" y="31" width="10" height="2" rx="1" fill="#93C5FD" />
    </svg>
  );
}

function ATSIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#ECFDF5" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="#D1FAE5" strokeWidth="4" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="#10B981" strokeWidth="4"
        strokeDasharray="50" strokeDashoffset="12" strokeLinecap="round"
        transform="rotate(-90 24 24)" />
      <text x="24" y="28" fill="#059669" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">87%</text>
    </svg>
  );
}

function InterviewIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#FFF7ED" />
      <rect x="10" y="14" width="28" height="18" rx="4" fill="#FED7AA" />
      <rect x="14" y="19" width="14" height="2" rx="1" fill="#EA580C" />
      <rect x="14" y="24" width="10" height="2" rx="1" fill="#FB923C" />
      <polygon points="16,32 20,36 24,32" fill="#FED7AA" />
    </svg>
  );
}

function RoadmapIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#F0F9FF" />
      <circle cx="14" cy="16" r="4" fill="#2563EB" />
      <circle cx="24" cy="26" r="4" fill="#06B6D4" />
      <circle cx="34" cy="36" r="4" fill="#2563EB" />
      <line x1="17" y1="19" x2="21" y2="23" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="29" x2="31" y2="33" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#FAF5FF" />
      <rect x="10" y="14" width="28" height="20" rx="4" fill="#E9D5FF" />
      <rect x="14" y="18" width="8" height="6" rx="2" fill="#A855F7" />
      <rect x="26" y="18" width="8" height="6" rx="2" fill="#C084FC" />
      <rect x="14" y="28" width="20" height="2" rx="1" fill="#D8B4FE" />
    </svg>
  );
}

function JobIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect width="48" height="48" rx="12" fill="#F0FDF4" />
      <rect x="12" y="20" width="24" height="16" rx="3" fill="#BBF7D0" />
      <rect x="18" y="14" width="12" height="8" rx="2" fill="#86EFAC" />
      <line x1="24" y1="20" x2="24" y2="36" stroke="#16A34A" strokeWidth="2" />
      <line x1="12" y1="28" x2="36" y2="28" stroke="#16A34A" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect width="32" height="32" rx="9" fill="#2563EB" />
      <path d="M9 17 L14 11 L18 15 L23 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="23" cy="9" r="2.4" fill="#5EEAD4" />
      <path d="M9 22 H23" stroke="#BFDBFE" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function WaveTop() {
  return (
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginBottom: -1 }}>
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#EFF6FF" />
    </svg>
  );
}

function WaveBottom() {
  return (
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginTop: -1 }}>
      <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="#EFF6FF" />
    </svg>
  );
}



// ---------- Section components ----------

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 8, y: py * -8 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="hero-section">
      <div className="hero-bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="hero-grid" />
      </div>
      <div className="hero-container">
        <div className={`hero-text ${loaded ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-dot" />
            Built for Students. Powered by AI.
          </div>
          <h1 className="hero-headline">
            Bridge the Gap Between{" "}
            <span className="headline-gradient">Learning and Landing</span>{" "}
            Your First Job
          </h1>
          <p className="hero-sub">
            SkillBridge AI analyzes your resume, preps you for interviews, builds your roadmap, and connects you with jobs — all in one premium platform.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started Free</button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span> Watch Demo
            </button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              {["#2563EB", "#06B6D4", "#7C3AED", "#059669", "#EA580C"].map((c, i) => (
                <div key={i} className="trust-avatar" style={{ background: c, zIndex: 5 - i }} />
              ))}
            </div>
            <span className="trust-text">Join <strong>12,000+</strong> students already job-ready</span>
          </div>
        </div>
        <div
          className={`hero-visual ${loaded ? "slide-in" : ""}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
        >
          <div className="hero-visual-glow" />
          <HeroIllustration />
          <div className="hero-float-card hero-float-1">
            <span className="float-dot" /> Resume Verified
          </div>
          <div className="hero-float-card hero-float-2">
            <span className="float-emoji">🎯</span> Job Match Found
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const [ref, visible] = useInView();
  const s1 = useCountUp(12000, 1800, visible);
  const s2 = useCountUp(87, 1600, visible);
  const s3 = useCountUp(4200, 2000, visible);
  const s4 = useCountUp(96, 1500, visible);

  const stats = [
    { value: s1, suffix: "+", label: "Students Onboarded" },
    { value: s2, suffix: "%", label: "Average ATS Score Lift" },
    { value: s3, suffix: "+", label: "Jobs Matched" },
    { value: s4, suffix: "%", label: "Interview Success Rate" },
  ];

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${visible ? "pop-in" : ""}`} style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="stat-number">
              {s.value.toLocaleString()}<span className="stat-suffix">{s.suffix}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <ResumeIcon />,
      title: "Resume Analyzer",
      desc: "Upload your resume and get instant feedback on structure, keywords, and content gaps — tailored to your target role.",
      tag: "Smart Feedback",
    },
    {
      icon: <ATSIcon />,
      title: "ATS Score Checker",
      desc: "See exactly how Applicant Tracking Systems score your resume and what to fix before you hit Submit.",
      tag: "Beat the Bots",
    },
    {
      icon: <InterviewIcon />,
      title: "AI Interview Questions",
      desc: "Practice role-specific questions generated by AI, then get feedback on your answers in real time.",
      tag: "Confidence Builder",
    },
    {
      icon: <RoadmapIcon />,
      title: "Roadmap Generator",
      desc: "Tell us your goal. Get a week-by-week learning plan from zero to job-ready with curated resources.",
      tag: "Your Path",
    },
    {
      icon: <PortfolioIcon />,
      title: "Portfolio Builder",
      desc: "Generate a clean, professional portfolio site from your projects and skills — no design skills needed.",
      tag: "Stand Out",
      premium: true,
    },
    {
      icon: <JobIcon />,
      title: "Job Recommendations",
      desc: "A live dashboard of jobs that match your skill level, location, and career goal — updated daily.",
      tag: "Right Fit",
    },
  ];

  const [ref, visible] = useInView(0.1);

  return (
    <section className="features-section" id="features" ref={ref}>
      <div className="section-label">What SkillBridge Does</div>
      <h2 className="section-title">Everything You Need to Go From Student to Hired</h2>
      <p className="section-sub">Six tools, one platform. No jumping between apps.</p>
      <div className="features-grid">
        {features.map((f, i) => (
          <div
            key={i}
            className={`feature-card ${visible ? "fade-up" : ""} ${f.premium ? "feature-card-premium" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {f.premium && <div className="premium-chip">Premium</div>}
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-tag">{f.tag}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
            <div className="feature-link">Learn more →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      desc: "Sign up, tell us your field of interest, current skill level, and the type of job you're targeting.",
      color: "#2563EB",
    },
    {
      step: "02",
      title: "Upload Your Resume",
      desc: "Our AI reads your resume, checks it against real job descriptions, and gives you a detailed improvement report.",
      color: "#06B6D4",
    },
    {
      step: "03",
      title: "Follow Your Roadmap",
      desc: "Get a personalized learning plan. Track your progress, check off milestones, and stay on course.",
      color: "#7C3AED",
    },
    {
      step: "04",
      title: "Apply with Confidence",
      desc: "Practice interviews, build your portfolio, and apply to matched jobs — all from one dashboard.",
      color: "#059669",
    },
  ];

  const [ref, visible] = useInView(0.1);

  return (
    <div id="how-it-works">
      <WaveTop />
      <section className="how-section" ref={ref}>
        <div className="section-label light">How It Works</div>
        <h2 className="section-title light">From Day One to Day Hired</h2>
        <div className="steps-container">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`step-card ${visible ? "slide-up" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="step-number" style={{ color: s.color, borderColor: s.color + "33", background: s.color + "0D" }}>
                {s.step}
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>
      <WaveBottom />
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Frontend Dev @ TCS",
      avatar: "PS",
      color: "#2563EB",
      quote: "My ATS score went from 54% to 91% in one evening. Got 3 callbacks the following week. This thing is real.",
    },
    {
      name: "Arjun Mehta",
      role: "React Engineer @ Wipro",
      avatar: "AM",
      color: "#06B6D4",
      quote: "The roadmap generator gave me a 12-week plan that actually worked. I stopped feeling lost and started feeling prepared.",
    },
    {
      name: "Sneha Patel",
      role: "Full Stack Dev @ Infosys",
      avatar: "SP",
      color: "#7C3AED",
      quote: "Interview prep alone was worth it. The AI gave me questions I wasn't expecting, and I was asked half of them in my actual interview.",
    },
    {
      name: "Rahul Desai",
      role: "Node.js Dev @ Accenture",
      avatar: "RD",
      color: "#059669",
      quote: "The portfolio builder saved me 2 weeks. Clean output, no fuss. Recruiters actually clicked the link.",
    },
  ];

  const [ref, visible] = useInView(0.1);

  return (
    <section className="testimonials-section" id="stories" ref={ref}>
      <div className="section-label">Student Stories</div>
      <h2 className="section-title">Real Students. Real Offers.</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`testimonial-card ${visible ? "fade-up" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="quote-mark">"</div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- NEW: Hiring Partners section (replaces "Built with a Modern Stack") ----------
function PartnersSection() {
  const partners = [
    { name: "TCS", color: "#0B3D91", bg: "#EAF1FB" },
    { name: "Infosys", color: "#007CC3", bg: "#E8F4FC" },
    { name: "Wipro", color: "#341A5E", bg: "#F1ECF8" },
    { name: "Accenture", color: "#A100FF", bg: "#F6ECFF" },
    { name: "Cognizant", color: "#1A4CA1", bg: "#EAF1FB" },
    { name: "Capgemini", color: "#0070AD", bg: "#E8F4FC" },
    { name: "HCLTech", color: "#0075C9", bg: "#E8F4FC" },
    { name: "Tech Mahindra", color: "#D9272E", bg: "#FCEAEA" },
  ];

  const [ref, visible] = useInView();

  const Badge = ({ p }) => (
    <div className="partner-badge" style={{ background: p.bg }}>
      <span className="partner-mark" style={{ background: p.color }}>{p.name.charAt(0)}</span>
      <span className="partner-name" style={{ color: p.color }}>{p.name}</span>
    </div>
  );

  return (
    <section className="partners-section" id="partners" ref={ref}>
      <div className={`partners-head ${visible ? "fade-up" : ""}`}>
        <div className="section-label">Hiring Partners</div>
        <h2 className="section-title">Companies Where Our Graduates Now Work</h2>
        <p className="section-sub">SkillBridge students have gone on to join engineering teams at India's leading technology employers.</p>
      </div>

      <div className={`marquee-wrap ${visible ? "fade-up" : ""}`} style={{ animationDelay: "0.1s" }}>
        <div className="marquee-row marquee-left">
          {[...partners, ...partners].map((p, i) => <Badge p={p} key={`a-${i}`} />)}
        </div>
        <div className="marquee-row marquee-right">
          {[...partners.slice().reverse(), ...partners.slice().reverse()].map((p, i) => <Badge p={p} key={`b-${i}`} />)}
        </div>
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />
      </div>

      <div className={`partners-footnote ${visible ? "fade-up" : ""}`} style={{ animationDelay: "0.2s" }}>
        + 50 more partner companies actively hiring SkillBridge graduates every quarter
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, visible] = useInView();
  return (
    <section className="cta-section" ref={ref}>
      <div className={`cta-inner ${visible ? "fade-in" : ""}`}>
        <div className="cta-blob" />
        <div className="cta-blob cta-blob-2" />
        <div className="cta-tag">Start Today. It's Free.</div>
        <h2 className="cta-title">Your First Job Is Closer Than You Think</h2>
        <p className="cta-sub">
          Thousands of students have used SkillBridge AI to land their first dev role. Now it's your turn.
        </p>
        <div className="cta-actions">
          <button className="btn-cta-primary">Create Free Account</button>
          <button className="btn-cta-ghost">See all Features</button>
        </div>
        <div className="cta-note">No credit card needed · Free forever plan available</div>
      </div>
    </section>
  );
}

// ---------- Back to top ----------
function BackToTop() {
  const y = useScrollY();
  const visible = y > 600;
  return (
    <button
      className={`back-to-top ${visible ? "back-to-top-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

// ---------- Scroll progress bar ----------
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// ---------- Styles ----------
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #2563EB;
    --blue-dark: #1E40AF;
    --blue-light: #EFF6FF;
    --cyan: #06B6D4;
    --gold: #F59E0B;
    --bg: #F8FAFC;
    --card: #FFFFFF;
    --text: #0F172A;
    --text-muted: #64748B;
    --border: #E2E8F0;
    --font-display: 'Sora', 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 { font-family: var(--font-display); }

  a { text-decoration: none; color: inherit; }

  :focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 3px;
    border-radius: 6px;
  }

  /* ---- animations ---- */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes blobFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(1.05); } }
  @keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

  .fade-in { animation: fadeIn 0.7s ease forwards; }
  .slide-in { animation: slideInRight 0.75s ease forwards; }
  .fade-up { opacity: 0; animation: fadeUp 0.6s ease forwards; }
  .pop-in { opacity: 0; animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .slide-up { opacity: 0; animation: slideUp 0.6s ease forwards; }

  @media (prefers-reduced-motion: reduce) {
    .fade-in, .slide-in, .fade-up, .pop-in, .slide-up,
    .blob, .hero-float-card, .marquee-row, .badge-dot { animation: none !important; opacity: 1 !important; }
  }

  /* ---- scroll progress ---- */
  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--blue), var(--cyan));
    z-index: 1000;
    transition: width 0.1s ease-out;
  }

  /* ---- navbar ---- */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: transparent;
    transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
  }
  .navbar-scrolled {
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 1px 0 rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04);
  }
  .navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    color: var(--text);
  }
  .brand-accent { color: var(--blue); }
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 32px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
  }
  .navbar-links a { transition: color 0.2s; }
  .navbar-links a:hover { color: var(--blue); }
  .btn-nav-cta {
    background: var(--blue);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    font-family: var(--font-body);
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 14px rgba(37,99,235,0.3);
  }
  .btn-nav-cta:hover { background: var(--blue-dark); transform: translateY(-1px); }
  .navbar-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
  }
  .navbar-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
  }

  /* ---- hero ---- */
  .hero-section {
    position: relative;
    overflow: hidden;
    padding: 64px 24px 100px;
    background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 60%, #ECFEFF 100%);
  }
  .hero-bg-blobs { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent);
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    animation: blobFloat 8s ease-in-out infinite;
  }
  .blob-1 { width: 400px; height: 400px; background: rgba(37,99,235,0.12); top: -100px; left: -80px; }
  .blob-2 { width: 320px; height: 320px; background: rgba(6,182,212,0.10); top: 50px; right: 0; animation-delay: 2s; }
  .blob-3 { width: 280px; height: 280px; background: rgba(124,58,237,0.07); bottom: -60px; left: 40%; animation-delay: 4s; }

  .hero-container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 60px;
  }
  .hero-text { opacity: 0; }
  .hero-visual {
    opacity: 0;
    position: relative;
    transition: transform 0.2s ease-out;
    transform-style: preserve-3d;
  }
  .hero-visual-glow {
    position: absolute;
    inset: 6%;
    background: radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%);
    filter: blur(40px);
    z-index: -1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #BFDBFE;
    color: var(--blue);
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(37,99,235,0.08);
  }
  .badge-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .hero-headline {
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin-bottom: 20px;
    color: var(--text);
  }
  .headline-gradient {
    background: linear-gradient(90deg, var(--blue), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 17px;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 36px;
    max-width: 480px;
  }
  .hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .btn-primary {
    background: var(--blue);
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
  }
  .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.4); }
  .btn-secondary {
    background: white;
    color: var(--blue);
    border: 1.5px solid #BFDBFE;
    padding: 14px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .btn-secondary:hover { border-color: var(--blue); box-shadow: 0 2px 10px rgba(37,99,235,0.12); }
  .play-icon {
    width: 28px; height: 28px;
    background: var(--blue-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: var(--blue);
  }

  .hero-trust { display: flex; align-items: center; gap: 12px; }
  .trust-avatars { display: flex; }
  .trust-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -8px;
  }
  .trust-avatar:first-child { margin-left: 0; }
  .trust-text { font-size: 13px; color: var(--text-muted); }
  .trust-text strong { color: var(--text); }

  .hero-svg { width: 100%; height: auto; filter: drop-shadow(0 16px 40px rgba(37,99,235,0.12)); }

  .hero-float-card {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text);
    box-shadow: 0 12px 30px rgba(15,23,42,0.12);
    animation: floatCard 4s ease-in-out infinite;
  }
  .hero-float-1 { top: -6px; left: -6%; animation-delay: 0.4s; }
  .hero-float-2 { bottom: 6%; right: -6%; animation-delay: 1.2s; }
  .float-dot { width: 8px; height: 8px; border-radius: 50%; background: #10B981; }
  .float-emoji { font-size: 14px; }

  /* ---- stats ---- */
  .stats-section { padding: 0 24px 80px; }
  .stats-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .stat-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 20px;
    text-align: center;
    opacity: 0;
    box-shadow: 0 1px 8px rgba(15,23,42,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover { box-shadow: 0 6px 24px rgba(37,99,235,0.12); transform: translateY(-2px); }
  .stat-number { font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--blue); line-height: 1; }
  .stat-suffix { font-size: 1.4rem; }
  .stat-label { font-size: 13px; color: var(--text-muted); margin-top: 6px; font-weight: 500; }

  /* ---- features ---- */
  .features-section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 12px;
  }
  .section-label.light { color: #93C5FD; }
  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 12px;
  }
  .section-title.light { color: white; }
  .section-sub { font-size: 16px; color: var(--text-muted); margin-bottom: 52px; }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .feature-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 28px;
    opacity: 0;
    cursor: pointer;
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s, backdrop-filter 0.25s;
    position: relative;
    overflow: hidden;
  }
  .feature-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--blue-light), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .feature-card:hover {
    box-shadow: 0 12px 40px rgba(37,99,235,0.16);
    transform: translateY(-4px);
    border-color: #BFDBFE;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(6px);
  }
  .feature-card:hover::after { opacity: 0.4; }
  .feature-card-premium {
    border-color: rgba(245,158,11,0.35);
    background: linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 60%);
  }
  .premium-chip {
    position: absolute;
    top: 18px; right: 18px;
    background: linear-gradient(90deg, var(--gold), #FBBF24);
    color: white;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    box-shadow: 0 4px 12px rgba(245,158,11,0.35);
  }
  .feature-icon { margin-bottom: 16px; }
  .feature-tag {
    font-size: 11px;
    font-weight: 600;
    color: var(--cyan);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .feature-title { font-size: 17px; font-weight: 700; margin-bottom: 10px; font-family: var(--font-display); }
  .feature-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin-bottom: 16px; }
  .feature-link { font-size: 14px; font-weight: 600; color: var(--blue); }

  /* ---- how it works ---- */
  .how-section {
    background: linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #0369A1 100%);
    padding: 80px 24px;
    text-align: center;
  }
  .steps-container {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }
  .step-card {
    padding: 32px 20px;
    position: relative;
    opacity: 0;
  }
  .step-number {
    width: 56px; height: 56px;
    border-radius: 14px;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 800;
    font-family: var(--font-display);
    margin: 0 auto 20px;
  }
  .step-title { font-size: 16px; font-weight: 700; color: white; margin-bottom: 10px; }
  .step-desc { font-size: 14px; color: #BFDBFE; line-height: 1.65; }
  .step-arrow {
    position: absolute;
    top: 52px;
    right: -14px;
    font-size: 22px;
    color: rgba(255,255,255,0.3);
    z-index: 1;
  }

  /* ---- testimonials ---- */
  .testimonials-section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .testimonial-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 32px;
    opacity: 0;
    position: relative;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .testimonial-card:hover { box-shadow: 0 8px 32px rgba(37,99,235,0.10); transform: translateY(-2px); }
  .quote-mark { font-size: 64px; color: #DBEAFE; line-height: 0.6; margin-bottom: 16px; font-family: Georgia, serif; }
  .testimonial-quote { font-size: 15px; color: var(--text); line-height: 1.7; margin-bottom: 24px; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .testimonial-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .author-name { font-size: 14px; font-weight: 700; color: var(--text); }
  .author-role { font-size: 12px; color: var(--text-muted); }

  /* ---- hiring partners (replaces tech stack) ---- */
  .partners-section {
    padding: 80px 24px 96px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .partners-head { opacity: 0; }
  .partners-head .section-sub { margin-bottom: 48px; max-width: 560px; margin-left: auto; margin-right: auto; }

  .marquee-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 18px;
    overflow: hidden;
    padding: 8px 0;
    opacity: 0;
    mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  }
  .marquee-row {
    display: flex;
    gap: 16px;
    width: max-content;
  }
  .marquee-left { animation: marqueeLeft 32s linear infinite; }
  .marquee-right { animation: marqueeRight 32s linear infinite; }
  .marquee-wrap:hover .marquee-row { animation-play-state: paused; }

  .partner-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    border-radius: 14px;
    border: 1px solid rgba(15,23,42,0.05);
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .partner-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
  .partner-mark {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 13px;
    font-weight: 800;
    font-family: var(--font-display);
    flex-shrink: 0;
  }
  .partner-name { font-size: 15px; font-weight: 700; font-family: var(--font-display); }

  .marquee-fade { display: none; }

  .partners-footnote {
    margin-top: 36px;
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 500;
    opacity: 0;
  }

  /* ---- CTA ---- */
  .cta-section { padding: 80px 24px 100px; }
  .cta-inner {
    max-width: 740px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(135deg, #1E40AF 0%, #2563EB 60%, #0369A1 100%);
    border-radius: 28px;
    padding: 72px 48px;
    position: relative;
    overflow: hidden;
    opacity: 0;
  }
  .cta-blob {
    position: absolute;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    top: -80px; right: -60px;
  }
  .cta-blob-2 {
    width: 180px; height: 180px;
    bottom: -60px; left: -40px;
    top: auto; right: auto;
  }
  .cta-tag {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    color: #BAE6FD;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .cta-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: white; margin-bottom: 16px; letter-spacing: -0.02em; }
  .cta-sub { font-size: 16px; color: #BAE6FD; line-height: 1.7; margin-bottom: 36px; }
  .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
  .btn-cta-primary {
    background: white;
    color: var(--blue);
    border: none;
    padding: 14px 30px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-body);
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
  .btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .btn-cta-ghost {
    background: rgba(255,255,255,0.12);
    color: white;
    border: 1.5px solid rgba(255,255,255,0.3);
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-cta-ghost:hover { background: rgba(255,255,255,0.2); }
  .cta-note { font-size: 13px; color: rgba(255,255,255,0.5); }

  /* ---- footer ---- */
  .footer { padding: 40px 24px 32px; border-top: 1px solid var(--border); }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  .footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
  }
  .footer-links { display: flex; gap: 24px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
  .footer-links a:hover { color: var(--blue); }
  .footer-copy { font-size: 12px; color: var(--text-muted); width: 100%; text-align: center; }
  @media (min-width: 768px) {
    .footer-copy { width: auto; }
  }

  /* ---- back to top ---- */
  .back-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 46px; height: 46px;
    border-radius: 50%;
    background: var(--blue);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(37,99,235,0.35);
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: opacity 0.25s, transform 0.25s, background 0.2s;
    z-index: 90;
  }
  .back-to-top-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .back-to-top:hover { background: var(--blue-dark); }

  /* ---- responsive ---- */
  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .steps-container { grid-template-columns: repeat(2, 1fr); }
    .step-arrow { display: none; }
    .navbar-links { gap: 20px; }
  }

  @media (max-width: 860px) {
    .navbar-links {
      position: absolute;
      top: 100%;
      left: 0; right: 0;
      background: white;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
      padding: 20px 24px 28px;
      box-shadow: 0 12px 24px rgba(15,23,42,0.08);
      transform: translateY(-8px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
    }
    .navbar-links-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    .navbar-links .btn-nav-cta { width: 100%; text-align: center; }
    .navbar-toggle { display: flex; }
  }

  @media (max-width: 768px) {
    .hero-container { grid-template-columns: 1fr; gap: 40px; }
    .hero-visual { order: -1; }
    .hero-sub { max-width: 100%; }
    .hero-section { padding: 24px 20px 80px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .steps-container { grid-template-columns: 1fr; max-width: 380px; }
    .cta-inner { padding: 48px 28px; }
    .hero-actions { flex-direction: column; }
    .btn-primary, .btn-secondary { width: 100%; justify-content: center; text-align: center; }
    .hero-float-card { display: none; }
    .hero-visual { transform: none !important; }
  }

  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .stat-card { padding: 20px 14px; }
    .stat-number { font-size: 1.8rem; }
    .features-section, .testimonials-section, .partners-section { padding: 60px 16px; }
    .feature-card, .testimonial-card { padding: 22px; }
    .cta-inner { border-radius: 18px; padding: 40px 20px; }
    .back-to-top { bottom: 16px; right: 16px; width: 42px; height: 42px; }
  }
`;

// ---------- Main Export ----------
export default function SkillBridgeHome() {
  return (
    <>
      <style>{styles}</style>
      <ScrollProgress />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}