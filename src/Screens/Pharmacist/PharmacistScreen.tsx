import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../Navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';


type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const PharmacistScreen = ({ route }: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [showAlert, setShowAlert] = useState(false);
  const currentRoute = route?.name || 'Home';

  const highlights = [
    { id: 1, title: 'Menstrual Cup', image: require('../../images/cup.png') },
    { id: 2, title: 'Cloth Pads', image: require('../../images/reuse.png') },
    { id: 3, title: 'Panty Liners', image: require('../../images/liner.png') },
    { id: 4, title: 'Period Underwear', image: require('../../images/liner.png') },
  ];

  const awareness = [
    { id: 1, title: 'Safe & Sustainable Menstrual Health', image: require('../../images/help group.png') },
    { id: 2, title: 'Reusable Awareness', image: require('../../images/help group.png') },
  ];

  const bestPrice = [
    { id: 1, title: 'Menstrual Cup', image: require('../../images/cup.png'), price: 150 },
    { id: 2, title: 'Cloth Pad', image: require('../../images/liner.png'), price: 180 },
  ];

  const viewed = [
    { id: 1, title: 'Disc', image: require('../../images/liner.png') },
    { id: 2, title: 'Underwear', image: require('../../images/liner.png') },
    { id: 3, title: 'Cloth Pad', image: require('../../images/liner.png') },
    { id: 4, title: 'Cup', image: require('../../images/cup.png') },
    { id: 5, title: 'Panty Liner', image: require('../../images/liner.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100' }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.welcomeText}>Welcome, Anjali</Text>
                <Text style={styles.subText}>Pharmacist Leader</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowAlert(true)} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* PRODUCT HIGHLIGHTS */}
        <Text style={styles.sectionTitle}>Products' Highlights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {highlights.map((item, index) => (
            <View key={item.id} style={styles.highlightCard}>
              <Image source={item.image} style={styles.highlightImage} />
              <Text style={[
                styles.highlightTitle,
                { color: index === 0 ? '#1d4ed8' : index === 1 ? '#15803d' : '#7e22ce' },
              ]}>
                {item.title}
              </Text>
              <Text style={styles.highlightDesc}>
                {index === 0 ? 'Large, 5-pack' : index === 1 ? 'Standard size' : 'Teen size, 3-pack'}
              </Text>
              <Text style={[
                styles.highlightPrice,
                { color: index === 0 ? '#1d4ed8' : index === 1 ? '#15803d' : '#7e22ce' },
              ]}>
                {index === 0 ? '₹250/pack' : index === 1 ? '₹300 each' : '₹180/pack'}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* NEW AWARENESS */}
        <Text style={styles.sectionTitle}>New Awareness</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {awareness.map(item => (
            <View key={item.id} style={styles.awarenessCard}>
              <Image source={item.image} style={styles.awarenessImage} />
              <View style={styles.awarenessTextBox}>
                <Text style={styles.awarenessTitle}>{item.title}</Text>
                <Text style={styles.awarenessDesc}>
                  Learn about the benefits of reusable products for your community.
                </Text>
                <TouchableOpacity style={styles.learnMoreBtn}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* LEARN HOW TO USE */}
        <View style={styles.learnContainer}>
          <Text style={styles.learnTitle}>Learn How To Use</Text>
          {[1, 2, 3].map((_, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.learnCard}>
                <Image source={require('../../images/help group.png')} style={styles.learnImage} />
                <Text style={styles.learnText}>
                  {index === 0
                    ? 'Discover and explore reusable products.'
                    : index === 1
                      ? 'Compare prices and choose the best deal.'
                      : 'Place your order and get products delivered fast.'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* BEST PRICE */}
        <Text style={styles.sectionTitle}>Today's Best Price</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {bestPrice.map(item => (
            <View key={item.id} style={styles.bestPriceCard}>
              <Image source={item.image} style={styles.bestPriceImage} resizeMode="cover" />
              <View style={styles.bestPriceTextBox}>
                <Text style={styles.bestPriceTitle}>{item.title}</Text>
                <Text style={styles.bestPricePrice}>
                  ₹{item.price}{' '}
                  <Text style={styles.strikePrice}>₹199</Text>
                </Text>
                <Text style={styles.bestPriceVendor}>by EcoFlow Distributors</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* YOU VIEWED */}
        <Text style={styles.sectionTitle}>You viewed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {viewed.map(item => (
            <View key={item.id} style={styles.viewedCard}>
              <View style={styles.viewedImageBox}>
                <Image source={item.image} style={styles.viewedImage} />
              </View>
              <Text style={styles.viewedText}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* FOOTER NAVBAR */}
      {/* <Footer /> */}

      {/* ALERT MODAL - FIXED */}
      <Modal visible={showAlert} transparent animationType="fade" onRequestClose={() => setShowAlert(false)}>
        <TouchableWithoutFeedback onPress={() => setShowAlert(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Alerts</Text>

                <View style={styles.alertWarning}>
                  <Ionicons name="warning-outline" size={22} color="#ff8c00" style={styles.alertIcon} />
                  <Text style={styles.alertText}>Low stock on Cloth Pads — only 5 units left.</Text>
                </View>

                <View style={styles.alertInfo}>
                  <Ionicons name="information-circle-outline" size={22} color="#0284c7" style={styles.alertIcon} />
                  <Text style={styles.alertText}>New awareness content added — check "Reusable Awareness".</Text>
                </View>

                <View style={styles.alertSuccess}>
                  <Ionicons name="checkmark-circle-outline" size={22} color="#16a34a" style={styles.alertIcon} />
                  <Text style={styles.alertText}>Restock successful — Cloth Pads added to inventory.</Text>
                </View>

                <TouchableOpacity onPress={() => setShowAlert(false)} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default PharmacistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f901',  },
  scrollContent: { padding: 12, paddingBottom: 120 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc',
    paddingVertical: 10, paddingHorizontal: 12, width: '100%',
  },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 44, height: 44, borderRadius: 22, marginRight: 10, borderWidth: 1, borderColor: '#ddd' },
  welcomeText: { fontSize: 18, fontWeight: '700', color: '#c0342e' },
  subText: { color: '#666' },
  iconButton: { padding: 8 },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  horizontalScroll: { marginBottom: 18 },

  highlightCard: {
    width: 160, marginRight: 12, backgroundColor: '#fff', borderRadius: 16,
    padding: 10, borderWidth: 0.8, borderColor: '#eee', elevation: 1,
  },
  highlightImage: { width: '100%', height: 90, borderRadius: 12, marginBottom: 8, resizeMode: 'contain' },
  highlightTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  highlightDesc: { color: '#666', fontSize: 12, marginBottom: 4 },
  highlightPrice: { fontWeight: '700', fontSize: 13 },

  awarenessCard: { width: 385, height: 270, marginRight: 12, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 4 },
  awarenessImage: { width: '100%', height: 140 },
  awarenessTextBox: { padding: 12 },
  awarenessTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  awarenessDesc: { color: '#555', marginBottom: 10 },
  learnMoreBtn: { backgroundColor: '#ff8c00', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  learnMoreText: { color: '#fff', fontWeight: '700' },

  learnContainer: { padding: 16, backgroundColor: '#f2f2f2' },
  learnTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  learnCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12,
    marginBottom: 16, height: 50,
  },
  learnImage: { width: '40%', height: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginRight: 12 },
  learnText: { flex: 1, fontSize: 16, fontWeight: '600' },

  bestPriceCard: {
    width: 250, height: 90, marginRight: 12, backgroundColor: '#fff', borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', padding: 10, elevation: 3,
  },
  bestPriceImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  bestPriceTextBox: { flex: 1 },
  bestPriceTitle: { fontWeight: '700', fontSize: 14 },
  bestPricePrice: { color: '#22c55ef6', fontWeight: '700', fontSize: 17 },
  strikePrice: { color: '#36343475', textDecorationLine: 'line-through', fontSize: 15 },
  bestPriceVendor: { color: '#555', fontSize: 12, fontWeight: '700' },

  viewedCard: { width: 110, marginRight: 14, alignItems: 'center' },
  viewedImageBox: { width: 98, height: 98, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  viewedImage: { width: 72, height: 72, resizeMode: 'contain' },
  viewedText: { marginTop: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 18 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#c0342e', marginBottom: 10, textAlign: 'center' },
  alertWarning: { backgroundColor: '#fff4e6', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  alertInfo: { backgroundColor: '#e0f7ff', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  alertSuccess: { backgroundColor: '#ecfdf5', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  alertIcon: { marginRight: 8 },
  alertText: { flex: 1, fontWeight: '600' },
  closeBtn: { backgroundColor: '#ff8c00', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  closeBtnText: { color: '#fff', fontWeight: '700' },
});