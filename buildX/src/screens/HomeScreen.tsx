import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { baseUrl, token } from "../links";
import axios from "axios";
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [address, setAddress] = useState("");

  const addSite = async () => {
    try {
      console.log("Token before call:", token);
      console.log("Trying to send site:", { siteName, address });

      const res = await axios.post(
        "http://192.168.43.60:5100/api/v1/user/addConstructionSite",
        { siteName, address },
        {
          headers: {
            Authorization: `${token}`,
          },
          timeout: 5000,
        }
      );

      console.log("Site added:", res.data);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding site:", error);
      console.log("Full error:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <FontAwesome5 name="hard-hat" size={40} color="#FF6B00" />
          <Text style={styles.logoText}>BuildX</Text>
        </View>
        <Text style={styles.tagline}>
          Building a Safer Future for Every Worker
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            BuildX is a comprehensive worker safety platform designed for
            construction site management. We help construction companies ensure
            the safety, compliance, and efficient management of their workforce.
          </Text>
        </View>

        {/* Key Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Feather name="users" size={24} color="#FF6B00" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Worker Management</Text>
              <Text style={styles.featureText}>
                Easily track and manage all workers across multiple construction
                sites
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialIcons name="verified-user" size={24} color="#FF6B00" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Compliance Tracking</Text>
              <Text style={styles.featureText}>
                Ensure all workers have proper documentation and certifications
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Feather name="alert-triangle" size={24} color="#FF6B00" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Safety Alerts</Text>
              <Text style={styles.featureText}>
                Send immediate notifications for safety incidents or hazards
              </Text>
            </View>
          </View>
        </View>

        {/* Sites Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sitesButton}
            onPress={() => navigation.navigate("Construction")}
          >
            <Text style={styles.sitesButtonText}>View Construction Sites</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addSiteButton}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={18} color="#FF6B00" />
            <Text style={styles.addSiteText}>Add New Construction Site</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Site Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Construction Site</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Site Name</Text>
              <TextInput
                value={siteName}
                onChangeText={setSiteName}
                style={styles.input}
                placeholder="Enter site name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                placeholder="Enter site address"
                multiline
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={() => addSite()}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: "#FFF9F5",
    padding: 24,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333333",
  },
  tagline: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 8,
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333333",
  },
  featureText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  sitesButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sitesButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  addSiteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF6B00",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  addSiteText: {
    color: "#FF6B00",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555555",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F2F2F2",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#FF6B00",
    marginLeft: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
