<div align="center">

# Sanjaykumar M — Developer Portfolio

**Full-Stack Developer · AI Enthusiast · Cybersecurity Enthusiast**

A modern, responsive portfolio built with pure HTML, CSS, and JavaScript — featuring glassmorphism design, scroll-reveal animations, and a hidden easter egg experience.

[![Live Site](https://img.shields.io/badge/Live-sanjaykumar.dev-1a8cff?style=for-the-badge&logo=vercel&logoColor=white)](https://sanjaykumar.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Sanjaycs096-181717?style=for-the-badge&logo=github)](https://github.com/Sanjaycs096)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sanjaykumar_M-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sanjaykumar-murugan)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Security](#security)
- [SEO & Performance](#seo--performance)
- [Hidden Easter Egg](#hidden-easter-egg)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

This is a professional developer portfolio designed to showcase skills, projects, certifications, internship experience, and achievements. It is purpose-built for:

- Recruiter and hiring manager review
- Software engineering interviews and placements
- Professional networking
- Open-source portfolio demonstration

The portfolio prioritizes visual impact through a cyberpunk-inspired glassmorphism aesthetic, while maintaining accessibility, performance, and SEO best practices.

---

## Key Features

- **Glassmorphism UI** — Dark theme with frosted-glass cards, neon accents, and gradient effects
- **Custom Cursor** — Hardware-accelerated custom cursor with hover states (desktop only)
- **Floating Particles** — Canvas-based particle system as ambient background
- **Scroll Animations** — Intersection Observer-based reveal animations (up, left, right, scale)
- **Typing Effect** — Animated role text cycling in the hero section
- **Project Filtering** — Search and category-based project filtering
- **Certificate Modal** — In-page PDF viewer for certification documents
- **Responsive Design** — Fully responsive from 320px to 1920px+
- **Mobile Navigation** — Slide-in drawer with backdrop blur
- **Parallax Effects** — Mouse-driven parallax on the hero code editor
- **Contact Form** — Client-side validated contact form with toast notifications
- **Scroll Progress** — Top-of-page scroll progress indicator
- **Copy to Clipboard** — One-click email copy with feedback
- **Easter Egg** — Hidden "BMW Protocol" page with full HUD interface (type `bmw` or `Ctrl+Shift+M`)

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Structure** | HTML5, Semantic Markup |
| **Styling** | CSS3 (Custom Properties, Glassmorphism, Flexbox, Grid, Animations) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Typography** | Google Fonts (Inter, Outfit, Fira Code) |
| **Icons** | Font Awesome 6.4 |
| **Deployment** | Vercel (Static) |
| **Domain** | sanjaykumar.dev (Custom) |
| **SEO** | Open Graph, Twitter Cards, JSON-LD, Sitemap, robots.txt |
| **Security** | HSTS, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy |

---

## Architecture

This is a zero-dependency static website — no build tools, no package managers, no frameworks. Everything is written in pure HTML, CSS, and JavaScript.

```
Browser Request
       │
       ▼
┌─────────────┐     ┌──────────────┐
│  Vercel CDN  │────▶│ Static Files │
│  (HTTPS/H2) │     │  HTML/CSS/JS │
└─────────────┘     └──────────────┘
       │
       ├── index.html      → Main portfolio (single page)
       ├── garage.html     → Hidden BMW Protocol page
       ├── style.css       → Main stylesheet (1400+ lines)
       ├── script.js       → Main interactivity (600+ lines)
       ├── css/            → Garage-specific modular CSS
       ├── js/             → Garage-specific modular JS
       └── assets/         → Favicon, resume, certificates
```

### Design Decisions

- **No framework**: Keeps the bundle at zero dependencies, sub-second load times, and demonstrates raw web fundamentals
- **Modular garage code**: The hidden page uses its own CSS/JS modules (`css/`, `js/`) to avoid bloating the main page
- **Fluid typography**: All font sizes use `clamp()` for seamless scaling
- **CSS custom properties**: Single source of truth for colors, spacing, and transitions

---

## Project Structure

```
my-portfolio/
├── index.html                  # Main single-page portfolio
├── garage.html                 # Hidden easter egg (BMW Protocol)
├── style.css                   # Main stylesheet (variables, components, sections, responsive)
├── script.js                   # Main JavaScript (loader, cursor, nav, animations, filtering)
├── css/                        # Garage page modular CSS
│   ├── theme.css               #   Color tokens and base styles
│   ├── animations.css          #   Keyframes and transitions
│   ├── dashboard.css           #   HUD dashboard components
│   ├── garage.css              #   Garage-specific layouts
│   └── responsive.css          #   Garage responsive breakpoints
├── js/                         # Garage page modular JavaScript
│   ├── main.js                 #   Boot sequence and initialization
│   ├── theme.js                #   Theme cycling (Comfort/Sport/Track)
│   ├── cursor.js               #   HUD cursor system
│   ├── particles.js            #   Background particle canvas
│   ├── cockpit.js              #   Live cockpit HUD dials
│   ├── terminal.js             #   Security operations terminal
│   ├── easterEgg.js            #   Easter egg keyboard commands
│   └── garage.js               #   Garage scroll and reveal
├── assets/
│   ├── favicon.svg             #   SVG favicon
│   ├── Sanjaykumar_M_*.pdf     #   Resume
│   └── [certificates].pdf      #   16 certification documents
├── .github/
│   ├── workflows/ci.yml        #   GitHub Actions CI
│   ├── ISSUE_TEMPLATE/         #   Bug report & feature request
│   └── pull_request_template.md
├── vercel.json                 # Vercel deployment config (headers, caching)
├── manifest.webmanifest        # PWA manifest
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # XML sitemap
├── CNAME                       # Custom domain
├── LICENSE                     # MIT License
├── CONTRIBUTING.md             # Contribution guidelines
├── SECURITY.md                 # Security policy
├── CHANGELOG.md                # Version history
└── .gitignore                  # VCS ignore rules
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local HTTP server (optional but recommended)

### Running Locally

**Option 1 — VS Code Live Server (Recommended)**
1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjaycs096/my-portfolio.git
   cd my-portfolio
   ```
2. Open in VS Code
3. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
4. Right-click `index.html` → "Open with Live Server"

**Option 2 — Python HTTP Server**
```bash
git clone https://github.com/Sanjaycs096/my-portfolio.git
cd my-portfolio
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Option 3 — Direct File**
Simply open `index.html` in your browser. Note: some features (certificate modal) may be restricted by CORS when using `file://` protocol.

---

## Deployment

This project is deployed on **Vercel** with a custom domain.

| Configuration | Value |
|---|---|
| **Platform** | Vercel |
| **Domain** | [sanjaykumar.dev](https://sanjaykumar.dev/) |
| **Build** | None (static files served directly) |
| **Headers** | Security headers via `vercel.json` |
| **Caching** | Static assets cached for 1 year (`immutable`) |

To deploy your own instance:
1. Fork this repository
2. Import to [Vercel](https://vercel.com/new)
3. No build configuration needed
4. (Optional) Configure a custom domain in Vercel dashboard

---

## Security

Security headers are configured in [`vercel.json`](vercel.json):

- **HSTS** — Enforces HTTPS with 1-year max-age and preload
- **X-Frame-Options** — Prevents clickjacking (SAMEORIGIN)
- **X-Content-Type-Options** — Prevents MIME sniffing
- **Referrer-Policy** — strict-origin-when-cross-origin
- **Permissions-Policy** — Disables camera, microphone, geolocation

Additional CSP meta tag is configured in `index.html`.

See [SECURITY.md](SECURITY.md) for the full security policy and vulnerability reporting.

---

## SEO & Performance

| Feature | Implementation |
|---|---|
| Meta Description | ✅ Unique per page |
| Open Graph Tags | ✅ Title, description, image, URL |
| Twitter Cards | ✅ Large image summary |
| JSON-LD Schema | ✅ Person, WebSite, Organization |
| Canonical URLs | ✅ Per page |
| Sitemap | ✅ `sitemap.xml` |
| Robots | ✅ `robots.txt` |
| Preconnect | ✅ Google Fonts, Cloudflare CDN |
| Font Preload | ✅ Critical fonts preloaded |
| Lazy Loading | ✅ Project images use `loading="lazy"` |
| Reduced Motion | ✅ `prefers-reduced-motion` respected |
| Semantic HTML | ✅ `<main>`, `<section>`, `<header>`, `<footer>`, `<nav>` |

---

## Hidden Easter Egg

The portfolio contains a hidden "BMW Protocol" page — a full HUD-style interface themed after BMW M Performance engineering.

**How to access:**
- Type `bmw` on your keyboard (on the main portfolio page)
- Or press `Ctrl + Shift + M`

**Features:**
- ECU boot sequence animation
- Live cockpit HUD with animated dials (RPM, speed, turbo)
- Vehicle specification cards for all projects
- Cybersecurity Operations Center with terminal simulation
- BMW Museum showroom with 3D card carousel
- Theme cycling: Comfort → Sport → Track (double-press `M`)
- Additional easter eggs: `TURBO`, `M5`, `NITRO`, `GHOST`, `HACK`

---

## Roadmap

- [ ] Integrate a backend service for the contact form (e.g., Formspree, EmailJS)
- [ ] Add a blog or case study section
- [ ] Implement dark/light theme toggle
- [ ] Add GSAP or Three.js animations for premium interactions
- [ ] Generate OG image and Twitter card image assets

---

## Known Limitations

- **Contact form** — Currently client-side only; does not send emails. Integration with a form service is planned.
- **OG/Twitter images** — `og-image.png` and `twitter-card.png` are referenced but do not exist yet in `assets/`
- **PWA icons** — Manifest references `favicon-16x16.png`, `favicon-32x32.png`, and `apple-touch-icon.png` which are not present (only `favicon.svg` exists)
- **Certificate modal** — PDF embedding via iframe may not work on all mobile browsers

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Sanjaykumar M**
- B.E. Computer Science and Engineering — M. Kumarasamy College of Engineering
- Full-Stack Developer Intern — MoviCLOUD Labs Pvt Ltd (Feb 2026 – Jul 2026)
- Machine Learning Intern — HDLC Technologies Pvt Ltd (Jul 2025)

| Platform | Link |
|---|---|
| Portfolio | [sanjaykumar.dev](https://sanjaykumar.dev/) |
| GitHub | [Sanjaycs096](https://github.com/Sanjaycs096) |
| LinkedIn | [sanjaykumar-murugan](https://linkedin.com/in/sanjaykumar-murugan) |
| Email | sanjaykumarmmkce@gmail.com |
