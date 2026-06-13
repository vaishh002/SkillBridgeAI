import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

// ─── Brand Logo SVG ────────────────────────────────────────────────
function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 6 4.5 6 7.5C6 8.8 6.5 10 7.3 10.9C6.5 11.6 6 12.7 6 14C6 16.2 7.8 18 10 18H10.5V20C10.5 21.1 11.4 22 12.5 22C13.6 22 14.5 21.1 14.5 20V18H14C16.2 18 18 16.2 18 14C18 12.7 17.5 11.6 16.7 10.9C17.5 10 18 8.8 18 7.5C18 4.5 15.5 2 12 2Z" fill="url(#brainGrad)"/>
      <circle cx="10" cy="9" r="1.2" fill="white" opacity="0.8"/>
      <circle cx="14" cy="9" r="1.2" fill="white" opacity="0.8"/>
      <path d="M10 13 Q12 15 14 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <defs>
        <linearGradient id="brainGrad" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── SVG Icons ─────────────────────────────────────────────────────
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      <circle cx="18" cy="6" r="4.5" fill="#EF4444" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
    </svg>
  );
}

function RoadmapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function LogInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);

  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setNotiOpen(false);
  }, [pathname]);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotiOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'Account';

  const authLinks = [
    { to: '/', label: 'Home', icon: <HomeIcon /> },
    { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/roadmap', label: 'Learning Roadmap', icon: <RoadmapIcon /> }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={navStyle(scrolled)}>
        <div className="navbar-container" style={innerStyle}>
          
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={logoStyle} id="nav-logo">
            <BrainIcon />
            <span className="navbar-logo-text" style={logoTextStyle}>
              Skill<span style={{ color: '#06B6D4' }}>Bridge</span>
              <span style={logoAIStyle}> AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links-desktop" style={linksStyle}>
            {!isAuthenticated ? (
              <>
                <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} style={linkStyle(pathname === '/')} id="nav-home">Home</Link>
                <Link to="/login" className="nav-btn nav-btn-login" style={ghostBtnStyle(pathname === '/login')} id="nav-login">Log In</Link>
                <Link to="/register" className="nav-btn nav-btn-register" style={primaryBtnStyle} id="nav-register">Get Started Free</Link>
              </>
            ) : (
              <div className="nav-controls-auth" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                
                {/* Navigation Links */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {authLinks.map(({ to, label, icon }) => {
                    const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
                    return (
                      <Link
                        key={to}
                        to={to}
                        className={`nav-link-item ${isActive ? 'active' : ''}`}
                        style={authLinkStyle(isActive)}
                        id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Notifications Dropdown */}
                <div style={{ position: 'relative' }} ref={notificationsRef}>
                  <button 
                    onClick={() => setNotiOpen(!notiOpen)}
                    className="nav-icon-btn" 
                    style={headerIconBtn}
                    aria-label="Notifications" 
                    id="nav-btn-notifications"
                  >
                    <BellIcon />
                  </button>
                  {notiOpen && (
                    <div className="navbar-notification-dropdown" style={dropdownStyle}>
                      <div style={dropdownHeaderStyle}>Notifications</div>
                      <div style={dropdownBodyStyle}>
                        <div style={notificationItemStyle}>
                          <p style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>💡 Welcome to SkillBridge AI</p>
                          <p style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>Complete your learning preferences questionnaire to build a tailored roadmap.</p>
                        </div>
                        {user?.targetRole && (
                          <div style={notificationItemStyle}>
                            <p style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>🎯 Learning Path Ready</p>
                            <p style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>Your learning path for {user.targetRole} has been successfully customized.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Help Link */}
                <Link 
                  to="/dashboard"
                  className="nav-icon-btn" 
                  style={headerIconBtn} 
                  aria-label="Help Center" 
                  id="nav-btn-help"
                >
                  <HelpIcon />
                </Link>

                {/* Profile Settings Dropdown */}
                <div style={{ position: 'relative' }} ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="nav-profile-btn"
                    style={userAvatarBtn}
                    id="nav-user-avatar"
                  >
                    <div className="nav-avatar-circle" style={avatarCircle}>
                      {firstName[0]?.toUpperCase()}
                    </div>
                    <span className="nav-profile-name" style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
                      {firstName}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="navbar-user-dropdown" style={userDropdown}>
                      <div style={userDropdownHeader}>
                        <p style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>{user?.fullName || firstName}</p>
                        <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{user?.email}</p>
                      </div>
                      <div style={userDropdownDivider} />
                      <Link to="/onboarding" style={userDropdownItem} id="nav-drop-onboarding">
                        <SettingsIcon />
                        <span>Path Preferences</span>
                      </Link>
                      <Link to="/dashboard" style={userDropdownItem} id="nav-drop-dashboard">
                        <DashboardIcon />
                        <span>My Dashboard</span>
                      </Link>
                      <div style={userDropdownDivider} />
                      <button onClick={handleLogout} style={userDropdownBtn} id="nav-drop-logout">
                        <LogOutIcon />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="navbar-hamburger"
            style={hamburgerStyle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span style={barStyle(menuOpen, 0)} />
            <span style={barStyle(menuOpen, 1)} />
            <span style={barStyle(menuOpen, 2)} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="navbar-mobile-drawer" style={drawerStyle}>
          {!isAuthenticated ? (
            <>
              <Link to="/" className="mobile-drawer-link" style={drawerLinkStyle(pathname === '/')} id="mob-home">
                <HomeIcon /> <span>Home</span>
              </Link>
              <Link to="/login" className="mobile-drawer-link" style={drawerLinkStyle(pathname === '/login')} id="mob-login">
                <LogInIcon /> <span>Log In</span>
              </Link>
              <Link to="/register" className="mobile-drawer-primary" style={drawerPrimaryStyle} id="mob-register">
                Get Started Free →
              </Link>
            </>
          ) : (
            <>
              <div className="mobile-drawer-user" style={drawerUserInfo}>
                <div style={{ ...avatarCircle, width: 44, height: 44, fontSize: 18, marginBottom: 4 }}>
                  {firstName[0]?.toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{user?.fullName || firstName}</p>
                  <p style={{ fontSize: 12, color: '#64748B' }}>{user?.email}</p>
                </div>
              </div>
              <div style={drawerDivider} />
              
              <Link to="/dashboard" className="mobile-drawer-link" style={drawerLinkStyle(pathname === '/dashboard')} id="mob-dashboard">
                <DashboardIcon /> <span>Dashboard</span>
              </Link>
              <Link to="/roadmap" className="mobile-drawer-link" style={drawerLinkStyle(pathname === '/roadmap')} id="mob-roadmap">
                <RoadmapIcon /> <span>Learning Roadmap</span>
              </Link>
              <Link to="/onboarding" className="mobile-drawer-link" style={drawerLinkStyle(pathname === '/onboarding')} id="mob-onboarding">
                <SettingsIcon /> <span>Path Preferences</span>
              </Link>

              <div style={drawerDivider} />
              <button onClick={handleLogout} className="mobile-drawer-logout" style={drawerLogoutStyle} id="mob-logout">
                <LogOutIcon /> <span>Log Out</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Spacer to prevent overlap of fixed navbar */}
      <div className="navbar-spacer" style={{ height: 68 }} />

      <style>{`
        @media (min-width: 769px) { 
          #nav-hamburger { display: none !important; } 
        }
        @media (max-width: 768px) {
          .navbar-links-desktop { display: none !important; }
          #nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── CSS Styles (Google Drive/Modern clean design tokens) ───────────
function navStyle(scrolled) {
  return {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.90)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid rgba(226, 232, 240, 0.5)',
    transition: 'all 0.25s ease',
    boxShadow: scrolled ? '0 4px 20px rgba(15, 23, 42, 0.06)' : 'none',
  };
}

const innerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
  height: 68,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
  flexShrink: 0,
};

const logoTextStyle = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#0F172A',
  letterSpacing: '-0.025em',
  fontFamily: "'Inter', sans-serif",
};

const logoAIStyle = {
  background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const linksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
};

function linkStyle(active) {
  return {
    textDecoration: 'none',
    color: active ? '#2563EB' : '#475569',
    fontWeight: active ? 600 : 500,
    fontSize: 14,
    padding: '8px 16px',
    borderRadius: 8,
    background: active ? '#EFF6FF' : 'transparent',
    transition: 'all 0.2s',
  };
}

function authLinkStyle(active) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    color: active ? '#2563EB' : '#475569',
    fontWeight: active ? 600 : 500,
    fontSize: 14,
    padding: '8px 14px',
    borderRadius: 8,
    background: active ? '#EFF6FF' : 'transparent',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };
}

function ghostBtnStyle(active) {
  return {
    textDecoration: 'none',
    color: active ? '#2563EB' : '#1E293B',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 18px',
    borderRadius: 8,
    border: `1.5px solid ${active ? '#2563EB' : '#E2E8F0'}`,
    background: active ? '#EFF6FF' : 'transparent',
    transition: 'all 0.2s',
    display: 'inline-block',
  };
}

const primaryBtnStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 600,
  fontSize: 14,
  padding: '9px 20px',
  borderRadius: 8,
  background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  transition: 'all 0.2s',
  display: 'inline-block',
  whiteSpace: 'nowrap',
};

const headerIconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 38,
  height: 38,
  borderRadius: '50%',
  color: '#64748B',
  transition: 'all 0.2s',
  padding: 0,
};

const userAvatarBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: '#F8FAFC',
  border: '1.5px solid #E2E8F0',
  borderRadius: 999,
  padding: '4px 12px 4px 4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: "'Inter', sans-serif",
};

const avatarCircle = {
  width: 30,
  height: 30,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
  color: 'white',
  fontWeight: 800,
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const userDropdown = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: 12,
  minWidth: 220,
  zIndex: 9999,
  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)',
  overflow: 'hidden',
  padding: '8px 0',
};

const userDropdownHeader = {
  padding: '12px 16px',
};

const userDropdownDivider = {
  height: 1,
  background: '#F1F5F9',
  margin: '6px 0',
};

const userDropdownItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 16px',
  fontSize: 14,
  fontWeight: 500,
  color: '#334155',
  textDecoration: 'none',
  transition: 'background 0.15s',
};

const userDropdownBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  textAlign: 'left',
  padding: '10px 16px',
  fontSize: 14,
  fontWeight: 500,
  color: '#EF4444',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Inter', sans-serif",
  transition: 'background 0.15s',
};

const hamburgerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 8,
  flexShrink: 0,
};

function barStyle(open, index) {
  const base = {
    display: 'block',
    width: 22,
    height: 2,
    background: '#0F172A',
    borderRadius: 2,
    transition: 'transform 0.3s, opacity 0.3s',
  };
  if (open) {
    if (index === 0) return { ...base, transform: 'translateY(7px) rotate(45deg)' };
    if (index === 1) return { ...base, opacity: 0 };
    if (index === 2) return { ...base, transform: 'translateY(-7px) rotate(-45deg)' };
  }
  return base;
}

const drawerStyle = {
  position: 'fixed',
  top: 68, left: 0, right: 0,
  background: 'white',
  borderBottom: '1px solid #E2E8F0',
  padding: '16px 24px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  zIndex: 999,
  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
  maxHeight: 'calc(100vh - 68px)',
  overflowY: 'auto',
};

const drawerUserInfo = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '8px 0',
};

const drawerDivider = {
  height: 1,
  background: '#F1F5F9',
  margin: '8px 0',
};

function drawerLinkStyle(active) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: active ? '#2563EB' : '#334155',
    fontWeight: active ? 600 : 500,
    fontSize: 15,
    padding: '12px 14px',
    borderRadius: 10,
    background: active ? '#EFF6FF' : 'transparent',
  };
}

const drawerPrimaryStyle = {
  textDecoration: 'none',
  textAlign: 'center',
  color: 'white',
  fontWeight: 700,
  fontSize: 15,
  padding: '12px',
  borderRadius: 10,
  background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  marginTop: 8,
  display: 'block',
};

const drawerLogoutStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  background: 'transparent',
  border: '1.5px solid #FCA5A5',
  color: '#EF4444',
  fontWeight: 600,
  fontSize: 15,
  padding: '12px',
  borderRadius: 10,
  cursor: 'pointer',
  fontFamily: "'Inter', sans-serif",
  width: '100%',
};

const dropdownStyle = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: 12,
  width: 280,
  zIndex: 9999,
  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)',
  overflow: 'hidden',
};

const dropdownHeaderStyle = {
  padding: '12px 16px',
  fontWeight: 700,
  fontSize: 13,
  color: '#1E293B',
  borderBottom: '1px solid #F1F5F9',
  background: '#F8FAFC'
};

const dropdownBodyStyle = {
  maxHeight: 240,
  overflowY: 'auto',
  padding: '8px 0'
};

const notificationItemStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #F8FAFC',
  cursor: 'pointer',
};