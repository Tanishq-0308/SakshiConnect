import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getInventory, createOrder, Product } from '../api/client';

const OffersScreen: React.FC<{ userId?: string }> = ({ userId = 'USER001' }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get only enabled products with stock
      const data = await getInventory(undefined, true);
      setProducts(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const handlePlaceOrder = async (product: Product) => {
    Alert.alert(
      'Place Order',
      `Order ${product.product_name}?\n\nPrice: ₹${product.price}\nMOQ: ${product.moq} units`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: async () => {
            try {
              const order = await createOrder({
                user_id: userId,
                distributor_id: product.distributor_id,
                product_id: product.id,
                product_name: product.product_name,
                quantity: product.moq,
                price: product.price,
                payment_mode: product.payment_modes[0] || 'COD',
                delivery_address: 'Default Address',
              });

              Alert.alert(
                'Success',
                `Order placed successfully!\nOrder ID: ${order.order_id}\n\nThe distributor will see it in their Orders tab.`,
                [{ text: 'OK', onPress: () => loadProducts() }]
              );
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to place order');
            }
          },
        },
      ]
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06B6D4" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Available Products</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Place orders directly. Track status in Orders tab.
          </Text>
        </View>

        {products.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>No products available</Text>
            <Text style={styles.emptySubtext}>
              Products will appear here when distributors add them
            </Text>
          </View>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  {product.category && (
                    <Text style={styles.productDescription}>{product.category}</Text>
                  )}
                </View>
                <View style={styles.stockBadge}>
                  <View style={styles.stockDot} />
                  <Text style={styles.stockText}>{product.stock_quantity} in stock</Text>
                </View>
              </View>

              <Text style={styles.distributorName}>Distributor: {product.distributor_id}</Text>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="cash-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>₹{product.price}/unit</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="cube-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>MOQ: {product.moq} units</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                {product.lead_time && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>Lead: {product.lead_time}</Text>
                  </View>
                )}
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

              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => handlePlaceOrder(product)}>
                <Ionicons name="cart-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Place Order</Text>
              </TouchableOpacity>
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
  orderButton: {
    backgroundColor: '#06B6D4',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});