import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── Sidebar Icons ──────────────────────────────────────────────────
function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function ATSIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function InterviewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  );
}

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  
  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'User';

  const sidebarLinks = [
    { to: '/dashboard',           label: 'My Dashboard',   icon: <DashboardIcon /> },
    { to: '/resume-analyzer',     label: 'Resume AI',      icon: <ResumeIcon /> },
    { to: '/ats-checker',         label: 'ATS Checkers',   icon: <ATSIcon /> },
    { to: '/interview-generator', label: 'Interview Prep',  icon: <InterviewIcon /> },
  ];

  return (
    <div className="db-layout-container">
      {/* ── Desktop Sidebar ── */}
      <aside className="db-sidebar">
        {/* Upload/New Pill Button */}
        <Link to="/resume-analyzer" className="db-sidebar-new-btn" id="sidebar-new-analysis">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Analysis
        </Link>

        {/* Sidebar Nav links */}
        <nav className="db-sidebar-nav">
          {sidebarLinks.map(({ to, label, icon }) => {
            const isActive = pathname === to || (to !== '/dashboard' && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`db-sidebar-link ${isActive ? 'active' : ''}`}
                id={`sidebar-${label.toLowerCase().replace(' ', '-')}`}
              >
                <span className="db-sidebar-icon">{icon}</span>
                <span className="db-sidebar-label">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Storage Details Section (Google Drive Style) */}
        <div className="db-sidebar-storage">
          <div className="db-storage-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            <span>TOOLKIT USAGE</span>
          </div>
          
          <div className="db-storage-bar-group">
            <div className="db-storage-bar-info">
              <span>Resume Analyzer</span>
              <span>3 / 10 scans</span>
            </div>
            <div className="db-storage-bar-track">
              <div className="db-storage-bar-fill" style={{ width: '30%', background: '#38BDF8' }} />
            </div>
          </div>

          <div className="db-storage-bar-group">
            <div className="db-storage-bar-info">
              <span>ATS Checkers</span>
              <span>2 / 5 checks</span>
            </div>
            <div className="db-storage-bar-track">
              <div className="db-storage-bar-fill" style={{ width: '40%', background: '#34D399' }} />
            </div>
          </div>

          <Link to="/dashboard" className="db-storage-upgrade">
            Upgrade Plan ↗
          </Link>
        </div>
      </aside>

      {/* ── Mobile/Tablet Sticky Sub-navigation ── */}
      <nav className="db-mobile-subnav">
        {sidebarLinks.map(({ to, label, icon }) => {
          const isActive = pathname === to || (to !== '/dashboard' && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`db-mobile-subnav-link ${isActive ? 'active' : ''}`}
              id={`mob-subnav-${label.toLowerCase().replace(' ', '-')}`}
            >
              <span className="db-mobile-icon">{icon}</span>
              <span className="db-mobile-label">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Main Content Area ── */}
      <main className="db-main-content">
        <Outlet />
      </main>

      {/* ── Responsive Styling ── */}
      <style>{`
        .db-layout-container {
          display: flex;
          min-height: calc(100vh - 68px);
          background: #F8FAFC;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        /* Desktop Sidebar styling - Google Drive layout */
        .db-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1E3A8A 0%, #2563EB 100%);
          border-top-right-radius: 28px;
          margin: 16px 0 16px 16px;
          height: calc(100vh - 68px - 32px);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          box-sizing: border-box;
          flex-shrink: 0;
          z-index: 95;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.15);
          position: sticky;
          top: 84px; /* offset top margin */
        }

        /* Premium Pill button matching Upload New File */
        .db-sidebar-new-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          background: #FFFFFF;
          color: #1E3A8A;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 24px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          margin-bottom: 28px;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .db-sidebar-new-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          background: #F8FAFC;
        }

        .db-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .db-sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
          font-size: 14px;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .db-sidebar-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .db-sidebar-link.active {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.15);
          font-weight: 700;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .db-sidebar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Storage details matching Google Drive UI */
        .db-sidebar-storage {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 20px;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .db-storage-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.12em;
        }

        .db-storage-bar-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .db-storage-bar-info {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
        }

        .db-storage-bar-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 99px;
          overflow: hidden;
        }

        .db-storage-bar-fill {
          height: 100%;
          border-radius: 99px;
        }

        .db-storage-upgrade {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: #38BDF8;
          text-decoration: none;
          transition: color 0.2s;
          margin-top: 4px;
        }

        .db-storage-upgrade:hover {
          color: #7DD3FC;
        }

        /* Mobile Sub-Navigation */
        .db-mobile-subnav {
          display: none;
          position: sticky;
          top: 68px;
          z-index: 90;
          background: rgba(255, 255, 255, 0.90);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid #E2E8F0;
          padding: 10px 16px;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .db-mobile-subnav::-webkit-scrollbar {
          display: none;
        }

        .db-mobile-subnav-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #64748B;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 99px;
          white-space: nowrap;
          transition: all 0.2s;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
        }

        .db-mobile-subnav-link.active {
          color: #2563EB;
          background: #EFF6FF;
          border-color: #2563EB;
          font-weight: 700;
        }

        .db-mobile-icon {
          display: flex;
          align-items: center;
        }

        /* Main Content Viewport */
        .db-main-content {
          flex: 1;
          min-width: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        /* Responsive Breakpoint */
        @media (max-width: 1024px) {
          .db-layout-container {
            flex-direction: column;
            min-height: calc(100vh - 68px);
          }
          
          .db-sidebar {
            display: none !important;
          }

          .db-mobile-subnav {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
