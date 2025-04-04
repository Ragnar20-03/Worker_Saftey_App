import { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { baseUrl, token } from "../links";

// Dummy data
const dummyLabours = [
  {
    id: "1",
    firstname: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    address: "45 Worker Lane, Cityville",
    insuranceNo: "INS-12345",
    adhar: "adhar_document.pdf",
    role: "Electrician",
    joinDate: "12 Feb 2023",
  },
  {
    id: "2",
    firstname: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    address: "78 Builder Ave, Townsville",
    insuranceNo: "INS-67890",
    adhar: "adhar_document.pdf",
    role: "Carpenter",
    joinDate: "5 Mar 2023",
  },
  {
    id: "3",
    firstname: "Robert",
    lastName: "Johnson",
    phone: "456-789-0123",
    address: "23 Construction Rd, Worktown",
    insuranceNo: "INS-54321",
    adhar: "adhar_document.pdf",
    role: "Plumber",
    joinDate: "18 Jan 2023",
  },
];

const SiteDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [labours, setLabours] = useState<any>({});
  const { site } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [adharDocument, setAdharDocument] = useState<any>(null);
  const [form, setForm] = useState({
    firstname: "",
    lastName: "",
    phone: "",
    address: "",
    insuranceNo: "",
    role: "",
  });

  useEffect(() => {
    console.log("site is : ", site);

    axios
      .get(`${baseUrl}getAllSiteLabours/${site}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // @ts-ignore
        setLabours(res.data.labours);
      })
      .catch((err) => {
        console.error("Unable to fetch labours", err);
      });
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      //@ts-ignore
      if (result.type === "success") {
        console.log("PDF Updated Succesfuly!");

        setAdharDocument(result);
      }
    } catch (err) {
      console.log("Document picking error:", err);
    }
  };

  const addLabour = () => {
    console.log({ ...form, adhar: adharDocument });
    axios
      .post(
        `${baseUrl}addLabourToSite/${site._id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("res for adding labour is : ", res);
      })
      .catch((err) => {
        console.error("error occured in adding the labour : ", err);
      });
    setModalVisible(false);
    // Reset form
    setForm({
      firstname: "",
      lastName: "",
      phone: "",
      address: "",
      insuranceNo: "",
      role: "",
    });
    setAdharDocument(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{site.siteName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Site Info */}
      <View style={styles.siteInfoCard}>
        <View style={styles.siteInfoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{site.address}</Text>
          </View>
        </View>

        <View style={styles.siteInfoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Workers</Text>
            <Text style={styles.infoValue}>{site.workers}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>{site.startDate}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Progress</Text>
            <Text style={styles.infoValue}>{site.progress}%</Text>
          </View>
        </View>
      </View>

      {/* Workers Section */}
      <View style={styles.workersSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workers</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Worker</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={labours}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.workerCard}>
              <View style={styles.workerAvatarContainer}>
                <Text style={styles.workerInitials}>
                  {item.firstname.charAt(0)}
                  {item.lastName?.charAt(0)}
                </Text>
              </View>

              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>
                  {item.firstname} {item.lastName}
                </Text>
                <Text style={styles.workerRole}>{item.role}</Text>

                <View style={styles.workerDetails}>
                  <View style={styles.workerDetailItem}>
                    <Feather name="phone" size={14} color="#666666" />
                    <Text style={styles.workerDetailText}>{item.phone}</Text>
                  </View>

                  <View style={styles.workerDetailItem}>
                    <Feather name="calendar" size={14} color="#666666" />
                    <Text style={styles.workerDetailText}>
                      Joined: {item.joinDate}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-vertical" size={20} color="#666666" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Add Worker Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Worker</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    value={form.firstname}
                    onChangeText={(text) =>
                      setForm({ ...form, firstname: text })
                    }
                    style={styles.input}
                    placeholder="First name"
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    value={form.lastName}
                    onChangeText={(text) =>
                      setForm({ ...form, lastName: text })
                    }
                    style={styles.input}
                    placeholder="Last name"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  value={form.phone}
                  onChangeText={(text) => setForm({ ...form, phone: text })}
                  style={styles.input}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  value={form.address}
                  onChangeText={(text) => setForm({ ...form, address: text })}
                  style={[styles.input, styles.textArea]}
                  placeholder="Full address"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.inputLabel}>Insurance Number</Text>
                  <TextInput
                    value={form.insuranceNo}
                    onChangeText={(text) =>
                      setForm({ ...form, insuranceNo: text })
                    }
                    style={styles.input}
                    placeholder="Insurance #"
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.inputLabel}>Role</Text>
                  <TextInput
                    value={form.role}
                    onChangeText={(text) => setForm({ ...form, role: text })}
                    style={styles.input}
                    placeholder="Worker role"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Aadhar Document (PDF)</Text>
                <TouchableOpacity
                  style={styles.documentPicker}
                  onPress={pickDocument}
                >
                  <Feather name="file" size={24} color="#666666" />
                  <Text style={styles.documentPickerText}>
                    {adharDocument ? adharDocument.name : "Select PDF document"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={addLabour}
              >
                <Text style={styles.submitButtonText}>Add Worker</Text>
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
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  siteInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  siteInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  workersSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B00",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 6,
  },
  workerCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  workerAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  workerInitials: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  workerRole: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 6,
  },
  workerDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  workerDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  workerDetailText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 16,
    maxHeight: 400,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfInput: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  documentPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9F9F9",
  },
  documentPickerText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
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

export default SiteDetailsScreen;
