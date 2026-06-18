import { Session } from "@supabase/supabase-js"; // We imported session for the memory box and we used superbase because this session comes with superbase library
import { Stack, useRouter } from "expo-router"; // Stack for the screen switching manager and router for the navigation manager into the code
import { useEffect, useState } from "react"; // UseEffect is a hook that is for example user pressed a button for example map button and before the opening the app this useEffect turn on the gps for the map location. useState is the memory box it stores the data and when the screen changed it updates
import { supabase } from "../src/services/supabase"; // I imported the our supabase file in the services folder. I wrote this for when the user login or register these processes will be with token so it checks the session and when the user login or logout onAuthStateChange will be called and gate will works and after that router will navigate so we wrote supabase file and we imported here for te checking and that way gate will work and after that router navigates them
export default function RootLayout() {
  // Memory box 1 =  User's session information
  const [session, setSession] = useState<Session | null>(null); // User's session information if it's null it means the user not logged in if the session object = logged in it means user logged in

  // Memory box 2 = Is loading or not ?
  const [loading, setLoading] = useState(true); // If it returns true it means it didn't ask superbase if it returns false it means it asked the superbase and superbase responded. Actually that's for security

  const router = useRouter(); // That's for navigation we switch the screen with the useRouter

  // First Rule A part = When the user opened the app this useEffect runs first
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // getSession check the user logged in or not if logged in this getSession will tranfer the user to tabs screen with using the gate
      // when the user opened the app getSession for checking the this device logged in before or not if it returns true this session will be send the tabs screen to user if it returns false session send the login for the user to login
      setSession(session); // It sets the session to the memory box
      setLoading(false); // When the loading finish it returns false
    });

    // First Rule B part = Notify when the session changes. This works first and As long as the application is open getSession will not close. It closes if the user is logged in, or if not, it takes them to the login screen using gates. However onAuthStateChange will always run as long as the application is open because getSession looks at the past, while onAuthStateChange looks at the future. For example, if the user logs in and then logs out, getSession will not close because it looks at the past. If the user is logged in before, it will run directly and redirect the user to the tabs using gates. If they are not logged in, it will redirect them to the login screen. We wrote event for checking the what happened
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // First Rule C part = Close the subscription when the component closed. For blocking the memory leak

    return () => subscription.unsubscribe();
  }, []); // [] that means it runs only once when the app opened

  // Gate = This gate makes functionaltiy for the frontend but it works when session and loading screen has changed and this gate actually makes the navigation the screens for example user logged in and getSession knows that in rules so rules decides the this user where it should go for example if user logged in before rules decided to send the tabs screen and makes that with gates I mean gates like a carrier for example the user not logged in before rules decided to go to log in screen and it makes with gates
  useEffect(() => {
    if (loading) return; // If the loading is true wait don't proceed. I mean we're waiting the response from supabase getSession works and asks the supabase if there is no response it returns true. If the response came from the rules with getSession we'll do the process with gate if the getSession returns session it'll go to tabs screen if it returns null it'll go to login screen

    if (session) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [session, loading]); // when the user changed or new user logged in it'll check again so getSession and loading memory box checks again

  return (
    // That's layout file is skeleton for the all of screen's of the app
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
