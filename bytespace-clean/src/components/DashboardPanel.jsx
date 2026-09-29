import Logo from './Logo.jsx';

const SIDEBAR = ['Overview', 'Projects', 'Analytics', 'Signals', 'Security'];
const BARS = [28, 44, 36, 58, 48, 72, 63, 82, 69, 91, 78, 98];

export default function DashboardPanel() {
  return (
    <div className="dashboard">
      <aside>
        <Logo />
        <p>CORE / 07</p>
        {SIDEBAR.map((label, i) => (
          <div className={i === 0 ? 'side active' : 'side'} key={label}>
            {label}
            <span>{i === 0 ? 'LIVE' : '›'}</span>
          </div>
        ))}
      </aside>

      <main>
        <div className="dash-top">
          <div><small>PRODUCT MOMENTUM</small><strong>+42.8%</strong></div>
          <div><small>ACTIVE USERS</small><strong>24.8K</strong></div>
          <div><small>LATENCY</small><strong>84ms</strong></div>
        </div>

        <div className="chart">
          <div className="chart-label">NETWORK ACTIVITY / 30 DAYS</div>
          <div className="bars">
            {BARS.map((h, i) => (
              <i style={{ height: `${h}%` }} key={i} />
            ))}
          </div>
        </div>

        <div className="dash-bottom">
          <div><small>CONVERSION</small><strong>8.42%</strong></div>
          <div><small>SYSTEM HEALTH</small><strong className="green">OPTIMAL</strong></div>
          <div><small>DEPLOYMENTS</small><strong>128</strong></div>
        </div>
      </main>
    </div>
  );
}
