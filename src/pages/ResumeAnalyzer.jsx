import { useState, useRef, useCallback } from 'react';

// ─── Icons ────────────────────────────────────────────────────────
function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function AlertIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function StarIcon({ filled = false, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

// ─── Mock AI Analysis Engine ──────────────────────────────────────
function analyzeResume(fileName, fileSize) {
  const seed = fileName.length + fileSize;
  const rng = (min, max) => min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min);

  const overallScore = Math.round(rng(55, 95));
  const atsScore = Math.round(rng(50, 92));
  const readabilityScore = Math.round(rng(60, 98));
  const keywordScore = Math.round(rng(45, 88));

  return {
    overallScore,
    atsScore,
    readabilityScore,
    keywordScore,
    name: 'Resume Analysis',
    sections: {
      contact: overallScore > 70,
      summary: overallScore > 65,
      experience: true,
      education: true,
      skills: overallScore > 60,
      projects: overallScore > 72,
      certifications: overallScore > 80,
    },
    presentSkills: [
      'JavaScript', 'React', 'Node.js', 'Python', 'SQL',
      'Git', 'REST APIs', 'Problem Solving', 'Communication',
    ].slice(0, Math.round(rng(5, 9))),
    missingSkills: [
      'Docker', 'Kubernetes', 'AWS', 'TypeScript', 'GraphQL',
      'CI/CD', 'Machine Learning', 'System Design',
    ].slice(0, Math.round(rng(3, 6))),
    strengths: [
      'Strong technical skills section with relevant technologies',
      'Clear and concise work experience descriptions',
      'Good use of action verbs and quantified achievements',
      'Well-structured education section',
      'Projects demonstrate practical application of skills',
    ].slice(0, Math.round(rng(2, 4))),
    improvements: [
      'Add a professional summary to improve ATS compatibility',
      'Quantify more achievements with metrics and numbers',
      'Include relevant certifications and online courses',
      'Add LinkedIn and GitHub profile links',
      'Use industry-standard keywords for your target role',
      'Improve formatting consistency across all sections',
    ].slice(0, Math.round(rng(3, 5))),
    jobMatches: [
      { title: 'Frontend Developer', match: Math.round(rng(70, 95)) },
      { title: 'Full Stack Engineer', match: Math.round(rng(60, 88)) },
      { title: 'Software Engineer', match: Math.round(rng(55, 85)) },
      { title: 'React Developer', match: Math.round(rng(75, 98)) },
      { title: 'UI/UX Developer', match: Math.round(rng(45, 80)) },
    ].sort((a, b) => b.match - a.match),
    wordCount: Math.round(rng(350, 750)),
    pageCount: overallScore > 78 ? 2 : 1,
    analysisDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

// ─── Score Ring Component ─────────────────────────────────────────
function ScoreRing({ score, size = 140, label, color = '#2563EB' }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const scoreColor = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const ringColor = color === 'auto' ? scoreColor : color;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={ringColor} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: size > 120 ? 28 : 22, fontWeight: 800, color: ringColor, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>/100</span>
        </div>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

// ─── Progress Bar Component ───────────────────────────────────────
function ProgressBar({ value, label, color }) {
  const barColor = color || (value >= 80 ? '#10B981' : value >= 60 ? '#F59E0B' : '#EF4444');
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: barColor }}>{value}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          borderRadius: 99,
          background: `linear-gradient(90deg, ${barColor}cc, ${barColor})`,
          transition: 'width 1.2s ease-in-out',
        }} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function ResumeAnalyzer() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);

  const acceptedTypes = ['application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (!acceptedTypes.includes(f.type) && !f.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.');
      return;
    }
    setFile(f);
    setResult(null);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setProgress(0);

    // Simulate analysis steps
    const steps = [
      { p: 15, delay: 400 },
      { p: 35, delay: 600 },
      { p: 55, delay: 500 },
      { p: 72, delay: 700 },
      { p: 88, delay: 400 },
      { p: 100, delay: 600 },
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      setProgress(step.p);
    }

    await new Promise(r => setTimeout(r, 300));
    const analysis = analyzeResume(file.name, file.size);
    setResult(analysis);
    setAnalyzing(false);
    setActiveTab('overview');
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setAnalyzing(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getScoreLabel = (s) => s >= 80 ? 'Excellent' : s >= 65 ? 'Good' : s >= 50 ? 'Fair' : 'Needs Work';
  const getScoreColor = (s) => s >= 80 ? '#10B981' : s >= 65 ? '#F59E0B' : '#EF4444';

  const analysisSteps = [
    'Parsing document structure...',
    'Extracting text content...',
    'Scanning keywords & skills...',
    'Checking ATS compatibility...',
    'Evaluating content quality...',
    'Generating recommendations...',
  ];

  const currentStep = analyzing ? Math.min(Math.floor(progress / 17), 5) : 0;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'skills', label: '⚡ Skills' },
    { id: 'sections', label: '📋 Sections' },
    { id: 'jobs', label: '💼 Job Matches' },
    { id: 'tips', label: '💡 Tips' },
  ];

  return (
    <div style={styles.page}>
      {/* ── Drive-style Header ── */}
      <div style={styles.driveHeader}>
        <div style={styles.driveHeaderLeft}>
          <div style={styles.titleRow}>
            <h1 style={styles.driveTitle}>Resume AI</h1>
            <div style={styles.folderIconContainer}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
          </div>
          <p style={styles.driveGreeting}>
            Upload your resume and get instant AI-powered insights, ATS compatibility score, skill gap analysis, and personalized improvement tips.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        {/* ── Upload Zone ── */}
        {!result && (
          <div style={styles.uploadSection}>
            <div
              style={{
                ...styles.dropZone,
                ...(dragOver ? styles.dropZoneActive : {}),
                ...(file ? styles.dropZoneHasFile : {}),
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && !file && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])}
                id="resume-file-input"
              />

              {!file ? (
                <div style={styles.dropContent}>
                  <div style={styles.uploadIconWrap}>
                    <UploadIcon />
                  </div>
                  <h3 style={styles.dropTitle}>Drop your resume here</h3>
                  <p style={styles.dropSub}>or <span style={styles.dropLink}>browse files</span></p>
                  <div style={styles.dropFormats}>
                    {['PDF', 'DOC', 'DOCX', 'TXT'].map(fmt => (
                      <span key={fmt} style={styles.formatBadge}>{fmt}</span>
                    ))}
                  </div>
                  <p style={styles.dropLimit}>Maximum file size: 5MB</p>
                </div>
              ) : (
                <div style={styles.filePreview}>
                  <div style={styles.fileIconWrap}>
                    <FileTextIcon />
                  </div>
                  <div style={styles.fileInfo}>
                    <p style={styles.fileName}>{file.name}</p>
                    <p style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleReset(); }}
                    style={styles.removeBtn}
                    aria-label="Remove file"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            {file && !analyzing && (
              <button onClick={handleAnalyze} style={styles.analyzeBtn} id="analyze-btn">
                <span style={{ fontSize: 18 }}>🚀</span>
                Analyze My Resume
              </button>
            )}

            {/* Progress */}
            {analyzing && (
              <div style={styles.progressCard}>
                <div style={styles.progressHeader}>
                  <div style={styles.progressSpinner} />
                  <span style={styles.progressTitle}>Analyzing your resume...</span>
                </div>
                <div style={styles.progressBarWrap}>
                  <div style={styles.progressBarTrack}>
                    <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
                  </div>
                  <span style={styles.progressPct}>{progress}%</span>
                </div>
                <div style={styles.stepsList}>
                  {analysisSteps.map((step, i) => (
                    <div key={i} style={styles.stepItem}>
                      <span style={{
                        ...styles.stepDot,
                        background: i < currentStep ? '#10B981' : i === currentStep ? '#2563EB' : '#E2E8F0',
                      }} />
                      <span style={{
                        fontSize: 13,
                        color: i < currentStep ? '#10B981' : i === currentStep ? '#2563EB' : '#94A3B8',
                        fontWeight: i <= currentStep ? 500 : 400,
                      }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Results ── */}
        {result && (
          <div style={styles.results}>
            {/* Result Header */}
            <div style={styles.resultHeader}>
              <div style={styles.resultHeaderLeft}>
                <div style={styles.resultFileChip}>
                  <FileTextIcon />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{file.name}</span>
                </div>
                <p style={styles.resultDate}>Analyzed on {result.analysisDate}</p>
              </div>
              <button onClick={handleReset} style={styles.newAnalysisBtn} id="new-analysis-btn">
                + Analyze New Resume
              </button>
            </div>

            {/* Score Hero */}
            <div style={styles.scoreHero}>
              <div style={styles.scoreHeroBg} />
              <div style={styles.scoreHeroContent}>
                <div style={styles.mainScoreWrap}>
                  <ScoreRing score={result.overallScore} size={160} label="Overall Score" color="auto" />
                  <div style={styles.scoreVerdict}>
                    <div style={{
                      ...styles.verdictBadge,
                      background: `${getScoreColor(result.overallScore)}20`,
                      color: getScoreColor(result.overallScore),
                      border: `1.5px solid ${getScoreColor(result.overallScore)}40`,
                    }}>
                      {getScoreLabel(result.overallScore)}
                    </div>
                    <h2 style={styles.verdictTitle}>
                      {result.overallScore >= 80
                        ? 'Your resume is impressive! 🎉'
                        : result.overallScore >= 65
                        ? 'Your resume is solid with room to improve 📈'
                        : 'Your resume needs some work 🔧'}
                    </h2>
                    <p style={styles.verdictSub}>
                      {result.wordCount} words · {result.pageCount} page{result.pageCount > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div style={styles.subScores}>
                  <ScoreRing score={result.atsScore} size={100} label="ATS Score" color="#8B5CF6" />
                  <ScoreRing score={result.readabilityScore} size={100} label="Readability" color="#06B6D4" />
                  <ScoreRing score={result.keywordScore} size={100} label="Keywords" color="#F59E0B" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabsWrap}>
              <div style={styles.tabs}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      ...styles.tab,
                      ...(activeTab === tab.id ? styles.tabActive : {}),
                    }}
                    id={`tab-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div style={styles.tabContent}>

              {/* ─ Overview Tab ─ */}
              {activeTab === 'overview' && (
                <div style={styles.grid2}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <TrendingIcon />
                      Score Breakdown
                    </h3>
                    <div style={{ marginTop: 16 }}>
                      <ProgressBar value={result.atsScore} label="ATS Compatibility" color="#8B5CF6" />
                      <ProgressBar value={result.readabilityScore} label="Readability & Format" color="#06B6D4" />
                      <ProgressBar value={result.keywordScore} label="Keyword Density" color="#F59E0B" />
                      <ProgressBar
                        value={Math.round((Object.values(result.sections).filter(Boolean).length / Object.keys(result.sections).length) * 100)}
                        label="Section Completeness"
                        color="#10B981"
                      />
                    </div>
                  </div>

                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <ShieldIcon />
                      Quick Summary
                    </h3>
                    <div style={{ marginTop: 16 }}>
                      {[
                        { label: 'Word Count', value: result.wordCount, good: result.wordCount >= 400 },
                        { label: 'Page Count', value: `${result.pageCount} page${result.pageCount > 1 ? 's' : ''}`, good: result.pageCount <= 2 },
                        { label: 'Skills Found', value: result.presentSkills.length, good: result.presentSkills.length >= 6 },
                        { label: 'Missing Skills', value: result.missingSkills.length, good: result.missingSkills.length <= 3 },
                        { label: 'ATS Friendly', value: result.atsScore >= 70 ? 'Yes' : 'Partially', good: result.atsScore >= 70 },
                      ].map(({ label, value, good }) => (
                        <div key={label} style={styles.summaryRow}>
                          <span style={styles.summaryLabel}>{label}</span>
                          <div style={styles.summaryRight}>
                            <span style={styles.summaryValue}>{value}</span>
                            <span style={{ color: good ? '#10B981' : '#F59E0B' }}>
                              {good ? <CheckIcon /> : <AlertIcon />}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.strengths.length > 0 && (
                    <div style={styles.card}>
                      <h3 style={styles.cardTitle}>
                        <span style={{ fontSize: 20 }}>✅</span>
                        What's Working
                      </h3>
                      <ul style={styles.list}>
                        {result.strengths.map((s, i) => (
                          <li key={i} style={styles.listItemGood}>
                            <span style={styles.listDotGood}><CheckIcon size={12} /></span>
                            <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <span style={{ fontSize: 20 }}>⚠️</span>
                      Needs Improvement
                    </h3>
                    <ul style={styles.list}>
                      {result.improvements.map((imp, i) => (
                        <li key={i} style={styles.listItemWarn}>
                          <span style={styles.listDotWarn}><AlertIcon size={12} /></span>
                          <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ─ Skills Tab ─ */}
              {activeTab === 'skills' && (
                <div style={styles.grid2}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <span style={{ fontSize: 20 }}>✅</span>
                      Skills Found ({result.presentSkills.length})
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                      These skills were detected in your resume
                    </p>
                    <div style={styles.skillGrid}>
                      {result.presentSkills.map(skill => (
                        <span key={skill} style={styles.skillTagGood}>
                          <CheckIcon size={12} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <span style={{ fontSize: 20 }}>❌</span>
                      Missing Skills ({result.missingSkills.length})
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                      High-demand skills not found in your resume
                    </p>
                    <div style={styles.skillGrid}>
                      {result.missingSkills.map(skill => (
                        <span key={skill} style={styles.skillTagMissing}>
                          <XIcon size={12} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                    <h3 style={styles.cardTitle}>
                      <TrendingIcon />
                      Skill Match Rate
                    </h3>
                    <div style={styles.skillMatchBar}>
                      <div style={styles.skillMatchTrack}>
                        <div style={{
                          ...styles.skillMatchFill,
                          width: `${Math.round(result.presentSkills.length / (result.presentSkills.length + result.missingSkills.length) * 100)}%`,
                        }} />
                      </div>
                      <div style={styles.skillMatchLabels}>
                        <span style={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>
                          ✅ {result.presentSkills.length} matched
                        </span>
                        <span style={{ color: '#EF4444', fontWeight: 600, fontSize: 14 }}>
                          ❌ {result.missingSkills.length} missing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─ Sections Tab ─ */}
              {activeTab === 'sections' && (
                <div style={styles.grid1}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <span style={{ fontSize: 20 }}>📋</span>
                      Resume Sections Checklist
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                      Complete resumes with all key sections score higher with ATS systems
                    </p>
                    <div style={styles.sectionGrid}>
                      {Object.entries(result.sections).map(([key, present]) => {
                        const labels = {
                          contact: { label: 'Contact Information', icon: '📞', desc: 'Phone, email, location, LinkedIn' },
                          summary: { label: 'Professional Summary', icon: '📝', desc: 'Career objective or summary statement' },
                          experience: { label: 'Work Experience', icon: '💼', desc: 'Job history with achievements' },
                          education: { label: 'Education', icon: '🎓', desc: 'Degrees, institutions, graduation year' },
                          skills: { label: 'Skills Section', icon: '⚡', desc: 'Technical and soft skills list' },
                          projects: { label: 'Projects', icon: '🚀', desc: 'Portfolio or notable projects' },
                          certifications: { label: 'Certifications', icon: '🏆', desc: 'Professional certifications & courses' },
                        };
                        const { label, icon, desc } = labels[key] || { label: key, icon: '📄', desc: '' };
                        return (
                          <div key={key} style={{
                            ...styles.sectionItem,
                            borderColor: present ? '#10B98130' : '#EF444430',
                            background: present ? '#F0FDF4' : '#FFF1F2',
                          }}>
                            <span style={styles.sectionIcon}>{icon}</span>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', marginBottom: 2 }}>{label}</p>
                              <p style={{ fontSize: 12, color: '#64748B' }}>{desc}</p>
                            </div>
                            <div style={{
                              width: 28, height: 28, borderRadius: '50%',
                              background: present ? '#10B981' : '#EF4444',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'white', flexShrink: 0,
                            }}>
                              {present ? <CheckIcon size={14} /> : <XIcon size={14} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ─ Job Matches Tab ─ */}
              {activeTab === 'jobs' && (
                <div style={styles.grid1}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <BriefcaseIcon />
                      Best Job Role Matches
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                      Based on your skills and experience, here are the best matching roles
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {result.jobMatches.map((job, i) => (
                        <div key={job.title} style={styles.jobMatchItem}>
                          <div style={styles.jobMatchRank}>
                            {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
                              <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{job.title}</span>
                              <span style={{
                                fontSize: 14, fontWeight: 700,
                                color: job.match >= 80 ? '#10B981' : job.match >= 65 ? '#F59E0B' : '#EF4444',
                              }}>
                                {job.match}% match
                              </span>
                            </div>
                            <div style={{ height: 8, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' }}>
                              <div style={{
                                height: '100%',
                                width: `${job.match}%`,
                                borderRadius: 99,
                                background: job.match >= 80
                                  ? 'linear-gradient(90deg, #10B98180, #10B981)'
                                  : job.match >= 65
                                  ? 'linear-gradient(90deg, #F59E0B80, #F59E0B)'
                                  : 'linear-gradient(90deg, #EF444480, #EF4444)',
                                transition: 'width 1.2s ease',
                              }} />
                            </div>
                          </div>
                          <div style={{
                            ...styles.matchBadge,
                            background: job.match >= 80 ? '#F0FDF4' : job.match >= 65 ? '#FFFBEB' : '#FFF1F2',
                            color: job.match >= 80 ? '#10B981' : job.match >= 65 ? '#D97706' : '#EF4444',
                          }}>
                            {job.match >= 80 ? 'Excellent' : job.match >= 65 ? 'Good' : 'Fair'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─ Tips Tab ─ */}
              {activeTab === 'tips' && (
                <div style={styles.grid1}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <LightbulbIcon />
                      AI-Powered Recommendations
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                      Personalized tips to make your resume stand out and pass ATS filters
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {[
                        {
                          priority: 'High', icon: '🎯',
                          title: 'Add Quantified Achievements',
                          tip: 'Replace generic statements with specific metrics. E.g., "Improved performance by 40%" instead of "Improved performance".',
                        },
                        {
                          priority: 'High', icon: '🔑',
                          title: 'Optimize for ATS Keywords',
                          tip: 'Study job descriptions for your target role and naturally incorporate matching keywords throughout your resume.',
                        },
                        {
                          priority: 'Medium', icon: '📊',
                          title: 'Use Strong Action Verbs',
                          tip: 'Start each bullet point with powerful verbs like "Architected", "Spearheaded", "Optimized", "Delivered".',
                        },
                        {
                          priority: 'Medium', icon: '🎨',
                          title: 'Improve Visual Formatting',
                          tip: 'Use consistent fonts, proper spacing, and clear section headers. Avoid tables and graphics that confuse ATS.',
                        },
                        {
                          priority: 'Low', icon: '🌐',
                          title: 'Add Online Presence',
                          tip: 'Include links to your LinkedIn profile, GitHub portfolio, or personal website to increase credibility.',
                        },
                        {
                          priority: 'Low', icon: '📚',
                          title: 'Highlight Continuous Learning',
                          tip: 'Add recent certifications, online courses, or workshops to demonstrate a growth mindset.',
                        },
                      ].map((tip, i) => (
                        <div key={i} style={styles.tipCard}>
                          <div style={styles.tipHeader}>
                            <span style={styles.tipIcon}>{tip.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <h4 style={styles.tipTitle}>{tip.title}</h4>
                                <span style={{
                                  ...styles.priorityBadge,
                                  background: tip.priority === 'High' ? '#FEF2F2' : tip.priority === 'Medium' ? '#FFFBEB' : '#F0FDF4',
                                  color: tip.priority === 'High' ? '#EF4444' : tip.priority === 'Medium' ? '#D97706' : '#10B981',
                                }}>
                                  {tip.priority} Priority
                                </span>
                              </div>
                              <p style={styles.tipText}>{tip.tip}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resume Rating */}
                  <div style={{ ...styles.card, background: 'linear-gradient(135deg, #667eea15, #764ba215)' }}>
                    <h3 style={styles.cardTitle}>
                      <span style={{ fontSize: 20 }}>⭐</span>
                      Resume Rating
                    </h3>
                    <div style={styles.ratingWrap}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} style={{
                          color: star <= Math.round(result.overallScore / 20) ? '#F59E0B' : '#E2E8F0',
                          fontSize: 32,
                        }}>
                          <StarIcon filled={star <= Math.round(result.overallScore / 20)} size={32} />
                        </span>
                      ))}
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginLeft: 8 }}>
                        {(result.overallScore / 20).toFixed(1)} / 5.0
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 12 }}>
                      {result.overallScore >= 80
                        ? 'Your resume is highly competitive. Minor tweaks will make it perfect!'
                        : result.overallScore >= 65
                        ? 'Good foundation. Focus on the high-priority recommendations above.'
                        : 'Significant improvements needed. Start with the high-priority tips.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Features Section (shown before upload) ── */}
        {!result && !analyzing && (
          <div style={styles.featuresSection}>
            <h2 style={styles.featuresTitle}>What We Analyze</h2>
            <div style={styles.featuresGrid}>
              {[
                { icon: '🎯', title: 'ATS Compatibility', desc: 'Check if your resume passes Applicant Tracking Systems used by 99% of Fortune 500 companies' },
                { icon: '⚡', title: 'Skill Gap Analysis', desc: 'Identify missing in-demand skills and get recommendations on what to add to your resume' },
                { icon: '📊', title: 'Score & Rating', desc: 'Get an overall score out of 100 with detailed breakdowns for each aspect of your resume' },
                { icon: '💼', title: 'Job Role Matching', desc: 'See which job roles your resume is best suited for based on your experience and skills' },
                { icon: '📝', title: 'Content Quality', desc: 'Evaluate the quality of your writing, action verbs, and achievement quantification' },
                { icon: '💡', title: 'Smart Tips', desc: 'Receive AI-generated, personalized recommendations to make your resume stand out' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={styles.featureCard}>
                  <div style={styles.featureIcon}>{icon}</div>
                  <h3 style={styles.featureTitle}>{title}</h3>
                  <p style={styles.featureDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ra-grid-2 { grid-template-columns: 1fr !important; }
          .ra-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .ra-tab { white-space: nowrap; font-size: 12px !important; padding: 8px 12px !important; }
          .ra-score-hero-content { flex-direction: column !important; }
          .ra-sub-scores { justify-content: center !important; }
          .ra-features-grid { grid-template-columns: 1fr !important; }
          .ra-hero-stats { gap: 20px !important; }
          .ra-hero-title { font-size: 2rem !important; }
          .ra-main-score-wrap { flex-direction: column !important; align-items: center !important; }
        }
        @media (max-width: 480px) {
          .ra-hero-title { font-size: 1.7rem !important; }
          .ra-features-grid { grid-template-columns: 1fr !important; }
          .ra-sub-scores { gap: 16px !important; }
        }
        @keyframes ra-spin { to { transform: rotate(360deg); } }
        @keyframes ra-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ra-slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ra-fade-in { from{opacity:0} to{opacity:1} }
        .ra-analyze-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 36px rgba(37,99,235,0.45) !important; }
        .ra-tab:hover:not(.ra-tab-active) { background: #F8FAFC !important; color: #374151 !important; }
        .ra-feature-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
        .ra-drop-zone:hover:not(.has-file) { border-color: #2563EB !important; background: #EFF6FF !important; }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: 'calc(100vh - 68px)',
    background: '#FFFFFF',
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: '24px 32px 60px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  driveHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 20,
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 16,
  },
  driveHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  driveTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0F172A',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  folderIconContainer: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#EFF6FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driveGreeting: {
    fontSize: 14,
    color: '#64748B',
    margin: 0,
  },
  hero: {
    display: 'none',
  },
  heroBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: { position: 'relative', maxWidth: 700, margin: '0 auto' },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)',
    border: '1px solid #BFDBFE',
    borderRadius: 99, padding: '6px 16px', marginBottom: 20,
  },
  heroBadgeText: { fontSize: 13, fontWeight: 600, color: '#2563EB' },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 900,
    color: '#0F172A',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    color: '#64748B',
    lineHeight: 1.7,
    marginBottom: 32,
    maxWidth: 560,
    margin: '0 auto 32px',
  },
  heroStats: {
    display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
    marginTop: 32,
  },
  heroStat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  heroStatVal: { fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#2563EB' },
  heroStatLbl: { fontSize: 13, color: '#64748B', fontWeight: 500 },
  container: { maxWidth: 960, margin: '0 auto', padding: '0 16px 80px' },
  uploadSection: { marginBottom: 40 },
  dropZone: {
    border: '2.5px dashed #CBD5E1',
    borderRadius: 20,
    padding: '56px 32px',
    textAlign: 'center',
    cursor: 'pointer',
    background: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  dropZoneActive: {
    borderColor: '#2563EB',
    background: '#EFF6FF',
    transform: 'scale(1.01)',
    boxShadow: '0 8px 32px rgba(37,99,235,0.15)',
  },
  dropZoneHasFile: {
    borderStyle: 'solid',
    borderColor: '#10B981',
    background: '#F0FDF4',
    cursor: 'default',
    padding: '24px 32px',
  },
  dropContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 },
  uploadIconWrap: {
    width: 80, height: 80, borderRadius: '50%',
    background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)',
    border: '2px solid #BFDBFE',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#2563EB', marginBottom: 8,
  },
  dropTitle: { fontSize: 20, fontWeight: 700, color: '#0F172A' },
  dropSub: { fontSize: 15, color: '#64748B' },
  dropLink: { color: '#2563EB', fontWeight: 600, cursor: 'pointer' },
  dropFormats: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 },
  formatBadge: {
    fontSize: 12, fontWeight: 600, color: '#2563EB',
    background: '#EFF6FF', border: '1px solid #BFDBFE',
    borderRadius: 6, padding: '3px 10px',
  },
  dropLimit: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
  filePreview: { display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' },
  fileIconWrap: {
    width: 56, height: 56, borderRadius: 14,
    background: 'linear-gradient(135deg, #10B98120, #10B98140)',
    border: '1.5px solid #10B98150',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#10B981', flexShrink: 0,
  },
  fileInfo: { flex: 1, minWidth: 0 },
  fileName: { fontSize: 15, fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  fileSize: { fontSize: 13, color: '#64748B', marginTop: 2 },
  removeBtn: {
    width: 36, height: 36, borderRadius: '50%',
    border: '1.5px solid #E2E8F0', background: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#64748B', flexShrink: 0,
    transition: 'all 0.2s',
  },
  analyzeBtn: {
    width: '100%', marginTop: 16,
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    color: 'white', fontWeight: 700, fontSize: 17,
    border: 'none', borderRadius: 14, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 6px 24px rgba(37,99,235,0.35)',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', sans-serif",
  },
  progressCard: {
    marginTop: 20, padding: 28,
    background: 'white', borderRadius: 20,
    border: '1px solid #E2E8F0',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    animation: 'ra-fade-in 0.4s ease',
  },
  progressHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  progressSpinner: {
    width: 24, height: 24, borderRadius: '50%',
    border: '3px solid #E2E8F0',
    borderTopColor: '#2563EB',
    animation: 'ra-spin 0.8s linear infinite',
    flexShrink: 0,
  },
  progressTitle: { fontSize: 16, fontWeight: 700, color: '#0F172A' },
  progressBarWrap: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  progressBarTrack: { flex: 1, height: 10, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' },
  progressBarFill: {
    height: '100%', borderRadius: 99,
    background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
    transition: 'width 0.5s ease',
  },
  progressPct: { fontSize: 14, fontWeight: 700, color: '#2563EB', minWidth: 36, textAlign: 'right' },
  stepsList: { display: 'flex', flexDirection: 'column', gap: 10 },
  stepItem: { display: 'flex', alignItems: 'center', gap: 10 },
  stepDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0, transition: 'background 0.3s' },
  results: { animation: 'ra-slide-up 0.5s ease' },
  resultHeader: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 12, marginBottom: 24,
  },
  resultHeaderLeft: { display: 'flex', flexDirection: 'column', gap: 6 },
  resultFileChip: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'white', border: '1px solid #E2E8F0',
    borderRadius: 10, padding: '8px 14px',
    maxWidth: '100%',
  },
  resultDate: { fontSize: 12, color: '#94A3B8', paddingLeft: 4 },
  newAnalysisBtn: {
    background: 'white', border: '1.5px solid #2563EB',
    color: '#2563EB', fontWeight: 600, fontSize: 14,
    padding: '10px 20px', borderRadius: 10,
    cursor: 'pointer', transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
    whiteSpace: 'nowrap',
  },
  scoreHero: {
    position: 'relative', borderRadius: 24, overflow: 'hidden',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0E7490 100%)',
    padding: '40px 32px', marginBottom: 24,
    boxShadow: '0 16px 48px rgba(15,23,42,0.25)',
  },
  scoreHeroBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.2) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  scoreHeroContent: {
    position: 'relative',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 32,
  },
  mainScoreWrap: {
    display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
  },
  scoreVerdict: { maxWidth: 320 },
  verdictBadge: {
    display: 'inline-block',
    fontSize: 12, fontWeight: 700,
    padding: '4px 14px', borderRadius: 99,
    marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase',
  },
  verdictTitle: {
    fontSize: 'clamp(16px, 2.5vw, 22px)',
    fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 8,
  },
  verdictSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 },
  subScores: {
    display: 'flex', gap: 32, flexWrap: 'wrap',
  },
  tabsWrap: {
    background: 'white', borderRadius: 16,
    border: '1px solid #E2E8F0',
    padding: 6, marginBottom: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflowX: 'auto',
  },
  tabs: { display: 'flex', gap: 4, minWidth: 'max-content' },
  tab: {
    padding: '10px 18px', borderRadius: 12,
    border: 'none', background: 'transparent',
    color: '#64748B', fontWeight: 500, fontSize: 14,
    cursor: 'pointer', transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
    whiteSpace: 'nowrap',
  },
  tabActive: {
    background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)',
    color: '#2563EB', fontWeight: 700,
    boxShadow: '0 2px 8px rgba(37,99,235,0.15)',
  },
  tabContent: {},
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: 16,
  },
  grid1: { display: 'flex', flexDirection: 'column', gap: 16 },
  card: {
    background: 'white', borderRadius: 20,
    border: '1px solid #E2E8F0', padding: 24,
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    animation: 'ra-fade-in 0.4s ease',
  },
  cardTitle: {
    fontSize: 16, fontWeight: 700, color: '#0F172A',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  summaryRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 0', borderBottom: '1px solid #F1F5F9',
  },
  summaryLabel: { fontSize: 14, color: '#64748B', fontWeight: 500 },
  summaryRight: { display: 'flex', alignItems: 'center', gap: 8 },
  summaryValue: { fontSize: 14, fontWeight: 700, color: '#0F172A' },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 },
  listItemGood: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  listItemWarn: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  listDotGood: {
    width: 22, height: 22, borderRadius: '50%',
    background: '#F0FDF4', color: '#10B981',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
  },
  listDotWarn: {
    width: 22, height: 22, borderRadius: '50%',
    background: '#FFFBEB', color: '#F59E0B',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
  },
  skillGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  skillTagGood: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#F0FDF4', color: '#10B981',
    border: '1.5px solid #BBF7D0', borderRadius: 8,
    padding: '6px 12px', fontSize: 13, fontWeight: 600,
  },
  skillTagMissing: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#FFF1F2', color: '#EF4444',
    border: '1.5px solid #FECACA', borderRadius: 8,
    padding: '6px 12px', fontSize: 13, fontWeight: 600,
  },
  skillMatchBar: { marginTop: 16 },
  skillMatchTrack: { height: 14, borderRadius: 99, background: '#FEE2E2', overflow: 'hidden', marginBottom: 12 },
  skillMatchFill: {
    height: '100%', borderRadius: 99,
    background: 'linear-gradient(90deg, #10B981, #059669)',
    transition: 'width 1.2s ease',
  },
  skillMatchLabels: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  sectionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 },
  sectionItem: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '14px 16px', borderRadius: 14,
    border: '1.5px solid',
  },
  sectionIcon: { fontSize: 24, flexShrink: 0 },
  jobMatchItem: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '16px 20px', borderRadius: 14,
    background: '#F8FAFC', border: '1px solid #E2E8F0',
    flexWrap: 'wrap',
  },
  jobMatchRank: { fontSize: 20, minWidth: 32, textAlign: 'center' },
  matchBadge: {
    fontSize: 12, fontWeight: 700,
    padding: '4px 12px', borderRadius: 99,
  },
  tipCard: {
    padding: 20, borderRadius: 16,
    border: '1px solid #E2E8F0', background: '#FAFAFA',
  },
  tipHeader: { display: 'flex', gap: 14, alignItems: 'flex-start' },
  tipIcon: { fontSize: 28, flexShrink: 0 },
  tipTitle: { fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 },
  tipText: { fontSize: 14, color: '#64748B', lineHeight: 1.6 },
  priorityBadge: {
    fontSize: 11, fontWeight: 700,
    padding: '2px 10px', borderRadius: 99,
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  ratingWrap: {
    display: 'flex', alignItems: 'center', gap: 4,
    marginTop: 16, flexWrap: 'wrap',
  },
  featuresSection: { marginTop: 60 },
  featuresTitle: {
    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
    fontWeight: 800, color: '#0F172A',
    textAlign: 'center', marginBottom: 36,
    letterSpacing: '-0.02em',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
  },
  featureCard: {
    background: 'white', borderRadius: 20,
    border: '1px solid #E2E8F0', padding: 28,
    textAlign: 'center',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  featureIcon: {
    fontSize: 36, marginBottom: 14,
    display: 'block',
  },
  featureTitle: { fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 8 },
  featureDesc: { fontSize: 14, color: '#64748B', lineHeight: 1.6 },
};
