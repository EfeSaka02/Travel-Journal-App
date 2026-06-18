# Travel Journal 📍

A mobile app to track your travel memories with photos and locations.

## Features

- User authentication (register/login)
- Add travel entries with title, description, location and date
- Take GPS location automatically but this function doesn't work in emulator because  in emulator there's no gps so I wrote an error message for that
- Add photos from gallery
- Offline support with local cache

## Tech Stack

- React Native / Expo SDK 56
- TypeScript
- Expo Router
- Supabase (Backend + Auth)
- Zustand
- TanStack Query
- AsyncStorage (offline cache)

## Setup

1. Clone the repository
   \```bash
   git clone <your-repo-url>
   cd travel-journal
   \```

2. Install dependencies
   \```bash
   npm install
   \```

3. Create `.env` file
   \```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \```

4. Run the project
   \```bash
   npx expo start --android
   \```

## Project Structure

\```
app/
(auth)/ → Login & Register screens
(tabs)/ → Home & Profile screens
add-entry → Add new travel entry
src/
services/ → Supabase client
components/ → Reusable components
hooks/ → Custom hooks
types/ → TypeScript types
\```

## Running Tests

\```bash
npx jest
\```
