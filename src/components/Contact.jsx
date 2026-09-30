import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, CheckCircle2, Github, Linkedin, Facebook, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [senderName, setSenderName] = useState('');

  const handleCopyEmail = () => {
    soundFx.playChime();
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    soundFx.playChime();
    setSenderName(formData.name);
    setSubmitSuccess(true);

    // Dynamic celebration fireworks from both sides of the screen
    const end = Date.now() + 1200;
    const colors = ['#06b6d4', '#10b981', '#6366f1', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 7000);
  };

  return (
    <section id="contact" className="section-wrapper alt-bg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <MessageSquare size={14} /> Collaboration
          </span>
          <h2 className="section-title">Let's Connect &amp; Build</h2>
          <p className="section-subtitle">
            Whether you are looking to hire a full-stack engineer, have a project in mind, or wish to explore a
            collaboration, I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info */}
          <TiltCard maxTilt={5} scale={1.01}>
            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                Direct Contact Channels
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Feel free to reach out via email, phone, or connect with me directly on professional networks.
              </p>

              <div className="contact-channels-list">
                {/* Email */}
                <div className="contact-channel-item">
                  <div className="channel-left">
                    <div className="channel-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="channel-name">Direct Email</div>
                      <div className="channel-val">{personalInfo.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn-copy-email"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="contact-channel-item"
                  onClick={() => soundFx.playPop()}
                >
                  <div className="channel-left">
                    <div className="channel-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="channel-name">Direct Phone</div>
                      <div className="channel-val">{personalInfo.phone}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                    Call / WhatsApp
                  </span>
                </a>

                {/* Location */}
                <div className="contact-channel-item">
                  <div className="channel-left">
                    <div className="channel-icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="channel-name">Location</div>
                      <div className="channel-val">{personalInfo.location}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.55rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {personalInfo.workPreference}
                  </span>
                </div>
              </div>

              {/* Socials Connect */}
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase'
                  }}
                >
                  Connect:
                </span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="GitHub"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <Github size={18} />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="LinkedIn"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={personalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn"
                  aria-label="Facebook"
                  onClick={() => soundFx.playPop()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </TiltCard>

          {/* Right: Contact Form */}
          <TiltCard maxTilt={4} scale={1.01}>
            <div className="contact-form-card">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                Send a Message
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Leave your details and message below, and I'll respond as soon as possible.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label-modern">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control-modern"
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label-modern">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control-modern"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label-modern">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control-modern"
                    placeholder="Software Engineering Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label-modern">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    className="form-control-modern"
                    rows={5}
                    placeholder="Hi Usman, I would like to discuss an opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-modern btn-primary-glow btn-shimmer"
                  style={{ width: '100%', padding: '0.95rem' }}
                >
                  <Send size={16} /> Send Message
                </button>

                {/* Feedback Alert */}
                {submitSuccess && (
                  <div className="form-feedback-toast success">
                    <CheckCircle2 size={20} />
                    <span>
                      Thank you, <strong>{senderName}</strong>! Your message has been received. I will get back to you shortly.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
