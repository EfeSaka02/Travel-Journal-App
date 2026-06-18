import { supabase } from "@/src/services/supabase";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location"; // I wrote different than others because this inculed all things in a one line
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function AddEntryScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [visitedAt, setVisidetAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | "">(""); // that's the url
  const router = useRouter();

  const handleSave = async () => {
    // async waits the data from supabase
    if (!title || !location) {
      Alert.alert("Error", "Please fill title and location");
      return;
    }

    setLoading(true); // this loading indicator returns while the waiting the data comes from supabase
    const {
      data: { user },
    } = await supabase.auth.getUser(); // it checks the user
    const { error } = await supabase.from("entries").insert({
      // it adds the new entry to supabase so we used await and wrote insert
      user_id: user?.id,
      title,
      description,
      location,

      visited_at: visitedAt || new Date().toISOString().split("T")[0], //  if the user entered the date it uses that date user's entered latest date
    });
    setLoading(false); // And all process finished so it returns false
  };

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); // Requests foreground location permission
    if (status !== "granted") {
      // if the doesn't give the permission for the foreground location. it'll be give an alert
      Alert.alert("Error", "Location permission not granted");
      return; // it stops the function
    } else {
      // if the permission is granted loc variable runs and it makes to take the current location
      const loc = await Location.getCurrentPositionAsync();
      setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`); // latitude shows the north-south position of the location and longitude shows the east-west position of the location
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Media Library permission not granted");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });
      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Title *"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location *"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={visitedAt}
        onChangeText={setVisidetAt}
      />

      <Pressable style={styles.secondaryButton} onPress={handleGetLocation}>
        <Text style={styles.secondaryText}>📍 Take Location</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handlePickImage}>
        <Text style={styles.secondaryText}>📷 Add a photo</Text>
      </Pressable>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}

      <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, marginTop: 48 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textarea: { height: 100, textAlignVertical: "top" },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { padding: 14, alignItems: "center" },
  cancelText: { color: "#666" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryText: { color: "#2563eb", fontWeight: "bold" },
  preview: { width: "100%", height: 200, borderRadius: 8, marginBottom: 16 },
});
