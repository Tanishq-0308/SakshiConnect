import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParamList } from '../../Navigation/types';
// Icon components (you can replace with react-native-vector-icons)
const Icon = ({ name, size = 24, color = '#000' }: { name: string; size?: number; color?: string }) => (
  <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }} />
);

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function DistProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isOnline, setIsOnline] = useState(false);
  const [showContactInOffers, setShowContactInOffers] = useState(true);
  const [serviceAreas] = useState(['Cuttack', 'Khordha']);

  const stats = [
    { value: '124', label: 'New orders' },
    { value: '112', label: 'Dispatched' },
    { value: '108', label: 'Delivered' },
    { value: '3', label: 'OOS SKUs' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Offline Banner */}
        {/* {!isOnline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineIcon}>⚡</Text>
            <Text style={styles.offlineText}>Offline. Changes will sync later.</Text>
          </View>
        )} */}

        <View style={styles.content}>
          {/* Distributor Info Card */}
          <View style={styles.card}>
            <View style={styles.distributorInfo}>
              <View style={styles.iconContainer}>
                <Text style={styles.storeIcon}>🏪</Text>
              </View>
              <View style={styles.distributorDetails}>
                <View style={styles.distributorHeader}>
                  <View style={styles.flex1}>
                    <Text style={styles.distributorName}>Shakti Distributors</Text>
                    <Text style={styles.phone}>+91 12345 67890</Text>
                    <Text style={styles.email}>shakti.dist@example.com</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Service Areas */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service areas</Text>
            <View style={styles.serviceAreasContainer}>
              {serviceAreas.map((area, index) => (
                <View key={index} style={styles.serviceAreaChip}>
                  <Text style={styles.serviceAreaText}>{area}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Modes */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Accepted payment modes</Text>
            <View style={styles.paymentModesContainer}>
              <View style={styles.paymentModeActive}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.paymentModeActiveText}>Cash on Delivery</Text>
              </View>
              <View style={styles.paymentModeInactive}>
                <Text style={styles.paymentModeInactiveText}>UPI</Text>
              </View>
            </View>
          </View>

          {/* Visibility Toggle */}
          <View style={styles.card}>
            <View style={styles.visibilityContainer}>
              <View>
                <Text style={styles.cardTitle}>Visibility</Text>
                <Text style={styles.visibilitySubtext}>Show contact in Offers</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowContactInOffers(!showContactInOffers)}
                style={[
                  styles.toggleSwitch,
                  showContactInOffers ? styles.toggleActive : styles.toggleInactive,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    showContactInOffers && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* This Month's Summary */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>This Month's Summary</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Need Help */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Need help?</Text>
            <View style={styles.helpButtons}>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpIcon}>📞</Text>
                <Text style={styles.helpButtonText}>Call support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpIcon}>💬</Text>
                <Text style={styles.helpButtonText}>WhatsApp support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={()=>navigation.navigate('LoginPage')}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  menuButton: {
    padding: 8,
  },
  menuDot: {
    width: 4,
    height: 4,
    backgroundColor: '#4b5563',
    borderRadius: 2,
    marginVertical: 2,
  },
  scrollView: {
    flex: 1,
  },
  offlineBanner: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  offlineIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  offlineText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  distributorInfo: {
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  storeIcon: {
    fontSize: 32,
  },
  distributorDetails: {
    flex: 1,
  },
  distributorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  distributorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  phone: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  serviceAreasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceAreaChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  serviceAreaText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#22d3ee',
    borderStyle: 'dashed',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#06b6d4',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentModesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentModeActive: {
    backgroundColor: '#cffafe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    color: '#0891b2',
    marginRight: 8,
    fontWeight: '600',
  },
  paymentModeActiveText: {
    color: '#0891b2',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentModeInactive: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paymentModeInactiveText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilitySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#06b6d4',
  },
  toggleInactive: {
    backgroundColor: '#d1d5db',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  toggleThumbActive: {
    marginLeft: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  helpButtons: {
    gap: 8,
  },
  helpButton: {
    backgroundColor: '#ecfeff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  helpButtonText: {
    color: '#0891b2',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fef2f2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoutText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#06b6d4',
  },
});