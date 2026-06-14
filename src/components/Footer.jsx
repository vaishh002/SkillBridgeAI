import React from 'react';

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect width="32" height="32" rx="9" fill="#2563EB" />
      <path d="M9 17 L14 11 L18 15 L23 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="23" cy="9" r="2.4" fill="#5EEAD4" />
      <path d="M9 22 H23" stroke="#BFDBFE" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <LogoMark />
          <span>SkillBridge <span className="brand-accent">AI</span></span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#stories">Success Stories</a>
          <a href="#partners">Hiring Partners</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} SkillBridge AI. All rights reserved.</div>
      </div>
    </footer>
  );
}
