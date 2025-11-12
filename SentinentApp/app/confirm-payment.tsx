import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ConfirmPayment() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Payment Successful!</Text>
      <Text style={styles.text}>Your demo transaction has been completed.</Text>
      <Button title="Go Home" onPress={() => router.push("/")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 30 },
});
