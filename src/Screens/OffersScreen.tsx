import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOrders } from '../context/OrderContext';
import { useInventory } from '../context/InventoryContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const OffersScreen: React.FC = () => {
  const navigation = useNavigation();
  const { addOrder, makeCall } = useOrders();
  const { getAvailableProducts } = useInventory();

  const availableProducts = getAvailableProducts();

  const handleCall = (product: any) => {
    // Create a request order with product details
    addOrder({
      orderer_name: 'User Request',
      orderer_type: 'Customer',
      product_name: product.product_name,
      product_id: product.id,
      quantity: 0, // Will be filled by distributor
      price_per_unit: product.unit_price,
      total_price: 0,
      distributor_name: product.distributor_name,
      distributor_phone: product.distributor_phone,
    });

    // Show confirmation
    Alert.alert(
      'Request Sent',
      `Your call request for ${product.product_name} has been sent to ${product.distributor_name}. They will see it in their Orders tab.`,
      [{ text: 'OK' }]
    );

    // Open dialer
    makeCall(product.distributor_phone, product.distributor_name);
  };

  const handleWhatsApp = (product: any) => {
    // Create a request order
    addOrder({
      orderer_name: 'User Request',
      orderer_type: 'Customer',
      product_name: product.product_name,
      product_id: product.id,
      quantity: 0,
      price_per_unit: product.unit_price,
      total_price: 0,
      distributor_name: product.distributor_name,
      distributor_phone: product.distributor_phone,
    });

    Alert.alert(
      'Request Sent',
      `Your WhatsApp request for ${product.product_name} has been sent to ${product.distributor_name}. They will see it in their Orders tab.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView style={styles.container}>
        {/* Offline Banner */}
        {/* <View style={styles.offlineBanner}>
        <Ionicons name="warning-outline" size={20} color="#A16207" />
        <Text style={styles.offlineText}>
          You're offline. Calls/WhatsApp will be saved and shared when online.
        </Text>
      </View> */}

        {/* Header */}

        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Available Products</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Call/WhatsApp to order. Distributor will enter it; see status in Orders.
          </Text>
        </View>


        {availableProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>No products available</Text>
            <Text style={styles.emptySubtext}>
              Products will appear here when distributors add them
            </Text>
          </View>
        ) : (
          availableProducts.map((product) => (
            <View key={product.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  {product.description && (
                    <Text style={styles.productDescription}>{product.description}</Text>
                  )}
                </View>
                <View style={styles.stockBadge}>
                  <View style={styles.stockDot} />
                  <Text style={styles.stockText}>{product.quantity} in stock</Text>
                </View>
              </View>

              <Text style={styles.distributorName}>{product.distributor_name}</Text>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="cash-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>₹{product.unit_price}/pack</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="cube-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>MOQ: {product.moq} packs</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Lead: {product.lead_time}</Text>
                </View>
                {product.service_areas.length > 0 && (
                  <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={styles.detailText} numberOfLines={1}>
                      {product.service_areas.slice(0, 2).join(', ')}
                    </Text>
                  </View>
                )}
              </View>

              {product.payment_modes.length > 0 && (
                <View style={styles.paymentBadges}>
                  {product.payment_modes.map((mode, idx) => (
                    <View key={idx} style={styles.paymentBadge}>
                      <Text style={styles.paymentBadgeText}>{mode}</Text>
                    </View>
                  ))}
                </View>
              )}

              {product.seller_note && (
                <View style={styles.noteCard}>
                  <Ionicons name="information-circle-outline" size={16} color="#2563EB" />
                  <Text style={styles.noteText}>{product.seller_note}</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(product)}>
                <Ionicons name="call-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Call distributor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => handleWhatsApp(product)}>
                <Ionicons name="logo-whatsapp" size={18} color="#0F766E" />
                <Text style={styles.whatsappText}>WhatsApp distributor</Text>
              </TouchableOpacity>

              <Text style={styles.note}>
                We'll note your request for the distributor.
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
  },
  offlineBanner: {
    backgroundColor: '#FEF9C3',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  offlineText: {
    color: '#713F12',
    flex: 1,
    fontSize: 14,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  productDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  stockText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '500',
  },
  distributorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  paymentBadges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  paymentBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentBadgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  noteText: {
    fontSize: 13,
    color: '#1E40AF',
    flex: 1,
  },
  callButton: {
    backgroundColor: '#06B6D4',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  whatsappButton: {
    backgroundColor: '#ECFEFF',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  whatsappText: {
    color: '#0F766E',
    fontSize: 15,
    fontWeight: '600',
  },
  note: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
    marginTop: 10,
  },
});