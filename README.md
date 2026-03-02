# 🛒 MarketForge — Multi-Vendor E-Commerce Platform

A full-stack multi-vendor marketplace built with Next.js 14, Node.js/Express, MongoDB, Stripe, and Cloudinary.

---

## 📁 Project Structure

```
markeforge/
├── server/        → Node.js + Express REST API (port 5000)
└── client/        → Next.js 14 frontend (port 3000)
```

---

## ⚙️ SETUP GUIDE

### STEP 1 — Get your credentials (external services)

#### MongoDB Atlas
1. Go to https://cloud.mongodb.com → create a free cluster
2. Connect → Drivers → copy the connection string
3. Replace `<password>` and add `/markeforge` before the `?`

#### Cloudinary
1. Go to https://cloudinary.com → Dashboard
2. Copy: Cloud Name, API Key, API Secret

#### Stripe
1. Go to https://dashboard.stripe.com → Developers → API Keys
2. Copy the Secret key (starts with `sk_test_`)
3. For webhook secret, run after server is started:
   ```bash
   stripe listen --forward-to localhost:5000/api/orders/webhook
   ```
   Copy the `whsec_...` value it outputs

---

### STEP 2 — Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env` with all your credentials, then:

```bash
npm run dev    # runs on http://localhost:5000
```

---

### STEP 3 — Frontend setup

```bash
cd client
npm install
cp .env.example .env.local
```

`.env.local` only needs:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev    # runs on http://localhost:3000
```

---

### STEP 4 — Create your Admin account

No admin registration UI exists for security. Do this manually:

1. Register at `/register` as a customer
2. Go to MongoDB Atlas → Browse Collections → users
3. Find your user → change `"role": "customer"` to `"role": "admin"`
4. Log out and back in

---

## 🗺️ Pages

| Role | Pages |
|------|-------|
| Customer | `/shop`, `/product/[id]`, `/cart`, `/orders`, `/checkout/success` |
| Vendor | `/vendor/dashboard`, `/vendor/products`, `/vendor/products/new`, `/vendor/orders` |
| Admin | `/admin/dashboard`, `/admin/users`, `/admin/vendors` |
| Public | `/login`, `/register` |

---

## ✅ Features

- JWT auth with auto-refresh tokens
- 3 roles: Customer / Vendor / Admin
- Vendor approval system
- Product CRUD with Cloudinary image uploads (5 images max)
- Search, filter, sort, pagination
- Shopping cart (localStorage)
- Stripe checkout + webhook
- Order management for vendors
- Verified purchase reviews + star ratings
- Admin dashboard with revenue stats
- Role-based route protection

---

## 🚀 Deployment

**Backend → Render.com** | **Frontend → Vercel**

Both are free. Push to GitHub, connect repo, add env variables.

---

Built by Kelvin Bidi 🇳🇬
