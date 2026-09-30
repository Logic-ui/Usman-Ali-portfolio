import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  RotateCcw,
  ShoppingBag,
  CreditCard,
  Check
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

export default function FeaturedSpotlight({ project, onOpenCaseStudy }) {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'simulator' | 'blueprint'
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // POS Mini Simulator State
  const [cart, setCart] = useState([
    { id: 1, name: 'Espresso Roast (1kg)', price: 18.5, qty: 2, sku: 'SKU-8841' },
    { id: 2, name: 'Cold Brew Blend', price: 14.0, qty: 1, sku: 'SKU-9920' },
  ]);
  const [checkoutStatus, setCheckoutStatus] = useState(null); // 'processing' | 'success' | null

  if (!project) return null;

  // Simulator Catalog Items
  const sampleProducts = [
    { id: 1, name: 'Espresso Roast (1kg)', price: 18.5, sku: 'SKU-8841', category: 'Beans' },
    { id: 2, name: 'Cold Brew Blend', price: 14.0, sku: 'SKU-9920', category: 'Cold' },
    { id: 3, name: 'Bakery Croissant', price: 4.25, sku: 'SKU-3120', category: 'Pastry' },
    { id: 4, name: 'Vanilla Syrup 750ml', price: 9.5, sku: 'SKU-5512', category: 'Flavor' },
  ];

  const addToCart = (product) => {
    soundFx.playPop();
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    soundFx.playPop();
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartTax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + cartTax;

  const handleSimulateCheckout = () => {
    if (cart.length === 0) return;
    soundFx.playPop();
    setCheckoutStatus('processing');
    setTimeout(() => {
      soundFx.playSuccess();
      setCheckoutStatus('success');
      setTimeout(() => {
        setCheckoutStatus(null);
      }, 3500);
    }, 700);
  };

  return (
    <div className="spotlight-showcase-container">
      {/* Top Banner & Flagship Badges */}
      <div className="spotlight-badge-strip">
        <div className="spotlight-badges-left">
          <span className="spotlight-flagship-tag">
            <Sparkles size={14} className="text-amber-400" /> FLAGSHIP PRODUCTION ARCHITECTURE
          </span>
          <span className="badge-live-pulse">
            <span className="pulse-indicator" /> Live POS Deployment
          </span>
        </div>

        {/* View Mode Tabs within Spotlight */}
        <div className="spotlight-mode-tabs" role="tablist">
          <button
            type="button"
            className={`spotlight-tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
            onClick={() => {
              soundFx.playPop();
              setActiveTab('visual');
            }}
          >
            <Layers size={14} /> UI Showcase
          </button>
          <button
            type="button"
            className={`spotlight-tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => {
              soundFx.playPop();
              setActiveTab('simulator');
            }}
          >
            <Terminal size={14} /> Interactive POS Simulator
          </button>
          <button
            type="button"
            className={`spotlight-tab-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
            onClick={() => {
              soundFx.playPop();
              setActiveTab('blueprint');
            }}
          >
            <Cpu size={14} /> Architecture Blueprint
          </button>
        </div>
      </div>

      <TiltCard maxTilt={3} scale={1.01} className="spotlight-card-tilt">
        <div className="spotlight-card border-beam-card">
          <div className="spotlight-grid">
            {/* Left Column: Dynamic Interactive Display */}
            <div className="spotlight-media-pane">
              {activeTab === 'visual' && (
                <div className="spotlight-visual-mode">
                  <div className="spotlight-main-img-box">
                    <img
                      src={project.images[activeImgIndex]}
                      alt={`${project.title} screenshot`}
                      className="spotlight-main-img"
                    />
                    <div className="spotlight-img-controls">
                      <span className="spotlight-img-counter font-mono">
                        {activeImgIndex + 1} / {project.images.length}
                      </span>
                      <span className="spotlight-zoom-pill font-mono">
                        <Sparkles size={12} /> RetailPulse v2.4
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="spotlight-thumbnails-row">
                    {project.images.slice(0, 6).map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`spotlight-thumb-btn ${idx === activeImgIndex ? 'active' : ''}`}
                        onClick={() => {
                          soundFx.playPop();
                          setActiveImgIndex(idx);
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        title={`View preview screen ${idx + 1}`}
                      >
                        <img src={img} alt={`Screen ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'simulator' && (
                <div className="spotlight-simulator-mode">
                  <div className="simulator-header">
                    <div className="simulator-title-row">
                      <span className="sim-dot green" />
                      <span className="sim-dot yellow" />
                      <span className="sim-dot red" />
                      <span className="sim-title font-mono">
                        RETAILPULSE // CLOUD_POS_TERMINAL.SIM
                      </span>
                    </div>
                    <span className="sim-status font-mono">
                      <Zap size={12} className="text-cyan-400" /> ACID TRANSACTION ENGINE
                    </span>
                  </div>

                  {/* Quick Product Grid to Add */}
                  <div className="sim-catalog-strip">
                    <span className="sim-section-label font-mono">Click to Scan &amp; Add:</span>
                    <div className="sim-products-grid">
                      {sampleProducts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className="sim-product-chip"
                          onClick={() => addToCart(p)}
                        >
                          <span className="chip-name">{p.name}</span>
                          <span className="chip-price font-mono">${p.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live POS Cart Window */}
                  <div className="sim-cart-window">
                    <div className="sim-cart-header font-mono">
                      <span>ITEM &amp; SKU</span>
                      <span>QTY</span>
                      <span>SUBTOTAL</span>
                    </div>

                    <div className="sim-cart-items-list">
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <div key={item.id} className="sim-cart-row font-mono">
                            <div className="sim-item-info">
                              <span className="sim-item-name">{item.name}</span>
                              <span className="sim-item-sku">{item.sku}</span>
                            </div>
                            <div className="sim-item-qty">
                              <span>x{item.qty}</span>
                            </div>
                            <div className="sim-item-total">
                              <span>${(item.price * item.qty).toFixed(2)}</span>
                              <button
                                type="button"
                                className="sim-remove-btn"
                                onClick={() => removeFromCart(item.id)}
                                title="Remove item"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="sim-cart-empty font-mono">
                          Cart empty. Click products above to simulate instant barcode scan.
                        </div>
                      )}
                    </div>

                    {/* Summary Totals */}
                    <div className="sim-cart-totals font-mono">
                      <div className="sim-calc-line">
                        <span>Subtotal:</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="sim-calc-line">
                        <span>Tax (8%):</span>
                        <span>${cartTax.toFixed(2)}</span>
                      </div>
                      <div className="sim-calc-line grand-total">
                        <span>TOTAL DUE:</span>
                        <span className="text-cyan">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <div className="sim-checkout-box">
                      {checkoutStatus === 'success' ? (
                        <div className="sim-success-alert font-mono">
                          <CheckCircle2 size={18} className="text-emerald-400" />
                          <span>ORDER #8849 TENDERED — 14ms DB COMMIT (ACID OK)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="sim-checkout-btn"
                          disabled={cart.length === 0 || checkoutStatus === 'processing'}
                          onClick={handleSimulateCheckout}
                        >
                          <CreditCard size={15} />
                          {checkoutStatus === 'processing'
                            ? 'Processing Atomic DB Lock...'
                            : `Simulate Instant POS Tender ($${cartTotal.toFixed(2)})`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'blueprint' && (
                <div className="spotlight-blueprint-mode">
                  <div className="blueprint-header font-mono">
                    <Cpu size={16} className="text-cyan-400" /> SYSTEM ARCHITECTURE &amp; TELEMETRY
                  </div>

                  {/* Flow pipeline */}
                  <div className="blueprint-pipeline font-mono">
                    <div className="pipeline-node">
                      <span className="node-badge">CLIENT LAYER</span>
                      <strong>React 18 SPA</strong>
                      <span className="node-sub">Plotly.js + Tailwind</span>
                    </div>
                    <div className="pipeline-connector">
                      <span>HTTPS / REST</span>
                      <div className="connector-arrow">➔</div>
                    </div>
                    <div className="pipeline-node highlight">
                      <span className="node-badge">API GATEWAY</span>
                      <strong>FastAPI Async</strong>
                      <span className="node-sub">OAuth2 + JWT Auth</span>
                    </div>
                    <div className="pipeline-connector">
                      <span>SQLAlchemy</span>
                      <div className="connector-arrow">➔</div>
                    </div>
                    <div className="pipeline-node">
                      <span className="node-badge">DATA TIER</span>
                      <strong>PostgreSQL</strong>
                      <span className="node-sub">ACID Transactions</span>
                    </div>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="telemetry-grid">
                    <div className="telemetry-cell">
                      <span className="telemetry-label font-mono">SCAN-TO-CART LATENCY</span>
                      <span className="telemetry-val text-cyan font-mono">&lt; 12 ms</span>
                      <span className="telemetry-desc">Optimized client memory map</span>
                    </div>
                    <div className="telemetry-cell">
                      <span className="telemetry-label font-mono">INVENTORY INTEGRITY</span>
                      <span className="telemetry-val text-emerald font-mono">100% ACID</span>
                      <span className="telemetry-desc">Atomic DB row lock on tender</span>
                    </div>
                    <div className="telemetry-cell">
                      <span className="telemetry-label font-mono">ACTIVE SKU CAPACITY</span>
                      <span className="telemetry-val text-amber font-mono">5,000+</span>
                      <span className="telemetry-desc">Indexed barcode hash lookups</span>
                    </div>
                    <div className="telemetry-cell">
                      <span className="telemetry-label font-mono">AUTH SCHEME</span>
                      <span className="telemetry-val text-indigo font-mono">JWT HS256</span>
                      <span className="telemetry-desc">Bearer token role enforcement</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Project Highlights & Direct CTAs */}
            <div className="spotlight-info-pane">
              <div className="spotlight-category-chip font-mono">
                {project.badge}
              </div>

              <h3 className="spotlight-title">{project.title}</h3>

              <p className="spotlight-desc">{project.overview}</p>

              {/* Fast Impact Highlights */}
              <div className="spotlight-feature-bullets">
                <div className="feature-bullet-item">
                  <div className="bullet-icon-box">
                    <Zap size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <strong>High-Speed POS Checkout:</strong>
                    <p>Instant barcode scanning, auto sales-tax computation, and atomic inventory reduction.</p>
                  </div>
                </div>

                <div className="feature-bullet-item">
                  <div className="bullet-icon-box">
                    <BarChart3 size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <strong>Interactive Sales Intelligence:</strong>
                    <p>Real-time revenue, net profit margins, and trend analysis powered by Plotly.js.</p>
                  </div>
                </div>

                <div className="feature-bullet-item">
                  <div className="bullet-icon-box">
                    <ShieldCheck size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <strong>Enterprise Security &amp; RBAC:</strong>
                    <p>OAuth2 password bearer tokens with JWT authorization and role-based cashier/manager controls.</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="spotlight-tech-stack">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="spotlight-tech-pill"
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons Hub */}
              <div className="spotlight-actions">
                {project.demo && (
                  <MagneticButton strength={15}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modern btn-primary-glow btn-shimmer"
                      onClick={() => soundFx.playPop()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <ExternalLink size={16} /> Launch Live POS Demo
                    </a>
                  </MagneticButton>
                )}

                {project.github && (
                  <MagneticButton strength={15}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modern btn-outline-glass"
                      onClick={() => soundFx.playPop()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <Github size={16} /> GitHub Source
                    </a>
                  </MagneticButton>
                )}

                <button
                  type="button"
                  className="btn-spotlight-case-study"
                  onClick={() => {
                    soundFx.playPop();
                    onOpenCaseStudy(project);
                  }}
                >
                  Full Case Study <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
