import { supabase } from "@/src/services/supabase"; // We imported supabase for making login the user I mean in layout file we imported supabase for checking the user logged in or not but here to make login the user
import { useRouter } from "expo-router"; // That's for navigation between the screen it switches between screens
import { useState } from "react"; // that's the memroy box's hook
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"; // We imported Pressable to make clickable for buttons. Other imported components already I knew but it's best time for practicing View's like container box, Text for texting I mean shows the text in the screen StyleSheet already for css and Alert for popup message

export default function LoginScreen() {
  // Memory box 1 = For email

  const [email, setEmail] = useState("");

  // Memory box 2 = for password

  const [password, setPassword] = useState("");

  // Memory box 3 = for the loading actually for the buttons if there's no loading, no request button will be clikable

  const [loading, setLoading] = useState(false); // the app starts with false because there's no request so no loading but after starting the app it can be change this state can able to change it can be true

  const router = useRouter(); // For the navigation between screens

  // GATES: Login ButtonsGate

  const handleLogin = async () => {
    // Thats written for the login button this gate works when the user pressed the login button I used async because we'll wait a response from supabase for the making login the user
    setLoading(true); // This makes disabled the login button for the user not able to click it again
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // that checks the password and email if the both are correct it will login if not it won't login the user so I wrote error if email or password inccorect error will throw an alert if User's email and password correct there is no error and this information goes to _layout.tsx and onAuthStateChange will run to save the user information email and password

    setLoading(false); // Request finished so it returns false

    if (error) Alert.alert("Error", error.message); // When the user wrote wrong password or email this error message runs
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Journal</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // for the password security
      />

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { textAlign: "center", color: "#2563eb" },
});
