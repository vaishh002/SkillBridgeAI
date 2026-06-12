import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── Document Type & Action Icons (Google Drive Style) ───────────────
function PDFIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#EF4444"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">PDF</text>
    </svg>
  );
}

function SheetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#10B981"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">XLS</text>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#3B82F6"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">DOC</text>
    </svg>
  );
}

function SlideIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#F59E0B"/>
      <text x="12" y="15" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="'Inter', sans-serif">PPT</text>
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

function ShareLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();

  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'Student';

  // 4 Toolkit tools represented as premium Folder Cards
  const tools = [
    {
      id: 'resume-analyzer',
      title: 'Resume AI',
      sub: 'Resume Analyzer',
      badge: 'Most Popular',
      path: '/resume-analyzer',
      selected: true, // Selected card has blue background matching "Design Files" folder
      avatars: ['AI', 'US', 'RD'], // overlapping user indicators
    },
    {
      id: 'ats-checker',
      title: 'ATS Checkers',
      sub: 'ATS Score Checker',
      badge: 'New',
      path: '/ats-checker',
      selected: false,
      avatars: ['AT', 'SC'],
    },
    {
      id: 'interview-prep',
      title: 'Interview Coach',
      sub: 'Interview Prep',
      badge: 'AI Powered',
      path: '/interview-generator',
      selected: false,
      avatars: ['IN', 'CO', 'AI'],
    },
    {
      id: 'career-stats',
      title: 'Career Insights',
      sub: 'Insights & Trends',
      badge: 'Coming Soon',
      path: '/dashboard',
      selected: false,
      avatars: ['SO', 'ON'],
      disabled: true,
    },
  ];

  // Quick Tips & Guides styled as Files in a Table
  const recentFiles = [
    {
      name: 'Resume_Tailoring_Guide.pdf',
      category: 'Resume Tip',
      tip: 'Tailor your resume for each job application to match key terms.',
      icon: <PDFIcon />,
      lastModified: 'Today, 12:42 PM',
      size: '120 KB',
      actionPath: '/resume-analyzer',
    },
    {
      name: 'Quantify_Achievements_Checklist.xlsx',
      category: 'Metric Guide',
      tip: 'Quantify your accomplishments with specific numbers & percentages.',
      icon: <SheetIcon />,
      lastModified: 'Yesterday, 10:14 PM',
      size: '85 KB',
      actionPath: '/resume-analyzer',
    },
    {
      name: 'ATS_Keyword_Optimization.docs',
      category: 'ATS Guide',
      tip: 'Include role-specific keywords naturally throughout your experience section.',
      icon: <DocIcon />,
      lastModified: 'Jun 10, 2026',
      size: '156 KB',
      actionPath: '/ats-checker',
    },
    {
      name: 'STAR_Method_Interview_Prep.pdf',
      category: 'Interview Coach',
      tip: 'Structure answers using Situation, Task, Action, Result format.',
      icon: <PDFIcon />,
      lastModified: 'Jun 8, 2026',
      size: '195 KB',
      actionPath: '/interview-generator',
    },
  ];

  return (
    <div style={ds.page}>
      
      {/* ── Drive-style Header ── */}
      <div style={ds.driveHeader}>
        <div style={ds.driveHeaderLeft}>
          <div style={ds.titleRow}>
            <h1 style={ds.driveTitle}>My Dashboard</h1>
            <div style={ds.folderIconContainer}><FolderIcon color="#2563EB" /></div>
          </div>
          <p style={ds.driveGreeting}>
            Welcome back, <strong style={{ color: '#0F172A' }}>{firstName}</strong>! Here is your AI Career Toolkit status as of today.
          </p>
        </div>

        {/* View Toggle Icons (Google Drive Detail) */}
        <div style={ds.viewControls}>
          <button style={ds.iconBtnActive} title="Grid view">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button style={ds.iconBtn} title="List view" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={ds.verticalDivider} />
          <button style={ds.iconBtn} title="View details" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </button>
        </div>
      </div>

      <div style={ds.container}>
        
        {/* ── Quick Access Row (Tools Grid) ── */}
        <div style={ds.sectionWrapper}>
          <div style={ds.sectionHeadingRow}>
            <span style={ds.sectionLabel}>QUICK ACCESS</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          
          <div style={ds.toolsGrid}>
            {tools.map((tool) => {
              const cardStyle = tool.selected ? ds.selectedFolderCard : ds.folderCard;
              const titleStyle = tool.selected ? ds.selectedFolderTitle : ds.folderTitle;
              const subStyle = tool.selected ? ds.selectedFolderSub : ds.folderSub;
              const tagStyle = tool.selected ? ds.selectedBadge : ds.badge;

              return (
                <Link 
                  key={tool.id} 
                  to={tool.disabled ? '#' : tool.path}
                  style={{ 
                    ...cardStyle, 
                    pointerEvents: tool.disabled ? 'none' : 'auto', 
                    opacity: tool.disabled ? 0.6 : 1 
                  }}
                  className={`tool-folder-${tool.id}`}
                  id={`folder-${tool.id}`}
                >
                  <div style={ds.folderHeader}>
                    <span style={tagStyle}>SHARED WITH</span>
                    
                    {/* Avatars indicating shared with AI models */}
                    <div style={ds.avatarStack}>
                      {tool.avatars.map((av, index) => (
                        <div 
                          key={index} 
                          style={{
                            ...ds.miniAvatar,
                            background: tool.selected ? '#3b82f6' : '#E2E8F0',
                            border: `2px solid ${tool.selected ? '#1D4ED8' : '#FFFFFF'}`,
                            color: tool.selected ? '#FFFFFF' : '#475569',
                            marginLeft: index > 0 ? -8 : 0,
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
                    <span style={subStyle}>{tool.badge}</span>
                    <h3 style={titleStyle}>{tool.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── All Files Section (Document Table) ── */}
        <div style={ds.sectionWrapper}>
          <div style={ds.sectionHeadingRow}>
            <span style={ds.sectionLabel}>ALL FILES & CAREER GUIDES</span>
          </div>

          <div style={ds.tableContainer}>
            <table style={ds.table}>
              <thead>
                <tr style={ds.tableHeaderRow}>
                  <th style={ds.th}>NAME</th>
                  <th style={ds.th}>CATEGORY</th>
                  <th style={ds.th}>QUICK CAREER TIP</th>
                  <th style={ds.th}>FILE SIZE</th>
                  <th style={{ ...ds.th, textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file, i) => (
                  <tr key={i} style={ds.tableRow} className="db-table-row">
                    {/* Name column */}
                    <td style={ds.td}>
                      <div style={ds.fileNameCell}>
                        {file.icon}
                        <Link to={file.actionPath} style={ds.fileNameText}>
                          {file.name}
                        </Link>
                      </div>
                    </td>

                    {/* Owner category column */}
                    <td style={ds.td}>
                      <div style={ds.ownerCell}>
                        <div style={ds.ownerAvatar}>SB</div>
                        <span style={ds.ownerLabel}>{file.category}</span>
                      </div>
                    </td>

                    {/* Tip description column */}
                    <td style={ds.td}>
                      <span style={ds.tipText}>{file.tip}</span>
                    </td>

                    {/* Size column */}
                    <td style={ds.td}>
                      <span style={ds.sizeText}>{file.size}</span>
                    </td>

                    {/* Interactive icons on hover */}
                    <td style={{ ...ds.td, textAlign: 'right' }}>
                      <div style={ds.rowActionsWrapper} className="row-actions">
                        <Link to={file.actionPath} style={ds.rowActionButton} title="Open Tool">
                          <ShareLinkIcon />
                        </Link>
                        <button style={ds.rowActionButton} title="More actions">
                          <MoreIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Premium Upgrade Banner (Storage Promo style) ── */}
        <div style={ds.upgradeCard}>
          <div style={ds.upgradeInner}>
            <div style={ds.upgradeText}>
              <h2 style={ds.upgradeTitle}>Ready to land your dream job?</h2>
              <p style={ds.upgradeDesc}>Unlock unlimited scans, ATS keyword suggestions, and custom AI coach roadmaps.</p>
            </div>
            <Link to="/resume-analyzer" style={ds.upgradeBtn} id="dashboard-upgrade-link">
              🚀 Analyze Resume
            </Link>
          </div>
        </div>
        
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
        
        [class^="tool-folder-"] {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        [class^="tool-folder-"]:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
        }
        .tool-folder-resume-analyzer:hover {
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.3) !important;
        }

        @media (max-width: 900px) {
          .db-tools-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .db-tools-grid {
            grid-template-columns: 1fr !important;
          }
          .db-table-header-row th:nth-child(2),
          .db-table-header-row th:nth-child(4),
          .db-table-row td:nth-child(2),
          .db-table-row td:nth-child(4) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const ds = {
  page: {
    minHeight: 'calc(100vh - 68px)',
    background: '#FFFFFF',
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: '24px 32px 60px',
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
  viewControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: '#F1F5F9',
    padding: 4,
    borderRadius: 10,
    border: '1px solid #E2E8F0',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748B',
    cursor: 'not-allowed',
    padding: 0,
  },
  iconBtnActive: {
    background: '#FFFFFF',
    border: 'none',
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2563EB',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    padding: 0,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    background: '#E2E8F0',
    margin: '0 4px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    width: '100%',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
    className: 'db-tools-grid',
  },
  
  // Normal Folder Card (Google Drive Style)
  folderCard: {
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    gap: 16,
  },
  folderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    fontSize: 9,
    fontWeight: 700,
    color: '#94A3B8',
    letterSpacing: '0.04em',
  },
  avatarStack: {
    display: 'flex',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    fontSize: 9,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderIconRow: {
    display: 'flex',
    alignItems: 'center',
  },
  folderTextRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  folderSub: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: 500,
  },
  folderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0F172A',
    margin: 0,
  },

  // Selected Folder Card (Highlighted in deep blue matching screenshot)
  selectedFolderCard: {
    background: '#2563EB',
    border: '1px solid #1D4ED8',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    gap: 16,
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
  },
  selectedBadge: {
    fontSize: 9,
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: '0.04em',
  },
  selectedFolderSub: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
  },
  selectedFolderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0,
  },

  // Table styling matching Google Drive file list
  tableContainer: {
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    borderBottom: '1px solid #E2E8F0',
    background: '#F8FAFC',
    className: 'db-table-header-row',
  },
  th: {
    padding: '14px 20px',
    fontSize: 11,
    fontWeight: 700,
    color: '#64748B',
    letterSpacing: '0.05em',
  },
  tableRow: {
    borderBottom: '1px solid #F1F5F9',
    background: '#FFFFFF',
  },
  td: {
    padding: '16px 20px',
    verticalAlign: 'middle',
  },
  fileNameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  fileNameText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F172A',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  ownerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  ownerAvatar: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: 500,
  },
  tipText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 1.5,
  },
  sizeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 500,
  },
  rowActionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  rowActionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748B',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },

  // Premium Promotion card styled like Google Drive Storage Banner
  upgradeCard: {
    background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #06B6D4 100%)',
    borderRadius: 24,
    padding: '36px 40px',
    color: '#FFFFFF',
    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)',
  },
  upgradeInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  upgradeText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 500,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  upgradeDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    margin: 0,
    lineHeight: 1.6,
  },
  upgradeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    background: '#FFFFFF',
    color: '#2563EB',
    fontWeight: 800,
    fontSize: 14,
    padding: '12px 24px',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
  },
};
