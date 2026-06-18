import { createClient } from "@supabase/supabase-js"; // We imported for the connection to supabase library
import * as SecureStore from "expo-secure-store"; // That's the expo library for the secure storage area on the phone

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!; // We defined variable for the url and key in the .env file and by the way ! this is message and says that shoudln't be null to typescript
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const ExpoSecureStoreAdapter = {
  // Supabase doesn't know the token where to store so we need to define them
  getItem: (key: string) => SecureStore.getItemAsync(key), // that's takes the data and brings the data from the key
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value), // We used key and value here because setItem is saving the data so we need to define value here. It's saving the key and so it needs to know what it will save and whick key so we defined key and value

  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); // We create real connection supabaseUrl: we'll connect which server. supabaseAnonKey -> we prove to our identity. auth.storage: it saves the token to SecureStore that we imported. authRefreshToken: it reloads automatically when the token expires. persistSession makes the user automatically logged in when the user closed the app I mean it stores the all activity. detectSessionInUrl uses for the web not app
