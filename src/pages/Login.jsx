import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';


// ─── Global CSS injected once ─────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes spin       { to { transform: rotate(360deg); } }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-18px) rotate(3deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-12px) rotate(-4deg); }
  }
  @keyframes blobMorph {
    0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; }
    25%       { border-radius: 40% 60% 30% 70% / 70% 40% 60% 50%; }
    50%       { border-radius: 70% 30% 60% 40% / 40% 70% 30% 60%; }
    75%       { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideReveal {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  /* ── PAGE & CONTAINER ── */
  .log-page {
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: 'Inter', sans-serif;
    background: #F0F4FF;
  }
  .log-container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  /* ── LEFT PANEL ── */
  .log-left {
    width: 48%;
    height: 100%;
    background: linear-gradient(148deg, #0F172A 0%, #1E3A8A 45%, #1D4ED8 75%, #0891B2 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 40px;
  }
  .log-left-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
  }

  /* ── RIGHT PANEL ── */
  .log-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    background: #F0F4FF;
    overflow: hidden;
  }
  .log-card {
    width: 100%;
    max-width: 480px;
    background: #fff;
    border-radius: 24px;
    padding: 28px 36px;
    box-shadow: 0 8px 60px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.04);
    border: 1px solid rgba(226,232,240,0.8);
    animation: scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  /* ── TYPOGRAPHY ── */
  .log-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(147,197,253,0.9);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .log-heading {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(1.55rem, 2.3vw, 2.1rem);
    font-weight: 800;
    line-height: 1.18;
    color: #fff;
    letter-spacing: -0.035em;
    margin-bottom: 5px;
  }
  .log-heading span {
    background: linear-gradient(90deg, #7DD3FC, #38BDF8, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .log-sub {
    font-size: 13px;
    line-height: 1.6;
    color: rgba(226,232,240,0.75);
    margin-bottom: 6px;
    max-width: 360px;
  }

  /* ── PERKS ── */
  .log-perk-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px; }
  .log-perk-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 8px 13px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    transition: background 0.25s, border-color 0.25s, transform 0.25s;
    cursor: default;
  }
  .log-perk-item:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.22);
    transform: translateX(4px);
  }
  .log-perk-icon-box {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .log-perk-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 1px; }
  .log-perk-desc  { font-size: 11px; color: rgba(226,232,240,0.6); }

  /* ── TRUST STRIP ── */
  .log-trust-strip {
    display: flex; align-items: center; gap: 12px;
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.28);
    border-radius: 12px;
    padding: 7px 16px;
    font-size: 13px; font-weight: 600; color: #6EE7B7;
  }

  /* ── STATS BAR ── */
  .log-stats-bar {
    display: flex; gap: 0; margin-bottom: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px; overflow: hidden;
  }
  .log-stat-item {
    flex: 1; padding: 10px 8px; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.10);
  }
  .log-stat-item:last-child { border-right: none; }
  .log-stat-num { font-size: 16px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .log-stat-lbl { font-size: 9px; color: rgba(226,232,240,0.55); margin-top: 1px; letter-spacing: 0.04em; font-weight: 500; }

  /* ── LOGO ── */
  .log-logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .log-logo-box {
    width: 46px; height: 46px; border-radius: 13px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(8px);
  }
  .log-logo-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .log-logo-tag  { font-size: 10px; font-weight: 600; color: #38BDF8; letter-spacing: 0.06em; text-transform: uppercase; }

  /* ── FORM HEADER ── */
  .log-form-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #EFF6FF; color: #2563EB;
    font-size: 12.5px; font-weight: 700;
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 10px; letter-spacing: 0.01em;
    border: 1px solid #DBEAFE;
  }
  .log-form-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.7rem; font-weight: 800; color: #0F172A;
    letter-spacing: -0.03em; margin-bottom: 6px;
  }
  .log-form-sub { font-size: 14px; color: #64748B; margin-bottom: 16px; }
  .log-form-sub a { color: #2563EB; font-weight: 600; text-decoration: none; }
  .log-form-sub a:hover { text-decoration: underline; }

  /* ── FIELDS ── */
  .log-field-group { margin-bottom: 13px; }
  .log-field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
  .log-input-wrap {
    position: relative; display: flex; align-items: center;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 11px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .log-input-wrap.focused {
    border-color: #2563EB;
    box-shadow: 0 0 0 3.5px rgba(37,99,235,0.13);
  }
  .log-input-wrap.has-error {
    border-color: #EF4444;
    box-shadow: 0 0 0 3.5px rgba(239,68,68,0.11);
  }
  .log-input-prefix { position: absolute; left: 14px; display: flex; align-items: center; pointer-events: none; }
  .log-input-field {
    width: 100%; border: none; outline: none; background: transparent;
    padding: 11px 14px 11px 42px;
    font-size: 14px; color: #0F172A; font-family: 'Inter', sans-serif;
  }
  .log-input-field::placeholder { color: #94A3B8; }
  .log-input-field:disabled { opacity: 0.55; cursor: not-allowed; }
  .log-eye-btn {
    position: absolute; right: 12px;
    background: transparent; border: none; cursor: pointer;
    color: #94A3B8; display: flex; align-items: center; padding: 4px;
    border-radius: 6px; transition: color 0.18s;
  }
  .log-eye-btn:hover { color: #475569; }
  .log-error-text { display: block; font-size: 12px; color: #EF4444; margin-top: 5px; font-weight: 500; }

  /* ── REMEMBER + FORGOT ── */
  .log-row-between {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .log-remember-label {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: #64748B; cursor: pointer; user-select: none;
  }
  .log-remember-label input { width: 15px; height: 15px; accent-color: #2563EB; cursor: pointer; }
  .log-forgot { font-size: 13px; font-weight: 600; color: #2563EB; text-decoration: none; }
  .log-forgot:hover { text-decoration: underline; }

  /* ── DIVIDER ── */
  .log-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 4px 0 12px; color: #94A3B8; font-size: 12px;
  }
  .log-divider::before, .log-divider::after {
    content: ''; flex: 1; height: 1px; background: #E2E8F0;
  }

  /* ── SOCIAL BTN ── */
  .log-social-btn {
    width: 100%; padding: 10px;
    background: #F8FAFC; border: 1.5px solid #E2E8F0;
    border-radius: 11px; cursor: pointer; font-size: 14px;
    font-weight: 600; color: #374151; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.18s, border-color 0.18s, box-shadow 0.18s;
    margin-bottom: 0;
  }
  .log-social-btn:hover { background: #fff; border-color: #CBD5E1; box-shadow: 0 2px 8px rgba(15,23,42,0.07); }

  /* ── SUBMIT ── */
  .log-submit-btn {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #2563EB 0%, #0891B2 100%);
    color: #fff; border: none; border-radius: 11px;
    font-size: 14.5px; font-weight: 700; cursor: pointer;
    letter-spacing: 0.01em;
    box-shadow: 0 4px 20px rgba(37,99,235,0.38);
    transition: box-shadow 0.2s, transform 0.15s, opacity 0.2s;
    font-family: 'Inter', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    position: relative; overflow: hidden;
  }
  .log-submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .log-submit-btn:hover:not(:disabled)::after { transform: translateX(100%); }
  .log-submit-btn:hover:not(:disabled) { box-shadow: 0 8px 28px rgba(37,99,235,0.50); transform: translateY(-1px); }
  .log-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; box-shadow: none; transform: none; }

  /* ── ERROR BANNER ── */
  .log-api-error {
    display: flex; align-items: center; gap: 10px;
    background: #FEF2F2; border: 1px solid #FECACA;
    border-radius: 11px; padding: 12px 16px;
    margin-bottom: 14px; font-size: 14px; color: #DC2626; font-weight: 500;
    animation: fadeSlideUp 0.3s ease;
  }

  /* ── BOTTOM NOTES ── */
  .log-signup-note { text-align: center; font-size: 13px; color: #64748B; margin-top: 14px; }
  .log-signup-note a { color: #2563EB; font-weight: 600; text-decoration: none; }
  .log-signup-note a:hover { text-decoration: underline; }
  .log-security { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 10px; font-size: 11.5px; color: #94A3B8; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .log-page { height: auto; min-height: 100vh; overflow: visible; }
    .log-container { height: auto; min-height: 100vh; }
    .log-left { display: none; }
    .log-right {
      height: auto;
      overflow-y: auto;
      justify-content: flex-start;
      padding: 32px 16px 56px;
      background: linear-gradient(160deg, #0F172A 0%, #1E3A8A 40%, #0891B2 100%);
    }
    .log-card { max-width: 100%; border-radius: 20px; padding: 32px 24px; }
    .log-field-group { margin-bottom: 16px; }
  }
  @media (max-width: 480px) {
    .log-card { padding: 28px 18px; border-radius: 16px; }
    .log-form-title { font-size: 1.4rem; }
    .log-submit-btn { font-size: 14px; padding: 12px; }
  }
  @media (max-height: 700px) and (min-width: 901px) {
    .log-card { padding: 20px 30px; }
    .log-field-group { margin-bottom: 10px; }
    .log-stats-bar { display: none; }
    .log-sub { display: none; }
  }
`;

// ─── Inject styles once ───────────────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = 'skillbridge-login-styles';
    if (!document.getElementById(id)) {
      const tag = document.createElement('style');
      tag.id = id;
      tag.textContent = GLOBAL_CSS;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: 'spin 0.75s linear infinite' }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Background SVG vector pattern ───────────────────────────────────────────
function BackgroundPattern() {
  return (
    <svg
      viewBox="0 0 500 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    >
      <defs>
        <pattern id="lgDotGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.055)"/>
        </pattern>
      </defs>

      <rect width="500" height="900" fill="url(#lgDotGrid)"/>

      {/* Top-right concentric rings */}
      <circle cx="488" cy="75" r="140" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1.5"/>
      <circle cx="488" cy="75" r="98"  fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
      <circle cx="488" cy="75" r="58"  fill="none" stroke="rgba(56,189,248,0.1)"  strokeWidth="1.5"/>
      <circle cx="488" cy="75" r="26"  fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.14)" strokeWidth="1"/>

      {/* Bottom-left concentric rings */}
      <circle cx="12" cy="825" r="130" fill="none" stroke="rgba(167,139,250,0.07)" strokeWidth="1.5"/>
      <circle cx="12" cy="825" r="88"  fill="none" stroke="rgba(167,139,250,0.05)" strokeWidth="1"/>
      <circle cx="12" cy="825" r="50"  fill="none" stroke="rgba(167,139,250,0.09)" strokeWidth="1.5"/>
      <circle cx="12" cy="825" r="22"  fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.12)" strokeWidth="1"/>

      {/* Corner frames */}
      <path d="M 0 72 L 0 0 L 72 0"     fill="none" stroke="rgba(56,189,248,0.2)"   strokeWidth="2"/>
      <path d="M 0 44 L 0 0 L 44 0"     fill="none" stroke="rgba(56,189,248,0.11)"  strokeWidth="1.5"/>
      <path d="M 428 900 L 500 900 L 500 828" fill="none" stroke="rgba(167,139,250,0.2)"  strokeWidth="2"/>
      <path d="M 456 900 L 500 900 L 500 856" fill="none" stroke="rgba(167,139,250,0.11)" strokeWidth="1.5"/>

      {/* Decorative hexagons */}
      <polygon points="395,215 428,234 428,272 395,291 362,272 362,234"
        fill="rgba(56,189,248,0.03)" stroke="rgba(56,189,248,0.1)" strokeWidth="1.5"/>
      <polygon points="105,610 138,629 138,667 105,686 72,667 72,629"
        fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.1)" strokeWidth="1.5"/>

      {/* Floating trophy icon — upper right */}
      <g opacity="0.065" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" fill="none"
         transform="translate(355,145) rotate(10)">
        <path d="M 10 0 H 56 V 30 Q 56 55 33 61 Q 10 55 10 30 Z"/>
        <line x1="0"  y1="0"  x2="14"  y2="0"/>
        <line x1="52" y1="0"  x2="66"  y2="0"/>
        <path d="M 0 0 Q 0 22 10 30"/>
        <path d="M 66 0 Q 66 22 56 30"/>
        <line x1="33" y1="61" x2="33" y2="72"/>
        <line x1="20" y1="72" x2="46" y2="72"/>
      </g>

      {/* Floating bar chart icon — lower left */}
      <g opacity="0.065" stroke="rgba(255,255,255,0.95)" strokeWidth="3" fill="none"
         transform="translate(16,545) rotate(-7)">
        <rect x="0" y="0" width="92" height="68" rx="9"/>
        <rect x="12" y="44" width="13" height="15" rx="2" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)"/>
        <rect x="31" y="32" width="13" height="27" rx="2" fill="rgba(56,189,248,0.28)" stroke="rgba(56,189,248,0.55)"/>
        <rect x="50" y="22" width="13" height="37" rx="2" fill="rgba(52,211,153,0.28)" stroke="rgba(52,211,153,0.55)"/>
        <rect x="69" y="12" width="13" height="47" rx="2" fill="rgba(167,139,250,0.28)" stroke="rgba(167,139,250,0.55)"/>
      </g>

      {/* Floating key / unlock icon — mid right */}
      <g opacity="0.055" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none"
         transform="translate(400,415) rotate(6)">
        <circle cx="22" cy="22" r="18"/>
        <circle cx="22" cy="22" r="8"/>
        <line x1="36" y1="36" x2="58" y2="58"/>
        <line x1="50" y1="52" x2="58" y2="52"/>
        <line x1="58" y1="52" x2="58" y2="64"/>
      </g>

      {/* Diagonal accents */}
      <line x1="0" y1="360" x2="500" y2="660" stroke="rgba(255,255,255,0.018)" strokeWidth="1.5"/>
      <line x1="0" y1="400" x2="500" y2="700" stroke="rgba(255,255,255,0.012)" strokeWidth="1"/>
    </svg>
  );
}

// ─── Login hero illustration ──────────────────────────────────────────────────
function LoginIllustration() {
  return (
    <svg
      viewBox="0 0 380 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 340, margin: '0 auto 6px', display: 'block', maxHeight: 105 }}
    >
      {/* Background ellipse */}
      <ellipse cx="190" cy="122" rx="162" ry="106"
        fill="rgba(255,255,255,0.04)" style={{ animation: 'blobMorph 12s ease-in-out infinite' }}/>

      {/* Card 1: Your Progress (top-left) */}
      <g style={{ animation: 'float1 5s ease-in-out infinite', transformOrigin: '102px 78px' }}>
        <rect x="22" y="42" width="156" height="90" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
        <rect x="22" y="42" width="156" height="22" rx="14" fill="rgba(255,255,255,0.08)"/>
        <rect x="22" y="53" width="156" height="11" fill="rgba(255,255,255,0.05)"/>
        <text x="38" y="59" fill="rgba(255,255,255,0.78)" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">Your Progress</text>
        {/* Ring */}
        <circle cx="64" cy="108" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none"/>
        <circle cx="64" cy="108" r="22" stroke="#34D399" strokeWidth="4" fill="none"
          strokeDasharray="100 138" strokeDashoffset="34" strokeLinecap="round"/>
        <text x="64" y="112" fill="#fff" fontSize="11" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">68%</text>
        {/* Mini bars */}
        <text x="100" y="76" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">Week 4 of 6</text>
        <rect x="100" y="80" width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="80" width="42" height="5" rx="2.5" fill="#34D399"/>
        <text x="100" y="96" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">Skills Learned</text>
        <rect x="100" y="100" width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="100" width="54" height="5" rx="2.5" fill="#38BDF8"/>
        <text x="100" y="116" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">Jobs Applied</text>
        <rect x="100" y="120" width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="120" width="30" height="5" rx="2.5" fill="#A78BFA"/>
      </g>

      {/* Card 2: Interviews (top-right) */}
      <g style={{ animation: 'float2 6.5s ease-in-out infinite 0.9s', transformOrigin: '286px 80px' }}>
        <rect x="208" y="38" width="148" height="66" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
        <text x="222" y="58" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">Interviews</text>
        <circle cx="230" cy="76" r="9" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="1"/>
        <text x="230" y="80" fill="#34D399" fontSize="10" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">3</text>
        <text x="244" y="76" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="Inter,sans-serif">Scheduled</text>
        <rect x="222" y="88" width="120" height="4" rx="2" fill="rgba(56,189,248,0.18)"/>
        <rect x="222" y="88" width="88" height="4" rx="2" fill="#38BDF8"/>
      </g>

      {/* Badge: ATS Score (top-right corner) */}
      <g style={{ animation: 'float1 4.5s ease-in-out infinite 1.3s', transformOrigin: '322px 22px' }}>
        <rect x="290" y="8" width="82" height="44" rx="12" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.2"/>
        <text x="331" y="28" fill="#38BDF8" fontSize="16" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">92</text>
        <text x="331" y="42" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">ATS Score</text>
      </g>

      {/* Card 3: Latest Match (bottom) */}
      <g style={{ animation: 'float2 7s ease-in-out infinite 0.4s', transformOrigin: '108px 197px' }}>
        <rect x="26" y="162" width="164" height="58" rx="13" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2"/>
        <text x="42" y="181" fill="rgba(255,255,255,0.72)" fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif">Latest Match</text>
        <circle cx="50" cy="200" r="10" fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
        <text x="50" y="204" fill="#A78BFA" fontSize="9" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">G</text>
        <text x="66" y="197" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Software Eng.</text>
        <text x="66" y="208" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="Inter,sans-serif">94% match · Remote</text>
      </g>

      {/* Centre glow — key icon */}
      <g style={{ animation: 'glowPulse 3s ease-in-out infinite', transformOrigin: '192px 122px' }}>
        <circle cx="192" cy="122" r="28" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.22)" strokeWidth="1.5"/>
        <circle cx="192" cy="122" r="16" fill="rgba(56,189,248,0.14)"/>
        <circle cx="189" cy="118" r="5"  fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6"/>
        <line x1="194" y1="123" x2="202" y2="131" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6"/>
        <line x1="200" y1="129" x2="202" y2="129" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6"/>
        <line x1="202" y1="129" x2="202" y2="134" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6"/>
      </g>

      {/* Orbit dot */}
      <g style={{ animation: 'orbit 6s linear infinite', transformOrigin: '192px 122px' }}>
        <circle cx="192" cy="122" r="4" fill="#38BDF8" opacity="0.9"/>
      </g>
    </svg>
  );
}

// ─── Perks ────────────────────────────────────────────────────────────────────
const PERKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Instant AI Analysis',
    desc: 'Resume feedback in under 10 seconds',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'ATS Optimization',
    desc: 'Pass applicant tracking systems',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'AI Interview Prep',
    desc: 'Practice with real interview questions',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Smart Job Matching',
    desc: 'Roles aligned to your skill set',
  },
];

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel() {
  const [visible, setVisible] = useState([false, false, false, false]);
  useEffect(() => {
    PERKS.forEach((_, i) => {
      setTimeout(() => setVisible(prev => {
        const n = [...prev]; n[i] = true; return n;
      }), 120 + i * 110);
    });
  }, []);

  return (
    <div className="log-left">
      <BackgroundPattern />
      <div className="log-left-inner">
        {/* Logo */}
        <div className="log-logo-row">
          <div className="log-logo-box">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.3.5 2.5 1.3 3.4C6.5 11.6 6 12.7 6 14c0 2.2 1.8 4 4 4h.5v2c0 1.1.9 2 2 2s2-.9 2-2v-2H14c2.2 0 4-1.8 4-4 0-1.3-.5-2.4-1.3-3.1C17.5 10 18 8.8 18 7.5 18 4.5 15.5 2 12 2Z"
                fill="white" opacity="0.9"/>
              <circle cx="10" cy="9" r="1.2" fill="#1E40AF"/>
              <circle cx="14" cy="9" r="1.2" fill="#1E40AF"/>
              <path d="M10 13Q12 15 14 13" stroke="#1E40AF" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div>
            <div className="log-logo-name">SkillBridge AI</div>
            <div className="log-logo-tag">Career Intelligence</div>
          </div>
        </div>


        {/* Eyebrow + Heading */}
        <div className="log-eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          Welcome back
        </div>
        <h2 className="log-heading">
          Continue Your<br/>
          <span>Career Journey</span>
        </h2>
        <p className="log-sub">
          Your personalized career toolkit is waiting. Resume analysis, job matching, and interview prep — all in one place.
        </p>

        {/* Illustration */}
        <LoginIllustration />

        {/* Perks */}
        <div className="log-perk-list">
          {PERKS.map((p, i) => (
            <div
              key={i}
              className="log-perk-item"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="log-perk-icon-box">{p.icon}</div>
              <div>
                <div className="log-perk-title">{p.title}</div>
                <div className="log-perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="log-trust-strip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          100% Free · No credit card · No spam
        </div>
      </div>
    </div>
  );
}

// ─── Main Login Component ─────────────────────────────────────────────────────
export default function Login() {
  const navigate   = useNavigate();
  const { login }  = useAuth();

  const [form, setForm]         = useState({ email: '', password: '', remember: false });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [focused, setFocused]   = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError)     setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim())                    e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = 'Enter a valid email address.';
    if (!form.password)                         e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError('');
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email:    form.email.trim(),
        password: form.password,
      });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyleInjector />
      <div className="log-page">
        <div className="log-container">
          <LeftPanel />

          {/* ── RIGHT: form ── */}
          <div className="log-right">
            <div className="log-card">

              {/* Header */}
              {/* <div className="log-form-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Welcome back
              </div> */}
              <h1 className="log-form-title">Sign in to your account</h1>
              <p className="log-form-sub">
                Don't have an account?{' '}
                <Link to="/register" id="login-goto-register">Create one free →</Link>
              </p>

              {/* Google SSO */}
              <button type="button" className="log-social-btn" onClick={() => {}}>
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="log-divider">or sign in with email</div>

              {/* API error */}
              {apiError && (
                <div className="log-api-error" role="alert" id="login-api-error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8"  x2="12"    y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {apiError}
                </div>
              )}

              {/* Form */}
              <form id="login-form" onSubmit={handleSubmit} noValidate>

                {/* Email */}
                <div className="log-field-group">
                  <label htmlFor="login-email" className="log-field-label">Email Address</label>
                  <div className={`log-input-wrap ${focused === 'email' ? 'focused' : ''} ${errors.email ? 'has-error' : ''}`}>
                    <span className="log-input-prefix"><MailIcon /></span>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="you@example.com"
                      className="log-input-field"
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>
                  {errors.email && <span className="log-error-text">{errors.email}</span>}
                </div>

                {/* Password */}
                <div className="log-field-group">
                  <label htmlFor="login-password" className="log-field-label">Password</label>
                  <div className={`log-input-wrap ${focused === 'password' ? 'focused' : ''} ${errors.password ? 'has-error' : ''}`}>
                    <span className="log-input-prefix"><LockIcon /></span>
                    <input
                      id="login-password"
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused('')}
                      placeholder="Enter your password"
                      className="log-input-field"
                      style={{ paddingRight: 44 }}
                      autoComplete="current-password"
                      disabled={loading}
                    />
                    <button type="button" className="log-eye-btn" tabIndex={-1}
                      onClick={() => setShowPass(v => !v)}
                      aria-label="Toggle password visibility"
                      id="login-toggle-password">
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  {errors.password && <span className="log-error-text">{errors.password}</span>}
                </div>

                {/* Remember + Forgot */}
                <div className="log-row-between">
                  <label className="log-remember-label" htmlFor="login-remember">
                    <input
                      id="login-remember"
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <a href="#" className="log-forgot" id="login-forgot" onClick={e => e.preventDefault()}>
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="log-submit-btn"
                  disabled={loading}
                  id="login-submit"
                >
                  {loading ? (
                    <><SpinnerIcon /> Signing in…</>
                  ) : (
                    <>
                      Sign In
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom note */}
              <p className="log-signup-note">
                New to SkillBridge AI?{' '}
                <Link to="/register" id="login-create-account">Create a free account</Link>
              </p>

              {/* Security note */}
              <div className="log-security">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                256-bit SSL encryption · Your data is private
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}