import { supabase } from "@/src/services/supabase"; // I imported supabase for taking the datas from supabase database
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; //  That's for navigation switch between the screens
import { useEffect, useState } from "react"; // useState for taking the data from supabase
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"; // FlatList is a component for long list

type Entry = {
  // that's the type of the data in supabase same columns and I wrote title, description, location, visited_at for travel information
  id: number;
  title: string;
  description: string;
  location: string;
  visited_at: string;
};

export default function HomeScreen() {
  const [entries, setEntries] = useState<Entry[]>([]); // that's the list of the memory box that includes information about the home screen
  const [error, setError] = useState<string | null>(null); // I wrote null for the error message first of the program shows null because there's no error but the user got any error this null will be changed
  const [loading, setLoading] = useState(true); // that's for the loading indicator when the user press button and until the screen comes it shows the inducator
  const router = useRouter();

  useEffect(() => {
    fetchEntries(); // it connects the supabase and takes the data from supabase
  }, []);

  const fetchEntries = async () => {
    // it takes the data from fetchEntries from supabase entry list
    setLoading(true); // while the taking datas and transfer the screen this loading indicator returns true until the data transfered

    const cached = await AsyncStorage.getItem("entries"); // that reads the data from entries and AsyncStorage dependencies stores the data in memory if the user is in offline or doesn't have a internet connection
    if (cached) setEntries(JSON.parse(cached));

    const { data, error } = await supabase // takes the data from entries I mean travel information table it takes the data from there
      .from("entries")
      .select("*") // * means everything in the columns
      .order("visited_at", { ascending: false }); // visited__at that's sorting about the visiting column and ascending: false is sorting from new date to old date

    if (error) {
      console.error(error); // if there's an error write the consol
      setError("Could not load data. Please check your internet connection."); // that's the error message and set writes the error message to the error memory box
    } else setEntries(data || []); // if there's data write the memory box
    await AsyncStorage.setItem("entries", JSON.stringify(data || [])); // that writes the data to the entries
    setLoading(false); // when the data transfered loading indicator returns false
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Travel Journal</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()} // that give the special id to every item
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
            <Text style={styles.cardDate}>{item.visited_at}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No entries yet. Add your first trip!</Text>
        }
      />
      <Pressable style={styles.fab} onPress={() => router.push("/add-entry")}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 48 },
  errorText: { color: "#ef4444", textAlign: "center", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardLocation: { color: "#666", marginTop: 4 },
  cardDate: { color: "#999", fontSize: 12, marginTop: 4 },
  empty: { textAlign: "center", color: "#999", marginTop: 48 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
});
