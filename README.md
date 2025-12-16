**Notes Website**

A simple Next.js notes application (app router) with user authentication, note CRUD, and a clean component structure. Built as a mini project to demonstrate a full-stack Next.js + MongoDB setup.

**Features**
- **Authentication:** Register and login flows with session-based protection handled by NextAuth-style routing. See [app/api/auth/[...nextauth]/route.js](app/api/auth/[...nextauth]/route.js).
- **Notes CRUD:** Create, read, update, and delete notes through API routes under [app/api/notes/route.js](app/api/notes/route.js).
- **Protected UI:** Client-side protected routes via `ProtectedRoute` component: [app/components/ProtectedRoute.jsx](app/components/ProtectedRoute.jsx).
- **Reusable Components:** `Navbar`, `Footer`, `Loader`, and `Logo` located in [app/components](app/components).
- **MongoDB + Mongoose models:** Central DB connection in [lib/connectDb.js](lib/connectDb.js) and models in [models/](models) (`user.js`, `notes.js`).

**Project Structure (high level)**
- **app/** — UI and app-router pages, components, and API routes.
- **lib/connectDb.js** — MongoDB connection helper.
- **models/** — Mongoose schemas: [models/user.js](models/user.js), [models/notes.js](models/notes.js).
- **public/** — Static assets.

**Quick Setup**
1. Copy environment variables into a `.env` file. Important variables:
   - `MONGODB_URI` — MongoDB connection string
   - `NEXTAUTH_SECRET` — NextAuth secret (session cookie signing)
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

**Usage**
- Register a new account via the register page.
- Login and create notes from the new note page (`app/pages/newNote/page.jsx`).
- Notes routes are protected; only authenticated users can create or modify their notes.

**Security & Production Notes**
- Move secrets out of source code into environment variables (`.env`).
- Ensure passwords are hashed before saving (use `bcrypt` or `argon2`) and never returned in API responses. Check [models/user.js](models/user.js).
- Use input validation on server endpoints (registration, notes) to prevent malformed or malicious input.
- Configure `NEXTAUTH_SECRET` and secure cookie settings in [app/api/auth/[...nextauth]/route.js](app/api/auth/[...nextauth]/route.js).

**Recommended Improvements / Next Steps**
- Add server-side validation (e.g., `zod` or `yup`) for API inputs.
- Add ESLint + Prettier and consider TypeScript for type safety.
- Add unit tests for models and API routes, and a basic CI pipeline (GitHub Actions).
- Add `.env.example` listing required environment variables.

**Contributing**
- Keep API responses consistent (standard JSON error format).
- Centralize shared logic (auth checks, error handling) under `lib/`.

**License**
- MIT — feel free to adapt for learning and demos.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
