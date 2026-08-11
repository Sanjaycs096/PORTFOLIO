# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Email:** [sanjaykumarmmkce@gmail.com](mailto:sanjaykumarmmkce@gmail.com)

Please include:
- A description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact

## Security Measures

This portfolio implements the following security measures:

### HTTP Security Headers (via Vercel)
- `Strict-Transport-Security` — HSTS with preload
- `X-Frame-Options: SAMEORIGIN` — Clickjacking protection
- `X-Content-Type-Options: nosniff` — MIME sniffing prevention
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — Restricts camera, microphone, geolocation

### Content Security Policy
- CSP meta tag configured to restrict resource loading origins
- External resources limited to trusted CDNs (Google Fonts, Cloudflare, Unsplash)

### Additional Measures
- No server-side processing (static site)
- No user authentication or data storage
- External links use `rel="noopener noreferrer"`
- Contact form is client-side only (no data transmission)

## Supported Versions

| Version | Supported |
|---|---|
| Latest (main branch) | ✅ |

## Scope

This is a static portfolio website. The security scope is limited to:
- Client-side vulnerabilities (XSS, clickjacking)
- CDN and dependency integrity
- Content Security Policy configuration
