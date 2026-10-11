import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  Facebook,
  MessageSquare,
  Sparkles,
  Clock,
  Download,
  User,
  ExternalLink,
  Briefcase,
  Rocket,
  Server,
  MessageCircle,
  ShieldCheck,
  Zap,
  RefreshCw,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

const TOPIC_PRESETS = [
  {
    id: 'fulltime',
    label: 'Full-Time Role',
    icon: Briefcase,
    defaultSubject: 'Career Opportunity: Software Engineer',
    prompt:
      'Hi Usman, we came across your portfolio and are impressed by your full-stack & backend engineering expertise. We have an open role and would love to schedule a conversation.'
  },
  {
    id: 'contract',
    label: 'Freelance / MVP',
    icon: Rocket,
    defaultSubject: 'MVP & Full-Stack Development Project',
    prompt:
      'Hi Usman, I am looking for a full-stack engineer to help build an MVP. I would love to discuss project requirements, architecture, and estimated timelines.'
  },
  {
    id: 'backend',
    label: 'FastAPI & Backend',
    icon: Server,
    defaultSubject: 'Backend Architecture & API Consultation',
    prompt:
      'Hi Usman, we need assistance designing high-throughput REST APIs and database schema with FastAPI / PostgreSQL. Would love to get your insights.'
  },
  {
    id: 'data_ai',
    label: 'AI & Data Pipelines',
    icon: Sparkles,
    defaultSubject: 'Data Analytics & AI Engineering Inquiry',
    prompt:
      'Hi Usman, I saw your work with geospatial analysis and data pipelines. We have a data-driven challenge we would like to collaborate on.'
  },
  {
    id: 'general',
    label: 'Say Hello',
    icon: MessageSquare,
    defaultSubject: 'Hello from your Portfolio',
    prompt:
      'Hi Usman, loved exploring your interactive portfolio showcase! Wanted to connect and follow your work.'
  }
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('fulltime');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: TOPIC_PRESETS[0].defaultSubject,
    message: ''
  });

  // Live Pakistan Standard Time (PKT, UTC+5)
  const [pktTime, setPktTime] = useState('');
  const [isBusinessHours, setIsBusinessHours] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setPktTime(timeStr);

        // Calculate hour in PKT
        const pktHourStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          hour12: false
        });
        const hour = parseInt(pktHourStr, 10);
        // Active hours: 9 AM to 1 AM
        setIsBusinessHours(hour >= 9 || hour < 1);
      } catch {
        setPktTime('PKT (UTC+5)');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    soundFx.playChime();
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleCopyPhone = () => {
    soundFx.playChime();
    navigator.clipboard.writeText(personalInfo.phone.replace(/\s+/g, '')).then(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    });
  };

  const handleDownloadVCard = () => {
    soundFx.playChime();
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Usman Ali
N:Ali;Usman;;;
TITLE:Software Engineer
ORG:Full-Stack & Python Specialist
TEL;TYPE=CELL,VOICE:${personalInfo.phone.replace(/\s+/g, '')}
EMAIL;TYPE=PREF,INTERNET:${personalInfo.email}
URL:https://github.com/Logic-ui
NOTE:Software Engineer specializing in FastAPI, Flask, Django, React.js, PostgreSQL, Docker & AI pipelines.
ADR;TYPE=WORK:;;Lahore / Islamabad;Punjab;;Pakistan
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Usman_Ali_Software_Engineer.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSelectTopic = (preset) => {
    soundFx.playPop();
    setSelectedTopic(preset.id);
    setFormData((prev) => ({
      ...prev,
      subject: preset.defaultSubject
    }));
  };

  const handleApplyPrompt = (promptText) => {
    soundFx.playPop();
    setFormData((prev) => ({
      ...prev,
      message: promptText
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    soundFx.playPop();

    // Simulated transmission state for 850ms
    setTimeout(() => {
      setIsSubmitting(false);
      setSenderName(formData.name);
      setSenderEmail(formData.email);
      setSubmitSuccess(true);
      soundFx.playChime();

      // Dynamic celebratory confetti fireworks
      const end = Date.now() + 1500;
      const colors = ['#06b6d4', '#10b981', '#6366f1', '#f59e0b', '#3b82f6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.65 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.65 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        subject: TOPIC_PRESETS.find((t) => t.id === selectedTopic)?.defaultSubject || '',
        message: ''
      });
    }, 850);
  };

  const handleResetSuccess = () => {
    soundFx.playPop();
    setSubmitSuccess(false);
  };

  const cleanPhone = personalInfo.phone.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi Usman, I saw your portfolio and would like to connect regarding an opportunity!`
  )}`;

  return (
    <section id="contact" className="section-wrapper alt-bg" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> Get In Touch
          </span>
          <h2 className="section-title">Let's Connect &amp; Build Together</h2>
          <p className="section-subtitle">
            Whether you are looking to hire a full-stack engineer, need scalable Python &amp; FastAPI backend architecture,
            or have an exciting project to discuss — I'd love to hear from you.
          </p>
        </div>

        {/* Live Availability & Timezone Status Bar */}
        <div className="contact-status-bar">
          <div className="status-bar-left">
            <span className="status-pulse-dot" />
            <span className="status-availability-text">
              {isBusinessHours ? 'Available for New Roles & Contracts' : 'Typically Responding Within Hours'}
            </span>
            <span className="status-response-pill">Avg. Response &lt; 2 hrs</span>
          </div>
          <div className="status-bar-right">
            <div className="status-clock-chip">
              <Clock size={13} className="text-cyan-400" />
              <span>{pktTime ? `${pktTime} PKT (UTC+5)` : 'Lahore, PK (UTC+5)'}</span>
            </div>
          </div>
        </div>

        <div className="contact-grid">
          {/* ================= Left: Contact Info Card ================= */}
          <TiltCard maxTilt={4} scale={1.01}>
            <div className="contact-info-card">
              {/* Profile Meta Header */}
              <div className="contact-author-profile">
                <div className="contact-avatar-wrap">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="contact-avatar-img"
                    onError={(e) => {
                      e.target.src = '/images/Usman.jpg';
                    }}
                  />
                  <span className="contact-avatar-status-badge" title="Online & Active" />
                </div>
                <div className="contact-author-meta">
                  <div className="contact-author-name">
                    <span>{personalInfo.name}</span>
                    <CheckCircle2 size={18} className="verified-icon" title="Verified Engineer Profile" />
                  </div>
                  <div className="contact-author-role">{personalInfo.roleTitle}</div>
                  <div className="contact-author-sub">{personalInfo.subtitle}</div>
                </div>
              </div>

              {/* Contact Channels List */}
              <div className="contact-channels-list">
                {/* 1. Email */}
                <div className="contact-channel-item">
                  <div className="channel-left">
                    <div className="channel-icon-wrap">
                      <Mail size={19} />
                    </div>
                    <div className="channel-details">
                      <div className="channel-label">Direct Email</div>
                      <div className="channel-val" title={personalInfo.email}>
                        {personalInfo.email}
                      </div>
                    </div>
                  </div>
                  <div className="channel-actions">
                    {copiedEmail && <span className="copied-badge-toast">Copied!</span>}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`channel-action-btn ${copiedEmail ? 'active-success' : ''}`}
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="channel-action-btn"
                      title="Open in mail app"
                      aria-label="Open in mail application"
                      onClick={() => soundFx.playPop()}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                {/* 2. WhatsApp Direct (Instant Response) */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-item channel-whatsapp"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <div className="channel-left">
                    <div className="channel-icon-wrap">
                      <MessageCircle size={20} />
                    </div>
                    <div className="channel-details">
                      <div className="channel-label">
                        <span>WhatsApp Chat</span>
                        <span className="channel-badge-pill">Fastest</span>
                      </div>
                      <div className="channel-val">{personalInfo.phone}</div>
                    </div>
                  </div>
                  <div className="channel-actions">
                    <span className="channel-action-btn" title="Open WhatsApp Chat">
                      <ExternalLink size={15} />
                    </span>
                  </div>
                </a>

                {/* 3. Phone */}
                <div className="contact-channel-item">
                  <div className="channel-left">
                    <div className="channel-icon-wrap">
                      <Phone size={19} />
                    </div>
                    <div className="channel-details">
                      <div className="channel-label">Phone &amp; Voice</div>
                      <div className="channel-val">{personalInfo.phone}</div>
                    </div>
                  </div>
                  <div className="channel-actions">
                    {copiedPhone && <span className="copied-badge-toast">Copied!</span>}
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className={`channel-action-btn ${copiedPhone ? 'active-success' : ''}`}
                      title="Copy phone number"
                      aria-label="Copy phone number"
                    >
                      {copiedPhone ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="channel-action-btn"
                      title="Call directly"
                      aria-label="Call phone"
                      onClick={() => soundFx.playPop()}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                {/* 4. Location & Work Modes */}
                <div className="contact-channel-item">
                  <div className="channel-left">
                    <div className="channel-icon-wrap">
                      <MapPin size={19} />
                    </div>
                    <div className="channel-details">
                      <div className="channel-label">Base Location</div>
                      <div className="channel-val">{personalInfo.location}</div>
                    </div>
                  </div>
                  <div className="channel-actions">
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.55rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--accent-cyan)',
                        fontWeight: 600
                      }}
                    >
                      {personalInfo.workPreference}
                    </span>
                  </div>
                </div>
              </div>

              {/* Download vCard (.vcf) */}
              <div className="vcard-download-box">
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="btn-vcard"
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <Download size={16} /> Save Contact Card (.vcf)
                </button>
              </div>

              {/* Trust Badges */}
              <div className="contact-trust-strip">
                <div className="trust-badge-item">
                  <Zap size={16} className="trust-badge-icon" />
                  <span className="trust-badge-title">Quick Reply</span>
                  <span className="trust-badge-desc">Within 2 business hours</span>
                </div>
                <div className="trust-badge-item">
                  <ShieldCheck size={16} className="trust-badge-icon" />
                  <span className="trust-badge-title">100% Confidential</span>
                  <span className="trust-badge-desc">NDA &amp; contract ready</span>
                </div>
                <div className="trust-badge-item">
                  <Sparkles size={16} className="trust-badge-icon" />
                  <span className="trust-badge-title">Clean Code</span>
                  <span className="trust-badge-desc">Tested &amp; documented</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact-socials-box">
                <span className="contact-socials-title">Follow / Connect</span>
                <div className="contact-socials-row">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-btn github-btn"
                    title="GitHub Profile (@Logic-ui)"
                    aria-label="GitHub Profile"
                    onClick={() => soundFx.playPop()}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-btn linkedin-btn"
                    title="LinkedIn Professional Profile"
                    aria-label="LinkedIn Profile"
                    onClick={() => soundFx.playPop()}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={personalInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-btn facebook-btn"
                    title="Facebook"
                    aria-label="Facebook Profile"
                    onClick={() => soundFx.playPop()}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="social-circle-btn mail-btn"
                    title="Direct Mail"
                    aria-label="Direct Mail"
                    onClick={() => soundFx.playPop()}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* ================= Right: Contact Form Card ================= */}
          <TiltCard maxTilt={3} scale={1.01}>
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="contact-form-title">
                  <MessageSquare size={20} className="text-cyan-400" /> Send a Direct Message
                </h3>
                <p className="contact-form-desc">
                  Have an opening, a freelance project, or an engineering question? Drop your details below and I'll
                  respond promptly.
                </p>
              </div>

              {submitSuccess ? (
                /* Celebration Success Card */
                <div className="contact-success-card">
                  <div className="success-badge-icon-wrap">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="success-card-title">Message Transmitted!</h4>
                  <p className="success-card-text">
                    Thank you, <strong>{senderName}</strong>. Your inquiry has been dispatched successfully. I will review
                    your message and reach out to <strong>{senderEmail}</strong> shortly.
                  </p>
                  <div className="success-card-actions">
                    <button
                      type="button"
                      onClick={handleResetSuccess}
                      className="btn-modern btn-outline-glass btn-sm"
                    >
                      <RefreshCw size={14} /> Send Another Message
                    </button>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modern btn-primary-glow btn-sm"
                      onClick={() => soundFx.playPop()}
                    >
                      <MessageCircle size={15} /> Chat on WhatsApp Now
                    </a>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  {/* Topic Selector Chips */}
                  <div className="topic-selector-container">
                    <div className="topic-selector-label">
                      <span>Inquiry Topic</span>
                      <span>Select purpose</span>
                    </div>
                    <div className="topic-chips-grid">
                      {TOPIC_PRESETS.map((preset) => {
                        const Icon = preset.icon;
                        const isSelected = selectedTopic === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            className={`topic-chip ${isSelected ? 'active' : ''}`}
                            onClick={() => handleSelectTopic(preset)}
                          >
                            <span className="topic-chip-dot" />
                            <Icon size={14} />
                            <span>{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 1-Click Starter Prompts */}
                  <div className="quick-starters-wrap">
                    <span className="quick-starters-label">
                      <Sparkles size={13} /> Quick Starters:
                    </span>
                    {TOPIC_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        className="starter-btn"
                        title="Load template message"
                        onClick={() => handleApplyPrompt(preset.prompt)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Form Name & Email Row */}
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="name" className="form-label-modern">
                        <span>Your Name *</span>
                      </label>
                      <div className="form-input-wrap">
                        <input
                          type="text"
                          id="name"
                          className="form-control-modern"
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                        />
                        <User size={16} className="input-icon-lead" />
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label htmlFor="email" className="form-label-modern">
                        <span>Your Email *</span>
                      </label>
                      <div className="form-input-wrap">
                        <input
                          type="email"
                          id="email"
                          className="form-control-modern"
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                        />
                        <Mail size={16} className="input-icon-lead" />
                        {formData.email && isValidEmail(formData.email) && (
                          <Check size={16} className="validation-indicator-icon" title="Valid email format" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="form-group-modern">
                    <label htmlFor="subject" className="form-label-modern">
                      <span>Subject</span>
                    </label>
                    <div className="form-input-wrap">
                      <input
                        type="text"
                        id="subject"
                        className="form-control-modern"
                        placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <FileText size={16} className="input-icon-lead" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-group-modern">
                    <label htmlFor="message" className="form-label-modern">
                      <span>Message *</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {formData.message.length} / 1500 chars
                      </span>
                    </label>
                    <div className="form-input-wrap">
                      <textarea
                        id="message"
                        className="form-control-modern form-textarea-modern"
                        rows={4}
                        placeholder="Tell me about your project, team, tech stack, or opportunity..."
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={1500}
                        required
                      />
                      <MessageSquare size={16} className="input-icon-lead icon-top" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <MagneticButton strength={15} style={{ width: '100%', display: 'block' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-submit-contact btn-submit-shimmer"
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw size={17} className="spinner-icon" />
                          <span>Transmitting Securely...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
