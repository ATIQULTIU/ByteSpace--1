import { useState } from 'react';
import Logo from './Logo.jsx';

const LINKS = ['Solutions', 'Protocol', 'Command', 'About'];

export default function Nav({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <Logo />
      <button
        type="button"
        className="menu"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        ☰
      </button>

      <nav className={open ? 'open' : ''}>
        {LINKS.map((label) => (
          <a key={label} href={`#${label.toLowerCase()}`} onClick={close}>
            {label}
          </a>
        ))}

        {user ? (
          <>
            <a className="nav-login" href="#dashboard" onClick={close}>
              Dashboard
            </a>
            <button
              type="button"
              className="nav-cta"
              onClick={() => {
                close();
                onLogout();
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <a className="nav-login" href="#login" onClick={close}>
              Sign in
            </a>
            <a className="nav-cta" href="#signup" onClick={close}>
              Initialize ↗
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
