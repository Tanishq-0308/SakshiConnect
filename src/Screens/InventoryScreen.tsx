import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../Navigation/types';
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const InventoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const activities = [
    { id: 1, type: 'add', product: 'Product A', qty: '+15', status: 'Delivered', time: '10:32 AM' },
    { id: 2, type: 'remove', product: 'Product B', qty: '-2', status: 'Local Sale', time: '9:55 AM' },
    { id: 3, type: 'edit', product: 'Product C', qty: '+1', status: 'Manual Edit', time: 'Yesterday' },
    { id: 4, type: 'add', product: 'Product D', qty: '+50', status: 'Delivered', time: 'Yesterday' },
    { id: 5, type: 'remove', product: 'Product A', qty: '-1', status: 'Local Sale', time: '2 days ago' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Inventory</Text>
          <Ionicons name="qr-code-outline" size={22} color="#007bff" />
        </View>

        {/* Offline Alert */}
        {/* <View style={styles.alertBox}>
          <Ionicons name="warning-outline" size={20} color="#ff9800" style={{ marginRight: 6 }} />
          <Text style={styles.alertText}>
            You are currently offline. Changes will sync later.
          </Text>
        </View> */}

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <TouchableOpacity onPress={()=>navigation.navigate('OdersScreen')}>
            <Ionicons name="cube-outline" size={24} color="#007bff" />
            <Text style={styles.cardTitle}>Orders</Text>
            </TouchableOpacity>
            <Text style={styles.cardSubtitle}>Placed via distributor</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2 pending</Text>
            </View>
            
          </View>

          <View style={styles.card} >
            <Ionicons name="archive-outline" size={24} color="#007bff" onPress={() => navigation.navigate('StockManagePage')} />
            <Text style={styles.cardTitle}>Stock</Text>
            <Text style={styles.cardSubtitle}>Auto-added on delivery</Text>
            <View style={[styles.badge, { backgroundColor: '#e8f0ff' }]}>
              <Text style={[styles.badgeText, { color: '#007bff' }]}>5 items</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityList}>
          {activities.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <View style={[styles.iconCircle,
                item.type === 'add' ? styles.greenCircle :
                item.type === 'remove' ? styles.redCircle :
                styles.grayCircle
              ]}>
                <Ionicons
                  name={
                    item.type === 'add' ? 'add' :
                    item.type === 'remove' ? 'remove' : 'create-outline'
                  }
                  size={14}
                  color={item.type === 'edit' ? '#555' : '#000'}
                />
              </View>

              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>
                  {item.qty} {item.product}
                </Text>
                <Text style={styles.activitySub}>
                  {item.status} • {item.time}
                </Text>
              </View>

              <TouchableOpacity>
                <Text style={styles.viewBtn}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#111' },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  alertText: {
    color: '#856404',
    flex: 1,
    fontSize: 13,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 0.48,
    backgroundColor: '#f8f9fb',
    borderRadius: 14,
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    color: '#111',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#007bff20',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, color: '#007bff', fontWeight: '500' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  activityList: { marginBottom: 40 },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  greenCircle: { backgroundColor: '#d4f8e8' },
  redCircle: { backgroundColor: '#fde8e8' },
  grayCircle: { backgroundColor: '#f1f1f1' },
  activityDetails: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '600', color: '#111' },
  activitySub: { fontSize: 12, color: '#666' },
  viewBtn: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default InventoryScreen;
