import { supabase } from "@/src/services/supabase";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/login"); // after the signout the user goes to login screen
  };

  return (
    <View style={style.container}>
      <Text>Profile Screen</Text>
      <Pressable style={style.button} onPress={handleLogout}>
        <Text style={style.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 32 },
  button: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
