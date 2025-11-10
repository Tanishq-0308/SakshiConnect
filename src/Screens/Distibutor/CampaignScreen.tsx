import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";

type CampaignStatus = "All" | "Draft" | "Published" | "Scheduled";

interface Campaign {
  id: string;
  title: string;
  description: string;
  shown: number;
  opens: number;
  status: CampaignStatus;
  gradient: string[];
}

const CampaignScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CampaignStatus>("All");

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Summer Sale Kickoff",
      description: "Targeting all customers in the northern region.",
      shown: 10210,
      opens: 1532,
      status: "Draft",
      gradient: ["#B3E5FC", "#CE93D8"],
    },
    {
      id: "2",
      title: "New Product Launch",
      description: "Introducing the new X-Series line.",
      shown: 50480,
      opens: 8912,
      status: "Published",
      gradient: ["#A8E6CF", "#56C596"],
    },
    {
      id: "3",
      title: "End of Year Clearance",
      description: "Final discounts for the holiday season.",
      shown: 0,
      opens: 0,
      status: "Scheduled",
      gradient: ["#FFE082", "#FFCC80"],
    },
  ];

  const filtered = activeFilter === "All"
    ? campaigns
    : campaigns.filter((c) => c.status === activeFilter);

  const renderCard = (item: Campaign) => (
    <View key={item.id} style={styles.card}>
      <LinearGradient colors={item.gradient} style={styles.cardImage} />
      <Text style={styles.statusLabel}>{item.status}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.meta}>
        Shown: {item.shown}   Opens: {item.opens}
      </Text>

      <View style={styles.buttonRow}>
        {item.status === "Draft" && (
          <>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Publish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.grayBtn}>
              <Text style={styles.grayBtnText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === "Published" && (
          <>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>View Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.grayBtn}>
              <Text style={styles.grayBtnText}>Unpublish</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === "Scheduled" && (
          <>
            <TouchableOpacity style={styles.grayBtn}>
              <Text style={styles.grayBtnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.grayBtn}>
              <Text style={styles.grayBtnText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaigns</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Offline Banner */}
      {/* <View style={styles.offlineBanner}>
        <Ionicons name="wifi-outline" size={18} color="#000" />
        <Text style={styles.offlineText}>
          You are currently offline. Some actions may be disabled.
        </Text>
      </View> */}

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {["All", "Draft", "Published", "Scheduled"].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setActiveFilter(status as CampaignStatus)}
            style={[
              styles.filterBtn,
              activeFilter === status && styles.activeFilterBtn,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === status && styles.activeFilterText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Campaign List */}
      <ScrollView style={{ flex: 1 }}>
        {filtered.length > 0 ? (
          filtered.map(renderCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="megaphone-outline" size={50} color="#999" />
            <Text style={styles.emptyText}>No campaigns yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the button below to create your first campaign.
            </Text>
          </View>
        )}

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>Create New Campaign</Text>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CampaignScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  offlineBanner: {
    backgroundColor: "#FFF8E1",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  offlineText: { fontSize: 12, color: "#000", marginLeft: 6 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginVertical: 10,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  activeFilterBtn: { backgroundColor: "#E3F2FD", borderColor: "#007bff" },
  filterText: { color: "#555", fontSize: 13 },
  activeFilterText: { color: "#007bff", fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  desc: { fontSize: 13, color: "#444", marginVertical: 4 },
  meta: { fontSize: 12, color: "#666" },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  grayBtn: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  grayBtnText: { color: "#333", fontSize: 13, fontWeight: "500" },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  emptySubtext: { color: "#888", fontSize: 13, textAlign: "center" },
  createBtn: {
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    margin: 20,
    borderRadius: 30,
    paddingVertical: 12,
  },
  createBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
