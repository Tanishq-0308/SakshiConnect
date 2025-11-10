import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../Navigation/types';
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const ShopScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SakshiConnect Shop</Text>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="call-outline" size={20} color="#374151" />
          <Text style={styles.infoText}>
            Compare prices, then Call or WhatsApp to order.
          </Text>
          <Ionicons name="logo-whatsapp" size={22} color="#22C55E" />
        </View>

        {/* Product Grid (Manual - no map) */}
        <View style={styles.grid}>
          <TouchableOpacity onPress={()=>navigation.navigate('OffersScreen')} style={styles.card}>
            <Image source={require('../images/MenstrualCup.png')} style={styles.image} />
            <Text style={styles.productName}>Menstrual Cup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../images/ReusablePad.png')} style={styles.image} />
            <Text style={styles.productName}>Reusable Pads</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../images/reuse.png')} style={styles.image} />
            <Text style={styles.productName}>Period Panties</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../images/Straterkit.png')} style={styles.image} />
            <Text style={styles.productName}>Starter Kit</Text>
          </TouchableOpacity>
        </View>

        {/* Recently Viewed */}
        <View style={styles.recentlyViewed}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <View style={styles.recentItems}>
            <View style={styles.recentTag}>
              <Ionicons name="egg-outline" size={16} color="#F87171" />
              <Text style={styles.recentText}>Beginner’s Cup</Text>
            </View>

            <View style={styles.recentTag}>
              <Ionicons name="leaf-outline" size={16} color="#F87171" />
              <Text style={styles.recentText}>Eco-friendly Pads</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  infoBanner: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  card: {
    width: '42%',
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  recentlyViewed: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  recentItems: {
    flexDirection: 'row',
  },
  recentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  recentText: {
    fontSize: 13,
    color: '#374151',
    marginLeft: 6,
  },
});
