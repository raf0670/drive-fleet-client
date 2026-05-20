# Drive Fleet Client

> A modern vehicle booking and fleet management portal built with Next.js, MongoDB, and Better Auth.

## 🚗 What is Drive Fleet?

Drive Fleet is a polished client-side application for browsing, booking, and managing fleet vehicles. It supports:

- Secure authentication with email/password and Google social login
- Protected user dashboards for bookings and vehicle management
- Adding new cars to the fleet catalog
- Searching and filtering vehicles by type and keywords
- Light/dark theme switching and responsive UI
- Real-time toast notifications for actions

## ✨ Key Features

- **Homepage:** branded landing experience with featured cars, workflow sections, and conversion CTA
- **Explore Cars:** searchable, filterable vehicle catalogue built with dynamic server-side data fetching
- **Add Car:** authenticated car registration form with structured vehicle metadata
- **My Bookings:** user-only booking dashboard via Better Auth session and middleware protection
- **My Added Cars:** list and manage vehicles added by the signed-in user
- **Auth pages:** modern login and registration experience with form validation
- **Theme support:** `next-themes` powered dark/light mode toggle

## 🧩 Tech Stack

- `next` 16.2.6 — Next.js App Router
- `react` 19.2.4 / `react-dom` 19.2.4
- `tailwindcss` ^4 with `@tailwindcss/postcss`
- `better-auth` + `@better-auth/mongo-adapter` — authentication and user session handling
- `mongodb` — backend fleet data persistence
- `react-hook-form` — client-side form validation
- `react-toastify` — feedback notifications
- `framer-motion` — subtle animations across UI components
- `lucide-react` — modern iconography
- `next-themes` — theme switching

## 🧠 App Architecture

- `src/app/(main)` — public home and explore routes
- `src/app/(auth)` — login and registration pages
- `src/app/(bookings)` — protected customer booking pages and vehicle management
- `src/components` — reusable UI building blocks like `Navbar`, `CarCard`, `FilterControls`, `Banner`, and more
- `src/lib/auth-client.js` — Better Auth client configuration
- `src/utils/data.js` — remote vehicle API helpers
- `src/proxy.js` — middleware-style route protection for authenticated pages

## 🔐 Authentication

The app uses Better Auth with JWT support. User sessions are fetched client-side with `authClient.useSession()` and protected routes are enforced using `src/proxy.js`.

Protected pages include:

- `/my-bookings`
- `/added-cars/*`
- `/add-car`
- `/my-profile/*`
- `/cars/[carID]`

## ⚙️ Environment Variables

Create a `.env.local` file with at least:

```bash
NEXT_PUBLIC_SERVER_URL=https://your-api-server.com
BETTER_AUTH_URL=https://your-better-auth-server.com
```

## 🚀 Run Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## ✅ Recommended Workflow

1. Sign up or log in via `/register` or `/login`
2. Explore vehicle inventory at `/explore`
3. Add a new car through `/add-car`
4. View your bookings at `/my-bookings`
5. Manage owned fleet vehicles in `/added-cars`

## 🛠️ Notes

- `src/utils/data.js` fetches fleet data from the configured backend API
- `src/app/layout.js` sets up global theming and toast notifications
- `Navbar` adapts navigation links based on auth state

## 📦 Scripts

```bash
npm run dev      # start development server
npm run build    # create production build
npm run start    # run production server
npm run lint     # run ESLint checks
```

## 🌟 Why this project stands out

Drive Fleet blends modern Next.js patterns with authenticated fleet management flows. It’s ideal for vehicle rental, logistics dashboards, or admin fleet portals that require:

- mobile-first responsive UI
- authenticated user workflows
- clean filtering and catalogue experiences
- reusable, component-based architecture

---

Built with passion for seamless fleet booking and vehicle management. Keep iterating and make it your own!