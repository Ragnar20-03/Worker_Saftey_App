import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, token } from "../links";
import { TextInput } from "react-native-gesture-handler";
// Dummy data with more details
// const dummySites = [
//   {
//     id: "1",
//     siteName: "Downtown Tower Project",
//     address: "123 Main Street, Downtown",
//     workers: 24,
//     progress: 65,
//     startDate: "15 Jan 2023",
//   },
//   {
//     id: "2",
//     siteName: "Riverside Apartments",
//     address: "456 River Lane, Eastside",
//     workers: 18,
//     progress: 42,
//     startDate: "3 Mar 2023",
//   },
//   {
//     id: "3",
//     siteName: "Central Park Mall",
//     address: "789 Park Avenue, Midtown",
//     workers: 35,
//     progress: 28,
//     startDate: "22 Apr 2023",
//   },
//   {
//     id: "4",
//     siteName: "Westside Bridge Repair",
//     address: "321 Bridge Road, Westside",
//     workers: 12,
//     progress: 89,
//     startDate: "7 Dec 2022",
//   },
// ];

const ConstructionSitesScreen = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [address, setAddress] = useState("");
  const [sites, setSites] = useState<any>({});

  const addSite = () => {
    // Call API to save site
    console.log({ siteName, address });
    setModalVisible(false);
  };
  useEffect(() => {
    axios
      .get("http://192.168.43.60:5100/api/v1/user/getAllSites", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //@ts-ignore
        setSites(res.data.sites);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
        <Text style={styles.headerTitle}>Ongoing Sites</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Sites List */}
      <FlatList
        data={sites}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.siteCard}
            onPress={() => {
              navigation.navigate("SiteDetails", { site: item });
            }}
          >
            <View style={styles.siteCardHeader}>
              <View style={styles.siteIconContainer}>
                <FontAwesome5 name="building" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.siteHeaderContent}>
                <Text style={styles.siteName}>{item.siteName}</Text>
                <View style={styles.progressContainer}>
                  <View
                    style={[styles.progressBar, { width: `${item.progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {item.progress}% Complete
                </Text>
              </View>
            </View>

            <View style={styles.siteDetails}>
              <View style={styles.detailItem}>
                <Feather name="map-pin" size={16} color="#666666" />
                <Text style={styles.detailText}>{item.address}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Feather name="users" size={16} color="#666666" />
                  <Text style={styles.detailText}>{item.workers} Workers</Text>
                </View>

                <View style={styles.detailItem}>
                  <Feather name="calendar" size={16} color="#666666" />
                  <Text style={styles.detailText}>
                    Started: {item.startDate}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Feather name="chevron-right" size={20} color="#FF6B00" />
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addSiteButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={18} color="#FF6B00" />
        <Text style={styles.addSiteText}>Add New Construction Site</Text>
      </TouchableOpacity>

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
                onPress={addSite}
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
  listContent: {
    padding: 16,
  },
  siteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  siteCardHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  siteIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  siteHeaderContent: {
    flex: 1,
  },
  siteName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#666666",
  },
  siteDetails: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B00",
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

export default ConstructionSitesScreen;
