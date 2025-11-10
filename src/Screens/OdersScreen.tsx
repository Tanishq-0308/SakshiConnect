import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getOrders, Order } from '../api/client';

const OrdersScreen = ({ userId = 'USER001' }) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'Pending' | 'Dispatched' | 'Delivered'>('Pending');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders(undefined, userId);
      setOrders(data);
    } catch (error: any) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadOrders();
  }, []);

  const getOrdersByTab = (tab: string) => {
    switch (tab) {
      case 'Pending':
        return orders.filter(order => order.status === 'accepted' || order.status === 'pending');
      case 'Dispatched':
        return orders.filter(order => order.status === 'dispatched');
      case 'Delivered':
        return orders.filter(order => order.status === 'delivered');
      default:
        return [];
    }
  };

  const currentOrders = getOrdersByTab(selectedTab);
  const deliveredOrders = getOrdersByTab('Delivered');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (tab: string) => {
    switch (tab) {
      case 'Pending':
        return styles.badgePending;
      case 'Dispatched':
        return styles.badgeDispatched;
      case 'Delivered':
        return styles.badgeDelivered;
      default:
        return styles.badgePending;
    }
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Tabs */}
        <View style={styles.tabs}>
          {['Pending', 'Dispatched', 'Delivered'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab as any)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Orders */}
        <View style={styles.listContainer}>
          {currentOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="cube-outline" size={50} color="#CCC" />
              <Text style={styles.emptyText}>No {selectedTab} orders</Text>
              <Text style={styles.emptySubtext}>
                {selectedTab === 'Pending' 
                  ? 'Orders will appear here when placed'
                  : selectedTab === 'Dispatched'
                  ? 'Dispatched orders will appear here'
                  : 'Delivered orders will appear here'}
              </Text>
            </View>
          ) : (
            currentOrders.map(order => (
              <View key={order.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.company}>Distributor: {order.distributor_id}</Text>
                    <Text style={styles.productName}>{order.product_name}</Text>
                  </View>
                  <View style={[styles.statusBadge, getStatusColor(selectedTab)]}>
                    <Text style={styles.badgeText}>{selectedTab}</Text>
                  </View>
                </View>

                <Text style={styles.details}>
                  Order ID: {order.order_id} • {formatDate(order.created_at)}
                </Text>
                <Text style={styles.details}>
                  {order.quantity} units • ₹{order.total_amount?.toLocaleString() || 0}
                </Text>
                <Text style={styles.details}>
                  Payment: {order.payment_mode}
                </Text>

                {/* Order Progress Indicator */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: order.status === 'pending' ? '25%'
                               : order.status === 'accepted' ? '50%' 
                               : order.status === 'dispatched' ? '75%' 
                               : '100%' 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {order.status === 'pending' 
                      ? 'Order placed' 
                      : order.status === 'accepted' 
                      ? 'Being prepared' 
                      : order.status === 'dispatched' 
                      ? 'On the way' 
                      : 'Delivered'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Past Orders Section */}
        {selectedTab !== 'Delivered' && deliveredOrders.length > 0 && (
          <View style={styles.pastOrdersSection}>
            <Text style={styles.sectionTitle}>Past Orders</Text>
            {deliveredOrders.slice(0, 3).map(order => (
              <View key={order.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.company}>Distributor: {order.distributor_id}</Text>
                    <Text style={styles.productName}>{order.product_name}</Text>
                  </View>
                  <View style={[styles.statusBadge, styles.badgeDelivered]}>
                    <Text style={styles.badgeText}>Delivered</Text>
                  </View>
                </View>

                <Text style={styles.details}>
                  Order ID: {order.order_id} • {formatDate(order.created_at)}
                </Text>
                <Text style={styles.details}>
                  {order.quantity} units • ₹{order.total_amount?.toLocaleString() || 0}
                </Text>
              </View>
            ))}

            {deliveredOrders.length > 3 && (
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => setSelectedTab('Delivered')}>
                <Text style={styles.viewAllText}>
                  View all {deliveredOrders.length} delivered orders
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#2563EB" />
              </TouchableOpacity>
            )}

            <Text style={styles.noteText}>
              Delivered orders add to stock automatically.
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  tabButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  productName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  badgePending: { backgroundColor: '#FBBF24' },
  badgeDispatched: { backgroundColor: '#60A5FA' },
  badgeDelivered: { backgroundColor: '#34D399' },
  details: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  pastOrdersSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  viewAllText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  noteText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginVertical: 16,
    fontSize: 12,
  },
});