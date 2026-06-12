import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// ─── Global CSS injected once ────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes spin       { to { transform: rotate(360deg); } }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(37,99,235,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-18px) rotate(3deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-12px) rotate(-4deg); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0px); }
    33%       { transform: translateY(-8px); }
    66%       { transform: translateY(-16px); }
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
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes successPop {
    0%   { transform: scale(0); opacity: 0; }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes tickDraw {
    from { stroke-dashoffset: 50; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes slideReveal {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  .reg-page {
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: 'Inter', sans-serif;
    background: #F0F4FF;
  }
  .reg-container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  /* ── LEFT PANEL ── */
  .reg-left {
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
  .reg-left-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
  }

  /* ── RIGHT PANEL ── */
  .reg-right {
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
  .reg-card {
    width: 100%;
    max-width: 480px;
    background: #fff;
    border-radius: 24px;
    padding: 24px 34px;
    box-shadow: 0 8px 60px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.04);
    border: 1px solid rgba(226,232,240,0.8);
    animation: scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  /* ── TYPOGRAPHY ── */
  .left-eyebrow {
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
  .left-heading {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(1.55rem, 2.3vw, 2.1rem);
    font-weight: 800;
    line-height: 1.18;
    color: #fff;
    letter-spacing: -0.035em;
    margin-bottom: 5px;
  }
  .left-heading span {
    background: linear-gradient(90deg, #7DD3FC, #38BDF8, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .left-sub {
    font-size: 13px;
    line-height: 1.6;
    color: rgba(226,232,240,0.75);
    margin-bottom: 6px;
    max-width: 360px;
  }

  /* ── PERKS ── */
  .perk-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px; }
  .perk-item {
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
    animation: slideReveal 0.5s ease both;
  }
  .perk-item:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.22);
    transform: translateX(4px);
  }
  .perk-icon-box {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .perk-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 1px; }
  .perk-desc  { font-size: 11px; color: rgba(226,232,240,0.6); }

  /* ── TRUST STRIP ── */
  .trust-strip {
    display: flex; align-items: center; gap: 12px;
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.28);
    border-radius: 12px;
    padding: 7px 16px;
    font-size: 13px; font-weight: 600; color: #6EE7B7;
  }

  /* ── STATS BAR ── */
  .stats-bar {
    display: flex; gap: 0; margin-bottom: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px; overflow: hidden;
  }
  .stat-item {
    flex: 1; padding: 10px 8px; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.10);
  }
  .stat-item:last-child { border-right: none; }
  .stat-num { font-size: 16px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .stat-lbl { font-size: 9px; color: rgba(226,232,240,0.55); margin-top: 1px; letter-spacing: 0.04em; font-weight: 500; }

  /* ── LOGO ── */
  .logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .logo-box {
    width: 46px; height: 46px; border-radius: 13px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(8px);
  }
  .logo-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .logo-tag { font-size: 10px; font-weight: 600; color: #38BDF8; letter-spacing: 0.06em; text-transform: uppercase; }

  /* ── FORM HEADER ── */
  .form-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #EFF6FF; color: #2563EB;
    font-size: 12.5px; font-weight: 700;
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 14px; letter-spacing: 0.01em;
    border: 1px solid #DBEAFE;
  }
  .form-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.7rem; font-weight: 800; color: #0F172A;
    letter-spacing: -0.03em; margin-bottom: 8px;
  }
  .form-sub { font-size: 14px; color: #64748B; }
  .form-sub a { color: #2563EB; font-weight: 600; text-decoration: none; }
  .form-sub a:hover { text-decoration: underline; }

  /* ── FIELDS ── */
  .field-group { margin-bottom: 11px; }
  .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
  .input-wrap {
    position: relative; display: flex; align-items: center;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 11px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-wrap.focused {
    border-color: #2563EB;
    box-shadow: 0 0 0 3.5px rgba(37,99,235,0.13);
  }
  .input-wrap.has-error {
    border-color: #EF4444;
    box-shadow: 0 0 0 3.5px rgba(239,68,68,0.11);
  }
  .input-prefix { position: absolute; left: 14px; display: flex; align-items: center; pointer-events: none; }
  .input-field {
    width: 100%; border: none; outline: none; background: transparent;
    padding: 11px 14px 11px 42px;
    font-size: 14px; color: #0F172A; font-family: 'Inter', sans-serif;
  }
  .input-field::placeholder { color: #94A3B8; }
  .input-field:disabled { opacity: 0.55; cursor: not-allowed; }
  .eye-btn {
    position: absolute; right: 12px;
    background: transparent; border: none; cursor: pointer;
    color: #94A3B8; display: flex; align-items: center; padding: 4px;
    border-radius: 6px; transition: color 0.18s;
  }
  .eye-btn:hover { color: #475569; }
  .error-text { display: block; font-size: 12px; color: #EF4444; margin-top: 5px; font-weight: 500; }

  /* ── STRENGTH METER ── */
  .strength-track { display: flex; gap: 4px; height: 4px; margin-top: 10px; }
  .strength-seg { flex: 1; border-radius: 2px; transition: background 0.3s; }
  .strength-label { font-size: 11.5px; font-weight: 700; margin-top: 5px; display: block; }
  .rules-row { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 8px; }
  .rule-pill {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 500; transition: color 0.2s;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex; align-items: center; gap: 12px;
    margin: 4px 0 11px; color: #94A3B8; font-size: 12px;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px; background: #E2E8F0;
  }

  /* ── SOCIAL BTN ── */
  .social-btn {
    width: 100%; padding: 10px;
    background: #F8FAFC; border: 1.5px solid #E2E8F0;
    border-radius: 11px; cursor: pointer; font-size: 14px;
    font-weight: 600; color: #374151; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.18s, border-color 0.18s, box-shadow 0.18s;
    margin-bottom: 11px;
  }
  .social-btn:hover { background: #fff; border-color: #CBD5E1; box-shadow: 0 2px 8px rgba(15,23,42,0.07); }

  /* ── TERMS ── */
  .terms-label {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13px; color: #64748B; cursor: pointer;
    user-select: none; line-height: 1.55;
  }
  .terms-label input { width: 15px; height: 15px; accent-color: #2563EB; cursor: pointer; margin-top: 2px; flex-shrink: 0; }
  .terms-label a { color: #2563EB; font-weight: 600; text-decoration: none; }
  .terms-label a:hover { text-decoration: underline; }

  /* ── SUBMIT ── */
  .submit-btn {
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
  .submit-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .submit-btn:hover:not(:disabled)::after { transform: translateX(100%); }
  .submit-btn:hover:not(:disabled) { box-shadow: 0 8px 28px rgba(37,99,235,0.50); transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; box-shadow: none; transform: none; }

  /* ── ERROR BANNER ── */
  .api-error {
    display: flex; align-items: center; gap: 10px;
    background: #FEF2F2; border: 1px solid #FECACA;
    border-radius: 11px; padding: 12px 16px;
    margin-bottom: 20px; font-size: 14px; color: #DC2626; font-weight: 500;
    animation: fadeSlideUp 0.3s ease;
  }

  /* ── SUCCESS ── */
  .success-page {
    height: 100vh; overflow: hidden; display: flex;
    align-items: center; justify-content: center;
    background: linear-gradient(148deg, #0F172A 0%, #1E3A8A 45%, #0891B2 100%);
    font-family: 'Inter', sans-serif;
  }
  .success-card {
    text-align: center;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 28px;
    padding: 64px 52px;
    backdrop-filter: blur(16px);
    max-width: 380px;
    animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .success-icon {
    width: 76px; height: 76px; border-radius: 50%;
    background: linear-gradient(135deg, #10B981, #06B6D4);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 32px rgba(16,185,129,0.45);
    animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .success-title { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 10px; }
  .success-sub { font-size: 15px; color: rgba(226,232,240,0.75); }

  /* ── SCROLL INDICATOR ── */
  .scroll-indicator {
    position: absolute; bottom: 28px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    animation: glowPulse 2.5s ease-in-out infinite;
    z-index: 2;
  }
  .scroll-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.5);
    animation: float3 1.5s ease-in-out infinite;
  }
  .scroll-dot:nth-child(2) { animation-delay: 0.2s; }
  .scroll-dot:nth-child(3) { animation-delay: 0.4s; }

  /* ── MATCH INDICATOR ── */
  .match-row {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 500; margin-top: 5px;
  }

  /* ── BOTTOM NOTE ── */
  .signin-note { text-align: center; font-size: 13px; color: #64748B; margin-top: 10px; }
  .signin-note a { color: #2563EB; font-weight: 600; text-decoration: none; }
  .signin-note a:hover { text-decoration: underline; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .reg-page { height: auto; min-height: 100vh; overflow: visible; }
    .reg-container { height: auto; min-height: 100vh; }
    .reg-left { display: none; }
    .reg-right {
      height: auto;
      overflow-y: auto;
      justify-content: flex-start;
      padding: 32px 16px 56px;
      background: linear-gradient(160deg, #0F172A 0%, #1E3A8A 40%, #0891B2 100%);
    }
    .reg-card { max-width: 100%; border-radius: 20px; padding: 32px 24px; }
    .field-group { margin-bottom: 16px; }
    .social-btn { padding: 12px; margin-bottom: 16px; }
  }
  @media (max-width: 480px) {
    .reg-card { padding: 28px 18px; border-radius: 16px; }
    .form-title { font-size: 1.4rem; }
    .submit-btn { font-size: 14.5px; padding: 13px; }
  }
  @media (max-height: 700px) and (min-width: 901px) {
    .reg-card { padding: 18px 28px; }
    .field-group { margin-bottom: 8px; }
    .social-btn { padding: 8px; margin-bottom: 8px; }
    .stats-bar { display: none; }
    .left-sub { display: none; }
  }
`;

// ─── Inject styles once ───────────────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = 'skillbridge-register-styles';
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

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
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

function CheckSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
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

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(password) {
  const checks = {
    length:  password.length >= 8,
    upper:   /[A-Z]/.test(password),
    lower:   /[a-z]/.test(password),
    number:  /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const levels = [
    { label: '', color: '#E2E8F0' },
    { label: 'Very Weak', color: '#EF4444' },
    { label: 'Weak', color: '#F97316' },
    { label: 'Fair', color: '#EAB308' },
    { label: 'Strong', color: '#22C55E' },
    { label: 'Very Strong', color: '#06B6D4' },
  ];
  return { score, checks, ...levels[score] };
}

// ─── Animated left-panel hero illustration ────────────────────────────────────
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 340, margin: '0 auto 6px', display: 'block', maxHeight: 105 }}
    >
      {/* ── Background blobs ── */}
      <ellipse cx="190" cy="130" rx="160" ry="110"
        fill="rgba(255,255,255,0.04)" style={{ animation: 'blobMorph 12s ease-in-out infinite' }}/>

      {/* ── Floating card 1: Resume Score ── */}
      <g style={{ animation: 'float1 5s ease-in-out infinite', transformOrigin: '100px 80px' }}>
        <rect x="28" y="52" width="148" height="90" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
        <rect x="28" y="52" width="148" height="22" rx="14" fill="rgba(255,255,255,0.08)"/>
        <rect x="28" y="62" width="148" height="12" rx="0" fill="rgba(255,255,255,0.06)"/>
        {/* Title */}
        <text x="42" y="68" fill="rgba(255,255,255,0.75)" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">Resume Score</text>
        {/* Score ring */}
        <circle cx="64" cy="110" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none"/>
        <circle cx="64" cy="110" r="22" stroke="#38BDF8" strokeWidth="4" fill="none"
          strokeDasharray="105 138" strokeDashoffset="35" strokeLinecap="round"/>
        <text x="64" y="114" fill="#fff" fontSize="12" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">87</text>
        {/* Bars */}
        <rect x="100" y="86" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="86" width="48" height="5" rx="2.5" fill="#38BDF8"/>
        <rect x="100" y="97" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="97" width="38" height="5" rx="2.5" fill="#34D399"/>
        <rect x="100" y="108" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="100" y="108" width="52" height="5" rx="2.5" fill="#A78BFA"/>
        <text x="100" y="83" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">ATS</text>
        <text x="100" y="94" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">Keywords</text>
        <text x="100" y="105" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="Inter,sans-serif">Format</text>
      </g>

      {/* ── Floating card 2: Job Match ── */}
      <g style={{ animation: 'float2 6s ease-in-out infinite 0.8s', transformOrigin: '280px 170px' }}>
        <rect x="208" y="130" width="148" height="80" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
        {/* Company logos placeholder */}
        <circle cx="232" cy="156" r="13" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="262" cy="156" r="13" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
        <circle cx="292" cy="156" r="13" fill="rgba(52,211,153,0.18)" stroke="rgba(52,211,153,0.35)" strokeWidth="1"/>
        {/* Match text */}
        <text x="228" y="182" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">3 New Matches</text>
        <rect x="228" y="187" width="86" height="5" rx="2.5" fill="rgba(255,255,255,0.10)"/>
        <rect x="228" y="187" width="66" height="5" rx="2.5" fill="#38BDF8"/>
        {/* 'W' letter in circles */}
        <text x="232" y="160" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">G</text>
        <text x="262" y="160" fill="#7DD3FC" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">M</text>
        <text x="292" y="160" fill="#6EE7B7" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">A</text>
      </g>

      {/* ── Floating badge: 92% top right ── */}
      <g style={{ animation: 'float1 4.5s ease-in-out infinite 1.2s', transformOrigin: '310px 68px' }}>
        <rect x="278" y="44" width="84" height="46" rx="12" fill="rgba(52,211,153,0.18)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2"/>
        <text x="320" y="64" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif" textAnchor="middle">92%</text>
        <text x="320" y="79" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Job fit</text>
      </g>

      {/* ── Bottom badge: week plan ── */}
      <g style={{ animation: 'float2 7s ease-in-out infinite 0.3s', transformOrigin: '100px 200px' }}>
        <rect x="32" y="170" width="130" height="64" rx="13" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2"/>
        <text x="46" y="192" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontWeight="700" fontFamily="Inter,sans-serif">Week 1 Roadmap</text>
        {/* mini days */}
        {['M','T','W','T','F'].map((d, i) => (
          <g key={d + i}>
            <rect x={46 + i * 20} y="198" width="14" height="20" rx="4" fill={i < 3 ? 'rgba(56,189,248,0.35)' : 'rgba(255,255,255,0.08)'} stroke={i < 3 ? 'rgba(56,189,248,0.6)' : 'rgba(255,255,255,0.10)'} strokeWidth="1"/>
            <text x={53 + i * 20} y="212" fill={i < 3 ? '#7DD3FC' : 'rgba(255,255,255,0.35)'} fontSize="8" fontWeight="600" fontFamily="Inter,sans-serif" textAnchor="middle">{d}</text>
          </g>
        ))}
        <text x="46" y="228" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="Inter,sans-serif">3 of 5 tasks done</text>
      </g>

      {/* ── Centre sparkle ── */}
      <g style={{ animation: 'glowPulse 3s ease-in-out infinite', transformOrigin: '190px 130px' }}>
        <circle cx="190" cy="130" r="28" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.22)" strokeWidth="1.5"/>
        <circle cx="190" cy="130" r="16" fill="rgba(56,189,248,0.14)"/>
        {/* AI brain icon */}
        <path d="M182 122 Q182 116 190 116 Q198 116 198 122 Q202 122 202 128 Q202 134 196 135 L196 138 H184 L184 135 Q178 134 178 128 Q178 122 182 122 Z"
          fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
        <circle cx="186" cy="126" r="1.5" fill="#38BDF8"/>
        <circle cx="194" cy="126" r="1.5" fill="#38BDF8"/>
        <path d="M186 130 Q190 133 194 130" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </g>

      {/* ── Orbit dot ── */}
      <g style={{ animation: 'orbit 6s linear infinite', transformOrigin: '190px 130px' }}>
        <circle cx="190" cy="130" r="4" fill="#38BDF8" opacity="0.9"/>
      </g>
    </svg>
  );
}

// ─── Background SVG vector pattern for left panel ────────────────────────────────────
function BackgroundPattern() {
  return (
    <svg
      viewBox="0 0 500 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <defs>
        <pattern id="bgDotGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.055)"/>
        </pattern>
      </defs>

      {/* Dot grid */}
      <rect width="500" height="900" fill="url(#bgDotGrid)"/>

      {/* Top-right concentric rings */}
      <circle cx="488" cy="75" r="140" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1.5"/>
      <circle cx="488" cy="75" r="98" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
      <circle cx="488" cy="75" r="58" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1.5"/>
      <circle cx="488" cy="75" r="26" fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.14)" strokeWidth="1"/>

      {/* Bottom-left concentric rings */}
      <circle cx="12" cy="825" r="130" fill="none" stroke="rgba(167,139,250,0.07)" strokeWidth="1.5"/>
      <circle cx="12" cy="825" r="88" fill="none" stroke="rgba(167,139,250,0.05)" strokeWidth="1"/>
      <circle cx="12" cy="825" r="50" fill="none" stroke="rgba(167,139,250,0.09)" strokeWidth="1.5"/>
      <circle cx="12" cy="825" r="22" fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.12)" strokeWidth="1"/>

      {/* Corner frame – top left */}
      <path d="M 0 72 L 0 0 L 72 0" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="2"/>
      <path d="M 0 44 L 0 0 L 44 0" fill="none" stroke="rgba(56,189,248,0.11)" strokeWidth="1.5"/>

      {/* Corner frame – bottom right */}
      <path d="M 428 900 L 500 900 L 500 828" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="2"/>
      <path d="M 456 900 L 500 900 L 500 856" fill="none" stroke="rgba(167,139,250,0.11)" strokeWidth="1.5"/>

      {/* Decorative hexagon – upper right */}
      <polygon points="395,215 428,234 428,272 395,291 362,272 362,234"
        fill="rgba(56,189,248,0.03)" stroke="rgba(56,189,248,0.1)" strokeWidth="1.5"/>

      {/* Decorative hexagon – lower left */}
      <polygon points="105,610 138,629 138,667 105,686 72,667 72,629"
        fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.1)" strokeWidth="1.5"/>

      {/* Floating document icon – upper area */}
      <g opacity="0.065" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" fill="none"
         transform="translate(348,148) rotate(11)">
        <rect x="0" y="0" width="76" height="96" rx="9"/>
        <polyline points="52,0 52,20 76,20"/>
        <line x1="13" y1="34" x2="63" y2="34"/>
        <line x1="13" y1="48" x2="63" y2="48"/>
        <line x1="13" y1="62" x2="50" y2="62"/>
        <line x1="13" y1="76" x2="38" y2="76"/>
      </g>

      {/* Floating chart / analytics icon – lower left area */}
      <g opacity="0.065" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" fill="none"
         transform="translate(18,540) rotate(-7)">
        <rect x="0" y="0" width="90" height="66" rx="9"/>
        <polyline points="12,50 28,34 44,42 60,24 78,30"/>
        <circle cx="28" cy="34" r="3.5" fill="rgba(255,255,255,0.35)" stroke="none"/>
        <circle cx="44" cy="42" r="3.5" fill="rgba(255,255,255,0.35)" stroke="none"/>
        <circle cx="60" cy="24" r="3.5" fill="rgba(255,255,255,0.35)" stroke="none"/>
      </g>

      {/* Floating AI / brain icon – mid right */}
      <g opacity="0.055" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none"
         transform="translate(398,420) rotate(6)">
        <path d="M 16 22 Q 16 10 28 10 Q 34 3 42 10 Q 54 10 54 22 Q 62 26 58 36 Q 64 46 54 50 L 54 58 H 16 L 16 50 Q 6 46 12 36 Q 6 26 16 22 Z"/>
        <circle cx="26" cy="28" r="3.5" fill="rgba(255,255,255,0.3)" stroke="none"/>
        <circle cx="44" cy="28" r="3.5" fill="rgba(255,255,255,0.3)" stroke="none"/>
        <path d="M 26 40 Q 35 47 44 40" strokeLinecap="round"/>
      </g>

      {/* Subtle diagonal accent lines */}
      <line x1="0" y1="360" x2="500" y2="660" stroke="rgba(255,255,255,0.018)" strokeWidth="1.5"/>
      <line x1="0" y1="400" x2="500" y2="700" stroke="rgba(255,255,255,0.012)" strokeWidth="1"/>
    </svg>
  );
}

// ─── Perk SVG icons ───────────────────────────────────────────────────────────
const PERKS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Instant AI Analysis',
    desc: 'Resume feedback in under 10 seconds',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'ATS Optimization',
    desc: 'Pass applicant tracking with ease',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round">
        <path d="M3 3h18v4H3zM7 7v14M17 7v14M3 21h18"/>
      </svg>
    ),
    title: 'Personalized Roadmap',
    desc: 'Week-by-week skill building plans',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Smart Job Matching',
    desc: 'Roles aligned to your actual skill set',
  },
];

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel() {
  // scroll-triggered reveal
  const [visible, setVisible] = useState([false, false, false, false]);
  useEffect(() => {
    PERKS.forEach((_, i) => {
      setTimeout(() => setVisible(prev => {
        const n = [...prev]; n[i] = true; return n;
      }), 120 + i * 110);
    });
  }, []);

  return (
    <div className="reg-left">
      {/* SVG vector background pattern */}
      <BackgroundPattern />

      <div className="reg-left-inner">
        {/* Logo */}
        <div className="logo-row">
          <div className="logo-box">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.3.5 2.5 1.3 3.4C6.5 11.6 6 12.7 6 14c0 2.2 1.8 4 4 4h.5v2c0 1.1.9 2 2 2s2-.9 2-2v-2H14c2.2 0 4-1.8 4-4 0-1.3-.5-2.4-1.3-3.1C17.5 10 18 8.8 18 7.5 18 4.5 15.5 2 12 2Z"
                fill="white" opacity="0.9"/>
              <circle cx="10" cy="9" r="1.2" fill="#1E40AF"/>
              <circle cx="14" cy="9" r="1.2" fill="#1E40AF"/>
              <path d="M10 13Q12 15 14 13" stroke="#1E40AF" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div>
            <div className="logo-name">SkillBridge AI</div>
            <div className="logo-tag">Career Intelligence</div>
          </div>
        </div>

        {/* Eye-brow + heading */}
        {/* <div className="left-eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Start free today
        </div> */}
        <h2 className="left-heading">
          Go from Student<br/>
          to <span>Job-Ready</span>
        </h2>
        <p className="left-sub">
          One free account unlocks AI resume analysis, ATS scoring, a personalised roadmap, and smart job matching — no credit card needed.
        </p>

        {/* Hero illustration */}
        <HeroIllustration />

        {/* Perks */}
        <div className="perk-list">
          {PERKS.map((p, i) => (
            <div
              key={i}
              className="perk-item"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="perk-icon-box">{p.icon}</div>
              <div>
                <div className="perk-title">{p.title}</div>
                <div className="perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="trust-strip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          100% Free · No credit card · No spam
        </div>
      </div>

    </div>
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Field component ──────────────────────────────────────────────────────────
function Field({ id, label, name, type = 'text', value, onChange, onFocus, onBlur,
  placeholder, error, focused, disabled, autoComplete, suffix }) {
  return (
    <div className="field-group">
      <label htmlFor={id} className="field-label">{label}</label>
      <div className={`input-wrap ${focused === name ? 'focused' : ''} ${error ? 'has-error' : ''}`}>
        <span className="input-prefix">
          {name === 'fullName'    && <PersonIcon />}
          {name === 'email'       && <MailIcon />}
          {name === 'password'    && <LockIcon />}
          {name === 'confirmPass' && <LockIcon />}
        </span>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="input-field"
          autoComplete={autoComplete}
          disabled={disabled}
          style={suffix ? { paddingRight: 44 } : {}}
        />
        {suffix}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

// ─── Main Register Component ──────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();
  const { login }  = useAuth();

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPass: '', agreed: false,
  });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [focused, setFocused]   = useState('');
  const [success, setSuccess]   = useState(false);

  // scroll reveal refs
  const [headerRef, headerVis]   = useScrollReveal(0.1);
  const [fieldsRef, fieldsVis]   = useScrollReveal(0.1);

  const strength = useMemo(() => getStrength(form.password), [form.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError)     setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())                e.fullName    = 'Full name is required.';
    else if (form.fullName.trim().length < 2) e.fullName    = 'Name must be at least 2 characters.';
    if (!form.email.trim())                   e.email       = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email     = 'Enter a valid email address.';
    if (!form.password)                       e.password    = 'Password is required.';
    else if (form.password.length < 6)        e.password    = 'Password must be at least 6 characters.';
    if (!form.confirmPass)                    e.confirmPass = 'Please confirm your password.';
    else if (form.confirmPass !== form.password) e.confirmPass = 'Passwords do not match.';
    if (!form.agreed)                         e.agreed      = 'You must accept the terms to continue.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: form.fullName.trim(),
        email:    form.email.trim(),
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => { login(data.user, data.token); navigate('/dashboard'); }, 1400);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 50, strokeDashoffset: 0, animation: 'tickDraw 0.5s 0.4s ease both' }}/>
            </svg>
          </div>
          <div className="success-title">Welcome aboard!</div>
          <div className="success-sub">Your SkillBridge account is ready. Taking you to your dashboard…</div>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <SpinnerIcon />
          </div>
        </div>
      </div>
    );
  }

  // ── Main layout ──
  return (
    <>
      <StyleInjector />
      <div className="reg-page">
        <div className="reg-container">
          <LeftPanel />

          {/* ── RIGHT: form ── */}
          <div className="reg-right">
            <div className="reg-card">
              {/* Header */}
              <div
                ref={headerRef}
                style={{
                  marginBottom: 14,
                  opacity: headerVis ? 1 : 0,
                  transform: headerVis ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                <div className="form-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Free account
                </div>
                <h1 className="form-title">Create your account</h1>
                <p className="form-sub">
                  Already a member? <Link to="/login" id="register-goto-login">Sign in →</Link>
                </p>
              </div>

              {/* Google SSO */}
              <button type="button" className="social-btn" onClick={() => {}}>
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="divider">or register with email</div>

              {/* API error */}
              {apiError && (
                <div className="api-error" role="alert" id="register-api-error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {apiError}
                </div>
              )}

              {/* Form fields */}
              <form
                id="register-form"
                onSubmit={handleSubmit}
                noValidate
                ref={fieldsRef}
                style={{
                  opacity: fieldsVis ? 1 : 0,
                  transform: fieldsVis ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s 0.1s ease, transform 0.5s 0.1s ease',
                }}
              >
                {/* Full Name */}
                <Field
                  id="reg-name" label="Full Name" name="fullName"
                  value={form.fullName} onChange={handleChange}
                  onFocus={() => setFocused('fullName')} onBlur={() => setFocused('')}
                  placeholder="Your full name" error={errors.fullName}
                  focused={focused} disabled={loading} autoComplete="name"
                />

                {/* Email */}
                <Field
                  id="reg-email" label="Email Address" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  placeholder="you@example.com" error={errors.email}
                  focused={focused} disabled={loading} autoComplete="email"
                />

                {/* Password */}
                <div className="field-group">
                  <label htmlFor="reg-password" className="field-label">Password</label>
                  <div className={`input-wrap ${focused === 'password' ? 'focused' : ''} ${errors.password ? 'has-error' : ''}`}>
                    <span className="input-prefix"><LockIcon /></span>
                    <input
                      id="reg-password"
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused('')}
                      placeholder="Create a strong password"
                      className="input-field"
                      style={{ paddingRight: 44 }}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button type="button" className="eye-btn" tabIndex={-1}
                      onClick={() => setShowPass(v => !v)}
                      aria-label="Toggle password visibility"
                      id="reg-toggle-password">
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}

                  {form.password && (
                    <div style={{ marginTop: 10 }}>
                      <div className="strength-track">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="strength-seg"
                            style={{ background: i <= strength.score ? strength.color : '#E2E8F0' }}/>
                        ))}
                      </div>
                      {strength.label && (
                        <span className="strength-label" style={{ color: strength.color }}>
                          {strength.label}
                        </span>
                      )}
                      <div className="rules-row">
                        {[
                          { key: 'length',  label: '8+ chars' },
                          { key: 'upper',   label: 'Uppercase' },
                          { key: 'number',  label: 'Number' },
                          { key: 'special', label: 'Symbol' },
                        ].map(({ key, label }) => (
                          <span key={key} className="rule-pill"
                            style={{ color: strength.checks[key] ? '#10B981' : '#94A3B8' }}>
                            {strength.checks[key]
                              ? <CheckSmall />
                              : <span style={{ width: 12, display: 'inline-block', textAlign: 'center' }}>·</span>
                            }
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="field-group">
                  <label htmlFor="reg-confirm" className="field-label">Confirm Password</label>
                  <div className={`input-wrap ${focused === 'confirmPass' ? 'focused' : ''} ${errors.confirmPass ? 'has-error' : ''}`}>
                    <span className="input-prefix"><LockIcon /></span>
                    <input
                      id="reg-confirm"
                      type={showConf ? 'text' : 'password'}
                      name="confirmPass"
                      value={form.confirmPass}
                      onChange={handleChange}
                      onFocus={() => setFocused('confirmPass')}
                      onBlur={() => setFocused('')}
                      placeholder="Re-enter your password"
                      className="input-field"
                      style={{ paddingRight: 44 }}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button type="button" className="eye-btn" tabIndex={-1}
                      onClick={() => setShowConf(v => !v)}
                      aria-label="Toggle confirm password visibility"
                      id="reg-toggle-confirm">
                      <EyeIcon open={showConf} />
                    </button>
                  </div>
                  {errors.confirmPass && <span className="error-text">{errors.confirmPass}</span>}
                  {form.confirmPass && !errors.confirmPass && (
                    <div className="match-row"
                      style={{ color: form.confirmPass === form.password ? '#10B981' : '#EF4444' }}>
                      {form.confirmPass === form.password
                        ? <><CheckSmall /> Passwords match</>
                        : <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            Passwords do not match
                          </>
                      }
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div style={{ marginBottom: 14 }}>
                  <label className="terms-label" htmlFor="reg-terms">
                    <input
                      id="reg-terms"
                      type="checkbox"
                      name="agreed"
                      checked={form.agreed}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span>
                      I agree to the{' '}
                      <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreed && (
                    <span className="error-text" style={{ display: 'block', marginTop: 4 }}>
                      {errors.agreed}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                  id="register-submit"
                >
                  {loading ? (
                    <><SpinnerIcon /> Creating your account…</>
                  ) : (
                    <>
                      Create my free account
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom note */}
              <p className="signin-note">
                Already have an account?{' '}
                <Link to="/login" id="register-signin">Sign in</Link>
              </p>

              {/* Security note */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, marginTop: 16, fontSize: 11.5, color: '#94A3B8',
              }}>
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