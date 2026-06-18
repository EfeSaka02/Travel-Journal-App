import { supabase } from "@/src/services/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"; // We imported Pressable to make clickable for buttons. Other imported components already I knew but it's best time for practicing View's like container box, Text for texting I mean shows the text in the screen StyleSheet already for css and Alert for popup message

export default function RegisterScreen() {
  // Memory box 1 = For email

  const [email, setEmail] = useState("");

  // Memory box 2 = for password

  const [password, setPassword] = useState("");

  // Memory box 3 = for the loading actually for the buttons if there's no loading, no request button will be clikable

  const [loading, setLoading] = useState(false); // the app starts with false because there's no request so no loading but after starting the app it can be change this state can able to change it can be true

  const router = useRouter(); // For the navigation between screens

  // GATES: Register ButtonsGate

  const handleRegister = async () => {
    // Thats written for the login button this gate works when the user pressed the login button I used async because we'll wait a response from supabase for the making login the user
    setLoading(true); // This makes disabled the register button for the user not able to click it again
    const { error } = await supabase.auth.signUp({ email, password }); // that checks the password and email if the both are correct it will be sign up if not it won't be sign up the user so I wrote error if email or password inccorect error will throw an alert if User's email and password correct there is no error and this information goes to _layout.tsx and onAuthStateChange will run to save the user information email and password

    setLoading(false); // Request finished so it returns false

    if (error) {
      Alert.alert("Error", error.message); // When the user wrote wrong password or email this error message runs
    } else {
      Alert.alert(
        "Success",
        "Your account has been created. You can now log in."
      );
      router.replace("/(auth)/login"); // I pasted these codes from my login file and then I added and changed somethins one of them is Success alert message because this is sign up and when the user signed up user has to go to login page so I wrote router.replace to navigate from sign up to login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <Pressable
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Register"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>Do you have an account ? Login</Text>
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
