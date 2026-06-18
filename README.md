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

## ScreenShots

<img width="393" height="844" alt="Ekran Resmi 2026-06-19 01 38 29" src="https://github.com/user-attachments/assets/a63540c6-589b-4b1d-908b-44f2b4b34786" />
<img width="393" height="844" alt="Ekran Resmi 2026-06-19 01 38 18" src="https://github.com/user-attachments/assets/270318d5-e7ba-41a1-a9f5-094bc5195134" />
<img width="393" height="844" alt="Ekran Resmi 2026-06-19 01 38 05" src="https://github.com/user-attachments/assets/e0a7e6c9-c399-4e71-aeed-f506ad76861b" />
<img width="393" height="844" alt="Ekran Resmi 2026-06-19 01 37 51" src="https://github.com/user-attachments/assets/417e72c8-3c5b-470d-a435-0fa06e7bc15b" />
<img width="393" height="844" alt="Ekran Resmi 2026-06-19 01 37 38" src="https://github.com/user-attachments/assets/69ef0c29-b820-4235-984a-714d496e6743" />
<img width="393" height="838" alt="Ekran Resmi 2026-06-19 01 36 58" src="https://github.com/user-attachments/assets/908e33cd-7bba-4e0f-8f15-b1d0e735b6c1" />
