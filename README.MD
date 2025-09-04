# noteIt

noteIt is a modern web application for managing personal notes, featuring robust authentication and a clean, responsive dashboard. Built with a React + TypeScript frontend (using Vite) and a Node.js backend with Fastify, noteIt offers quick note-taking, secure access, and a pleasing user experience.

## Live Demo

Visit the app: [noteIt on Vercel](https://noteit-snowy.vercel.app)

---

## Features

- **User Authentication**
  - OTP-based sign up and sign in via email.
  - Google OAuth sign-in.
  - Secure JWT-based authentication with refresh tokens.

- **Notes Management**
  - Create, view, and delete notes.
  - Notes are user-specific and securely stored.
  - Real-time updates on dashboard.

- **Dashboard**
  - Personalized greeting.
  - List of notes with management actions.
  - Modal interface for new note creation.

- **Theme and UI**
  - Custom Material-UI theme for consistent styling.
  - Responsive design for all devices.
  - Clean, minimal interface.

- **Developer Experience**
  - Built on React + TypeScript + Vite for fast development and HMR.
  - ESLint setup with recommended and strict type-checked rules.
  - Expandable lint config for React-specific rules.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Material-UI, Dayjs
- **Backend:** Node.js, Fastify, JWT, PostgreSQL
- **Other:** Google OAuth, Email OTP, ESLint, Docker-ready configs

---

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- PostgreSQL database

### Frontend Setup

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs on [localhost:5173](http://localhost:5173).

### Backend Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in your secrets (JWT, DB, Google client, etc.)

3. Run migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   The API runs on [localhost:4000](http://localhost:4000).

---

## Project Structure

```
noteIt/
  ├─ client/           # React frontend (Vite, MUI)
  │    ├─ src/
  │    └─ README.md
  ├─ server/           # Fastify backend
  │    ├─ src/
  │    └─ ...
  ├─ .env.example      # Environment config template
  └─ ...
```

---

## API Overview

- `/auth/request-otp-signup` - Request OTP for signup
- `/auth/verify-otp-signup` - Verify OTP and register
- `/auth/request-otp-signin` - Request OTP for sign-in
- `/auth/verify-otp-signin` - Verify OTP and login
- `/auth/callback/google` - Google OAuth callback
- `/auth/me` - Get current user details
- `/notes` - CRUD operations for notes

---

## Customization

- Theme customization in `client/src/styles/theme.ts`
- ESLint config extensible via recommended and strict rules (see `client/README.md`)
- Environment variables for security and OAuth in `server/src/config/config.ts`

---

## License

Project is currently unlicensed.

---

## Maintainer

- [shilendra-dev](https://github.com/shilendra-dev)

---

## Contributing

Feel free to fork, open issues, or suggest improvements via pull requests.

