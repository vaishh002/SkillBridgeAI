import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';


export default function LearningRoadmap() {
  const { token, user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState('');
  const [preferences, setPreferences] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Fetch roadmap on mount
  useEffect(() => {
    fetchRoadmap();
  }, []);

  async function fetchRoadmap() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/roadmap`, {
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
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch roadmap');
      }

      setPreferences(data.preferences);
      setRoadmap(data.roadmap || []);
      
      // Auto-select the first in-progress or not-started node if nothing is selected
      if (data.roadmap && data.roadmap.length > 0) {
        const active = data.roadmap.find(item => item.status !== 'completed') || data.roadmap[0];
        setSelectedNode(active);
      }
    } catch (err) {
      console.error(err);
      setError('Could not load your learning path. Please complete the quiz first.');
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (itemId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roadmap/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update progress');
      }

      // Update state
      setRoadmap(data.roadmap);
      
      // Update specific selected node
      const updatedNode = data.roadmap.find(item => item._id === itemId);
      setSelectedNode(updatedNode);

      // Update preference stats (readiness score)
      setPreferences(prev => ({
        ...prev,
        careerReadinessScore: data.careerReadinessScore
      }));

      // Sync user profile context
      const updatedUser = { ...user, careerReadinessScore: data.careerReadinessScore };
      login(updatedUser, token);

    } catch (err) {
      console.error(err);
      alert('Error updating status: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.spinner} />
        <span style={{ fontSize: 15, color: '#64748B', fontWeight: 500 }}>Generating your personalized path...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // If preferences targetRole is not set, prompt to onboarding
  if (!preferences?.targetRole || roadmap.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>🧭</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
            No Active Learning Path
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 28, maxWidth: 460 }}>
            To generate a customized step-by-step learning roadmap, choose your career path preferences or upload a resume to analyze skill gaps.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/onboarding" style={styles.primaryLinkBtn}>
              ⚙️ Customize Path
            </Link>
            <Link to="/resume-analyzer" style={styles.secondaryLinkBtn}>
              📄 Scan Skill Gaps
            </Link>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="roadmap-page" style={styles.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .roadmap-content-layout {
          display: grid;
          grid-template-columns: 1.2fr 1.3fr;
          gap: 28px;
          align-items: start;
        }
        .roadmap-details-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 8px 30px rgba(15,23,42,0.03);
          position: sticky;
          top: 100px;
        }
        @media (max-width: 900px) {
          .roadmap-content-layout {
            grid-template-columns: 1fr !important;
          }
          .roadmap-details-panel {
            position: static !important;
          }
        }
        @media (max-width: 600px) {
          .roadmap-page {
            padding: 16px !important;
          }
          .roadmap-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .roadmap-progress-card {
            width: 100% !important;
          }
          .roadmap-details-panel {
            padding: 18px !important;
          }
          .roadmap-status-btns {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
      
      {/* Roadmap Header */}
      <div className="roadmap-header-row" style={styles.header}>
        <div>
          <h1 style={styles.title}>{preferences.targetRole} Learning Roadmap</h1>
          <p style={styles.subtitle}>
            Personalized for you in <strong>{preferences.learningStyle}</strong> modality.
            Dedicate <strong>{preferences.weeklyHours} hours/week</strong> to complete this milestone.
          </p>
        </div>
        
        {/* Progress Card */}
        <div className="roadmap-progress-card" style={styles.progressCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#475569', fontWeight: 700 }}>PATH COMPLETION</span>
            <span style={{ fontSize: 13, color: '#2563EB', fontWeight: 800 }}>{preferences.careerReadinessScore}%</span>
          </div>
          <div style={styles.progressBarTrack}>
            <div style={{ ...styles.progressBarFill, width: `${preferences.careerReadinessScore}%` }} />
          </div>
          <span style={{ fontSize: 10, color: '#64748B', display: 'block', marginTop: 6, fontWeight: 500 }}>
            {roadmap.filter(item => item.status === 'completed').length} of {roadmap.length} skills mastered
          </span>
        </div>
      </div>

      <div className="roadmap-content-layout">
        
        {/* Left Side: Timeline Graph */}
        <div style={styles.timelineContainer}>
          <div style={styles.timelineLine} />
          
          <div style={styles.timelineList}>
            {roadmap.map((item, index) => {
              const isSelected = selectedNode?._id === item._id;
              const isCompleted = item.status === 'completed';
              const isInProgress = item.status === 'in_progress';
              
              let markerColor = '#E2E8F0';
              let markerBorder = '2px solid #94A3B8';
              let markerText = 'gray';
              
              if (isCompleted) {
                markerColor = '#10B981';
                markerBorder = '2px solid #10B981';
                markerText = 'white';
              } else if (isInProgress) {
                markerColor = '#EFF6FF';
                markerBorder = '2px solid #2563EB';
                markerText = '#2563EB';
              }

              return (
                <div 
                  key={item._id} 
                  style={styles.timelineNodeWrapper}
                  onClick={() => setSelectedNode(item)}
                >
                  {/* Step Marker */}
                  <div style={{
                    ...styles.timelineMarker,
                    background: markerColor,
                    border: markerBorder,
                    color: isCompleted ? 'white' : markerText,
                    boxShadow: isSelected ? '0 0 0 4px rgba(37, 99, 235, 0.15)' : 'none',
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}>
                    {isCompleted ? '✓' : index + 1}
                  </div>

                  {/* Node Card */}
                  <div style={{
                    ...styles.timelineNodeCard,
                    border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    background: isSelected ? '#EFF6FF' : '#FFFFFF',
                    boxShadow: isSelected ? '0 4px 15px rgba(37, 99, 235, 0.06)' : 'none',
                    transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isSelected ? '#1E3A8A' : '#1E293B'
                      }}>
                        {item.skillName}
                      </span>
                      
                      {/* Status Badges */}
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 6,
                        padding: '3px 8px',
                        background: isCompleted ? '#D1FAE5' : isInProgress ? '#DBEAFE' : '#F1F5F9',
                        color: isCompleted ? '#065F46' : isInProgress ? '#1E40AF' : '#475569',
                        whiteSpace: 'nowrap'
                      }}>
                        {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Node Panel Details */}
        {selectedNode && (
          <div className="roadmap-details-panel">
            <div style={styles.detailsHeader}>
              <div>
                <span style={styles.detailsTag}>ACTIVE MODULE</span>
                <h2 style={styles.detailsTitle}>{selectedNode.skillName}</h2>
              </div>

              {/* Status Action Selector */}
              <div className="roadmap-status-btns" style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => handleUpdateStatus(selectedNode._id, 'completed')}
                  style={{
                    ...styles.statusActionBtn,
                    background: selectedNode.status === 'completed' ? '#10B981' : '#FFFFFF',
                    color: selectedNode.status === 'completed' ? '#FFFFFF' : '#475569',
                    borderColor: selectedNode.status === 'completed' ? '#10B981' : '#E2E8F0'
                  }}
                >
                  Mastered ✓
                </button>
                
                {selectedNode.status !== 'completed' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedNode._id, 'in_progress')}
                    style={{
                      ...styles.statusActionBtn,
                      background: selectedNode.status === 'in_progress' ? '#2563EB' : '#FFFFFF',
                      color: selectedNode.status === 'in_progress' ? '#FFFFFF' : '#475569',
                      borderColor: selectedNode.status === 'in_progress' ? '#2563EB' : '#E2E8F0'
                    }}
                  >
                    Learning ⚡
                  </button>
                )}
              </div>
            </div>

            {/* Resource Recommendations */}
            <div style={styles.resourcesSection}>
              <h3 style={styles.resourcesTitle}>Recommended Curated Resources</h3>
              
              {selectedNode.resources && selectedNode.resources.length > 0 ? (
                <div style={styles.resourceList}>
                  {selectedNode.resources.map((res, i) => (
                    <a 
                      key={i} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={styles.resourceCard}
                    >
                      <div style={styles.resourceIconWrapper(res.type)}>
                        {res.type === 'video' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                        ) : res.type === 'doc' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                          </svg>
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', display: 'block' }}>
                          {res.title}
                        </span>
                        <span style={{ fontSize: 11, color: '#64748B', textTransform: 'capitalize', marginTop: 2, display: 'inline-block' }}>
                          {res.type === 'doc' ? 'Official Documentation' : res.type === 'video' ? 'Interactive Video' : 'Practice Project'}
                        </span>
                      </div>

                      <span style={styles.cardArrow}>↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: '#64748B' }}>No resources found for this module.</p>
              )}
            </div>

            {/* Practical Project Challenge Card */}
            <div style={styles.challengeBox}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1E3A8A', display: 'flex', alignItems: 'center', gap: 6 }}>
                🚀 Hands-on Project Milestone
              </h4>
              <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginTop: 6 }}>
                Build a mini-application using {selectedNode.skillName} to lock in your skills. Once done, verify your preparation by completing a custom practice interview coach.
              </p>
              <Link to="/interview-generator" style={styles.practiceBtn}>
                Launch Mock Interview Coach →
              </Link>
            </div>

          </div>
        )}
      </div>
      
    </div>
  );
}

// ─── Timeline CSS Styling ──────────────────────────────────────────
const styles = {
  page: {
    padding: '32px',
    background: '#F8FAFC',
    minHeight: 'calc(100vh - 68px)',
    fontFamily: "'Inter', sans-serif"
  },
  loadingPage: {
    minHeight: 'calc(100vh - 68px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  spinner: {
    width: 36,
    height: 36,
    border: '3px solid #E2E8F0',
    borderTopColor: '#2563EB',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  emptyPage: {
    minHeight: 'calc(100vh - 68px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8FAFC',
    padding: '24px'
  },
  emptyCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 20,
    padding: '40px',
    textAlign: 'center',
    maxWidth: 500,
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: 16
  },
  primaryLinkBtn: {
    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    color: '#FFFFFF',
    padding: '12px 20px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
    display: 'inline-block'
  },
  secondaryLinkBtn: {
    background: '#FFFFFF',
    border: '1.5px solid #E2E8F0',
    color: '#475569',
    padding: '11px 20px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-block'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 32,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 24
  },
  title: {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    fontWeight: 800,
    color: '#0F172A',
    letterSpacing: '-0.02em',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 1.5
  },
  progressCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: '16px',
    minWidth: 200,
    boxShadow: '0 4px 15px rgba(15, 23, 42, 0.02)'
  },
  progressBarTrack: {
    height: 8,
    background: '#F1F5F9',
    borderRadius: 99,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
    borderRadius: 99,
    transition: 'width 0.8s ease-in-out'
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 24
  },
  timelineLine: {
    position: 'absolute',
    left: 42,
    top: 24,
    bottom: 24,
    width: 2,
    background: '#E2E8F0',
    zIndex: 1
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    position: 'relative',
    zIndex: 2
  },
  timelineNodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    cursor: 'pointer'
  },
  timelineMarker: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0
  },
  timelineNodeCard: {
    flex: 1,
    borderRadius: 14,
    padding: '16px 20px',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12
  },
  detailsTag: {
    fontSize: 10,
    fontWeight: 700,
    color: '#2563EB',
    letterSpacing: '0.12em',
    display: 'block',
    marginBottom: 6
  },
  detailsTitle: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
    fontWeight: 800,
    color: '#0F172A',
    letterSpacing: '-0.02em'
  },
  statusActionBtn: {
    fontSize: 12,
    fontWeight: 700,
    border: '1.5px solid',
    borderRadius: 8,
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none',
    fontFamily: "'Inter', sans-serif"
  },
  resourcesSection: {
    marginBottom: 24
  },
  resourcesTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#475569',
    marginBottom: 12
  },
  resourceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  resourceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '12px 16px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 10,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  resourceIconWrapper: (type) => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: type === 'video' ? '#FEE2E2' : type === 'doc' ? '#E0F2FE' : '#D1FAE5',
    color: type === 'video' ? '#EF4444' : type === 'doc' ? '#3B82F6' : '#10B981',
    flexShrink: 0
  }),
  cardArrow: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: 'bold'
  },
  challengeBox: {
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 12,
    padding: '16px 20px',
    marginTop: 20
  },
  practiceBtn: {
    background: '#2563EB',
    color: '#FFFFFF',
    padding: '10px 16px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: 12,
    transition: 'all 0.2s',
    boxShadow: '0 4px 10px rgba(37,99,235,0.2)'
  }
};
