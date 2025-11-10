import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOrders, Order } from '../../context/OrderContext';
import { useInventory } from '../../context/InventoryContext';
import CreateOrderForm from '../../components/CreateOrderForm';

// Other screens (replace with real ones)
import ManageOrder from './ManageOrder';
import CampaignScreen from './CampaignScreen';
import AnalyticsScreen from './AnalyticsScreen';
import DistProfileScreen from './DistProfileScreen';

const DistributorBottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [selectedTab, setSelectedTab] = useState<'Requests' | 'Pending' | 'Dispatch' | 'Delivered'>('Requests');
  
  const { getOrdersByStatus, updateOrderStatus, updateOrderDetails } = useOrders();
  const { reduceInventory, addToUserStock } = useInventory();

  // Form modal state
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusFromTab = () => {
    switch (selectedTab) {
      case 'Requests':
        return 'placed';
      case 'Pending':
        return 'accepted';
      case 'Dispatch':
        return 'dispatched';
      case 'Delivered':
        return 'delivered';
      default:
        return 'placed';
    }
  };

  const orders = getOrdersByStatus(getStatusFromTab());

  const handleAcceptOrder = (order: any) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleFormSubmit = (orderDetails: {
    orderer_name: string;
    product_name: string;
    quantity: number;
    price_per_unit: number;
    total_price: number;
  }) => {
    if (selectedOrder) {
      // Update order with details and move to accepted status
      updateOrderDetails(selectedOrder.id, orderDetails);
      updateOrderStatus(selectedOrder.id, 'accepted');
      
      Alert.alert(
        'Success',
        `Order #${selectedOrder.id} has been accepted and moved to Pending!`
      );
    }
    setShowForm(false);
    setSelectedOrder(null);
  };

  const handleDispatchOrder = (orderId: number) => {
    updateOrderStatus(orderId, 'dispatched');
    Alert.alert('Success', `Order #${orderId} has been dispatched!`);
  };

  const handleDeliverOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Reduce inventory if product_id exists
    if (order.product_id) {
      reduceInventory(order.product_id, order.quantity);
    }

    // Add to user stock
    addToUserStock({
      product_name: order.product_name,
      quantity: order.quantity,
      distributor_name: order.distributor_name,
      order_id: order.id,
    });

    // Update order status to delivered
    updateOrderStatus(orderId, 'delivered');

    Alert.alert(
      'Success',
      `Order #${orderId} delivered!\n\nInventory reduced by ${order.quantity} units.\nAdded to user's stock.`
    );
  };

  const handleRejectOrder = (orderId: number) => {
    Alert.alert(
      'Reject Order',
      `Are you sure you want to reject Order #${orderId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            // Remove order by updating to a rejected status or filter it out
            Alert.alert('Rejected', `Order #${orderId} has been rejected.`);
          },
        },
      ]
    );
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
      <ScrollView style={styles.content}>
        {orders.length === 0 ? (
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
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderTitle}>
                    Order #{order.id}
                  </Text>
                  <Text style={styles.ordererName}>{order.orderer_name}</Text>
                </View>
                <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                  <Text style={styles.statusText}>
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {order.product_name && order.quantity > 0 ? (
                <>
                  <Text style={styles.orderDetail}>
                    Product: <Text style={styles.bold}>{order.product_name}</Text>
                  </Text>
                  <Text style={styles.orderDetail}>
                    Quantity: <Text style={styles.bold}>{order.quantity} packs</Text>
                  </Text>
                  <Text style={styles.orderDetail}>
                    Price: <Text style={styles.bold}>₹{order.price_per_unit} / pack</Text>
                  </Text>
                  <Text style={styles.orderDetail}>
                    Total: <Text style={styles.bold}>₹{order.total_price?.toLocaleString()}</Text>
                  </Text>
                </>
              ) : (
                <View style={styles.pendingDetails}>
                  <Ionicons name="information-circle-outline" size={18} color="#F59E0B" />
                  <Text style={styles.pendingText}>
                    Awaiting order details
                  </Text>
                </View>
              )}

              <Text style={styles.orderDetail}>
                Type: {order.orderer_type}
              </Text>
              <Text style={styles.orderDetail}>
                Date: {new Date(order.created_at).toLocaleString()}
              </Text>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                {order.status === 'placed' && (
                  <>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAcceptOrder(order)}>
                      <Ionicons name="checkmark-circle" size={18} color="#fff" />
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleRejectOrder(order.id)}>
                      <Ionicons name="close-circle" size={18} color="#B71C1C" />
                      <Text style={styles.buttonTextReject}>Reject</Text>
                    </TouchableOpacity>
                  </>
                )}

                {order.status === 'accepted' && (
                  <TouchableOpacity
                    style={styles.dispatchButton}
                    onPress={() => handleDispatchOrder(order.id)}>
                    <Ionicons name="send" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Mark as Dispatched</Text>
                  </TouchableOpacity>
                )}

                {order.status === 'dispatched' && (
                  <TouchableOpacity
                    style={styles.deliverButton}
                    onPress={() => handleDeliverOrder(order.id)}>
                    <Ionicons name="checkmark-done" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Mark as Delivered</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Create Order Form Modal */}
      <CreateOrderForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedOrder(null);
        }}
        onSubmit={handleFormSubmit}
        ordererName={selectedOrder?.orderer_name || 'Customer'}
      />
    </View>
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'placed':
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

  const renderScreen = () => {
    switch (activeTab) {
      case 'Orders':
        return renderOrders();
      case 'Inventory':
        return <ManageOrder />;
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
  pendingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    gap: 8,
  },
  pendingText: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#00E676',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dispatchButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  deliverButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFCDD2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  buttonTextReject: { color: '#B71C1C', fontWeight: '700', fontSize: 14 },
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