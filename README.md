# Trailbuds

Australia's adventure meetup app — where hikers, mountain bikers, and trail runners find each other, plan activities, and share the trail.

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| File Storage | Supabase Storage |
| Maps | Leaflet.js |
| Hosting | Vercel |

## App Pages

| Page | Route | Description |
|---|---|---|
| Home / Feed | `/` | Upcoming activities, filterable by state and type |
| Activity Detail | `/activity/:id` | Full info, comments, and RSVP |
| Create Activity | `/create` | Post a new hike, ride, or run |
| My Profile | `/profile` | Edit your bio, photo, and activity preferences |
| User Profile | `/user/:id` | View someone else's profile and activities |
| Search | `/search` | Filter by state, type, date, difficulty |
| Auth | `/auth` | Sign up or log in |

## Getting Started

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, then run the SQL in `supabase/schema.sql` inside the Supabase SQL Editor.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase project URL and anon key (found in **Settings → API** in the Supabase dashboard).

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build Phases

| Phase | Feature |
|---|---|
| 1 | Authentication (sign up / log in) |
| 2 | User profiles + photo upload |
| 3 | Activity feed + filters |
| 4 | Create & post activities |
| 5 | Comments + RSVP (join button) |
| 6 | Polish, notifications, Vercel deploy |

## Database Schema

Four tables: `profiles`, `activities`, `comments`, `rsvps`.  
Full schema with RLS policies: [`supabase/schema.sql`](supabase/schema.sql).
