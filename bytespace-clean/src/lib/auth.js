/**
 * Frontend-only demo authentication.
 *
 * NOTE: There is no backend. Accounts and the session live in the browser's
 * localStorage, so this is suitable for a demo/assessment only — never for
 * protecting real data. Anything prefixed with VITE_ is bundled into the
 * public JavaScript, so the demo credentials are not secret either.
 */

const USERS_KEY = 'bytespace:users';
export const SESSION_KEY = 'bytespace:session';

export const DEMO_USER = {
  name: 'Demo Operator',
  email: (import.meta.env.VITE_DEMO_EMAIL || 'admin@bytespace.dev').trim().toLowerCase(),
  password: import.meta.env.VITE_DEMO_PASSWORD || 'ByteSpace@2026',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const normalizeEmail = (email = '') => email.trim().toLowerCase();

/* ---------- safe localStorage helpers (can throw in private mode) ---------- */

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* ---------- password hashing ---------- */

const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

function randomSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);

  // SubtleCrypto only exists in secure contexts (https or localhost).
  if (globalThis.crypto?.subtle) {
    return toHex(new Uint8Array(await crypto.subtle.digest('SHA-256', data)));
  }

  // Fallback for plain-http hosts (e.g. a LAN IP). Not cryptographic — demo only.
  let hash = 5381;
  for (const byte of data) hash = ((hash << 5) + hash + byte) >>> 0;
  return `weak-${hash.toString(16)}`;
}

/* ---------- session ---------- */

export function getSession() {
  const session = readJSON(SESSION_KEY, null);
  return session?.email ? session : null;
}

function startSession(user) {
  const session = { name: user.name, email: user.email };
  writeJSON(SESSION_KEY, session);
  return { ok: true, user: session };
}

export function endSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

/* ---------- public API ---------- */

export async function login(email, password) {
  const normalized = normalizeEmail(email);

  if (!EMAIL_PATTERN.test(normalized)) return { ok: false, error: 'Enter a valid email address.' };
  if (!password) return { ok: false, error: 'Enter your password.' };

  if (normalized === DEMO_USER.email && password === DEMO_USER.password) {
    return startSession({ name: DEMO_USER.name, email: normalized });
  }

  const account = readJSON(USERS_KEY, {})[normalized];
  if (account && (await hashPassword(password, account.salt)) === account.hash) {
    return startSession({ name: account.name, email: normalized });
  }

  // Same message for "unknown email" and "wrong password" on purpose.
  return { ok: false, error: 'ACCESS DENIED // Incorrect email or password.' };
}

export async function register({ name, email, password }) {
  const cleanName = (name || '').trim();
  const normalized = normalizeEmail(email);

  if (cleanName.length < 2) return { ok: false, error: 'Enter your full name.' };
  if (!EMAIL_PATTERN.test(normalized)) return { ok: false, error: 'Enter a valid email address.' };
  if ((password || '').length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  }

  const users = readJSON(USERS_KEY, {});
  if (normalized === DEMO_USER.email || users[normalized]) {
    return { ok: false, error: 'That email is already registered. Try signing in.' };
  }

  const salt = randomSalt();
  users[normalized] = { name: cleanName, salt, hash: await hashPassword(password, salt) };
  if (!writeJSON(USERS_KEY, users)) {
    return { ok: false, error: 'Could not save your account (browser storage is unavailable).' };
  }

  return startSession({ name: cleanName, email: normalized });
}
