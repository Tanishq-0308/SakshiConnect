import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackParamList } from '../../Navigation/types';

type NavigationType = NativeStackNavigationProp<MainStackParamList>;

const ProfileScreen = () => {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [lowStock, setLowStock] = useState(false);
  const [paymentPreference, setPaymentPreference] = useState('COD');
  const [language, setLanguage] = useState('English');
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.container}>
      {/* Offline Banner */}
      {/* <View style={styles.offlineBanner}>
        <Text style={styles.offlineText}>⚠️ Offline. Changes will sync later.</Text>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.title}>Profile</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require('..//../images/logo.png')} // replace with your image
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Anjali Pharmacy</Text>
            <Text style={styles.profileId}>ID: OUT-1023</Text>
            <Text style={styles.outletTag}>Outlet</Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.contactBox}>
          <Ionicons name="call-outline" size={18} color="#374151" />
          <Text style={styles.contactText}>+91 98765 43210</Text>
        </View>

        {/* Language */}
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, language === 'English' && styles.activeBtn]}
            onPress={() => setLanguage('English')}>
            <Text
              style={[
                styles.toggleText,
                language === 'English' && styles.activeText,
              ]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, language === 'Hindi' && styles.activeBtn]}
            onPress={() => setLanguage('Hindi')}>
            <Text
              style={[
                styles.toggleText,
                language === 'Hindi' && styles.activeText,
              ]}>
              हिन्दी
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, language === 'Odia' && styles.activeBtn]}
            onPress={() => setLanguage('Odia')}>
            <Text
              style={[
                styles.toggleText,
                language === 'Odia' && styles.activeText,
              ]}>
              ଓଡ଼ିଆ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            Shop No. 4, Main Market Road, Near City Hospital, Bhubaneswar, Odisha
          </Text>
          <Text style={styles.pincode}>Pincode</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>751010</Text>
          </View>
          <Text style={styles.subNote}>
            Service area is based on your pincode.
          </Text>
        </View>

        {/* Payment Preference */}
        <Text style={styles.sectionTitle}>Payment Preference</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, paymentPreference === 'COD' && styles.activeBtn]}
            onPress={() => setPaymentPreference('COD')}>
            <Text
              style={[
                styles.toggleText,
                paymentPreference === 'COD' && styles.activeText,
              ]}>
              Cash on Delivery (COD)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, paymentPreference === 'UPI' && styles.activeBtn]}
            onPress={() => setPaymentPreference('UPI')}>
            <Text
              style={[
                styles.toggleText,
                paymentPreference === 'UPI' && styles.activeText,
              ]}>
              UPI
            </Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>This Month's Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>42</Text>
            <Text style={styles.summaryLabel}>Orders placed</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>38</Text>
            <Text style={styles.summaryLabel}>Delivered</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>5</Text>
            <Text style={styles.summaryLabel}>Low stock</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>12</Text>
            <Text style={styles.summaryLabel}>Local sales</Text>
          </View>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notifyRow}>
          <Text style={styles.notifyLabel}>Order updates</Text>
          <Switch value={orderUpdates} onValueChange={setOrderUpdates} />
        </View>
        <View style={styles.notifyRow}>
          <Text style={styles.notifyLabel}>Low stock alerts</Text>
          <Switch value={lowStock} onValueChange={setLowStock} />
        </View>

        {/* Support */}
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.supportBtn}>
          <Ionicons name="call-outline" size={18} color="#374151" />
          <Text style={styles.supportText}>Call support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn}>
          <Ionicons name="logo-whatsapp" size={18} color="#22C55E" />
          <Text style={styles.supportText}>WhatsApp support</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={()=>navigation.navigate('LoginPage')}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  offlineBanner: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 8,
    alignItems: 'center',
  },
  offlineText: { color: '#92400E', fontSize: 13 },
  title: { fontSize: 22, fontWeight: '700', margin: 16, color: '#111827' },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  profileImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  profileId: { fontSize: 13, color: '#6B7280', marginVertical: 2 },
  outletTag: {
    backgroundColor: '#E0E7FF',
    color: '#1E3A8A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
  },
  contactBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
  },
  contactText: { marginLeft: 10, fontSize: 14, color: '#111827' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 16,
    marginTop: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleText: { color: '#374151', fontSize: 13, fontWeight: '500' },
  activeBtn: { backgroundColor: '#2563EB' },
  activeText: { color: '#fff' },
  addressBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 10,
    elevation: 1,
  },
  addressText: { fontSize: 14, color: '#111827', marginBottom: 8 },
  pincode: { fontSize: 13, color: '#6B7280' },
  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  inputText: { color: '#111827' },
  subNote: { color: '#6B7280', fontSize: 12 },
  summaryBox: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 1,
  },
  summaryItem: { width: '48%', paddingVertical: 10, alignItems: 'center' },
  summaryNumber: { fontSize: 20, fontWeight: '700', color: '#111827' },
  summaryLabel: { fontSize: 13, color: '#6B7280' },
  notifyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  notifyLabel: { fontSize: 14, color: '#111827' },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  supportText: { marginLeft: 8, fontSize: 14, color: '#111827' },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    margin: 16,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: { color: '#DC2626', fontWeight: '700', marginLeft: 6 },
});
