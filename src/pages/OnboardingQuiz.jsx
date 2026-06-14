import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';


export default function OnboardingQuiz() {
  const { token, login, user, logout } = useAuth();
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [learningStyle, setLearningStyle] = useState('Video');
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { name: 'Frontend Developer', desc: 'Interfaces, user experience, browser performance' },
    { name: 'Backend Developer', desc: 'APIs, servers, databases, architecture scale' },
    { name: 'Full Stack Engineer', desc: 'End-to-end applications, client + server' },
    { name: 'DevOps Engineer', desc: 'CI/CD, cloud deployments, scaling, infrastructure' },
    { name: 'Data Scientist', desc: 'Data modeling, analysis, machine learning algorithms' }
  ];

  const styles = [
    {
      id: 'Video',
      label: 'Visual Learner',
      desc: 'Learn through tutorials, video playlists, and visual walk-throughs.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    },
    {
      id: 'Reading',
      label: 'Textual Learner',
      desc: 'Learn through official documentations, technical guides, and books.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      id: 'Practical',
      label: 'Hands-on Builder',
      desc: 'Learn through coding exercises, GitHub projects, and sandboxes.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/roadmap/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetRole, learningStyle, weeklyHours })
      });

      const data = await response.json();
      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save preferences');
      }

      // Update the user details in local storage / context
      const updatedUser = { ...user, targetRole, learningStyle, weeklyHours, careerReadinessScore: 0 };
      login(updatedUser, token);

      // Redirect to Roadmap Page
      navigate('/roadmap');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page" style={stylesLayout.page}>
      <div className="onboarding-container" style={stylesLayout.container}>
        
        {/* Step Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={stylesLayout.title}>Personalize Your Learning Journey</h2>
          <p style={stylesLayout.subtitle}>
            Select your career goals and preferences so we can customize a step-by-step roadmap tailored specifically for you.
          </p>
        </div>

        {error && (
          <div className="error-banner" style={stylesLayout.errorBanner}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={stylesLayout.form}>
          
          {/* Section 1: Target Career Goal */}
          <div className="form-group" style={stylesLayout.section}>
            <h3 style={stylesLayout.sectionTitle}>1. What is your target career role?</h3>
            <div className="role-grid" style={stylesLayout.roleGrid}>
              {roles.map((role) => (
                <button
                  key={role.name}
                  type="button"
                  onClick={() => setTargetRole(role.name)}
                  className={`role-option ${targetRole === role.name ? 'selected' : ''}`}
                  style={stylesLayout.roleCard(targetRole === role.name)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: targetRole === role.name ? '#2563EB' : '#1E293B' }}>
                      {role.name}
                    </span>
                    {targetRole === role.name && (
                      <span style={stylesLayout.checkCircle}>✓</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: '#64748B', textAlign: 'left', marginTop: 4 }}>
                    {role.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Preferred Learning Style */}
          <div className="form-group" style={stylesLayout.section}>
            <h3 style={stylesLayout.sectionTitle}>2. Choose your preferred learning style</h3>
            <div className="style-grid" style={stylesLayout.styleGrid}>
              {styles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setLearningStyle(style.id)}
                  className={`style-option ${learningStyle === style.id ? 'selected' : ''}`}
                  style={stylesLayout.styleCard(learningStyle === style.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={stylesLayout.iconWrapper(learningStyle === style.id)}>
                      {style.icon}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: learningStyle === style.id ? '#2563EB' : '#1E293B' }}>
                      {style.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748B', textAlign: 'left', lineHeight: 1.4 }}>
                    {style.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Time Availability */}
          <div className="form-group" style={stylesLayout.section}>
            <h3 style={stylesLayout.sectionTitle}>3. How much time can you dedicate weekly?</h3>
            <div style={{ padding: '8px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Commitment Level</span>
                <span style={{ fontSize: 14, color: '#2563EB', fontWeight: 700 }}>{weeklyHours} Hours / Week</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="2"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                style={stylesLayout.rangeInput}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Casual (2 hrs)</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Part-time (15 hrs)</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Intense (40 hrs)</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
            style={stylesLayout.submitBtn(loading)}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={stylesLayout.spinner} />
                <span>Building Your Custom Path...</span>
              </div>
            ) : (
              'Generate My Learning Path'
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

// ─── Component Layout Styling ───────────────────────────────────────
const stylesLayout = {
  page: {
    minHeight: 'calc(100vh - 68px)',
    padding: '40px 24px',
    background: '#F8FAFC',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  container: {
    width: '100%',
    maxWidth: 720,
    background: '#FFFFFF',
    borderRadius: 20,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    border: '1px solid #E2E8F0',
    padding: '40px'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: '-0.02em'
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 1.5,
    maxWidth: 600,
    margin: '0 auto'
  },
  errorBanner: {
    padding: '12px 16px',
    background: '#FEE2E2',
    border: '1px solid #FCA5A5',
    color: '#B91C1C',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 24
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1E293B'
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 12
  },
  roleCard: (isSelected) => ({
    background: isSelected ? '#EFF6FF' : '#FFFFFF',
    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
    borderRadius: 12,
    padding: '14px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none',
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    outline: 'none'
  }),
  checkCircle: {
    background: '#2563EB',
    color: '#FFFFFF',
    width: 18,
    height: 18,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 'bold'
  },
  styleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 12
  },
  styleCard: (isSelected) => ({
    background: isSelected ? '#EFF6FF' : '#FFFFFF',
    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
    borderRadius: 12,
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    outline: 'none'
  }),
  iconWrapper: (isSelected) => ({
    width: 38,
    height: 38,
    borderRadius: 8,
    background: isSelected ? '#2563EB' : '#F1F5F9',
    color: isSelected ? '#FFFFFF' : '#64748B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }),
  rangeInput: {
    width: '100%',
    accentColor: '#2563EB',
    height: 6,
    borderRadius: 99,
    background: '#E2E8F0',
    outline: 'none',
    cursor: 'pointer'
  },
  submitBtn: (loading) => ({
    background: loading ? '#93C5FD' : 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    padding: '14px 20px',
    fontSize: 15,
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    boxShadow: loading ? 'none' : '0 4px 15px rgba(37, 99, 235, 0.25)'
  }),
  spinner: {
    width: 18,
    height: 18,
    border: '2px solid #FFFFFF',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite'
  }
};
