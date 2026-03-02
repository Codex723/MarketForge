<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>MarketForge — Documentation</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #09090b;
    --surface-1: #111113;
    --surface-2: #18181b;
    --surface-3: #222226;
    --surface-4: #2a2a2f;
    --gold-light: #e8d5b7;
    --gold: #c9a96e;
    --gold-dark: #a07840;
    --gold-dim: rgba(201,169,110,0.10);
    --gold-border: rgba(201,169,110,0.22);
    --text-primary: #f5f5f4;
    --text-secondary: #a8a29e;
    --text-muted: #57534e;
    --white-6: rgba(255,255,255,0.06);
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body {
    background:var(--bg);
    color:var(--text-primary);
    font-family:'Inter',sans-serif;
    font-size:15px;
    line-height:1.7;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--surface-4); border-radius:3px; }
  ::-webkit-scrollbar-thumb:hover { background:var(--gold-dark); }

  .wrapper { max-width:900px; margin:0 auto; padding:0 32px 100px; }

  /* HERO */
  .hero { position:relative; padding:80px 0 56px; text-align:center; overflow:hidden; }
  .hero::before {
    content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%);
    width:700px; height:320px;
    background:radial-gradient(ellipse, rgba(201,169,110,0.09) 0%, transparent 70%);
    pointer-events:none;
  }
  .hero-eyebrow {
    font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500;
    letter-spacing:0.25em; text-transform:uppercase; color:var(--gold);
    margin-bottom:20px; opacity:0; animation:fadeUp 0.6s ease forwards 0.1s;
  }
  .hero-title {
    font-family:'Playfair Display',serif; font-size:clamp(40px,6vw,68px);
    font-weight:600; line-height:1.1; margin-bottom:16px;
    background:linear-gradient(135deg,#e8d5b7 0%,#c9a96e 50%,#a07840 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    opacity:0; animation:fadeUp 0.6s ease forwards 0.2s;
  }
  .hero-subtitle {
    font-size:15px; color:var(--text-secondary); max-width:540px;
    margin:0 auto 32px; opacity:0; animation:fadeUp 0.6s ease forwards 0.3s;
  }
  .hero-badges {
    display:flex; flex-wrap:wrap; gap:8px; justify-content:center;
    opacity:0; animation:fadeUp 0.6s ease forwards 0.4s;
  }
  .badge {
    font-family:'JetBrains Mono',monospace; font-size:11px; padding:5px 13px;
    border-radius:999px; border:1px solid var(--gold-border); color:var(--gold);
    background:var(--gold-dim); letter-spacing:0.05em;
  }

  .divider {
    width:100%; height:1px;
    background:linear-gradient(90deg,transparent,var(--gold-border),transparent);
    margin:48px 0;
  }

  /* TOC */
  .toc { background:var(--surface-1); border:1px solid var(--white-6); border-radius:20px; padding:28px 32px; margin-bottom:48px; }
  .toc-title { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px; }
  .toc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:6px; }
  .toc-link {
    display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:10px;
    color:var(--text-secondary); text-decoration:none; font-size:13px; font-weight:500;
    transition:all 0.2s; border:1px solid transparent;
  }
  .toc-link:hover { background:var(--gold-dim); border-color:var(--gold-border); color:var(--gold-light); }
  .toc-num { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--gold-dark); min-width:20px; }

  /* SECTIONS */
  .section { margin-bottom:56px; opacity:0; animation:fadeUp 0.6s ease forwards 0.15s; }
  .section-header { display:flex; align-items:center; gap:14px; margin-bottom:24px; }
  .section-num {
    font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--gold);
    border:1px solid var(--gold-border); border-radius:6px; padding:3px 8px;
    background:var(--gold-dim); flex-shrink:0;
  }
  .section-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:600; color:var(--text-primary); }
  .section-line { flex:1; height:1px; background:linear-gradient(90deg,var(--gold-border),transparent); }

  /* CARDS */
  .card {
    background:var(--surface-1); border:1px solid var(--white-6); border-radius:16px;
    padding:24px; margin-bottom:16px; transition:border-color 0.2s;
  }
  .card:hover { border-color:var(--gold-border); }
  .card-title {
    font-size:12px; font-weight:600; color:var(--gold); letter-spacing:0.05em;
    text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:8px;
  }

  /* STEPS */
  .step-card {
    background:var(--surface-1); border:1px solid var(--white-6); border-radius:20px;
    padding:28px; margin-bottom:16px; position:relative; overflow:hidden; transition:all 0.2s;
  }
  .step-card:hover { border-color:var(--gold-border); transform:translateY(-1px); }
  .step-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,var(--gold-dark),var(--gold),transparent);
    opacity:0; transition:opacity 0.2s;
  }
  .step-card:hover::before { opacity:1; }
  .step-header { display:flex; align-items:flex-start; gap:16px; margin-bottom:18px; }
  .step-num {
    width:40px; height:40px; border-radius:12px;
    background:linear-gradient(135deg,var(--gold-dark),var(--gold));
    display:flex; align-items:center; justify-content:center;
    font-family:'Playfair Display',serif; font-size:18px; color:#09090b;
    font-weight:700; flex-shrink:0; box-shadow:0 4px 16px rgba(201,169,110,0.2);
  }
  .step-title { font-family:'Playfair Display',serif; font-size:20px; font-weight:600; color:var(--text-primary); margin-bottom:4px; }
  .step-desc { font-size:13px; color:var(--text-muted); }

  .sub-steps { display:flex; flex-direction:column; gap:8px; }
  .sub-step {
    display:flex; align-items:flex-start; gap:12px; padding:11px 16px;
    background:var(--surface-2); border-radius:10px; border:1px solid var(--white-6);
    font-size:13px; color:var(--text-secondary); line-height:1.5;
  }
  .sub-step-num { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--gold); min-width:18px; margin-top:1px; }

  /* CODE */
  pre, code { font-family:'JetBrains Mono',monospace; }
  .code-block { background:#0c0c0e; border:1px solid var(--surface-4); border-radius:12px; overflow:hidden; margin:12px 0; }
  .code-bar { display:flex; align-items:center; justify-content:space-between; padding:8px 16px; background:var(--surface-2); border-bottom:1px solid var(--surface-4); }
  .code-lang { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--gold); letter-spacing:0.1em; text-transform:uppercase; }
  .code-dots { display:flex; gap:5px; }
  .code-dot { width:8px; height:8px; border-radius:50%; }
  pre { padding:20px; font-size:13px; line-height:1.8; color:#c9d1d9; overflow-x:auto; tab-size:2; }
  .c-comment { color:#6e7681; }
  .c-string { color:#a5d6ff; }
  .c-keyword { color:var(--gold); }
  .c-value { color:#79c0ff; }

  /* TABLES */
  .table-wrap { border:1px solid var(--white-6); border-radius:14px; overflow:hidden; margin:12px 0; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  thead { background:var(--surface-2); }
  thead th {
    padding:12px 16px; text-align:left; font-family:'JetBrains Mono',monospace;
    font-size:10px; letter-spacing:0.15em; text-transform:uppercase;
    color:var(--text-muted); font-weight:500; border-bottom:1px solid var(--white-6);
  }
  tbody tr { border-bottom:1px solid var(--white-6); transition:background 0.15s; }
  tbody tr:last-child { border-bottom:none; }
  tbody tr:hover { background:var(--surface-2); }
  tbody td { padding:11px 16px; color:var(--text-secondary); vertical-align:top; }
  tbody td:first-child { color:var(--gold-light); font-weight:500; }
  .tag {
    display:inline-block; font-family:'JetBrains Mono',monospace; font-size:11px;
    padding:2px 8px; border-radius:5px; margin:2px 2px 2px 0;
    border:1px solid var(--surface-4); color:var(--text-secondary); background:var(--surface-3);
  }

  /* FEATURES */
  .feature-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:12px; margin:16px 0; }
  .feature-item {
    display:flex; align-items:flex-start; gap:12px; padding:16px;
    background:var(--surface-1); border:1px solid var(--white-6); border-radius:12px; transition:all 0.2s;
  }
  .feature-item:hover { border-color:var(--gold-border); background:var(--surface-2); }
  .feature-icon {
    width:34px; height:34px; border-radius:8px; background:var(--gold-dim);
    border:1px solid var(--gold-border); display:flex; align-items:center; justify-content:center;
    flex-shrink:0; font-size:16px;
  }
  .feature-text strong { display:block; font-size:13px; font-weight:600; color:var(--text-primary); margin-bottom:2px; }
  .feature-text span { font-size:12px; color:var(--text-muted); }

  /* HIGHLIGHT */
  .highlight-card {
    background:linear-gradient(135deg,rgba(201,169,110,0.06) 0%,rgba(160,120,64,0.03) 100%);
    border:1px solid var(--gold-border); border-radius:20px; padding:28px; margin:16px 0;
    position:relative; overflow:hidden;
  }
  .highlight-card::after {
    content:'🇳🇬'; position:absolute; right:24px; top:50%; transform:translateY(-50%);
    font-size:48px; opacity:0.12;
  }
  .highlight-card h3 { font-family:'Playfair Display',serif; font-size:19px; color:var(--gold-light); margin-bottom:10px; }
  .highlight-card p { font-size:13px; color:var(--text-secondary); margin-bottom:8px; line-height:1.6; }
  .highlight-card ul { list-style:none; display:flex; flex-wrap:wrap; gap:6px; margin-top:14px; }
  .highlight-card li {
    font-family:'JetBrains Mono',monospace; font-size:11px; padding:4px 10px;
    background:var(--gold-dim); border:1px solid var(--gold-border); border-radius:6px; color:var(--gold);
  }

  /* DEPLOY */
  .deploy-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:16px 0; }
  .deploy-card {
    background:var(--surface-1); border:1px solid var(--white-6); border-radius:16px;
    padding:22px; transition:all 0.2s;
  }
  .deploy-card:hover { border-color:var(--gold-border); transform:translateY(-2px); }
  .deploy-card .platform { font-family:'Playfair Display',serif; font-size:19px; color:var(--gold-light); margin-bottom:3px; }
  .deploy-card .role { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--gold); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:14px; }
  .deploy-card ol { list-style:none; counter-reset:dep; display:flex; flex-direction:column; gap:8px; }
  .deploy-card ol li { counter-increment:dep; display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--text-secondary); }
  .deploy-card ol li::before { content:counter(dep); font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--gold-dark); min-width:16px; margin-top:2px; }

  /* FOOTER */
  .footer { text-align:center; padding:48px 0 0; border-top:1px solid var(--white-6); }
  .footer-logo {
    font-family:'Playfair Display',serif; font-size:30px;
    background:linear-gradient(135deg,#e8d5b7 0%,#c9a96e 50%,#a07840 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    margin-bottom:8px;
  }
  .footer-by { font-size:13px; color:var(--text-muted); margin-bottom:20px; }
  .footer-by span { color:var(--gold); font-weight:600; }
  .footer-stack { display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  @media (max-width:640px) {
    .wrapper { padding:0 16px 60px; }
    .hero { padding:48px 0 36px; }
    .deploy-grid { grid-template-columns:1fr; }
    .toc-grid { grid-template-columns:1fr 1fr; }
  }
</style>
</head>
<body>
<div class="wrapper">

  <!-- HERO -->
  <div class="hero">
    <p class="hero-eyebrow">Full-Stack Multi-Vendor Platform</p>
    <h1 class="hero-title">MarketForge</h1>
    <p class="hero-subtitle">A production-grade Nigerian e-commerce marketplace built for vendors, customers, and administrators — Naira payments, smart delivery routing, and role-based access.</p>
    <div class="hero-badges">
      <span class="badge">Next.js 14</span>
      <span class="badge">Node.js + Express</span>
      <span class="badge">MongoDB</span>
      <span class="badge">Paystack</span>
      <span class="badge">Cloudinary</span>
      <span class="badge">JWT Auth</span>
      <span class="badge">₦ Naira</span>
      <span class="badge">36 Nigerian Cities</span>
    </div>
  </div>

  <div class="divider"></div>

  <!-- TOC -->
  <div class="toc">
    <p class="toc-title">// Table of Contents</p>
    <div class="toc-grid">
      <a href="#structure" class="toc-link"><span class="toc-num">01</span> Project Structure</a>
      <a href="#setup" class="toc-link"><span class="toc-num">02</span> Setup Guide</a>
      <a href="#admin" class="toc-link"><span class="toc-num">03</span> Admin Account</a>
      <a href="#pages" class="toc-link"><span class="toc-num">04</span> Pages & Routes</a>
      <a href="#features" class="toc-link"><span class="toc-num">05</span> Features</a>
      <a href="#delivery" class="toc-link"><span class="toc-num">06</span> Delivery System</a>
      <a href="#currency" class="toc-link"><span class="toc-num">07</span> Currency</a>
      <a href="#deploy" class="toc-link"><span class="toc-num">08</span> Deployment</a>
    </div>
  </div>

  <!-- 01 STRUCTURE -->
  <div class="section" id="structure">
    <div class="section-header">
      <span class="section-num">01</span>
      <h2 class="section-title">Project Structure</h2>
      <div class="section-line"></div>
    </div>
    <div class="code-block">
      <div class="code-bar"><span class="code-lang">Directory Tree</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
      <pre>markeforge_work/
├── <span class="c-keyword">server/</span>                          <span class="c-comment">→ Node.js + Express REST API  :5000</span>
│   ├── routes/                      <span class="c-comment">→ auth, orders, products, users, vendors</span>
│   ├── models/                      <span class="c-comment">→ User, Product, Order, Review</span>
│   ├── middleware/                  <span class="c-comment">→ JWT auth, role guards</span>
│   └── server.js
│
└── <span class="c-keyword">client/</span>                          <span class="c-comment">→ Next.js 14 frontend  :3000</span>
    ├── app/
    │   ├── <span class="c-string">(admin)/</span>                 <span class="c-comment">→ dashboard, users, vendors</span>
    │   ├── <span class="c-string">(customer)/</span>              <span class="c-comment">→ shop, product/[id], cart, orders, checkout/success</span>
    │   ├── <span class="c-string">(vendor)/</span>                <span class="c-comment">→ dashboard, products, products/new, products/edit/[id], orders</span>
    │   └── <span class="c-string">(auth)/</span>                  <span class="c-comment">→ login, register</span>
    ├── components/
    │   ├── customer/                <span class="c-comment">→ Navbar, DeliveryWizard</span>
    │   ├── vendor/                  <span class="c-comment">→ VendorLayout, ProductForm</span>
    │   └── admin/                   <span class="c-comment">→ AdminLayout</span>
    ├── context/                     <span class="c-comment">→ AuthContext, CartContext</span>
    └── lib/                         <span class="c-comment">→ api.js (axios instance)</span></pre>
    </div>
  </div>

  <!-- 02 SETUP -->
  <div class="section" id="setup">
    <div class="section-header">
      <span class="section-num">02</span>
      <h2 class="section-title">Setup Guide</h2>
      <div class="section-line"></div>
    </div>

    <div class="step-card">
      <div class="step-header">
        <div class="step-num">1</div>
        <div>
          <div class="step-title">Get your credentials</div>
          <div class="step-desc">Three external services to configure before running</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
        <div class="card" style="margin:0">
          <div class="card-title">MongoDB Atlas</div>
          <div class="sub-steps">
            <div class="sub-step"><span class="sub-step-num">1.</span>cloud.mongodb.com → create free cluster</div>
            <div class="sub-step"><span class="sub-step-num">2.</span>Connect → Drivers → copy connection string</div>
            <div class="sub-step"><span class="sub-step-num">3.</span>Replace &lt;password&gt;, add /markeforge before ?</div>
          </div>
        </div>
        <div class="card" style="margin:0">
          <div class="card-title">Cloudinary</div>
          <div class="sub-steps">
            <div class="sub-step"><span class="sub-step-num">1.</span>cloudinary.com → Dashboard</div>
            <div class="sub-step"><span class="sub-step-num">2.</span>Copy: Cloud Name, API Key, API Secret</div>
            <div class="sub-step"><span class="sub-step-num">3.</span>Used for product image uploads (5 per listing)</div>
          </div>
        </div>
        <div class="card" style="margin:0">
          <div class="card-title">Paystack</div>
          <div class="sub-steps">
            <div class="sub-step"><span class="sub-step-num">1.</span>dashboard.paystack.com → Settings → API Keys</div>
            <div class="sub-step"><span class="sub-step-num">2.</span>Copy sk_test_... and pk_test_...</div>
            <div class="sub-step"><span class="sub-step-num">3.</span>Nigerian Naira (₦) payments, test & live modes</div>
          </div>
        </div>
      </div>
    </div>

    <div class="step-card">
      <div class="step-header">
        <div class="step-num">2</div>
        <div>
          <div class="step-title">Backend setup</div>
          <div class="step-desc">server/ — Express API on port 5000</div>
        </div>
      </div>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">bash</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>cd server
npm install</pre>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin:10px 0 8px">Create <code style="background:var(--surface-3);padding:2px 6px;border-radius:4px;font-size:12px">.env</code> and fill in:</p>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">.env</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>PORT=5000
MONGO_URI=<span class="c-string">mongodb+srv://user:pass@cluster.mongodb.net/markeforge</span>
JWT_SECRET=<span class="c-string">your_long_random_secret</span>
JWT_REFRESH_SECRET=<span class="c-string">your_long_random_refresh_secret</span>
CLIENT_URL=<span class="c-string">http://localhost:3000</span>
NODE_ENV=<span class="c-string">development</span>

CLOUDINARY_CLOUD_NAME=<span class="c-string">your_cloud_name</span>
CLOUDINARY_API_KEY=<span class="c-string">your_api_key</span>
CLOUDINARY_API_SECRET=<span class="c-string">your_api_secret</span>

PAYSTACK_SECRET_KEY=<span class="c-string">sk_test_...</span>
PAYSTACK_PUBLIC_KEY=<span class="c-string">pk_test_...</span></pre>
      </div>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">bash</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>npm run dev    <span class="c-comment"># → http://localhost:5000</span></pre>
      </div>
    </div>

    <div class="step-card">
      <div class="step-header">
        <div class="step-num">3</div>
        <div>
          <div class="step-title">Frontend setup</div>
          <div class="step-desc">client/ — Next.js 14 on port 3000</div>
        </div>
      </div>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">bash</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>cd client
npm install</pre>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin:10px 0 8px">Create <code style="background:var(--surface-3);padding:2px 6px;border-radius:4px;font-size:12px">.env.local</code> with just one line:</p>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">.env.local</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>NEXT_PUBLIC_API_URL=<span class="c-string">http://localhost:5000/api</span></pre>
      </div>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">bash</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>npm run dev    <span class="c-comment"># → http://localhost:3000</span></pre>
      </div>
    </div>
  </div>

  <!-- 03 ADMIN -->
  <div class="section" id="admin">
    <div class="section-header">
      <span class="section-num">03</span>
      <h2 class="section-title">Admin Account</h2>
      <div class="section-line"></div>
    </div>
    <div class="card">
      <div class="card-title">No public admin registration — by design</div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Admin accounts must be created directly in the database. Two methods available:</p>

      <p style="font-size:13px;font-weight:600;color:var(--gold-light);margin-bottom:8px">Method A — Node script (recommended)</p>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Create <code style="background:var(--surface-3);padding:2px 6px;border-radius:4px">server/create-admin.js</code>:</p>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">JavaScript (ESM)</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre><span class="c-keyword">import</span> mongoose <span class="c-keyword">from</span> <span class="c-string">"mongoose"</span>;
<span class="c-keyword">import</span> bcrypt <span class="c-keyword">from</span> <span class="c-string">"bcryptjs"</span>;

<span class="c-keyword">await</span> mongoose.connect(<span class="c-string">"your-mongo-uri"</span>);
<span class="c-keyword">const</span> hash = <span class="c-keyword">await</span> bcrypt.hash(<span class="c-string">"Admin1234"</span>, 10);
<span class="c-keyword">await</span> mongoose.connection.db.collection(<span class="c-string">"users"</span>).insertOne({
  name: <span class="c-string">"Admin"</span>, email: <span class="c-string">"admin@markeforge.com"</span>,
  password: hash, role: <span class="c-string">"admin"</span>, isApproved: <span class="c-value">true</span>, createdAt: <span class="c-keyword">new</span> Date()
});
console.log(<span class="c-string">"Admin created!"</span>); process.exit();</pre>
      </div>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">bash</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre>node create-admin.js    <span class="c-comment"># run from inside server/</span></pre>
      </div>

      <p style="font-size:13px;font-weight:600;color:var(--gold-light);margin:16px 0 10px">Method B — MongoDB Atlas UI</p>
      <div class="sub-steps">
        <div class="sub-step"><span class="sub-step-num">1.</span>Register at /register as a normal customer</div>
        <div class="sub-step"><span class="sub-step-num">2.</span>MongoDB Atlas → Browse Collections → users collection</div>
        <div class="sub-step"><span class="sub-step-num">3.</span>Find your user → edit → change "role": "customer" → "role": "admin"</div>
        <div class="sub-step"><span class="sub-step-num">4.</span>Log out and log back in → redirects to /admin/dashboard automatically</div>
      </div>
    </div>
  </div>

  <!-- 04 PAGES -->
  <div class="section" id="pages">
    <div class="section-header">
      <span class="section-num">04</span>
      <h2 class="section-title">Pages &amp; Routes</h2>
      <div class="section-line"></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Role</th><th>Pages</th><th>Access</th></tr></thead>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              <span class="tag">/shop</span><span class="tag">/product/[id]</span><span class="tag">/cart</span>
              <span class="tag">/orders</span><span class="tag">/checkout/success</span>
            </td>
            <td style="color:var(--text-muted)">JWT required</td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td>
              <span class="tag">/vendor/dashboard</span><span class="tag">/vendor/products</span>
              <span class="tag">/vendor/products/new</span><span class="tag">/vendor/products/edit/[id]</span>
              <span class="tag">/vendor/orders</span>
            </td>
            <td style="color:var(--text-muted)">Vendor + approved</td>
          </tr>
          <tr>
            <td>Admin</td>
            <td>
              <span class="tag">/admin/dashboard</span><span class="tag">/admin/users</span>
              <span class="tag">/admin/vendors</span>
            </td>
            <td style="color:var(--text-muted)">Admin role only</td>
          </tr>
          <tr>
            <td>Public</td>
            <td><span class="tag">/login</span><span class="tag">/register</span></td>
            <td style="color:var(--text-muted)">Open</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 05 FEATURES -->
  <div class="section" id="features">
    <div class="section-header">
      <span class="section-num">05</span>
      <h2 class="section-title">Features</h2>
      <div class="section-line"></div>
    </div>
    <div class="feature-grid">
      <div class="feature-item"><div class="feature-icon">🔐</div><div class="feature-text"><strong>JWT Auth + Auto-Refresh</strong><span>Access + refresh tokens with automatic silent renewal</span></div></div>
      <div class="feature-item"><div class="feature-icon">👥</div><div class="feature-text"><strong>3-Role System</strong><span>Customer, Vendor, Admin with protected route guards</span></div></div>
      <div class="feature-item"><div class="feature-icon">✅</div><div class="feature-text"><strong>Vendor Approval Flow</strong><span>Vendors need admin approval before going live</span></div></div>
      <div class="feature-item"><div class="feature-icon">🖼️</div><div class="feature-text"><strong>Cloudinary Image Upload</strong><span>Up to 5 product images per listing</span></div></div>
      <div class="feature-item"><div class="feature-icon">🔍</div><div class="feature-text"><strong>Search, Filter & Sort</strong><span>Full-text search with category, price, rating filters</span></div></div>
      <div class="feature-item"><div class="feature-icon">🛒</div><div class="feature-text"><strong>Persistent Cart</strong><span>localStorage cart that survives page refreshes</span></div></div>
      <div class="feature-item"><div class="feature-icon">💳</div><div class="feature-text"><strong>Paystack Checkout</strong><span>₦ Naira payments with webhook order verification</span></div></div>
      <div class="feature-item"><div class="feature-icon">📦</div><div class="feature-text"><strong>Order Management</strong><span>Vendors manage their orders; admins oversee all</span></div></div>
      <div class="feature-item"><div class="feature-icon">⭐</div><div class="feature-text"><strong>Verified Reviews</strong><span>Only confirmed buyers can leave star ratings</span></div></div>
      <div class="feature-item"><div class="feature-icon">📊</div><div class="feature-text"><strong>Admin Revenue Dashboard</strong><span>Total revenue, orders, users, and vendor stats</span></div></div>
      <div class="feature-item"><div class="feature-icon">🗺️</div><div class="feature-text"><strong>Nigerian Delivery Wizard</strong><span>4-step city → area → junction → address selector</span></div></div>
      <div class="feature-item"><div class="feature-icon">📍</div><div class="feature-text"><strong>Jumia-Style Tracking</strong><span>4-stage order tracking with ETA on success page</span></div></div>
    </div>
  </div>

  <!-- 06 DELIVERY -->
  <div class="section" id="delivery">
    <div class="section-header">
      <span class="section-num">06</span>
      <h2 class="section-title">Delivery System</h2>
      <div class="section-line"></div>
    </div>
    <div class="highlight-card">
      <h3>Nigerian Smart Delivery Wizard</h3>
      <p>Built specifically for Nigeria. When a customer clicks "Checkout", a 4-step modal wizard guides them through their exact delivery location before payment is processed. All 36 states + FCT are covered with real local junctions and landmarks.</p>
      <p>After payment, the success page displays a Jumia-style 4-stage tracking flow, estimated delivery date, drop-off junction, and full address.</p>
      <ul>
        <li>Lagos (20 areas)</li><li>Abuja FCT</li><li>Port Harcourt</li><li>Kano</li>
        <li>Ibadan</li><li>Enugu</li><li>Benin City</li><li>Onitsha</li>
        <li>Asaba</li><li>Owerri</li><li>Calabar</li><li>Ilorin</li>
        <li>Kaduna</li><li>Osogbo</li><li>Abeokuta</li><li>Jos</li>
        <li>Maiduguri</li><li>Sokoto</li><li>Minna</li><li>Uyo</li>
        <li>+ 16 more cities</li>
      </ul>
    </div>
    <div class="table-wrap" style="margin-top:16px">
      <table>
        <thead><tr><th>Wizard Step</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td>Step 1 — City</td><td>Pick from 36 Nigerian cities. Shows estimated delivery days (2–6 business days). Search filter included.</td></tr>
          <tr><td>Step 2 — Area</td><td>Neighbourhood or district within the chosen city</td></tr>
          <tr><td>Step 3 — Junction</td><td>Nearest known junction/landmark with animated map pin preview</td></tr>
          <tr><td>Step 4 — Address</td><td>Free-text house address. Summary shown before proceeding to Paystack</td></tr>
          <tr><td>✓ Success Page</td><td>Jumia-style 4-stage tracking (Confirmed → Processing → Out for Delivery → Delivered) + estimated date</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 07 CURRENCY -->
  <div class="section" id="currency">
    <div class="section-header">
      <span class="section-num">07</span>
      <h2 class="section-title">Currency</h2>
      <div class="section-line"></div>
    </div>
    <div class="card">
      <div class="card-title">All prices in Nigerian Naira (₦) throughout</div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Every currency display across the entire platform uses ₦ with Nigerian locale formatting — consistent across all roles and pages.</p>
      <div class="code-block">
        <div class="code-bar"><span class="code-lang">JavaScript</span><div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#ffbd2e"></div><div class="code-dot" style="background:#28ca41"></div></div></div>
        <pre><span class="c-comment">// Format used throughout — clean, no decimals</span>
₦{price.toLocaleString(<span class="c-string">"en-NG"</span>, { minimumFractionDigits: <span class="c-value">0</span> })}</pre>
      </div>
      <div class="table-wrap" style="margin-top:12px">
        <table>
          <thead><tr><th>Page</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Shop / Product Detail</td><td style="color:#6ee7b7">✓ ₦ en-NG locale</td></tr>
            <tr><td>Cart / Orders</td><td style="color:#6ee7b7">✓ ₦ en-NG locale</td></tr>
            <tr><td>Admin Dashboard</td><td style="color:#6ee7b7">✓ ₦ en-NG locale</td></tr>
            <tr><td>Vendor Dashboard</td><td style="color:#6ee7b7">✓ ₦ en-NG locale</td></tr>
            <tr><td>Vendor Orders & Products</td><td style="color:#6ee7b7">✓ ₦ en-NG locale</td></tr>
            <tr><td>Product Form Label</td><td style="color:#6ee7b7">✓ Price (₦)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 08 DEPLOY -->
  <div class="section" id="deploy">
    <div class="section-header">
      <span class="section-num">08</span>
      <h2 class="section-title">Deployment</h2>
      <div class="section-line"></div>
    </div>
    <div class="deploy-grid">
      <div class="deploy-card">
        <div class="platform">Render.com</div>
        <div class="role">Backend — server/</div>
        <ol>
          <li>Push project to GitHub</li>
          <li>Render → New Web Service → connect repo</li>
          <li>Root: server | Build: npm install | Start: node server.js</li>
          <li>Add all .env variables in Render dashboard</li>
          <li>Copy your live URL (e.g. https://markeforge-api.onrender.com)</li>
        </ol>
      </div>
      <div class="deploy-card">
        <div class="platform">Vercel</div>
        <div class="role">Frontend — client/</div>
        <ol>
          <li>Push project to GitHub</li>
          <li>Import repo on Vercel → set root to client/</li>
          <li>Add env: NEXT_PUBLIC_API_URL = your Render URL + /api</li>
          <li>Deploy — Vercel auto-detects Next.js</li>
          <li>Update CLIENT_URL in Render to your Vercel URL</li>
        </ol>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Post-deploy checklist</div>
      <div class="sub-steps">
        <div class="sub-step"><span class="sub-step-num">→</span>Update Paystack webhook URL in Paystack dashboard to your live Render endpoint</div>
        <div class="sub-step"><span class="sub-step-num">→</span>Update CORS origin in server.js to your Vercel domain</div>
        <div class="sub-step"><span class="sub-step-num">→</span>Switch Paystack from sk_test_ to sk_live_ for real money</div>
        <div class="sub-step"><span class="sub-step-num">→</span>Set NODE_ENV=production in Render env variables</div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-logo">MarketForge</div>
    <p class="footer-by">Built with ❤️ by <span>Kelvin Bidi</span> 🇳🇬</p>
    <div class="footer-stack">
      <span class="badge">Next.js 14</span>
      <span class="badge">Express.js</span>
      <span class="badge">MongoDB</span>
      <span class="badge">Paystack</span>
      <span class="badge">Cloudinary</span>
      <span class="badge">JWT</span>
      <span class="badge">Tailwind CSS</span>
      <span class="badge">Playfair Display</span>
    </div>
  </div>

</div>
</body>
</html>
