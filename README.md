# Amara Matchmaking — Landing Page

Private, Miami-only matchmaking site. Single static page (no build step).

## Files

- `index.html` — page structure
- `styles.css` — styles (deep burgundy/wine + soft cream palette)
- `script.js` — mobile nav, US phone formatting, mailto form submit
- `README.md` — this file

## Open locally

### Option A — open the file

Double-click `index.html`, or from a terminal:

```bash
# macOS
open index.html

# Linux (example)
xdg-open index.html

# Windows
start index.html
```

### Option B — Python HTTP server (recommended)

From this folder:

```bash
cd /path/to/amara-site
python3 -m http.server 8000
```

Then visit: **http://localhost:8000**

Stop the server with `Ctrl+C`.

(Python 2: `python -m SimpleHTTPServer 8000`)

### Option C — npx serve

```bash
npx --yes serve -l 8000
```

## Contact

Applications and inquiries: **hello@amaramatchmaking.com**

The apply form builds a `mailto:` link to that address (name, email, +1 US phone, message).

## Membership pricing (women clients)

Men apply free. Women client tiers:

| Tier       | Price      |
|------------|------------|
| Standard   | $25,000+   |
| Priority   | $45,000+   |
| Exclusive  | $145,000+  |

Final packaging confirmed in consultation.

## Deploy (static hosting)

Upload the contents of this folder (`index.html`, `styles.css`, `script.js`) to any static host, for example:

- Netlify Drop / Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Namecheap Shared Hosting / EasyWP / cPanel File Manager
- AWS S3 + CloudFront

Ensure `index.html` is at the site root so `https://yourdomain.com/` loads it.

## Point Namecheap DNS to your host

1. Log in to [Namecheap](https://www.namecheap.com/) → **Domain List** → **Manage** your domain.
2. Open the **Advanced DNS** tab (or set **Nameservers** if your host asks you to use theirs).

### If your host gives you nameservers (common: Netlify, Vercel, Cloudflare)

1. Under **Nameservers**, choose **Custom DNS**.
2. Enter the nameservers your host provided (e.g. `dns1.p01.nsone.net`, …).
3. Save and wait for propagation (often minutes to a few hours; up to 48h).

### If your host gives you an IP or CNAME target (shared hosting / Pages)

Keep Namecheap **BasicDNS** (or PremiumDNS) and add records under **Advanced DNS**:

| Type  | Host | Value                         | TTL   |
|-------|------|-------------------------------|-------|
| A     | `@`  | *hosting IP address*          | Automatic |
| CNAME | `www`| *your host’s CNAME target*    | Automatic |

Examples:

- **A record** for apex (`@`) → server IP from cPanel / hosting dashboard.
- **CNAME** for `www` → e.g. `your-site.netlify.app` or `cname.vercel-dns.com`.

Remove conflicting old A/CNAME/URL Redirect records for `@` and `www` first.

### SSL

After DNS points correctly, enable HTTPS in your host’s dashboard (Let’s Encrypt / automatic SSL on Netlify, Vercel, Cloudflare Pages, etc.).

## Notes

- Miami only — no other cities referenced on the page.
- No social media links or icons.
- Membership-style pricing cards with “+” pricing.
- No testimonials.
- Design: deep burgundy/wine + soft cream (+ optional soft blush accents); large serif headlines; refined sans body. Premium discreet matchmaking feel—not bright dating-app red. Layout inspired by premium private-matchmaking membership pages (original Amara branding and copy only).

## Checklist (build)

- [x] Single page: `index.html` + `styles.css` + `script.js`
- [x] Miami-only private matchmaking
- [x] Hero: exclusively partner with high-achieving women; men are free
- [x] No other cities
- [x] No social links/icons
- [x] Sections: hero, membership pricing, how it works, who it’s for, discretion, apply form
- [x] Form: name, email, phone (+1 US fixed), message → mailto hello@amaramatchmaking.com
- [x] Burgundy/wine + cream editorial luxury design, responsive
- [x] Contact: hello@amaramatchmaking.com
- [x] Prices: Standard $25,000+ / Priority $45,000+ / Exclusive $145,000+
- [x] No fake testimonials
- [x] README with local open + Namecheap DNS
