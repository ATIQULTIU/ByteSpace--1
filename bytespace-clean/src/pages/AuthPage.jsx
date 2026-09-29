import { useState } from 'react';
import Logo from '../components/Logo.jsx';
import { DEMO_USER, login, register } from '../lib/auth.js';

export default function AuthPage({ mode, onAuth }) {
  const isSignup = mode === 'signup';

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const fillDemo = () => {
    setForm((prev) => ({ ...prev, email: DEMO_USER.email, password: DEMO_USER.password }));
    setError('');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError('');

    const result = isSignup ? await register(form) : await login(form.email, form.password);

    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }
    onAuth(result.user); // App stores the user and redirects to the dashboard
  }

  return (
    <div className="auth">
      <div className="auth-grid" />
      <div className="auth-box">
        <Logo />
        <p className="eyebrow">{isSignup ? 'NEW NODE REGISTRATION' : 'SECURE ACCESS GATE'}</p>
        <h1>{isSignup ? 'Create your node.' : 'Welcome back, operator.'}</h1>

        <form onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <>
              <label className="sr-only" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                required
              />
            </>
          )}

          <label className="sr-only" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            required
          />

          <label className="sr-only" htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={isSignup ? 'Password (min. 8 characters)' : 'Password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={update('password')}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'} →
          </button>
        </form>

        {error && <p className="error" role="alert">{error}</p>}

        {!isSignup && (
          <div className="demo">
            <b>DEMO ACCESS</b>
            <br />
            Email: {DEMO_USER.email}
            <br />
            Password: {DEMO_USER.password}
            <button type="button" className="demo-fill" onClick={fillDemo}>
              Autofill demo credentials
            </button>
          </div>
        )}

        <div className="auth-links">
          {isSignup ? (
            <a href="#login">Already registered? Sign in</a>
          ) : (
            <a href="#signup">No account? Create one</a>
          )}
          <a href="#home">← Return to ByteSpace</a>
        </div>
      </div>
    </div>
  );
}
