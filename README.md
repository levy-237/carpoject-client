# Eautokauf

Electric vehicle marketplace built as a portfolio project. The app lets users search and filter listings, compare vehicles, manage favourites, and publish their own ads — with a UI focused on EV-specific details like range, battery capacity, and charging speed. The project is still under active development; testing is planned but not yet in place, given limited time so far.

This repository contains the frontend client; it connects to a separate Django REST API.

**Live demo:** https://carpoject-client.vercel.app/  
**Backend API:** https://github.com/levy-237/CarProject

## Features

- Landing page with search, categories, featured listings, and FAQ
- Listings browse with advanced filters synced to the URL
- Vehicle detail pages and side-by-side comparison
- User authentication with email verification and password recovery
- Personal dashboard for profile, listings, and favourites
- Listing creation and editing with form validation
- AI chat assistant for marketplace guidance

## Tech stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS 4** for styling
- **React Hook Form** and **Zod** for validated forms
- **nuqs** for URL-based filter state
- JWT authentication via HTTP-only cookies
- Server Components for data fetching; Client Components for interactive UI

## Getting started

The live demo is the recommended way to explore the project. To run it locally, you will need Node.js 20+ and the [Django API](https://github.com/levy-237/CarProject) running. Environment configuration is not included in this repository.

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Run production server    |
| `npm run lint`  | Run ESLint               |

## Deployment

The application is deployed on Vercel. Environment variables are configured in the Vercel project settings and are not committed to the repository.
