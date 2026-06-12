import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


// ─── Brand Logo ────────────────────────────────────────────────────
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

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      <circle cx="18" cy="6" r="4.5" fill="#EF4444" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

// ─── Authenticated Nav Links ───────────────────────────────────────
const authLinks = [
  { to: '/',                 label: 'Home',       icon: '🏠' },
  { to: '/dashboard',        label: 'Dashboard',  icon: '📊' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'Account';

  return (
    <>
      <nav style={navStyle(scrolled)}>
        <div style={innerStyle}>
          {/* ── Logo ── */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} style={logoStyle} id="nav-logo">
            <BrainIcon />
            <span style={logoTextStyle}>
              Skill<span style={{ color: '#06B6D4' }}>Bridge</span>
              <span style={logoAIStyle}> AI</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div style={linksStyle}>
            {!isAuthenticated ? (
              <>
                <Link to="/"  style={linkStyle(pathname === '/')}  id="nav-home">Home</Link>
                <Link to="/login"    style={ghostBtnStyle(pathname === '/login')}    id="nav-login">Log In</Link>
                <Link to="/register" style={primaryBtnStyle}                          id="nav-register">Get Started Free</Link>
              </>
            ) : (
              <>
                {/* Center search bar (Google Drive Style) */}
                <div style={searchBarWrap} className="nav-search-bar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ marginLeft: 12 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="Search analyses, tools, resources..."
                    style={searchInputStyle}
                    disabled
                  />
                </div>

                {/* Right side controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Auth nav links */}
                  {authLinks.map(({ to, label, icon }) => (
                    <Link
                      key={to}
                      to={to}
                      style={authLinkStyle(pathname === to || (to !== '/' && pathname.startsWith(to)))}
                      id={`nav-${label.toLowerCase().replace(' ', '-')}`}
                    >
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      {label}
                    </Link>
                  ))}

                  {/* Drive icons */}
                  <button style={headerIconBtn} aria-label="Notifications" id="nav-btn-notifications"><BellIcon /></button>
                  <button style={headerIconBtn} aria-label="Help" id="nav-btn-help"><HelpIcon /></button>
                  <button style={headerIconBtn} aria-label="Settings" id="nav-btn-settings"><SettingsIcon /></button>
                  
                  {/* User menu */}
                  <div style={{ position: 'relative', marginLeft: 4 }}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      style={userAvatarBtn}
                      id="nav-user-avatar"
                    >
                      <div style={avatarCircle}>
                        {firstName[0]?.toUpperCase()}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {firstName}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    
                    {userMenuOpen && (
                      <div style={userDropdown}>
                        <div style={userDropdownHeader}>
                          <p style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>{user?.fullName || firstName}</p>
                          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{user?.email}</p>
                        </div>
                        <div style={userDropdownDivider} />
                        <Link to="/dashboard" style={userDropdownItem} id="nav-drop-dashboard">🏠 Dashboard</Link>
                        <button onClick={handleLogout} style={userDropdownBtn} id="nav-drop-logout">🚪 Log Out</button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
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

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div style={drawerStyle}>
          {!isAuthenticated ? (
            <>
              <Link to="/"         style={drawerLinkStyle(pathname === '/')}       id="mob-home">🏠 Home</Link>
              <Link to="/login"    style={drawerLinkStyle(pathname === '/login')}  id="mob-login">🔑 Log In</Link>
              <Link to="/register" style={drawerPrimaryStyle}                       id="mob-register">🚀 Get Started Free →</Link>
            </>
          ) : (
            <>
              <div style={drawerUserInfo}>
                <div style={{ ...avatarCircle, width: 40, height: 40, fontSize: 18, marginBottom: 4 }}>
                  {firstName[0]?.toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>{user?.fullName || firstName}</p>
                  <p style={{ fontSize: 12, color: '#64748B' }}>{user?.email}</p>
                </div>
              </div>
              <div style={drawerDivider} />
              {authLinks.map(({ to, label, icon }) => (
                <Link key={to} to={to} style={drawerLinkStyle(pathname === to || (to !== '/' && pathname.startsWith(to)))} id={`mob-${label}`}>
                  {icon} {label}
                </Link>
              ))}
              <div style={drawerDivider} />
              <button onClick={handleLogout} style={drawerLogoutStyle} id="mob-logout">
                🚪 Log Out
              </button>
            </>
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 68 }} />

      <style>{`
        @media (min-width: 769px) { #nav-hamburger { display: none !important; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          #nav-hamburger { display: flex !important; }
        }
        @media (max-width: 960px) {
          .nav-search-bar { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────
function navStyle(scrolled) {
  return {
    position:       'fixed',
    top:            0, left: 0, right: 0,
    zIndex:         1000,
    background:     scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom:   scrolled ? '1px solid #E2E8F0' : '1px solid rgba(226,232,240,0.5)',
    transition:     'all 0.3s',
    boxShadow:      scrolled ? '0 4px 24px rgba(15,23,42,0.08)' : 'none',
  };
}

const innerStyle = {
  maxWidth:       1200,
  margin:         '0 auto',
  padding:        '0 20px',
  height:         68,
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'space-between',
  gap:            12,
};

const logoStyle = {
  display:        'flex',
  alignItems:     'center',
  gap:            10,
  textDecoration: 'none',
  flexShrink:     0,
};

const logoTextStyle = {
  fontSize:      '1.2rem',
  fontWeight:    800,
  color:         '#0F172A',
  letterSpacing: '-0.02em',
  fontFamily:    "'Inter', sans-serif",
};

const logoAIStyle = {
  background:           'linear-gradient(90deg, #2563EB, #06B6D4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor:  'transparent',
  backgroundClip:       'text',
};

const linksStyle = {
  display:    'flex',
  alignItems: 'center',
  gap:        4,
  className:  'nav-links-desktop',
};

function linkStyle(active) {
  return {
    textDecoration: 'none',
    color:          active ? '#2563EB' : '#64748B',
    fontWeight:     active ? 600 : 500,
    fontSize:       15,
    padding:        '8px 14px',
    borderRadius:   8,
    background:     active ? '#EFF6FF' : 'transparent',
    transition:     'all 0.2s',
  };
}

function authLinkStyle(active) {
  return {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            6,
    textDecoration: 'none',
    color:          active ? '#2563EB' : '#64748B',
    fontWeight:     active ? 600 : 500,
    fontSize:       14,
    padding:        '7px 12px',
    borderRadius:   8,
    background:     active ? '#EFF6FF' : 'transparent',
    transition:     'all 0.2s',
    whiteSpace:     'nowrap',
  };
}

function ghostBtnStyle(active) {
  return {
    textDecoration: 'none',
    color:          active ? '#2563EB' : '#0F172A',
    fontWeight:     600,
    fontSize:       15,
    padding:        '8px 18px',
    borderRadius:   8,
    border:         `1.5px solid ${active ? '#2563EB' : '#E2E8F0'}`,
    background:     active ? '#EFF6FF' : 'transparent',
    transition:     'all 0.2s',
    display:        'inline-block',
  };
}

const primaryBtnStyle = {
  textDecoration: 'none',
  color:          'white',
  fontWeight:     600,
  fontSize:       15,
  padding:        '9px 20px',
  borderRadius:   8,
  background:     'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  boxShadow:      '0 3px 12px rgba(37,99,235,0.35)',
  transition:     'all 0.2s',
  display:        'inline-block',
  whiteSpace:     'nowrap',
};

const searchBarWrap = {
  display: 'flex',
  alignItems: 'center',
  background: '#F1F5F9',
  border: '1px solid #E2E8F0',
  borderRadius: 9999,
  flex: 1,
  maxWidth: 360,
  margin: '0 20px',
  height: 38,
  boxSizing: 'border-box',
};

const searchInputStyle = {
  border: 'none',
  background: 'transparent',
  outline: 'none',
  padding: '0 10px',
  fontSize: 12,
  fontWeight: 500,
  color: '#334155',
  width: '100%',
  cursor: 'not-allowed',
};

const headerIconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '50%',
  transition: 'background 0.2s',
  padding: 0,
};

const userAvatarBtn = {
  display:    'flex', alignItems: 'center', gap: 8,
  background: '#F8FAFC', border: '1.5px solid #E2E8F0',
  borderRadius: 10, padding: '6px 10px 6px 6px',
  cursor:     'pointer', transition: 'all 0.2s',
  fontFamily: "'Inter', sans-serif",
};

const avatarCircle = {
  width: 32, height: 32, borderRadius: '50%',
  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
  color: 'white', fontWeight: 800, fontSize: 14,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const userDropdown = {
  position:  'absolute', top: 'calc(100% + 10px)', right: 0,
  background: 'white', border: '1px solid #E2E8F0',
  borderRadius: 16, minWidth: 200, zIndex: 9999,
  boxShadow: '0 12px 40px rgba(15,23,42,0.15)',
  overflow:  'hidden', animation: 'fadeIn 0.15s ease',
};

const userDropdownHeader = {
  padding: '16px 16px 12px',
};

const userDropdownDivider = {
  height: 1, background: '#F1F5F9', margin: '0 8px',
};

const userDropdownItem = {
  display:        'block',
  padding:        '10px 16px',
  fontSize:       14, fontWeight: 500,
  color:          '#374151', textDecoration: 'none',
  transition:     'background 0.15s',
};

const userDropdownBtn = {
  display:     'block', width: '100%',
  textAlign:   'left',
  padding:     '10px 16px',
  fontSize:    14, fontWeight: 500,
  color:       '#EF4444', background: 'none',
  border:      'none', cursor: 'pointer',
  fontFamily:  "'Inter', sans-serif",
  transition:  'background 0.15s',
};

const hamburgerStyle = {
  display:       'flex',
  flexDirection: 'column',
  gap:           5,
  background:    'none',
  border:        'none',
  cursor:        'pointer',
  padding:       8,
  flexShrink:    0,
};

function barStyle(open, index) {
  const base = {
    display: 'block', width: 22, height: 2,
    background: '#0F172A', borderRadius: 2,
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
  position:      'fixed', top: 68, left: 0, right: 0,
  background:    'white', borderBottom: '1px solid #E2E8F0',
  padding:       '12px 20px 24px',
  display:       'flex', flexDirection: 'column', gap: 4,
  zIndex:        999,
  boxShadow:     '0 8px 32px rgba(15,23,42,0.12)',
  animation:     'fadeIn 0.2s ease',
  maxHeight:     'calc(100vh - 68px)',
  overflowY:     'auto',
};

const drawerUserInfo = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '12px 0 8px',
};

const drawerDivider = { height: 1, background: '#F1F5F9', margin: '8px 0' };

function drawerLinkStyle(active) {
  return {
    textDecoration: 'none',
    color:          active ? '#2563EB' : '#0F172A',
    fontWeight:     active ? 600 : 500,
    fontSize:       15,
    padding:        '11px 12px',
    borderRadius:   10,
    background:     active ? '#EFF6FF' : 'transparent',
    display:        'block',
  };
}

const drawerPrimaryStyle = {
  textDecoration: 'none',
  textAlign:      'center',
  color:          'white',
  fontWeight:     700, fontSize: 16,
  padding:        '13px',
  borderRadius:   12,
  background:     'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  marginTop:      8, display: 'block',
};

const drawerLogoutStyle = {
  background:   'transparent',
  border:       '1.5px solid #FECACA',
  color:        '#EF4444',
  fontWeight:   600, fontSize: 15,
  padding:      '12px', borderRadius: 10,
  cursor:       'pointer', textAlign: 'center',
  fontFamily:   "'Inter', sans-serif",
  width:        '100%',
};