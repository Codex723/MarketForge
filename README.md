# MarketForge

> **Full-stack multi-vendor marketplace built for Nigeria** — Naira payments, smart delivery routing across 36 cities, and role-based access for customers, vendors, and admins.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Paystack](https://img.shields.io/badge/Paystack-₦_Naira-00C3F7?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-3448C5?style=flat-square&logo=cloudinary)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## Table of Contents

- [Project Structure](#-project-structure)
- [Setup Guide](#-setup-guide)
- [Admin Account](#-admin-account)
- [Pages & Routes](#-pages--routes)
- [Features](#-features)
- [Delivery System](#-delivery-system)
- [Currency](#-currency)
- [Deployment](#-deployment)

---

## 📁 Project Structure

```
markeforge_work/
├── server/                        → Node.js + Express REST API  :5000
│   ├── routes/                    → auth, orders, products, users, vendors
│   ├── models/                    → User, Product, Order, Review
│   ├── middleware/                → JWT auth, role guards
│   ├── controllers/               → business logic per route
│   ├── config/                    → db, cloudinary, jwt setup
│   └── index.js
│
└── client/                        → Next.js 14 frontend  :3000
    ├── app/
    │   ├── (admin)/               → dashboard, users, vendors
    │   ├── (customer)/            → shop, product/[id], cart, orders, checkout/success
    │   ├── (vendor)/              → dashboard, products, products/new, products/edit/[id], orders
    │   └── (auth)/                → login, register
    ├── components/
    │   ├── customer/              → Navbar, DeliveryWizard
    │   ├── vendor/                → VendorLayout, ProductForm
    │   └── admin/                 → AdminLayout
    ├── context/                   → AuthContext, CartContext
    └── lib/                       → api.js (axios instance)
```

---

## ⚙️ Setup Guide

### Step 1 — Get your credentials

#### MongoDB Atlas
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → create a free cluster
2. Connect → Drivers → copy the connection string
3. Replace `<password>` and add `/markeforge` before the `?`

#### Cloudinary
1. Go to [cloudinary.com](https://cloudinary.com) → Dashboard
2. Copy: **Cloud Name**, **API Key**, **API Secret**
3. Used for product image uploads (up to 5 per listing)

#### Paystack
1. Go to [dashboard.paystack.com](https://dashboard.paystack.com) → Settings → API Keys
2. Copy `sk_test_...` (Secret) and `pk_test_...` (Public)
3. Nigerian Naira (₦) payments — test and live modes available

---

### Step 2 — Backend setup

```bash
cd server
npm install
```

Create a `.env` file and fill in:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/markeforge
JWT_SECRET=your_long_random_secret
JWT_REFRESH_SECRET=your_long_random_refresh_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
```

```bash
npm run dev    # → http://localhost:5000
```

---

### Step 3 — Frontend setup

```bash
cd client
npm install
```

Create `.env.local` with just one line:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev    # → http://localhost:3000
```

---

## 🔐 Admin Account

There is no public admin registration — admin accounts must be created directly in the database.

### Method A — Node script (recommended)

Create `server/create-admin.js`:

```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

await mongoose.connect("your-mongo-uri");
const hash = await bcrypt.hash("Admin1234", 10);
await mongoose.connection.db.collection("users").insertOne({
  name: "Admin",
  email: "admin@markeforge.com",
  password: hash,
  role: "admin",
  isApproved: true,
  createdAt: new Date(),
});
console.log("Admin created!");
process.exit();
```

```bash
# run from inside server/
node create-admin.js
```

### Method B — MongoDB Atlas UI

1. Register at `/register` as a normal customer
2. MongoDB Atlas → Browse Collections → `users` collection
3. Find your user → edit → change `"role": "customer"` to `"role": "admin"`
4. Log out and log back in → redirects to `/admin/dashboard` automatically

---

## 🗺️ Pages & Routes

| Role | Pages | Access |
|------|-------|--------|
| **Customer** | `/shop` `/product/[id]` `/cart` `/orders` `/checkout/success` | JWT required |
| **Vendor** | `/vendor/dashboard` `/vendor/products` `/vendor/products/new` `/vendor/products/edit/[id]` `/vendor/orders` | Vendor + approved |
| **Admin** | `/admin/dashboard` `/admin/users` `/admin/vendors` | Admin role only |
| **Public** | `/login` `/register` | Open |

---

## ✅ Features

| Feature | Description |
|---------|-------------|
| 🔐 JWT Auth + Auto-Refresh | Access + refresh tokens with automatic silent renewal |
| 👥 3-Role System | Customer, Vendor, Admin with protected route guards |
| ✅ Vendor Approval Flow | Vendors need admin approval before going live |
| 🖼️ Cloudinary Image Upload | Up to 5 product images per listing |
| 🔍 Search, Filter & Sort | Full-text search with category, price, rating filters |
| 🛒 Persistent Cart | localStorage cart that survives page refreshes |
| 💳 Paystack Checkout | ₦ Naira payments with webhook order verification |
| 📦 Order Management | Vendors manage their orders; admins oversee all |
| ⭐ Verified Reviews | Only confirmed buyers can leave star ratings |
| 📊 Admin Revenue Dashboard | Total revenue, orders, users, and vendor stats |
| 🗺️ Nigerian Delivery Wizard | 4-step city → area → junction → address selector |
| 📍 Jumia-Style Tracking | 4-stage order tracking with ETA on success page |

---

## 🚚 Delivery System

When a customer clicks **"Checkout"**, a 4-step modal wizard guides them through their exact delivery location before payment — covering all **36 Nigerian states + FCT** with real local junctions and landmarks.

| Step | What happens |
|------|-------------|
| **1 — City** | Pick from 36 Nigerian cities. Shows estimated delivery days (2–6 business days). Search filter included. |
| **2 — Area** | Neighbourhood or district within the chosen city |
| **3 — Junction** | Nearest known junction/landmark with animated map pin preview |
| **4 — Address** | Free-text house address. Full summary shown before proceeding to Paystack |
| **✓ Success Page** | Jumia-style 4-stage tracking (Confirmed → Processing → Out for Delivery → Delivered) + estimated delivery date |

**Cities covered:**

> Lagos (20 areas) · Abuja FCT · Port Harcourt · Kano · Ibadan · Enugu · Benin City · Onitsha · Asaba · Owerri · Calabar · Ilorin · Kaduna · Osogbo · Abeokuta · Jos · Maiduguri · Sokoto · Minna · Uyo · Bauchi · Makurdi · Jalingo · Yola · Birnin Kebbi · Gusau · Lafia · Lokoja · Ado-Ekiti · Akure · Sagamu · Yenagoa · Umuahia · Abakaliki · Gombe · Damaturu

---

## 💰 Currency

All prices across the entire platform display in **Nigerian Naira (₦)** using Nigerian locale formatting — consistent across all roles and pages.

```js
// Format used throughout — clean, no decimals
₦{price.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
```

| Page | Status |
|------|--------|
| Shop / Product Detail | ✅ ₦ en-NG locale |
| Cart / Orders | ✅ ₦ en-NG locale |
| Admin Dashboard | ✅ ₦ en-NG locale |
| Vendor Dashboard | ✅ ₦ en-NG locale |
| Vendor Orders & Products | ✅ ₦ en-NG locale |
| Product Form Label | ✅ Price (₦) |

---

## 🚀 Deployment

### Backend → [Render.com](https://render.com) (free)

1. Push project to GitHub
2. Render → New Web Service → connect repo
3. Root directory: `server` | Build: `npm install` | Start: `node index.js`
4. Add all `.env` variables in the Render dashboard
5. Copy your live URL (e.g. `https://markeforge-api.onrender.com`)

### Frontend → [Vercel](https://vercel.com) (free)

1. Import repo on Vercel → set root directory to `client/`
2. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-url/api`
3. Deploy — Vercel auto-detects Next.js
4. Update `CLIENT_URL` in Render to your Vercel domain

### Post-deploy checklist

- [ ] Update Paystack webhook URL in Paystack dashboard to your live Render endpoint
- [ ] Update CORS origin in `server/index.js` to your Vercel domain
- [ ] Switch Paystack keys from `sk_test_` to `sk_live_` for real money
- [ ] Set `NODE_ENV=production` in Render environment variables

---

Built by **Kelvin Bidi** 🇳🇬
