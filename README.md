# ExploreBangla — Frontend

> Explore Bangladesh. Discover More.

ExploreBangla is a modern **tour management and travel discovery platform** focused on Bangladesh. It allows users to discover destinations, explore tours, find local guides, make bookings, and complete payments.

## ✨ Features

- 🌏 Explore all 8 divisions of Bangladesh
- 🧳 Browse and search tour packages
- 📍 Explore popular destinations
- 🧑‍🏫 Find local tour guides
- 📅 Book tours and manage bookings
- 💳 Online payment integration
- 🧾 Booking invoice generation
- 🔐 Authentication and protected routes
- 👥 Role-based access control
- 🔎 Tour search and filtering
- 🌓 Light / Dark mode
- 📱 Fully responsive design
- 🚀 SEO-friendly pages

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Redux Toolkit**
- **RTK Query**
- **React Router**
- **Lucide React**
- **date-fns**

## 📁 Project Structure

```text
src/
├── assets/
├── components/
├── config/
├── hooks/
├── layouts/
├── pages/
├── redux/
├── routes/
├── types/
├── utils/
├── App.tsx
└── main.tsx
````

## 🔄 Main Flow

```text
User
 ↓
Explore Divisions
 ↓
Explore Tours
 ↓
View Tour Details
 ↓
Book Tour
 ↓
Make Payment
 ↓
Booking Confirmation
 ↓
Invoice
```

## 🌏 Divisions

ExploreBangla covers all 8 divisions of Bangladesh:

* Dhaka
* Chattogram
* Rajshahi
* Khulna
* Barishal
* Sylhet
* Rangpur
* Mymensingh

Each division provides information about:

* Popular places
* Food
* Culture
* Attractions
* Best travel season

## 🧳 Tour Management

Users can:

* Browse available tours
* Search and filter tours
* View tour details
* Check tour itinerary
* View included and excluded services
* Check pricing and availability
* Book tours

## 🔐 Authentication

The application includes:

* User registration
* Login / Logout
* Protected routes
* Role-based access
* User profile management
* Cookie-based authentication

## 📅 Booking & Payment

The booking system allows users to:

1. Select a tour
2. Choose guest count
3. Create a booking
4. Complete payment
5. Receive booking confirmation
6. Access the invoice

## 📡 API Management

The frontend uses **RTK Query** for backend communication.

It provides:

* API requests
* Caching
* Loading states
* Error handling
* Data synchronization
* Query invalidation

## 🎨 UI & UX

The application uses **Tailwind CSS** and **shadcn/ui** to provide:

* Responsive layouts
* Reusable components
* Accessible UI
* Light / Dark theme
* Modern travel-focused design

## 🔍 SEO

ExploreBangla is optimized for search engines with:

* SEO-friendly titles
* Meta descriptions
* Canonical URLs
* Open Graph metadata
* Twitter cards
* Semantic HTML
* Image alt text
* Sitemap
* Robots.txt

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
VITE_BASE_URL=http://localhost:5000/api
```

For production:

```env
VITE_BASE_URL=https://your-backend-url.com/api
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 3. Start the development server

```bash
npm run dev
```

Or:

```bash
bun run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🌐 Deployment

The frontend can be deployed to platforms such as:

* Vercel
* Netlify
* Cloudflare Pages

For Vercel:

```text
Build Command: npm run build
Output Directory: dist
```

Make sure to configure the production environment variable:

```env
VITE_BASE_URL=https://explorebangla-server.vercel.app/api/v1
```

## 🔮 Future Improvements

* 🤖 AI Travel Assistant
* 🧠 AI-powered tour recommendations
* 🗺️ Interactive Bangladesh map
* ❤️ Wishlist and favorite tours
* ⭐ Tour reviews and ratings
* 🌦️ Weather-based recommendations
* 💰 Travel budget planner
* 🔔 Real-time notifications
* 🌐 Multi-language support

## 📌 Project Goal

The goal of ExploreBangla is to make traveling in Bangladesh easier by bringing **destinations, tours, local guides, bookings, payments, and travel information** into one platform.

---
