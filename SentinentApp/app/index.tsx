
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sentinent App</Text>
      <Text style={styles.subtitle}>Choose an option to get started</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={() => router.push("/login")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Signup" onPress={() => router.push("/signup")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
  buttonContainer: { width: "60%" }, // keeps buttons centered and same width
  buttonWrapper: { marginVertical: 8 }, // adds vertical spacing between buttons
});
