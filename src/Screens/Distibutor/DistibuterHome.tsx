import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getOrders, acceptOrder, dispatchOrder, deliverOrder, Order } from '../../api/client';

// Other screens
import ManageOrder from './ManageOrder';
import CampaignScreen from './CampaignScreen';
import AnalyticsScreen from './AnalyticsScreen';
import DistProfileScreen from './DistProfileScreen';

const DistributorBottomTabs = ({ distributorId = 1 }) => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [selectedTab, setSelectedTab] = useState<'Requests' | 'Pending' | 'Dispatch' | 'Delivered'>('Requests');
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders(String(distributorId));
      setOrders(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load orders');
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
    if (activeTab === 'Orders') {
      loadOrders();
    }
  }, [activeTab]);

  const getStatusFromTab = () => {
    switch (selectedTab) {
      case 'Requests':
        return 'pending';
      case 'Pending':
        return 'accepted';
      case 'Dispatch':
        return 'dispatched';
      case 'Delivered':
        return 'delivered';
      default:
        return 'pending';
    }
  };

  const filteredOrders = orders.filter(order => order.status === getStatusFromTab());

  const handleAcceptOrder = async (orderId: string) => {
    Alert.alert(
      'Accept Order',
      'Are you sure you want to accept this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              setProcessingOrderId(orderId);
              await acceptOrder(orderId);
              Alert.alert('Success', 'Order accepted successfully!');
              await loadOrders();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to accept order');
            } finally {
              setProcessingOrderId(null);
            }
          },
        },
      ]
    );
  };

  const handleDispatchOrder = async (orderId: string) => {
    Alert.alert(
      'Dispatch Order',
      'Mark this order as dispatched?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dispatch',
          onPress: async () => {
            try {
              setProcessingOrderId(orderId);
              await dispatchOrder(orderId);
              Alert.alert('Success', 'Order dispatched successfully!');
              await loadOrders();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to dispatch order');
            } finally {
              setProcessingOrderId(null);
            }
          },
        },
      ]
    );
  };

  const handleDeliverOrder = async (orderId: string, productName: string, quantity: number) => {
    Alert.alert(
      'Deliver Order',
      `Confirm delivery?\n\n⚠️ This will:\n• Deduct ${quantity} units from your inventory\n• Add ${quantity} units to user's stock\n• Mark order as delivered`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Delivery',
          style: 'default',
          onPress: async () => {
            try {
              setProcessingOrderId(orderId);
              await deliverOrder(orderId);
              Alert.alert(
                'Success',
                `Order delivered!\n\nStock transferred:\n• Your inventory: -${quantity} ${productName}\n• User stock: +${quantity} ${productName}`,
                [{ text: 'OK', onPress: () => loadOrders() }]
              );
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to deliver order');
            } finally {
              setProcessingOrderId(null);
            }
          },
        },
      ]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: '#FEF3C7' };
      case 'accepted':
        return { backgroundColor: '#DBEAFE' };
      case 'dispatched':
        return { backgroundColor: '#E0E7FF' };
      case 'delivered':
        return { backgroundColor: '#D1FAE5' };
      default:
        return { backgroundColor: '#F3F4F6' };
    }
  };

  const renderActionButton = (order: Order) => {
    const isProcessing = processingOrderId === order.order_id;

    if (isProcessing) {
      return (
        <View style={styles.actionButton}>
          <ActivityIndicator color="#FFF" />
        </View>
      );
    }

    switch (order.status) {
      case 'pending':
        return (
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleAcceptOrder(order.order_id)}>
            <Ionicons name="checkmark-circle" size={18} color="#fff" />
            <Text style={styles.buttonText}>Accept Order</Text>
          </TouchableOpacity>
        );
      case 'accepted':
        return (
          <TouchableOpacity
            style={[styles.actionButton, styles.dispatchButton]}
            onPress={() => handleDispatchOrder(order.order_id)}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.buttonText}>Mark as Dispatched</Text>
          </TouchableOpacity>
        );
      case 'dispatched':
        return (
          <TouchableOpacity
            style={[styles.actionButton, styles.deliverButton]}
            onPress={() => handleDeliverOrder(order.order_id, order.product_name, order.quantity)}>
            <Ionicons name="checkmark-done" size={18} color="#fff" />
            <Text style={styles.buttonText}>Mark as Delivered</Text>
          </TouchableOpacity>
        );
      case 'delivered':
        return (
          <View style={[styles.actionButton, styles.completedButton]}>
            <Text style={styles.buttonText}>✓ Completed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderOrders = () => (
    <View style={{ flex: 1 }}>
      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}>
          {['Requests', 'Pending', 'Dispatch', 'Delivered'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
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
        </ScrollView>
      </View>

      {/* Orders List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00E676" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={60} color="#CCC" />
              <Text style={styles.emptyText}>No Orders Found</Text>
              <Text style={styles.emptySubtext}>
                {selectedTab === 'Requests'
                  ? 'New order requests will appear here'
                  : selectedTab === 'Pending'
                  ? 'Accepted orders being prepared'
                  : selectedTab === 'Dispatch'
                  ? 'Dispatched orders on the way'
                  : 'Completed deliveries will appear here'}
              </Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderTitle}>
                      Order #{order.order_id}
                    </Text>
                    <Text style={styles.ordererName}>{order.user_id}</Text>
                  </View>
                  <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                    <Text style={styles.statusText}>
                      {order.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.orderDetail}>
                  Product: <Text style={styles.bold}>{order.product_name}</Text>
                </Text>
                <Text style={styles.orderDetail}>
                  Quantity: <Text style={styles.bold}>{order.quantity} units</Text>
                </Text>
                <Text style={styles.orderDetail}>
                  Price: <Text style={styles.bold}>₹{order.price} / unit</Text>
                </Text>
                <Text style={styles.orderDetail}>
                  Total: <Text style={styles.bold}>₹{order.total_amount?.toLocaleString()}</Text>
                </Text>
                <Text style={styles.orderDetail}>
                  Payment: {order.payment_mode}
                </Text>
                <Text style={styles.orderDetail}>
                  Address: {order.delivery_address}
                </Text>
                <Text style={styles.orderDetail}>
                  Date: {new Date(order.created_at).toLocaleString()}
                </Text>

                {/* Action Button */}
                <View style={styles.buttonRow}>
                  {renderActionButton(order)}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );

  const renderScreen = () => {
    switch (activeTab) {
      case 'Orders':
        return renderOrders();
      case 'Inventory':
        return <ManageOrder distributorId={distributorId} />;
      case 'Campaign':
        return <CampaignScreen />;
      case 'Analytics':
        return <AnalyticsScreen />;
      case 'Profile':
        return <DistProfileScreen />;
      default:
        return renderOrders();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {renderScreen()}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {[
            { name: 'Orders', icon: 'cube-outline', filled: 'cube' },
            { name: 'Inventory', icon: 'layers-outline', filled: 'layers' },
            { name: 'Campaign', icon: 'megaphone-outline', filled: 'megaphone' },
            { name: 'Profile', icon: 'person-outline', filled: 'person' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => setActiveTab(tab.name)}>
              <Ionicons
                name={activeTab === tab.name ? tab.filled : tab.icon}
                size={24}
                color={activeTab === tab.name ? '#00E676' : '#777'}
              />
              <Text
                style={[
                  styles.navLabel,
                  activeTab === tab.name && styles.navLabelActive,
                ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  tabsWrapper: { backgroundColor: '#FFF', paddingVertical: 10 },
  tabsContainer: { paddingHorizontal: 16 },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  tabActive: { backgroundColor: '#00E676' },
  tabText: { color: '#333', fontWeight: '500' },
  tabTextActive: { color: '#000', fontWeight: '700' },
  content: { padding: 16, flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtext: {
    textAlign: 'center',
    marginTop: 8,
    color: '#BBB',
    fontSize: 14,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  ordererName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  orderDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  bold: { fontWeight: '600', color: '#000' },
  buttonRow: {
    marginTop: 14,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  acceptButton: {
    backgroundColor: '#00E676',
  },
  dispatchButton: {
    backgroundColor: '#3B82F6',
  },
  deliverButton: {
    backgroundColor: '#10B981',
  },
  completedButton: {
    backgroundColor: '#666',
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingVertical: 10,
  },
  navItem: { flex: 1, alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#777', marginTop: 4 },
  navLabelActive: {
    fontSize: 12,
    color: '#00E676',
    fontWeight: '700',
    marginTop: 4,
  },
});

export default DistributorBottomTabs;