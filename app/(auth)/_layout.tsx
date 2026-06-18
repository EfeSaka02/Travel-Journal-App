import { Stack } from "expo-router";

export default function AuthLayout() {
  // I didn't write like tab's layout because that's written for the login register screen and system automatically goes to login screen or register screen but in home and profile screens system doesn't understand that so We need to define them lke Tabs.screen
  return <Stack screenOptions={{ headerShown: false }} />;
}
