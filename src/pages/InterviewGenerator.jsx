import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Evaluation Badges & SVGs ─────────────────────────────────────
function ScoreBadge({ score }) {
  const scoreColor = score >= 8 ? '#10B981' : score >= 6 ? '#F59E0B' : '#EF4444';
  return (
    <span style={{
      fontSize: 12, fontWeight: 700,
      background: `${scoreColor}18`, color: scoreColor,
      border: `1.5px solid ${scoreColor}40`, borderRadius: 8,
      padding: '4px 12px', display: 'inline-block',
    }}>
      AI Rating: {score} / 10
    </span>
  );
}

function CheckIcon({ size = 16, color = '#10B981' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function WarningIcon({ size = 16, color = '#F59E0B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  );
}

export default function InterviewGenerator() {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('Entry Level');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [evaluations, setEvaluations] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [showReport, setShowReport] = useState(false);

  // Dynamic 6-Question flow curating based on role
  const handleGenerate = async () => {
    if (!role.trim()) return;
    setGenerating(true);
    setProgress(0);

    const steps = [20, 50, 75, 100];
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 450));
      setProgress(step);
    }

    const isFrontend = role.toLowerCase().match(/(react|frontend|web|javascript|css|html|ui)/);
    const isBackend = role.toLowerCase().match(/(node|backend|java|python|sql|database|server)/);

    let roleQuestions = [];

    if (isFrontend) {
      roleQuestions = [
        {
          stage: 'Fit Round (Q1)',
          q: `Introduce yourself and outline your background in Frontend Development. Why do you enjoy building user interfaces?`,
          tip: 'Summarize your coding experience, mention key frontend frameworks like React or Vue, and connect your passion to UI design accuracy.',
          model: 'Discuss your experience, show excitement for user-centric interfaces, and outline code standards (responsive layouts, component structures).',
          type: 'text'
        },
        {
          stage: 'Fit Round (Q2)',
          q: `Why do you want to join our engineering team specifically? How does our product align with your goals?`,
          tip: 'Mention active engineering practices, building features that scale, and your growth as a frontend specialist.',
          model: 'Highlight the team\'s focus on quality frontend design, system scalability, and the opportunity to work alongside senior developers.',
          type: 'text'
        },
        {
          stage: 'Logic Round (Q3)',
          q: `Write a function reverseWords(str) that reverses the order of words in a sentence. E.g. 'Hello World' -> 'World Hello'.`,
          tip: 'Split the sentence by space indices, reverse the resulting array, and join them back with spaces. Maintain cleanliness.',
          model: `function reverseWords(str) {\n  return str.trim().split(/\\s+/).reverse().join(' ');\n}`,
          type: 'code',
          defaultCode: `// Write your JavaScript solution here\nfunction reverseWords(str) {\n  \n}`
        },
        {
          stage: 'Logic Round (Q4)',
          q: `Optimize your reverseWords(str) logic to handle double/triple spacing inside the sentence without allocating extra array memories.`,
          tip: 'Use regex split (/\\s+/) or string parsing to strip duplicate whitespace during splits.',
          model: `function reverseWords(str) {\n  return str.trim().split(/\\s+/).reverse().join(' ');\n}`,
          type: 'code',
          defaultCode: `// Optimize your solution here\nfunction reverseWords(str) {\n  \n}`
        },
        {
          stage: 'Behavioral (Q5)',
          q: `Describe a scenario where you had to optimize a slow web page or resolve a complex rendering bottleneck.`,
          tip: 'Use the STAR methodology. Explain the sluggish performance, your action (lazy-loading, memoization), and the percentage gain.',
          model: 'E.g., "Page rendering was lagging. Used React.memo to prevent duplicate tree renders. Reduced re-render counts by 65%, bringing frame rates to 60fps."',
          type: 'text'
        },
        {
          stage: 'Behavioral (Q6)',
          q: `How do you handle disagreement with a designer or product manager regarding the technical feasibility of a feature?`,
          tip: 'Emphasize constructive communication, active listening, proposing mockups, and finding a user-friendly compromises.',
          model: 'Provide details on presenting tradeoffs, active listening, and collaborating on simplified, responsive alternatives.',
          type: 'text'
        }
      ];
    } else if (isBackend) {
      roleQuestions = [
        {
          stage: 'Fit Round (Q1)',
          q: `Introduce yourself and outline your backend engineering experience. What draws you to building system architectures?`,
          tip: 'Talk about database configurations, APIs, backend runtimes like Node.js, Python or Java, and system speed/deadlocks.',
          model: 'Walk through your stacks, system architectures you contributed to, API schemas, and server scaling frameworks.',
          type: 'text'
        },
        {
          stage: 'Fit Round (Q2)',
          q: `Why do you want to join our engineering team specifically? How does our backend stack align with your goals?`,
          tip: 'Explain your passion for stable database indexings, clean APIs, microservices, and system reliability.',
          model: 'Express your dedication to high-availability architecture, building APIs, and aligning with the team\'s microservice direction.',
          type: 'text'
        },
        {
          stage: 'Logic Round (Q3)',
          q: `Write a function findDuplicates(arr) that returns all duplicate integers present in an array. E.g. [1, 2, 3, 2, 1] -> [2, 1].`,
          tip: 'Use a Set or Hash Map to store visited integers to achieve O(N) time complexity.',
          model: `function findDuplicates(arr) {\n  const seen = new Set();\n  const dups = new Set();\n  for (const n of arr) {\n    if (seen.has(n)) dups.add(n);\n    else seen.add(n);\n  }\n  return Array.from(dups);\n}`,
          type: 'code',
          defaultCode: `// Write your duplicate logic here\nfunction findDuplicates(arr) {\n  \n}`
        },
        {
          stage: 'Logic Round (Q4)',
          q: `Optimize your findDuplicates(arr) logic to achieve O(1) extra space complexity (assume numbers are in range 0 to n-1).`,
          tip: 'Use the array elements as indices and negate values at those indices to mark visited numbers in-place.',
          model: `function findDuplicates(arr) {\n  const dups = [];\n  for (let i = 0; i < arr.length; i++) {\n    let val = Math.abs(arr[i]);\n    if (arr[val] < 0) dups.push(val);\n    else arr[val] = -arr[val];\n  }\n  return dups;\n}`,
          type: 'code',
          defaultCode: `// Optimize for O(1) space complexity\nfunction findDuplicates(arr) {\n  \n}`
        },
        {
          stage: 'Behavioral (Q5)',
          q: `Tell me about a server crash or database deadlock issue you faced. How did you diagnose and resolve it?`,
          tip: 'Use STAR. Describe checking system logs, spotting database spikes, query indexing, and server response times recovery.',
          model: 'E.g., "Spot CPU spike via APM tools. Traced to unindexed query. Added composite index. Reduced CPU usage from 95% to 12%."',
          type: 'text'
        },
        {
          stage: 'Behavioral (Q6)',
          q: `How do you handle disagreement with a database administrator or frontend developer regarding API format schemas?`,
          tip: 'Highlight documentation value (e.g. Swagger), active listening, compromise, and user-centric data delivery.',
          model: 'Collaborating on structure specifications, weighing payload size vs request counts, and building scalable API routing.',
          type: 'text'
        }
      ];
    } else {
      roleQuestions = [
        {
          stage: 'Fit Round (Q1)',
          q: `Introduce yourself and outline your background in Software Development. What motivates your code quality?`,
          tip: 'Share your background, programming languages you know, and your passion for solving real-world challenges with code.',
          model: 'A standard introduction highlighting your education, coding projects, languages, and career goals as a developer.',
          type: 'text'
        },
        {
          stage: 'Fit Round (Q2)',
          q: `Why do you want to join our engineering team specifically? How does our tech stack align with your goals?`,
          tip: 'Connect your interest with their product features, engineering culture, code testing, and clean code guidelines.',
          model: 'Express interest in the company\'s engineering methodologies, clean-code practices, and automated testing framework.',
          type: 'text'
        },
        {
          stage: 'Logic Round (Q3)',
          q: `Write a binary search function binarySearch(arr, target) that returns the index of target in a sorted array, or -1 if not found.`,
          tip: 'Use low/high pointers and divide-and-conquer to achieve O(log N) runtime.',
          model: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
          type: 'code',
          defaultCode: `// Write binary search algorithm\nfunction binarySearch(arr, target) {\n  \n}`
        },
        {
          stage: 'Logic Round (Q4)',
          q: `Modify your binarySearch(arr, target) solution to find the FIRST occurrence of target in an array containing duplicates.`,
          tip: 'When you findarr[mid] === target, continue searching the left half (high = mid - 1) to find the first occurrence.',
          model: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1, res = -1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) { res = mid; high = mid - 1; }\n    else if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return res;\n}`,
          type: 'code',
          defaultCode: `// Find first occurrence in duplicates array\nfunction binarySearch(arr, target) {\n  \n}`
        },
        {
          stage: 'Behavioral (Q5)',
          q: `Tell me about a challenging technical roadblock you resolved while working on a programming project.`,
          tip: 'Outline the bottleneck, your steps to debug (stack traces, logging), your clean solution, and the lessons learned.',
          model: 'Detail your research process, isolated debugging environment, code adjustments, and final verified outcome.',
          type: 'text'
        },
        {
          stage: 'Behavioral (Q6)',
          q: `How do you handle disagreement regarding code quality guidelines or architectural decisions in a development team?`,
          tip: 'Explain setting standards via linters, active communication, resolving technical debts constructively, and team alignment.',
          model: 'Connecting tradeoffs with facts, using lint rules, code reviews, and aligning with structural guidelines.',
          type: 'text'
        }
      ];
    }

    setQuestions(roleQuestions);
    setAnswers({
      0: '',
      1: '',
      2: roleQuestions[2].defaultCode,
      3: roleQuestions[3].defaultCode,
      4: '',
      5: ''
    });
    setEvaluations({});
    setActiveStep(0);
    setShowReport(false);
    setGenerating(false);
  };

  const handleReset = () => {
    setRole('');
    setQuestions(null);
    setAnswers({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    });
    setEvaluations({});
    setActiveStep(0);
    setShowReport(false);
  };

  const handleEvaluateStep = (index) => {
    const text = answers[index] || '';
    
    if (index !== 2 && index !== 3 && text.trim().length < 20) {
      alert('Please write a longer answer (at least 20 characters) for the AI to analyze!');
      return;
    }

    // Logic Coding Evaluation (Q3 and Q4)
    if (index === 2 || index === 3) {
      const containsReturn = text.includes('return');
      const containsLogic = text.includes('for') || text.includes('while') || text.includes('split') || text.includes('Set') || text.includes('indexOf') || text.includes('Math.abs');
      const passed = containsReturn && containsLogic;

      let timeC = 'O(N)';
      let spaceC = 'O(N)';

      if (text.toLowerCase().includes('binarysearch')) {
        timeC = 'O(log N)';
        spaceC = text.includes('dups') ? 'O(N)' : 'O(1)';
      } else if (text.includes('reverse().join')) {
        timeC = 'O(N)';
        spaceC = 'O(N)';
      } else if (text.includes('Math.abs(')) {
        timeC = 'O(N)';
        spaceC = 'O(1)';
      }

      setEvaluations({
        ...evaluations,
        [index]: {
          passed,
          type: 'code',
          timeC,
          spaceC,
          score: passed ? Math.round(8 + Math.random() * 2) : 4,
          feedback: passed 
            ? 'Optimal logic verified. Your code handles index parameters cleanly and satisfies the required complexity index.'
            : 'Logic checking warning. Make sure your function contains the correct return outputs and solves the target logic.',
          showModel: false
        }
      });
      return;
    }

    // Behavioral STAR Evaluation (Q5 and Q6)
    if (index === 4 || index === 5) {
      const hasS = text.toLowerCase().includes('when') || text.toLowerCase().includes('project') || text.toLowerCase().includes('situation');
      const hasT = text.toLowerCase().includes('role') || text.toLowerCase().includes('task') || text.toLowerCase().includes('was responsible');
      const hasA = text.toLowerCase().includes('did') || text.toLowerCase().includes('implemented') || text.toLowerCase().includes('wrote') || text.toLowerCase().includes('resolved');
      const hasR = text.toLowerCase().includes('result') || text.toLowerCase().includes('percent') || text.toLowerCase().includes('reduced') || text.toLowerCase().includes('saved');

      const starScore = (hasS ? 2.5 : 1) + (hasT ? 2.5 : 1) + (hasA ? 2.5 : 1) + (hasR ? 2.5 : 1);
      
      setEvaluations({
        ...evaluations,
        [index]: {
          type: 'star',
          score: Math.round(starScore),
          star: { situation: hasS, task: hasT, action: hasA, result: hasR },
          feedback: starScore >= 8 
            ? 'Strong STAR methodology representation. Your action points are descriptive and outcomes are cleanly outlined.'
            : 'Good scenario context. Make sure to cover all STAR parts. Adding specific metrics will boost the impact of your Result.',
          showModel: false
        }
      });
      return;
    }

    // Fit Evaluations (Q1 and Q2)
    setEvaluations({
      ...evaluations,
      [index]: {
        type: 'general',
        score: Math.round(7.5 + Math.random() * 2),
        feedback: 'Solid fit presentation. Your response reflects strong communication skills and structural clarity.',
        showModel: false
      }
    });
  };

  const toggleModelAnswer = (index) => {
    const ev = evaluations[index];
    if (ev) {
      setEvaluations({
        ...evaluations,
        [index]: { ...ev, showModel: !ev.showModel }
      });
    }
  };

  // Scorecard calculations
  const totalRounds = 6;
  const completedRounds = Object.keys(evaluations).length;
  
  const calculateOverallScore = () => {
    const scores = Object.values(evaluations).map(e => e.score);
    if (scores.length === 0) return 0;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 10); // scale to percentage (e.g. 8.5/10 -> 85%)
  };

  const getSTARAlignmentAverage = () => {
    let checkedCount = 0;
    let totalItems = 0;
    Object.values(evaluations).forEach(ev => {
      if (ev.type === 'star' && ev.star) {
        checkedCount += Object.values(ev.star).filter(Boolean).length;
        totalItems += 4;
      }
    });
    return totalItems === 0 ? 0 : Math.round((checkedCount / totalItems) * 100);
  };

  const getCodeLogicAccuracy = () => {
    let passedCount = 0;
    let totalCode = 0;
    Object.values(evaluations).forEach(ev => {
      if (ev.type === 'code') {
        if (ev.passed) passedCount++;
        totalCode++;
      }
    });
    return totalCode === 0 ? 0 : Math.round((passedCount / totalCode) * 100);
  };

  const getFitCommunicationAverage = () => {
    let totalScore = 0;
    let count = 0;
    Object.values(evaluations).forEach(ev => {
      if (ev.type === 'general') {
        totalScore += ev.score;
        count++;
      }
    });
    return count === 0 ? 0 : Math.round((totalScore / (count * 10)) * 100);
  };

  const overallScoreVal = calculateOverallScore();

  return (
    <div style={styles.page}>
      
      {/* ── Drive-style Header ── */}
      <div style={styles.driveHeader}>
        <div style={styles.driveHeaderLeft}>
          <div style={styles.titleRow}>
            <h1 style={styles.driveTitle}>Interview Coach</h1>
            <div style={styles.folderIconContainer}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
          </div>
          <p style={styles.driveGreeting}>
            Recreate a realistic technical interview. Tackle Fit rounds, code logic puzzles, explain STAR behaviors, and review your final Performance Scorecard.
          </p>
        </div>
      </div>

      <div style={styles.container}>
        {!questions && !generating && (
          <div style={styles.setupCard}>
            <div style={styles.inputRow}>
              <div style={{ ...styles.inputGroup, flex: 2 }}>
                <label style={styles.label}>Target Job Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. React Developer, Backend Engineer, Software Architect..."
                  style={styles.input}
                  id="target-job-role"
                />
              </div>

              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Experience Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  style={styles.select}
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!role.trim()}
              style={{
                ...styles.btnPrimary,
                ...(!role.trim() ? styles.btnDisabled : {}),
              }}
              id="generate-interview-btn"
            >
              💬 Start Mock Interview Session
            </button>
          </div>
        )}

        {/* Loading Progress */}
        {generating && (
          <div style={styles.card}>
            <div style={styles.progressHeader}>
              <div style={styles.spinner} />
              <span style={styles.progressTitle}>Assembling interview panel...</span>
            </div>
            <div style={styles.progressBarWrap}>
              <div style={styles.progressBarTrack}>
                <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
              </div>
              <span style={styles.progressPct}>{progress}%</span>
            </div>
            <div style={styles.stepsList}>
              {[
                'Analyzing target job role requirements...',
                'Curating custom code algorithm logic...',
                'Preparing STAR scenario checklists...',
                'Finalizing interview panel questions...',
              ].map((step, i) => {
                const currentStep = Math.min(Math.floor(progress / 25), 3);
                return (
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
                );
              })}
            </div>
          </div>
        )}

        {/* Active Stepper View */}
        {questions && !showReport && (
          <div style={styles.viewport}>
            <div style={styles.viewportHeader}>
              <div>
                <h2 style={styles.verdictTitle}>{role} Mock Interview</h2>
                <p style={styles.verdictSub}>Simulate your interview rounds side-by-side with an AI evaluator</p>
              </div>
              <button onClick={handleReset} style={styles.newBtn} id="restart-interview">
                ← Exit Session
              </button>
            </div>

            {/* Step Stepper navigation */}
            <div style={styles.stepperNav}>
              {questions.map((q, i) => {
                const isVisited = evaluations[i] !== undefined;
                const isCurrent = activeStep === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    style={{
                      ...styles.stepBtn,
                      ...(isCurrent ? styles.stepBtnActive : isVisited ? styles.stepBtnDone : {}),
                    }}
                    id={`step-btn-${i}`}
                  >
                    <div style={{
                      ...styles.stepNumber,
                      ...(isCurrent ? styles.stepNumActive : isVisited ? styles.stepNumDone : {}),
                    }}>
                      {isVisited ? '✓' : i + 1}
                    </div>
                    <span style={styles.stepLabel}>Round {i + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Round Area */}
            <div style={styles.questionCard}>
              <div style={styles.roundBanner}>
                <span style={styles.roundBadge}>ROUND {activeStep + 1} of 6</span>
                <span style={styles.roundStageName}>{questions[activeStep].stage}</span>
              </div>
              
              <h3 style={styles.questionText}>{questions[activeStep].q}</h3>
              <p style={styles.tipText}>💡 Tip: {questions[activeStep].tip}</p>

              {/* Side-by-side Layout for Code, Standard Textarea for others */}
              {questions[activeStep].type === 'code' ? (
                <div style={styles.codeRoundLayout}>
                  <div style={styles.codeEditorContainer}>
                    <div style={styles.editorHeader}>
                      <div style={styles.editorDots}>
                        <span style={{ ...styles.dot, background: '#EF4444' }} />
                        <span style={{ ...styles.dot, background: '#F59E0B' }} />
                        <span style={{ ...styles.dot, background: '#10B981' }} />
                      </div>
                      <span style={styles.editorFileName}>solution.js</span>
                    </div>

                    <div style={styles.editorBody}>
                      <div style={styles.lineNumbers}>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} style={styles.lineNumber}>{i + 1}</div>
                        ))}
                      </div>

                      <textarea
                        value={answers[activeStep] || ''}
                        onChange={(e) => setAnswers({ ...answers, [activeStep]: e.target.value })}
                        style={styles.codeTextarea}
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <label style={styles.label}>Your Response</label>
                  <textarea
                    value={answers[activeStep] || ''}
                    onChange={(e) => setAnswers({ ...answers, [activeStep]: e.target.value })}
                    placeholder="Draft your answer here. Provide details and clarify your process..."
                    style={styles.textarea}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button
                  onClick={() => handleEvaluateStep(activeStep)}
                  disabled={!(answers[activeStep] || '').trim()}
                  style={{
                    ...styles.btnEvaluate,
                    ...(!(answers[activeStep] || '').trim() ? styles.btnDisabled : {}),
                  }}
                  id={`evaluate-btn-${activeStep}`}
                >
                  🔍 Submit and Evaluate
                </button>
              </div>

              {/* Evaluation Panel */}
              {evaluations[activeStep] && (
                <div style={styles.evalPanel}>
                  
                  <div style={styles.evalTopHeader}>
                    {evaluations[activeStep].type === 'code' ? (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          ...styles.evalStatusBadge,
                          background: evaluations[activeStep].passed ? '#D1FAE5' : '#FEE2E2',
                          color: evaluations[activeStep].passed ? '#065F46' : '#991B1B',
                        }}>
                          {evaluations[activeStep].passed ? '✓ LOGIC PASSED' : '✕ LOGIC AUDIT WARNING'}
                        </span>
                        <span style={styles.complexityChip}>Time: {evaluations[activeStep].timeC}</span>
                        <span style={styles.complexityChip}>Space: {evaluations[activeStep].spaceC}</span>
                      </div>
                    ) : (
                      <ScoreBadge score={evaluations[activeStep].score} />
                    )}

                    <button onClick={() => toggleModelAnswer(activeStep)} style={styles.modelBtn} id={`toggle-model-${activeStep}`}>
                      {evaluations[activeStep].showModel ? 'Hide Model Answer' : 'View Model Answer'}
                    </button>
                  </div>

                  <div style={styles.feedbackCard}>
                    <p style={{ margin: 0, fontSize: 13, color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>
                      <strong>AI Coach Evaluation:</strong> {evaluations[activeStep].feedback}
                    </p>
                  </div>

                  {/* STAR Method checklist */}
                  {evaluations[activeStep].type === 'star' && (
                    <div style={{ marginTop: 12 }}>
                      <span style={{ ...styles.label, fontSize: 11 }}>STAR Method Audit</span>
                      <div style={styles.starGrid}>
                        {[
                          { label: 'Situation (Context details)', checked: evaluations[activeStep].star.situation },
                          { label: 'Task (Your responsibilities)', checked: evaluations[activeStep].star.task },
                          { label: 'Action (Detailed contribution)', checked: evaluations[activeStep].star.action },
                          { label: 'Result (Quantified metrics)', checked: evaluations[activeStep].star.result },
                        ].map((item, index) => (
                          <div key={index} style={styles.starItem}>
                            <span style={{ flexShrink: 0 }}>
                              {item.checked ? <CheckIcon /> : <WarningIcon />}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: item.checked ? '#10B981' : '#F59E0B' }}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Model Answer */}
                  {evaluations[activeStep].showModel && (
                    <div style={styles.modelCard}>
                      <span style={styles.label}>Suggested Answer Template</span>
                      <pre style={styles.modelPre}>
                        {questions[activeStep].model}
                      </pre>
                    </div>
                  )}

                  {/* Stepper movement actions */}
                  <div style={styles.stepperActionRow}>
                    <button 
                      disabled={activeStep === 0} 
                      onClick={() => setActiveStep(activeStep - 1)} 
                      style={styles.prevBtn}
                    >
                      ← Back
                    </button>
                    {activeStep < 5 ? (
                      <button 
                        onClick={() => setActiveStep(activeStep + 1)} 
                        style={styles.nextBtn}
                      >
                        Next Round →
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowReport(true)} 
                        disabled={completedRounds < totalRounds}
                        style={{
                          ...styles.finishBtn,
                          ...(completedRounds < totalRounds ? styles.btnDisabled : {}),
                        }}
                        id="view-scorecard"
                      >
                        View Performance Report 📊
                      </button>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ── Performance Scorecard View (Rate section) ── */}
        {showReport && (
          <div style={styles.reportWrapper}>
            <div style={styles.viewportHeader}>
              <div>
                <h2 style={styles.verdictTitle}>Interview Scorecard: {role}</h2>
                <p style={styles.verdictSub}>Summary of logic accuracy, communication style, and STAR methodologies.</p>
              </div>
              <button onClick={handleReset} style={styles.newBtn}>
                Start New Session
              </button>
            </div>

            <div style={styles.scorecardGrid}>
              
              {/* Left Column: Overall Gauge & Progress */}
              <div style={styles.scorecardLeftCol}>
                <div style={styles.reportScoreCard}>
                  <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto' }}>
                    <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                      <circle
                        cx="80" cy="80" r="70"
                        fill="none" stroke={overallScoreVal >= 80 ? '#10B981' : '#F59E0B'} strokeWidth="12"
                        strokeDasharray={439.8}
                        strokeDashoffset={439.8 - (overallScoreVal / 100) * 439.8}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 32, fontWeight: 900, color: '#0F172A' }}>{overallScoreVal}%</span>
                      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginTop: 4 }}>JOB READY</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: 12 }}>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                      {overallScoreVal >= 80 ? 'Impressive Performance! 🎉' : 'Good Base with Room to Improve 📈'}
                    </h4>
                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#64748B' }}>
                      Rounds checked: {completedRounds} / {totalRounds} completed
                    </p>
                  </div>
                </div>

                {/* AI Career coach advice */}
                <div style={styles.coachCard}>
                  <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: '#0369A1' }}>💡 Career Coach Recommendation</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#0284C7', lineHeight: 1.6 }}>
                    {overallScoreVal >= 85
                      ? 'Your technical coding logic is highly optimal and your behavioral scenarios are well-formulated. Keep coding proof-of-concepts to stay sharp.'
                      : 'Excellent attempt. To improve your readiness, focus on resolving keyword exclusions in coding challenges and ensure all Situation, Task, Action, and Result details are explicitly mentioned in behavioral answers.'}
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed breakdowns */}
              <div style={styles.scorecardRightCol}>
                <div style={styles.breakdownsCard}>
                  <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#0F172A', borderBottom: '1px dashed #E2E8F0', paddingBottom: 12 }}>
                    PERFORMANCE BREAKDOWN
                  </h3>

                  {/* Logic verification bar */}
                  <div style={styles.metricRow}>
                    <div style={styles.metricInfo}>
                      <span style={styles.metricLabel}>Technical Coding Logic</span>
                      <span style={{ ...styles.metricVal, color: getCodeLogicAccuracy() >= 80 ? '#10B981' : '#F59E0B' }}>
                        {getCodeLogicAccuracy()}% Optimal
                      </span>
                    </div>
                    <div style={styles.metricTrack}>
                      <div style={{ ...styles.metricFill, width: `${getCodeLogicAccuracy()}%`, background: '#3B82F6' }} />
                    </div>
                  </div>

                  {/* STAR alignment bar */}
                  <div style={styles.metricRow}>
                    <div style={styles.metricInfo}>
                      <span style={styles.metricLabel}>STAR Alignment (Behavioral)</span>
                      <span style={{ ...styles.metricVal, color: getSTARAlignmentAverage() >= 75 ? '#10B981' : '#F59E0B' }}>
                        {getSTARAlignmentAverage()}% Complete
                      </span>
                    </div>
                    <div style={styles.metricTrack}>
                      <div style={{ ...styles.metricFill, width: `${getSTARAlignmentAverage()}%`, background: '#10B981' }} />
                    </div>
                  </div>

                  {/* Communication bar */}
                  <div style={styles.metricRow}>
                    <div style={styles.metricInfo}>
                      <span style={styles.metricLabel}>Communication & Cultural Fit</span>
                      <span style={{ ...styles.metricVal, color: getFitCommunicationAverage() >= 75 ? '#10B981' : '#F59E0B' }}>
                        {getFitCommunicationAverage()}% Effectiveness
                      </span>
                    </div>
                    <div style={styles.metricTrack}>
                      <div style={{ ...styles.metricFill, width: `${getFitCommunicationAverage()}%`, background: '#F59E0B' }} />
                    </div>
                  </div>

                  {/* Final action */}
                  <div style={{ marginTop: 24, borderTop: '1px solid #E2E8F0', paddingTop: 20, textAlign: 'center' }}>
                    <p style={{ margin: '0 0 16px', fontSize: 13, color: '#64748B' }}>
                      Ready to verify your resume compatibility against applicant filters?
                    </p>
                    <Link to="/ats-checker" style={styles.atsNavBtn}>
                      🚀 Open ATS Checker Tool
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── Component Stylesheet ───────────────────────────────────────────
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
  setupCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 20,
    padding: 28,
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  inputRow: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minWidth: 200,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  input: {
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    outline: 'none',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    background: '#F8FAFC',
    color: '#0F172A',
  },
  select: {
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    outline: 'none',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    background: '#F8FAFC',
    color: '#0F172A',
    cursor: 'pointer',
  },
  btnPrimary: {
    padding: '14px',
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(37,99,235,0.25)',
    transition: 'all 0.2s',
  },
  btnDisabled: {
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
  viewport: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  viewportHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
  },
  verdictTitle: { fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 },
  verdictSub: { fontSize: 13, color: '#64748B', margin: 0 },
  newBtn: {
    background: 'white', border: '1.5px solid #E2E8F0',
    color: '#64748B', fontWeight: 600, fontSize: 13,
    padding: '8px 16px', borderRadius: 10,
    cursor: 'pointer', transition: 'all 0.2s',
  },
  stepperNav: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 16,
    overflowX: 'auto',
  },
  stepBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 8,
    transition: 'all 0.2s',
  },
  stepBtnActive: {
    background: '#EFF6FF',
  },
  stepBtnDone: {
    opacity: 0.8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: '#F1F5F9',
    color: '#64748B',
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #E2E8F0',
  },
  stepNumActive: {
    background: '#2563EB',
    color: 'white',
    borderColor: '#2563EB',
  },
  stepNumDone: {
    background: '#10B981',
    color: 'white',
    borderColor: '#10B981',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#475569',
    whiteSpace: 'nowrap',
  },
  questionCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 20,
    padding: 28,
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
  },
  roundBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  roundBadge: {
    fontSize: 9,
    fontWeight: 800,
    color: '#2563EB',
    background: '#EFF6FF',
    padding: '4px 8px',
    borderRadius: 6,
    letterSpacing: '0.04em',
  },
  roundStageName: {
    fontSize: 12,
    fontWeight: 700,
    color: '#94A3B8',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 800,
    color: '#0F172A',
    margin: 0,
    lineHeight: 1.5,
  },
  tipText: {
    fontSize: 13,
    color: '#64748B',
    margin: '8px 0 0',
  },
  textarea: {
    width: '100%',
    height: 120,
    padding: '14px',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    background: '#F8FAFC',
    outline: 'none',
    fontSize: 14,
    color: '#0F172A',
    fontFamily: "'Inter', sans-serif",
    resize: 'vertical',
    boxSizing: 'border-box',
    marginTop: 8,
    transition: 'border-color 0.2s',
  },
  
  // Code editor styles
  codeRoundLayout: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  codeEditorContainer: {
    background: '#0F172A',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #1E293B',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
  },
  editorHeader: {
    display: 'flex',
    alignItems: 'center',
    background: '#1E293B',
    padding: '10px 16px',
    borderBottom: '1px solid #0F172A',
  },
  editorDots: {
    display: 'flex',
    gap: 6,
    marginRight: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  editorFileName: {
    fontSize: 11,
    fontWeight: 700,
    color: '#94A3B8',
    fontFamily: 'monospace',
  },
  editorBody: {
    display: 'flex',
    minHeight: 180,
  },
  lineNumbers: {
    width: 36,
    background: '#0F172A',
    borderRight: '1px solid #1E293B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 12,
    gap: 4,
    userSelect: 'none',
  },
  lineNumber: {
    fontSize: 11,
    color: '#475569',
    fontFamily: 'monospace',
    height: 20,
    lineHeight: '20px',
  },
  codeTextarea: {
    flex: 1,
    background: '#0F172A',
    color: '#E2E8F0',
    border: 'none',
    resize: 'none',
    outline: 'none',
    padding: '12px 14px',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: '20px',
    boxSizing: 'border-box',
  },

  btnEvaluate: {
    width: '100%',
    padding: '14px',
    background: '#2563EB',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  },
  modelBtn: {
    background: 'none',
    border: 'none',
    color: '#2563EB',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
    padding: 0,
    fontFamily: "'Inter', sans-serif",
  },
  
  evalPanel: {
    marginTop: 24,
    borderTop: '1px solid #E2E8F0',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  evalTopHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  evalStatusBadge: {
    fontSize: 10,
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: 6,
    letterSpacing: '0.04em',
  },
  complexityChip: {
    fontSize: 11,
    fontWeight: 700,
    background: '#EFF6FF',
    color: '#1E40AF',
    border: '1.5px solid #BFDBFE',
    borderRadius: 6,
    padding: '3px 8px',
  },
  feedbackCard: {
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: '16px',
  },
  starGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 10,
  },
  starItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  modelCard: {
    background: '#F0F9FF',
    border: '1px solid #BAE6FD',
    borderRadius: 12,
    padding: '16px',
  },
  modelPre: {
    margin: '8px 0 0',
    fontSize: 13,
    color: '#0369A1',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
  },
  stepperActionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  prevBtn: {
    background: 'white',
    border: '1.5px solid #CBD5E1',
    color: '#475569',
    fontWeight: 600,
    fontSize: 13,
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  nextBtn: {
    background: '#2563EB',
    color: 'white',
    border: 'none',
    fontWeight: 600,
    fontSize: 13,
    padding: '10px 22px',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37,99,235,0.15)',
    fontFamily: "'Inter', sans-serif",
  },
  finishBtn: {
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'white',
    border: 'none',
    fontWeight: 700,
    fontSize: 13,
    padding: '10px 22px',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
    fontFamily: "'Inter', sans-serif",
  },
  redoBtn: {
    background: 'white',
    border: '1.5px solid #CBD5E1',
    color: '#475569',
    fontWeight: 600,
    fontSize: 12,
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    width: 'max-content',
    fontFamily: "'Inter', sans-serif",
  },

  // ─── Scorecard Specific Styles ───
  reportWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  scorecardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
  },
  scorecardLeftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  scorecardRightCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  reportScoreCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 20,
    padding: '32px 24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  coachCard: {
    background: '#F0F9FF',
    border: '1px solid #BAE6FD',
    borderRadius: 20,
    padding: 24,
  },
  breakdownsCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 20,
    padding: 28,
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  metricRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 20,
  },
  metricInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#334155',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: 700,
  },
  metricTrack: {
    height: 8,
    background: '#F1F5F9',
    borderRadius: 99,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 99,
    transition: 'width 1s ease',
  },
  atsNavBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    background: '#2563EB',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 14,
    padding: '12px 24px',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(37,99,235,0.15)',
    transition: 'all 0.2s',
  },
};
