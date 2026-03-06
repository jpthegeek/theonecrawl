const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The One Crawl — Web Monitoring and Content Intelligence</title>
  <meta name="description" content="Website monitoring, content change detection, SEO tracking, uptime monitoring, screenshot capture, and API access.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:        #09090b;
      --card:      #111113;
      --elevated:  #18181b;
      --border:    rgba(255,255,255,0.06);
      --border-hover: rgba(255,255,255,0.1);
      --text:      #e8eaec;
      --muted:     #8c8c8c;
      --accent:    #f97316;
      --accent-mid: #fb923c;
      --accent-light: #fdba74;
      --accent-rgb: 249, 115, 22;
      --orange:    #f97316;
      --glass-bg:  rgba(255,255,255,0.03);
      --glass-border: rgba(255,255,255,0.06);
    }
    html { scroll-behavior: smooth; background: var(--bg); color-scheme: dark; }
    body { font-family: 'Inter', system-ui, sans-serif; color: var(--text); line-height: 1.6; background: var(--bg); -webkit-font-smoothing: antialiased; }

    nav { position: sticky; top: 0; z-index: 50; background: rgba(9,9,11,0.8); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
    .nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 60px; }
    .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); }
    .bird { width: 20px; height: 20px; }
    .logo-name { font-weight: 600; font-size: 15px; }
    .nav-links { display: flex; align-items: center; gap: 24px; }
    .nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; transition: color .15s; }
    .nav-links a:hover { color: var(--text); }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all .2s; cursor: pointer; border: none; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: var(--accent-mid); box-shadow: 0 0 20px rgba(var(--accent-rgb),0.3); }
    .btn-outline { background: var(--glass-bg); color: var(--text); border: 1px solid var(--border); }
    .btn-outline:hover { border-color: var(--border-hover); background: rgba(255,255,255,0.05); }
    .btn-lg { padding: 12px 28px; font-size: 16px; border-radius: 10px; }

    .hero { position: relative; padding: 96px 24px 112px; text-align: center; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; pointer-events: none; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); animation: float 8s ease-in-out infinite; }
    .orb-1 { width: 500px; height: 400px; top: -100px; left: 20%; background: radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%); }
    .orb-2 { width: 380px; height: 320px; top: 30%; right: 10%; background: radial-gradient(circle, rgba(251,146,60,0.09) 0%, transparent 70%); animation-delay: 4s; }
    .grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px); background-size: 64px 64px; }
    .hero h1 { font-size: clamp(36px, 5vw, 60px); font-weight: 800; letter-spacing: -1.5px; line-height: 1.1; max-width: 800px; margin: 0 auto 20px; position: relative; }
    .hero h1 span { background: linear-gradient(135deg, #fed7aa 0%, #fdba74 40%, #f97316 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero p { font-size: 18px; color: var(--muted); max-width: 560px; margin: 0 auto 36px; position: relative; }
    .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }

    section { padding: 80px 24px; }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-label { font-size: 13px; font-weight: 600; color: var(--accent-light); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; }
    .section-title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; letter-spacing: -1px; margin-bottom: 16px; }
    .section-sub { font-size: 17px; color: var(--muted); max-width: 520px; }
    .section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent); }

    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 56px; }
    .feature-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 16px; padding: 28px; backdrop-filter: blur(12px); transition: border-color .2s, box-shadow .2s; }
    .feature-card:hover { border-color: rgba(249,115,22,0.25); box-shadow: 0 0 30px rgba(249,115,22,0.08); }
    .feature-icon { width: 44px; height: 44px; background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 20px; }
    .feature-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
    .feature-card p { font-size: 14px; color: var(--muted); line-height: 1.6; }

    .cta-band { background: linear-gradient(135deg, #9a3412 0%, #f97316 50%, #fb923c 100%); color: #fff; text-align: center; padding: 96px 24px; position: relative; overflow: hidden; }
    .cta-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%); }
    .cta-band h2 { font-size: clamp(28px, 4vw, 40px); font-weight: 800; letter-spacing: -1px; margin-bottom: 16px; position: relative; }
    .cta-band p { font-size: 17px; opacity: .85; max-width: 480px; margin: 0 auto 36px; position: relative; }
    .btn-white { background: #fff; color: var(--accent); font-weight: 600; }
    .btn-white:hover { background: #fff7ed; }

    footer { background: var(--card); border-top: 1px solid var(--border); color: var(--muted); padding: 48px 24px; }
    .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
    .footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
    .footer-logo { display: flex; align-items: center; gap: 10px; color: var(--text); }
    .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
    .footer-links a { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .15s; }
    .footer-links a:hover { color: var(--text); }
    .footer-copy { font-size: 13px; }

    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero { padding: 72px 20px 80px; }
    }
  </style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <a href="/" class="logo">
      <svg class="bird" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill="#f97316">
        <g transform="scale(13.5) translate(-5.5555488798353405, -5.55552503797743)">
          <g transform="translate(0,-952.36218)">
            <path d="m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z" />
          </g>
        </g>
      </svg>
      <span class="logo-name">The One Crawl</span>
    </a>
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="https://app.theonecrawl.app" class="btn btn-primary">Sign In</a>
    </div>
  </div>
</nav>

<div class="hero">
  <div class="hero-bg">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="grid-lines"></div>
  </div>
  <h1>Web monitoring and <span>content intelligence</span></h1>
  <p>Website monitoring, content change detection, SEO tracking, uptime monitoring, and screenshot capture — all with API access.</p>
  <div class="hero-cta">
    <a href="https://app.theonecrawl.app" class="btn btn-primary btn-lg">Get Started &rarr;</a>
    <a href="#features" class="btn btn-outline btn-lg">See features</a>
  </div>
</div>

<div class="section-divider"></div>

<section id="features">
  <div class="section-inner">
    <div class="section-label">Platform features</div>
    <h2 class="section-title">Monitor the web intelligently</h2>
    <p class="section-sub">From uptime checks to content tracking — everything you need to stay informed.</p>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">&#127760;</div>
        <h3>Website Monitoring</h3>
        <p>Monitor any website for availability, performance, and response times. Multi-location checks with configurable intervals and alert thresholds.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128269;</div>
        <h3>Content Change Detection</h3>
        <p>Track changes to any web page content. Visual diffs, text comparison, element-specific monitoring, and instant notifications on changes.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128200;</div>
        <h3>SEO Tracking</h3>
        <p>Monitor search engine rankings, meta tags, structured data, and Core Web Vitals. Track competitors and get optimization suggestions.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#9889;</div>
        <h3>Uptime Monitoring</h3>
        <p>Real-time uptime and downtime tracking with instant alerts via email, SMS, and webhooks. SLA reporting and historical uptime data.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128247;</div>
        <h3>Screenshot Capture</h3>
        <p>Automated screenshot capture on schedule or on change. Full-page screenshots, viewport sizes, and visual regression comparison.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128268;</div>
        <h3>API Access</h3>
        <p>Full REST API for programmatic access. Integrate monitoring data into your workflows, dashboards, and automation pipelines.</p>
      </div>
    </div>
  </div>
</section>

<div class="cta-band">
  <h2>Ready to monitor smarter?</h2>
  <p>Get started with The One Crawl and never miss a change on the web.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;">
    <a href="https://app.theonecrawl.app" class="btn btn-white btn-lg">Get Started &rarr;</a>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-row">
      <div class="footer-logo">
        <svg width="20" height="20" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill="#f97316">
          <g transform="scale(13.5) translate(-5.5555488798353405, -5.55552503797743)">
            <g transform="translate(0,-952.36218)">
              <path d="m 60.7828,964.36215 27.1809,0.8834 -27.1809,25.9958 z m -1.9745,1.4513 0,26.7845 -25.2681,0 c 8.6166,-8.7334 16.8796,-17.8103 25.2681,-26.7845 z m 27.7053,3.628 3.4864,1.1989 -12.5877,7.4768 z m -68.1835,2.9656 5.5226,0 12.8654,14.0705 -5.9854,6.1204 -12.4026,0 c 9e-4,-6.7347 0,-13.4597 0,-20.1909 z m -1.9746,1.2304 0,5.8364 -6.3555,0 z m 3.363,20.9796 38.627,0 -10.7675,29.43465 z m 39.0898,4.54286 0,41.20229 -12.5878,-6.8775 c 4.1972,-11.443 8.3886,-22.879 12.5878,-34.32479 z" />
            </g>
          </g>
        </svg>
        <span style="font-weight:600;font-size:15px;">The One Crawl</span>
      </div>
      <div class="footer-links">
        <a href="#features">Features</a>
        <a href="https://app.theonecrawl.app">Sign In</a>
      </div>
      <div class="footer-copy">&copy; 2026 The One Family. All rights reserved.</div>
    </div>
  </div>
</footer>

</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/app')) {
      return Response.redirect('https://app.theonecrawl.app' + url.pathname.slice(4), 301);
    }

    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    });
  },
};
