import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, FileCode, Cpu, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function DevTerminal() {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState(null);

  const snippets = {
    python: {
      name: 'fastapi_auth.py',
      icon: <FileCode size={14} className="text-amber-400" />,
      code: `@app.post("/api/v1/auth/token", response_model=Token)
async def authenticate_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Secure OAuth2 + JWT token verification pipeline"""
    user = await authenticate(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_jwt_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(minutes=60)
    )
    return {"access_token": access_token, "token_type": "bearer"}`,
      output: '[INFO] POST /api/v1/auth/token -> 200 OK (8.2ms)\n[AUTH] JWT Signature validated. Permissions: [admin, fullstack]\n[SYSTEM] Ready for queries.'
    },
    react: {
      name: 'RetailPulse.jsx',
      icon: <Sparkles size={14} className="text-cyan-400" />,
      code: `export default function SalesIntelligence({ metrics }) {
  const chartData = useMemo(() => ({
    x: metrics.dates,
    y: metrics.grossRevenue,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#06b6d4', size: 6 },
    line: { shape: 'spline', width: 3 }
  }), [metrics]);

  return (
    <div className="pos-intelligence-panel">
      <RealtimeProfitGauge value={metrics.marginRatio} />
      <PlotlyChart data={[chartData]} layout={{ dark: true }} />
    </div>
  );
}`,
      output: '[REACT] Re-rendered POS dashboard with zero jank\n[ANALYTICS] Plotly.js chart synchronized with 1,200 SKU transactions.'
    },
    json: {
      name: 'engineer.json',
      icon: <Cpu size={14} className="text-emerald-400" />,
      code: `{
  "engineer": "Usman Ali",
  "status": "Available for New Opportunities",
  "experience": "2+ Years in Backend & Full-Stack",
  "strengths": [
    "High-Performance Python (FastAPI, Flask, Django)",
    "Modern React Single Page Applications",
    "PostgreSQL, SQLAlchemy, Docker CI/CD",
    "Geospatial Data Engineering & Automated Reports"
  ],
  "location": "Lahore / Islamabad, Pakistan (Remote / Onsite)"
}`,
      output: '[DATA] JSON payload parsed. Schema status: 100% Validated.\n[READY] System operational.'
    }
  };

  const handleCopy = () => {
    soundFx.playPop();
    navigator.clipboard.writeText(snippets[activeTab].code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRun = () => {
    soundFx.playPop();
    setIsRunning(true);
    setConsoleOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(snippets[activeTab].output);
    }, 450);
  };

  return (
    <div className="dev-terminal-card">
      {/* Terminal Window Header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        {/* Tab switchers */}
        <div className="terminal-tabs">
          {Object.entries(snippets).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={`terminal-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => {
                soundFx.playPop();
                setActiveTab(key);
                setConsoleOutput(null);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Action icons */}
        <div className="terminal-actions">
          <button
            type="button"
            className="terminal-btn-icon"
            onClick={handleRun}
            title="Simulate execution"
            disabled={isRunning}
          >
            <Play size={13} className={isRunning ? 'animate-spin text-amber-400' : 'text-emerald-400'} />
            <span className="d-none d-sm-inline">Run</span>
          </button>
          <button
            type="button"
            className="terminal-btn-icon"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="terminal-body">
        <pre className="terminal-code font-mono">
          <code>{snippets[activeTab].code}</code>
        </pre>

        {consoleOutput && (
          <div className="terminal-console-output font-mono">
            <div className="console-indicator">
              <span className="status-dot green" /> STDOUT / EXECUTION RESULT:
            </div>
            <pre>{consoleOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
