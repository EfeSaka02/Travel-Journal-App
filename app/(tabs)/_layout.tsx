import { Tabs } from "expo-router";

export default function TabsLayout() {
  // That's for home and profile screen's skeleton
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
