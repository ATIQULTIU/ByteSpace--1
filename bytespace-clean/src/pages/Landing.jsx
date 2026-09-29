import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DashboardPanel from '../components/DashboardPanel.jsx';

const SOLUTIONS = [
  ['01', 'WEB SYSTEMS', 'Interfaces that feel alive, from landing pages to complex platforms.'],
  ['02', 'AI INTEGRATION', 'Practical intelligence pipelines built around real product workflows.'],
  ['03', 'DATA COMMAND', 'Dashboards and analytics that turn raw signals into decisions.'],
  ['04', 'SECURE SCALE', 'Fast, resilient foundations ready for growth and deployment.'],
];

const PROTOCOL = [
  ['01', 'SIGNAL', 'Find the problem worth solving.'],
  ['02', 'ARCHITECT', 'Map the system, data and experience.'],
  ['03', 'BUILD', 'Ship modular, tested product surfaces.'],
  ['04', 'LAUNCH', 'Measure, optimize and scale continuously.'],
];

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div>
          <p className="eyebrow">SYSTEM ONLINE // NEXT-GEN DIGITAL SYSTEMS</p>
          <h1>
            BUILD BEYOND
            <br />
            <span>LIMITS.</span>
          </h1>
          <p className="lead">
            ByteSpace turns ambitious ideas into high-performance digital products engineered for
            speed, scale and impact.
          </p>
          <div className="actions">
            <a className="btn primary" href="#signup">
              Initialize Project <b>→</b>
            </a>
            <a className="btn ghost" href="#command">
              View Command Center
            </a>
          </div>
          <div className="terminal">
            <div>
              <i /> <i /> <i />
            </div>
            <p><b>&gt;</b> booting bytespace_core...</p>
            <p><b>&gt;</b> loading creative_modules <span>[OK]</span></p>
            <p><b>&gt;</b> system ready_</p>
          </div>
        </div>

        <div className="hero-art">
          <div className="orb">
            <div className="orb-ring r1" />
            <div className="orb-ring r2" />
            <div className="orb-core">B<span>S</span></div>
          </div>
          <div className="float-card fc1"><small>LIVE SIGNAL</small><strong>+42.8%</strong><em>momentum</em></div>
          <div className="float-card fc2"><small>UPTIME</small><strong>99.99%</strong><em>stable</em></div>
          <div className="scan">// CYBERSPACE NODE 07 //</div>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="section-head">
        <p className="eyebrow">CAPABILITY MATRIX</p>
        <h2>Systems built to <span>move.</span></h2>
      </div>
      <div className="cards">
        {SOLUTIONS.map(([num, title, text]) => (
          <article className="card" key={num}>
            <b className="num">{num}</b>
            <span className="icon">◈</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#signup">Deploy module →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Protocol() {
  return (
    <section className="section protocol" id="protocol">
      <div className="section-head">
        <p className="eyebrow">OPERATING PROTOCOL</p>
        <h2>From signal to <span>launch.</span></h2>
      </div>
      <div className="steps">
        {PROTOCOL.map(([num, title, text], i) => (
          <div className="step" key={num}>
            <span>{num}</span>
            <div className="step-line" />
            <h3>{title}</h3>
            <p>{text}</p>
            <small>0{i + 1} // READY</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function Command() {
  return (
    <section className="section command" id="command">
      <div className="section-head">
        <p className="eyebrow">COMMAND CENTER</p>
        <h2>Observe the <span>signal.</span></h2>
      </div>
      <DashboardPanel />
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div>
        <p className="eyebrow">IDENTITY // BYTESPACE</p>
        <h2>Digital products with a <span>pulse.</span></h2>
      </div>
      <p>
        We combine product thinking, engineering discipline and visual experimentation to create
        interfaces that stand out without sacrificing usability.
      </p>
    </section>
  );
}

export default function Landing({ user, onLogout }) {
  return (
    <>
      <Nav user={user} onLogout={onLogout} />
      <Hero />
      <Solutions />
      <Protocol />
      <Command />
      <About />
      <Footer />
    </>
  );
}
