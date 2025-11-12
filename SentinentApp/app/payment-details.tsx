import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";

export default function PaymentDetails() {
  const router = useRouter();

  // States for Bank and Card Details
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Fetch existing payment details if available
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const { data } = await api.get(`/payment/${userId}`);
        if (data) {
          setBankName(data.bankName || "");
          setAccountNumber(data.accountNumber || "");
          setCardNumber(data.cardNumber || "");
          setExpiryDate(data.expiryDate || "");
        }
      } catch (err) {
        console.log("Error fetching payment details:", err);
      }
    };
    fetchDetails();
  }, []);

  // Save or Update all details
  const handleUpdate = async () => {
    if (!bankName || !accountNumber || !cardNumber || !expiryDate) {
      Alert.alert("Missing Fields", "Please fill in all details before saving");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        Alert.alert("Error", "User not found. Please log in again.");
        router.push("/login");
        return;
      }

      await api.post("/payment/add", {
        userId,
        bankName,
        accountNumber,
        cardNumber,
        expiryDate,
      });

      Alert.alert("Success", "Payment details updated successfully!");
    } catch (err) {
      console.error("Payment Update Error:", err);
      Alert.alert("Error", "Failed to update payment details");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* Bank Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏦 Bank Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
        />

        <TextInput
          style={styles.input}
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
      </View>

      {/* Card Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Card Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      </View>

      {/* Update Button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Update Details" onPress={handleUpdate} />
      </View>

      {/* Optional Navigation */}
      <View style={{ marginTop: 15 }}>
        <Button title="Proceed to Payment Page" onPress={() => router.push("/payment")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});