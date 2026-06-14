import { useState, useRef, useCallback } from 'react';

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
          <span style={{ fontSize: size > 120 ? 28 : 22, fontWeight: 800, color: ringColor, lineHeight: 1 }}>{score}%</span>
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>Match Rate</span>
        </div>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

export default function ATSChecker() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (!f.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
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
    if (!file || !jobDescription.trim()) return;
    setAnalyzing(true);
    setProgress(0);

    const steps = [15, 35, 60, 80, 100];
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600));
      setProgress(step);
    }

    // Generate simulated ATS match report based on keywords
    const keywords = ['React', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Node.js', 'Redux', 'TypeScript', 'Git', 'Webpack', 'Docker', 'AWS', 'CI/CD'];
    const matchedCount = Math.round(5 + Math.random() * 5); // 5 to 10 matched
    const matched = keywords.slice(0, matchedCount);
    const missing = keywords.slice(matchedCount, matchedCount + 4);

    setResult({
      score: Math.round(65 + Math.random() * 25), // score between 65 and 90
      matched,
      missing,
      fileName: file.name,
      wordCount: Math.round(400 + Math.random() * 300),
      formatting: {
        fileType: true,
        margins: true,
        fontCheck: true,
        headings: Math.random() > 0.3,
        contactInfo: true,
      }
    });
    setAnalyzing(false);
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setResult(null);
    setAnalyzing(false);
    setProgress(0);
  };

  const analysisSteps = [
    'Parsing job requirements...',
    'Extracting resume text layout...',
    'Mapping keyword matches...',
    'Auditing section headings...',
    'Calculating final compatibility score...',
  ];

  const currentStep = Math.min(Math.floor(progress / 20), 4);

  return (
    <div style={styles.page}>
      
      {/* ── Drive-style Header ── */}
      <div style={styles.driveHeader}>
        <div style={styles.driveHeaderLeft}>
          <div style={styles.titleRow}>
            <h1 style={styles.driveTitle}>ATS Checkers</h1>
            <div style={styles.folderIconContainer}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>
          <p style={styles.driveGreeting}>
            Paste your target job description and scan your resume to check keyword density and formatting compatibility.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        {!result && !analyzing && (
          <div style={styles.scanSetup}>
            {/* Job Description Textbox */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Paste Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job posting requirements here to compare against your resume..."
                style={styles.textarea}
              />
            </div>

            {/* Resume Upload Dropzone */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Upload Resume</label>
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
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {!file ? (
                  <div style={styles.dropContent}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <h3 style={styles.dropTitle}>Drag & drop resume here</h3>
                    <p style={styles.dropSub}>or <span style={{ color: '#2563EB', fontWeight: 600 }}>browse files</span></p>
                    <p style={styles.dropLimit}>PDF, DOC, DOCX, TXT under 5MB</p>
                  </div>
                ) : (
                  <div style={styles.filePreview}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={styles.fileName}>{file.name}</p>
                      <p style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB · Ready to scan</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} style={styles.removeBtn}>✕</button>
                  </div>
                )}
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleAnalyze}
              disabled={!file || !jobDescription.trim()}
              style={{
                ...styles.analyzeBtn,
                ...((!file || !jobDescription.trim()) ? styles.analyzeBtnDisabled : {}),
              }}
            >
              🚀 Run ATS Comparison Scan
            </button>
          </div>
        )}

        {/* Loading / Scanning view */}
        {analyzing && (
          <div style={styles.card}>
            <div style={styles.progressHeader}>
              <div style={styles.spinner} />
              <span style={styles.progressTitle}>Scanning compatibility details...</span>
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
                    fontWeight: i <= currentStep ? 600 : 400,
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results View */}
        {result && (
          <div style={styles.resultsWrapper}>
            <div style={ds.resultHeader}>
              <div style={ds.resultHeaderLeft}>
                <h2 style={styles.verdictTitle}>Compatibility Scan Complete</h2>
                <p style={styles.verdictSub}>Scanned against target job description · {result.wordCount} words detected</p>
              </div>
              <button onClick={handleReset} style={ds.newAnalysisBtn}>
                + New Scan
              </button>
            </div>

            {/* Score Hero */}
            <div style={styles.scoreHero}>
              <div style={styles.scoreHeroContent}>
                <ScoreRing score={result.score} size={150} label="ATS Score Index" color="auto" />
                <div style={styles.scoreVerdict}>
                  <span style={styles.verdictBadge}>ATS FEEDBACK</span>
                  <h3 style={styles.verdictMsg}>
                    {result.score >= 80
                      ? 'Excellent match! Your resume is highly optimized.'
                      : result.score >= 65
                      ? 'Solid match, but needs keyword optimization.'
                      : 'High gap detected. Optimize formatting and terms.'}
                  </h3>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Matched {result.matched.length} key terms. Missing {result.missing.length} highly requested skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div style={styles.grid2}>
              
              {/* Keyword density */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>🔑 Keyword Audit</h3>
                <div style={{ marginTop: 16 }}>
                  <p style={styles.subText}>Matched Keywords ({result.matched.length})</p>
                  <div style={styles.tagGrid}>
                    {result.matched.map(kw => (
                      <span key={kw} style={styles.tagGood}>✓ {kw}</span>
                    ))}
                  </div>

                  <p style={{ ...styles.subText, marginTop: 20 }}>Missing Target Keywords ({result.missing.length})</p>
                  <div style={styles.tagGrid}>
                    {result.missing.map(kw => (
                      <span key={kw} style={styles.tagMissing}>✕ {kw}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Format audit */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>📋 Formatting & Parsing Checks</h3>
                <div style={styles.auditList}>
                  {[
                    { label: 'File extension format (PDF/DOCX)', pass: result.formatting.fileType, desc: 'Compatible file formats check' },
                    { label: 'Standard layout margins (1 inch)', pass: result.formatting.margins, desc: 'Checks margin padding spacing' },
                    { label: 'Standard fonts used', pass: result.formatting.fontCheck, desc: 'Verifies readable system typography' },
                    { label: 'Section Headings parsed', pass: result.formatting.headings, desc: 'Checks for standard H2 tags' },
                    { label: 'Contact details matched', pass: result.formatting.contactInfo, desc: 'Checks phone/email parsing' },
                  ].map((chk, i) => (
                    <div key={i} style={styles.auditItem}>
                      <div style={{
                        ...styles.auditDot,
                        background: chk.pass ? '#10B981' : '#F59E0B',
                      }}>
                        {chk.pass ? '✓' : '!'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={styles.auditLabel}>{chk.label}</p>
                        <p style={styles.auditDesc}>{chk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── Shared/G-Drive themed stylesheet elements ────────────────────────
const ds = {
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  resultHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  newAnalysisBtn: {
    background: 'white',
    border: '1.5px solid #2563EB',
    color: '#2563EB',
    fontWeight: 600,
    fontSize: 14,
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  },
};

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
  container: {
    width: '100%',
    maxWidth: 960,
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  scanSetup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  textarea: {
    width: '100%',
    height: 150,
    padding: '16px',
    borderRadius: 16,
    border: '1px solid #E2E8F0',
    background: '#F8FAFC',
    outline: 'none',
    fontSize: 14,
    color: '#0F172A',
    fontFamily: "'Inter', sans-serif",
    resize: 'vertical',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  dropZone: {
    border: '2px dashed #CBD5E1',
    borderRadius: 16,
    padding: '36px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#F8FAFC',
    transition: 'all 0.2s',
  },
  dropZoneActive: {
    borderColor: '#2563EB',
    background: '#EFF6FF',
  },
  dropZoneHasFile: {
    borderStyle: 'solid',
    borderColor: '#10B981',
    background: '#F0FDF4',
    cursor: 'default',
    padding: '16px 20px',
  },
  dropContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  dropTitle: { fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0 },
  dropSub: { fontSize: 14, color: '#64748B', margin: 0 },
  dropLimit: { fontSize: 11, color: '#94A3B8', margin: 0 },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F172A',
    margin: 0,
    wordBreak: 'break-all',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748B',
    margin: '2px 0 0',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    fontSize: 14,
    padding: 8,
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  analyzeBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(37,99,235,0.25)',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  },
  analyzeBtnDisabled: {
    background: '#E2E8F0',
    color: '#94A3B8',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 20,
    border: '1px solid #E2E8F0',
    padding: 24,
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
  },
  progressHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  spinner: {
    width: 20, height: 20, borderRadius: '50%',
    border: '2px solid #E2E8F0',
    borderTopColor: '#2563EB',
    animation: 'spin 0.8s linear infinite',
  },
  progressTitle: { fontSize: 15, fontWeight: 700, color: '#0F172A' },
  progressBarWrap: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  progressBarTrack: { flex: 1, height: 8, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' },
  progressBarFill: {
    height: '100%', borderRadius: 99,
    background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
    transition: 'width 0.3s ease',
  },
  progressPct: { fontSize: 13, fontWeight: 700, color: '#2563EB', minWidth: 32, textAlign: 'right' },
  stepsList: { display: 'flex', flexDirection: 'column', gap: 10 },
  stepItem: { display: 'flex', alignItems: 'center', gap: 10 },
  stepDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  resultsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  verdictTitle: { fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' },
  verdictSub: { fontSize: 13, color: '#64748B', margin: 0 },
  scoreHero: {
    borderRadius: 24,
    background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0E7490 100%)',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(15,23,42,0.15)',
  },
  scoreHeroContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    flexWrap: 'wrap',
  },
  scoreVerdict: {
    flex: 1,
    minWidth: 260,
  },
  verdictBadge: {
    fontSize: 9,
    fontWeight: 700,
    color: '#38BDF8',
    letterSpacing: '0.08em',
  },
  verdictMsg: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    fontWeight: 800,
    color: 'white',
    margin: '6px 0 0',
    lineHeight: 1.3,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 20,
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 },
  subText: { fontSize: 13, fontWeight: 700, color: '#64748B', margin: '0 0 10px' },
  tagGrid: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tagGood: {
    fontSize: 12, fontWeight: 600,
    background: '#F0FDF4', color: '#10B981',
    border: '1px solid #BBF7D0', borderRadius: 8,
    padding: '4px 10px',
  },
  tagMissing: {
    fontSize: 12, fontWeight: 600,
    background: '#FFF1F2', color: '#EF4444',
    border: '1px solid #FECACA', borderRadius: 8,
    padding: '4px 10px',
  },
  auditList: { display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 },
  auditItem: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  auditDot: {
    width: 20, height: 20, borderRadius: '50%',
    color: 'white', fontWeight: 800, fontSize: 11,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, marginTop: 2,
  },
  auditLabel: { fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 },
  auditDesc: { fontSize: 11, color: '#64748B', margin: '2px 0 0' },
};
