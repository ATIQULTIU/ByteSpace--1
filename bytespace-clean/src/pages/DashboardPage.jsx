import Logo from '../components/Logo.jsx';
import DashboardPanel from '../components/DashboardPanel.jsx';

export default function DashboardPage({ user, onLogout }) {
  return (
    <div className="dash-page">
      <header className="dash-bar">
        <Logo />
        <div className="dash-user">
          <span>{user.email}</span>
          <button type="button" className="btn ghost" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </header>

      <section className="section dash-body">
        <p className="eyebrow">ACCESS GRANTED // SESSION ACTIVE</p>
        <h1 className="dash-title">
          Welcome, <span>{user.name}.</span>
        </h1>
        <DashboardPanel />
      </section>
    </div>
  );
}
