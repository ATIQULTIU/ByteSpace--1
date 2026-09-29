# ByteSpace // Cyberpunk Edition

A clean, runnable React + Vite cyberpunk landing page with a working demo sign-in / sign-up flow, created for the Doin Tech Limited Jr. Software Engineer (Frontend) assessment.

## Developer
- **MD. Atiqul Islam (Atik)**
- **Email:** atik.cmttiu1001@gmail.com
- **GitHub:** https://github.com/ATIQULTIU

## Requirements
**Node.js 20.19+ or 22.12+** (required by Vite 7). Check with `node -v`.
An `.nvmrc` is included, so `nvm use` picks a compatible version.

## Run locally
```bash
npm install
npm run dev
```
Open the URL shown by Vite (normally http://localhost:5173).

Production test:
```bash
npm run build
npm run preview
```

## Demo login
- Email: `admin@bytespace.dev`
- Password: `ByteSpace@2026`

You can also create your own account on the sign-up page.

> **This is frontend-only demo authentication.** There is no backend: accounts (salted SHA-256 password hashes) and the session are kept in the browser's `localStorage`. Variables starting with `VITE_` are bundled into the public JavaScript, so the demo credentials are **not** secret. Do not use this approach to protect real data.

To change the demo credentials, copy `.env.example` to `.env` and edit the values.

## Routes (hash-based)
| URL          | Page                                              |
| ------------ | ------------------------------------------------- |
| `/`          | Landing page (`#solutions`, `#protocol`, `#command`, `#about` scroll to sections) |
| `/#login`    | Sign in                                           |
| `/#signup`   | Create account                                    |
| `/#dashboard`| Command center — **requires sign-in** (redirects to `#login` otherwise) |

## Project structure
```
src/
├── main.jsx                 # entry point
├── App.jsx                  # hash routing + auth route guards
├── hooks/useHashRoute.js    # re-renders on URL hash changes
├── lib/auth.js              # demo login / signup / session (localStorage)
├── components/              # Logo, Nav, Footer, DashboardPanel
├── pages/                   # Landing, AuthPage, DashboardPage
└── styles.css
```

## Stack
React 19, Vite 7, modern CSS, inline SVG/CSS visuals.

## Deploy (Vercel)
Import the GitHub repo in Vercel — the framework preset is detected automatically. `vercel.json` rewrites all paths to `index.html`.

## Git workflow
Use a feature branch for the assessment:
```bash
git checkout -b feature/bytespace-frontend
git add .
git commit -m "feat: build cyberpunk ByteSpace frontend"
git push -u origin feature/bytespace-frontend
```

## Notes
The supplied Figma reference was not accessible from the build environment, so this version is a creative cyberpunk implementation rather than a verified pixel-perfect reproduction. Compare against the Figma before final submission if exact visual matching is required.
