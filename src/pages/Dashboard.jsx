import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── Document Type Icons ──────────────────────────────────────────
function PDFIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#EF4444"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">PDF</text>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#10B981"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">DEV</text>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#3B82F6"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">DOC</text>
    </svg>
  );
}

function FolderIcon({ color = '#64748B' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

// ─── Score Ring Component ─────────────────────────────────────────
function ProgressRing({ score, size = 130 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const scoreColor = score >= 80 ? '#10B981' : score >= 50 ? '#2563EB' : '#F59E0B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F5F9" strokeWidth="10" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={scoreColor} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{score}%</span>
          <span style={{ fontSize: 10, color: '#64748B', fontWeight: 600, marginTop: 4 }}>Readiness</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'Learner';

  useEffect(() => {
    fetchRoadmapData();
  }, []);

  const fetchRoadmapData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/roadmap', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      if (response.ok) {
        setRoadmap(data.roadmap || []);
        setPreferences(data.preferences || null);
      }
    } catch (err) {
      console.error('Error fetching dashboard roadmap data:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeModules = roadmap.filter(item => item.status === 'in_progress');
  const incompleteModules = roadmap.filter(item => item.status !== 'completed');
  const nextUp = incompleteModules[0] || null;

  // 4 Core Action folders
  const tools = [
    {
      id: 'roadmap',
      title: 'Learning Path',
      sub: 'My Learning Roadmap',
      badge: 'Active Path',
      path: '/roadmap',
      selected: true,
      avatars: ['📚', '⚡'],
    },
    {
      id: 'resume-analyzer',
      title: 'Skill Gap Scanner',
      sub: 'Resume Gap Analyzer',
      badge: 'Scan Gaps',
      path: '/resume-analyzer',
      selected: false,
      avatars: ['🔍', '📄'],
    },
    {
      id: 'interview-coach',
      title: 'Interview Prep',
      sub: 'Mock Interview Coach',
      badge: 'Final Prep',
      path: '/interview-generator',
      selected: false,
      avatars: ['🤝', '🎤'],
    },
    {
      id: 'preferences',
      title: 'Path settings',
      sub: 'Update Goals',
      badge: 'Preferences',
      path: '/onboarding',
      selected: false,
      avatars: ['⚙️', '🎯'],
    },
  ];

  return (
    <div className="dashboard-page" style={ds.page}>
      
      {/* Header */}
      <div className="dashboard-header" style={ds.driveHeader}>
        <div style={ds.driveHeaderLeft}>
          <div style={ds.titleRow}>
            <h1 style={ds.driveTitle}>Dashboard</h1>
            <div style={ds.folderIconContainer}><FolderIcon color="#2563EB" /></div>
          </div>
          <p style={ds.driveGreeting}>
            Welcome back, <strong style={{ color: '#0F172A' }}>{firstName}</strong>! Here is your personalized learning path overview.
          </p>
        </div>
      </div>

      <div className="dashboard-content-container" style={ds.container}>
        
        {/* Onboarding Alert Banner if Target Role is not set */}
        {!preferences?.targetRole ? (
          <div className="onboarding-notice" style={ds.noticeCard}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E3A8A', marginBottom: 4 }}>🧭 Build Your Learning Path</h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                You haven't customized your career roadmap yet. Scan your resume or take the quick onboarding questionnaire to unlock adaptive study modules.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/onboarding" style={ds.noticePrimaryBtn}>Setup Goals</Link>
              <Link to="/resume-analyzer" style={ds.noticeSecondaryBtn}>Scan Resume</Link>
            </div>
          </div>
        ) : (
          /* Roadmap Summary widgets */
          <div className="roadmap-stats-grid" style={ds.statsGrid}>
            
            {/* Target Role widget */}
            <div className="stats-card" style={ds.statsCard}>
              <div>
                <span style={ds.statsCardTag}>TARGET CAREER GOAL</span>
                <h3 style={ds.statsCardTitle}>{preferences.targetRole}</h3>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                  Preferences: {preferences.learningStyle} learning, {preferences.weeklyHours} hours per week.
                </p>
              </div>
              <Link to="/onboarding" style={ds.statsCardLink}>
                Change settings ⚙️
              </Link>
            </div>

            {/* Path Readiness Score Ring */}
            <div className="stats-card" style={{ ...ds.statsCard, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <span style={ds.statsCardTag}>PATH COMPLETION</span>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', marginTop: 6 }}>Career Readiness Level</h4>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 1.4 }}>
                  Master topics on your roadmap to increase your readiness score.
                </p>
              </div>
              <ProgressRing score={preferences.careerReadinessScore || 0} />
            </div>

            {/* Next module up */}
            <div className="stats-card" style={ds.statsCard}>
              <div>
                <span style={ds.statsCardTag}>NEXT STUDY TOPIC</span>
                {nextUp ? (
                  <>
                    <h3 style={{ ...ds.statsCardTitle, fontSize: 18, color: '#2563EB', marginTop: 6 }}>{nextUp.skillName}</h3>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 8, lineHeight: 1.4 }}>
                      Selected resource: "{nextUp.resources?.[0]?.title || 'Study Guide'}"
                    </p>
                  </>
                ) : (
                  <>
                    <h3 style={{ ...ds.statsCardTitle, fontSize: 18, color: '#10B981', marginTop: 6 }}>Path Completed! 🎉</h3>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                      You have mastered all skills in this roadmap. Test yourself in the Interview Coach!
                    </p>
                  </>
                )}
              </div>
              <Link to="/roadmap" style={ds.statsCardLinkBtn}>
                {nextUp ? 'Continue Learning ⚡' : 'Review Path'}
              </Link>
            </div>

          </div>
        )}

        {/* Quick Access Folders */}
        <div className="dashboard-section-wrapper" style={ds.sectionWrapper}>
          <div style={ds.sectionHeadingRow}>
            <span style={ds.sectionLabel}>QUICK ACCESS</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          
          <div className="dashboard-tools-grid" style={ds.toolsGrid}>
            {tools.map((tool) => {
              const cardStyle = tool.selected ? ds.selectedFolderCard : ds.folderCard;
              const titleStyle = tool.selected ? ds.selectedFolderTitle : ds.folderTitle;
              const subStyle = tool.selected ? ds.selectedFolderSub : ds.folderSub;
              const tagStyle = tool.selected ? ds.selectedBadge : ds.badge;

              return (
                <Link 
                  key={tool.id} 
                  to={tool.path}
                  style={cardStyle}
                  className="dashboard-folder-card"
                  id={`folder-${tool.id}`}
                >
                  <div style={ds.folderHeader}>
                    <span style={tagStyle}>{tool.badge}</span>
                    
                    <div style={ds.avatarStack}>
                      {tool.avatars.map((av, index) => (
                        <div 
                          key={index} 
                          style={{
                            ...ds.miniAvatar,
                            background: tool.selected ? '#3B82F6' : '#EFF6FF',
                            border: `2px solid ${tool.selected ? '#1D4ED8' : '#FFFFFF'}`,
                            marginLeft: index > 0 ? -6 : 0,
                            zIndex: 10 - index
                          }}
                        >
                          {av}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={ds.folderIconRow}>
                    <FolderIcon color={tool.selected ? '#FFFFFF' : '#2563EB'} />
                  </div>

                  <div style={ds.folderTextRow}>
                    <span style={subStyle}>{tool.sub}</span>
                    <h3 style={titleStyle}>{tool.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Learning Roadmap Tasks Table */}
        {roadmap.length > 0 && (
          <div className="dashboard-section-wrapper" style={ds.sectionWrapper}>
            <div style={ds.sectionHeadingRow}>
              <span style={ds.sectionLabel}>ACTIVE STUDY TASKS</span>
            </div>

            <div style={ds.tableContainer}>
              <table style={ds.table}>
                <thead>
                  <tr style={ds.tableHeaderRow}>
                    <th style={ds.th}>TOPIC MODULE</th>
                    <th style={ds.th} className="db-table-hide-mobile">RESOURCE FORMAT</th>
                    <th style={ds.th} className="db-table-hide-mobile">RECOMMENDED START RESOURCE</th>
                    <th style={ds.th}>STATUS</th>
                    <th style={{ ...ds.th, textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmap.slice(0, 5).map((item, i) => {
                    const primaryResource = item.resources?.[0] || null;
                    const isCompleted = item.status === 'completed';
                    const isInProgress = item.status === 'in_progress';
                    
                    let statusBadgeColor = '#F1F5F9';
                    let statusTextColor = '#475569';
                    if (isCompleted) {
                      statusBadgeColor = '#D1FAE5';
                      statusTextColor = '#065F46';
                    } else if (isInProgress) {
                      statusBadgeColor = '#DBEAFE';
                      statusTextColor = '#1E40AF';
                    }

                    return (
                      <tr key={i} style={ds.tableRow} className="db-table-row" onClick={() => navigate('/roadmap')}>
                        
                        {/* Module Name */}
                        <td style={ds.td}>
                          <div style={ds.fileNameCell}>
                            {primaryResource?.type === 'video' ? <PDFIcon /> : primaryResource?.type === 'practice' ? <CodeIcon /> : <DocIcon />}
                            <span style={ds.fileNameText}>{item.skillName}</span>
                          </div>
                        </td>

                        {/* Format category */}
                        <td style={ds.td} className="db-table-hide-mobile">
                          <span style={ds.ownerLabel}>{primaryResource?.type === 'video' ? 'Interactive Video' : primaryResource?.type === 'practice' ? 'Hands-on Practice' : 'Documentation Guide'}</span>
                        </td>

                        {/* Title link */}
                        <td style={ds.td} className="db-table-hide-mobile">
                          <span style={ds.tipText}>{primaryResource?.title || 'Resource Link'}</span>
                        </td>

                        {/* Status badge */}
                        <td style={ds.td}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            borderRadius: 6,
                            padding: '3px 8px',
                            background: statusBadgeColor,
                            color: statusTextColor
                          }}>
                            {isCompleted ? 'Mastered' : isInProgress ? 'Learning' : 'Not Started'}
                          </span>
                        </td>

                        {/* Arrow Action */}
                        <td style={{ ...ds.td, textAlign: 'right' }}>
                          <div style={ds.rowActionsWrapper} className="row-actions">
                            <Link to="/roadmap" style={ds.rowActionButton} title="Open Roadmap">
                              <ArrowUpRightIcon />
                            </Link>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .db-table-row {
          transition: background-color 0.2s ease;
        }
        .db-table-row:hover {
          background-color: #EFF6FF !important;
          cursor: pointer;
        }
        .db-table-row:hover .row-actions {
          opacity: 1 !important;
        }
        .row-actions {
          opacity: 0.25;
          transition: opacity 0.2s;
        }
        .dashboard-folder-card {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .dashboard-folder-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
        }
        .dashboard-page {
          padding: 32px 32px 60px !important;
        }
        @media (max-width: 768px) {
          .dashboard-page {
            padding: 16px 16px 40px !important;
          }
          .dashboard-tools-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .roadmap-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .onboarding-notice {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .db-table-hide-mobile {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .dashboard-tools-grid {
            grid-template-columns: 1fr !important;
          }
          .dashboard-page {
            padding: 12px 12px 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Component Styles ───────────────────────────────────────────────
const ds = {
  page: {
    minHeight: 'calc(100vh - 68px)',
    background: '#FFFFFF',
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: '32px 32px 60px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  driveHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 20,
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
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    width: '100%',
  },
  noticeCard: {
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 16,
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    flexWrap: 'wrap'
  },
  noticePrimaryBtn: {
    background: '#2563EB',
    color: '#FFFFFF',
    padding: '10px 18px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(37,99,235,0.15)'
  },
  noticeSecondaryBtn: {
    background: '#FFFFFF',
    border: '1.5px solid #D1D5DB',
    color: '#475569',
    padding: '9px 18px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20
  },
  statsCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    padding: '24px',
    boxShadow: '0 4px 15px rgba(15, 23, 42, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 160
  },
  statsCardTag: {
    fontSize: 10,
    fontWeight: 700,
    color: '#2563EB',
    letterSpacing: '0.12em',
    display: 'block',
    marginBottom: 6
  },
  statsCardTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#0F172A',
    letterSpacing: '-0.02em',
    margin: 0
  },
  statsCardLink: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: 12
  },
  statsCardLinkBtn: {
    background: '#F1F5F9',
    color: '#1E293B',
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    textDecoration: 'none',
    marginTop: 12,
    border: '1px solid #E2E8F0',
    transition: 'background 0.2s'
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  sectionHeadingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: '0.08em',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 20,
  },
  folderCard: {
    background: '#FFFFFF',
    border: '1.5px solid #E2E8F0',
    borderRadius: 20,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
  },
  selectedFolderCard: {
    background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    border: '1.5px solid #1D4ED8',
    borderRadius: 20,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    textDecoration: 'none',
    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
  },
  folderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    background: '#EFF6FF',
    color: '#2563EB',
    padding: '4px 10px',
    borderRadius: 9999,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.04em',
  },
  selectedBadge: {
    background: 'rgba(255, 255, 255, 0.18)',
    color: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: 9999,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.04em',
  },
  avatarStack: {
    display: 'flex',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
  },
  folderIconRow: {
    display: 'flex',
  },
  folderTextRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  folderSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: 500,
  },
  selectedFolderSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: 500,
  },
  folderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0F172A',
    margin: 0,
  },
  selectedFolderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0,
  },
  tableContainer: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    borderBottom: '1px solid #E2E8F0',
    background: '#F8FAFC',
  },
  th: {
    padding: '14px 20px',
    fontSize: 10,
    fontWeight: 800,
    color: '#64748B',
    letterSpacing: '0.08em',
  },
  tableRow: {
    borderBottom: '1px solid #F1F5F9',
  },
  td: {
    padding: '16px 20px',
    fontSize: 13,
    color: '#334155',
    verticalAlign: 'middle',
  },
  fileNameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  fileNameText: {
    fontWeight: 600,
    color: '#1E293B',
    textDecoration: 'none',
  },
  ownerLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: 500,
  },
  tipText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: 500
  },
  rowActionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  rowActionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748B',
    width: 32,
    height: 32,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
    textDecoration: 'none'
  }
};
