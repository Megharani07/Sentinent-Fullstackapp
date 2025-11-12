import { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";

export default function Payment() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          Alert.alert("Error", "User not found. Please log in again.");
          router.push("/login");
          return;
        }

        const res = await api.get(`/payment/${userId}`);
        if (!res.data) {
          Alert.alert("No Data", "No payment details found. Please add them first.");
          router.push("/payment-details");
        } else {
          setPaymentData(res.data);
        }
      } catch (err) {
        console.error("Payment Fetch Error:", err);
        Alert.alert("Error", "Failed to load payment data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProceed = () => {
    if (paymentData) {
      router.push("/confirm-payment");
    } else {
      Alert.alert("Error", "No payment data found");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading payment details...</Text>
      </View>
    );
  }

  if (!paymentData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No payment details found.</Text>
        <Button title="Go to Add Details" onPress={() => router.push("/payment-details")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Details</Text>
      <Text style={styles.info}>Bank: {paymentData.bankName}</Text>
      <Text style={styles.info}>Account: {paymentData.accountNumber}</Text>
      <Text style={styles.info}>Card: {paymentData.cardNumber}</Text>
      <Text style={styles.info}>Expiry: {paymentData.expiryDate}</Text>

      <Button title="Proceed to Pay" onPress={handleProceed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorText: { fontSize: 16, marginBottom: 20, color: "red" },
});