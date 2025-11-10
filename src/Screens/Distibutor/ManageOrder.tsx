import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getInventory, updateProduct, Product } from '../../api/client';
import AddProductModal from '../../components/Modals/AddProductModal';
import EditProductModal from '../../components/Modals/EditProductModal';

interface ManageOrderProps {
  distributorId?: number;
  distributorName?: string;
  distributorPhone?: string;
}

const ManageOrder: React.FC<ManageOrderProps> = ({
  distributorId = 1,
  distributorName = 'My Store',
  distributorPhone = '+91XXXXXXXXXX',
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getInventory(String(distributorId));
      setProducts(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load inventory');
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

  const handleToggleOffer = async (productId: number, value: boolean) => {
    try {
      await updateProduct(productId, { is_enabled: value });
      await loadProducts();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update product');
    }
  };

  const handleQuantityChange = async (productId: number, increment: boolean) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const newQuantity = increment ? product.stock_quantity + 1 : Math.max(0, product.stock_quantity - 1);
      try {
        await updateProduct(productId, { stock_quantity: newQuantity });
        await loadProducts();
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to update quantity');
      }
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Inventory</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
            <Text style={styles.addProductText}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Ionicons name="qr-code-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products List */}
      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={60} color="#CCC" />
          <Text style={styles.emptyText}>No products yet</Text>
          <Text style={styles.emptySubtext}>Add products to manage your inventory</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add First Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        products.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.product_name}</Text>
                {item.category && (
                  <Text style={styles.description}>{item.category}</Text>
                )}
              </View>
              <View
                style={[
                  styles.stockTag,
                  {
                    backgroundColor:
                      item.stock_quantity > 0 ? '#D1FADF' : '#FEE2E2',
                  },
                ]}>
                <Text
                  style={[
                    styles.stockText,
                    { color: item.stock_quantity > 0 ? '#047857' : '#DC2626' },
                  ]}>
                  {item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            </View>

            <Text style={styles.details}>Price: ₹{item.price}/pack</Text>
            <Text style={styles.details}>Quantity: {item.stock_quantity} units</Text>
            <Text style={styles.details}>MOQ: {item.moq} packs</Text>
            <Text style={styles.details}>Lead time: {item.lead_time || 'N/A'}</Text>

            {/* Quantity Controls */}
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleQuantityChange(item.id, false)}>
                <Text style={styles.qtyButtonText}>–</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.stock_quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleQuantityChange(item.id, true)}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEditProduct(item)}>
                <Text style={styles.editQty}>Edit Product</Text>
              </TouchableOpacity>
            </View>

            {/* Show in offers toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Show in offers</Text>
              <Switch
                value={item.is_enabled}
                onValueChange={(value) => handleToggleOffer(item.id, value)}
              />
            </View>

            {/* Service Areas & Payment */}
            {item.service_areas.length > 0 && (
              <View style={styles.chipsRow}>
                <Text style={styles.chipsLabel}>Areas:</Text>
                {item.service_areas.slice(0, 3).map((area, idx) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{area}</Text>
                  </View>
                ))}
                {item.service_areas.length > 3 && (
                  <Text style={styles.moreText}>+{item.service_areas.length - 3}</Text>
                )}
              </View>
            )}

            {item.payment_modes.length > 0 && (
              <View style={styles.chipsRow}>
                <Text style={styles.chipsLabel}>Payment:</Text>
                {item.payment_modes.map((mode, idx) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{mode}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))
      )}

      {/* Add Product Modal */}
      <AddProductModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        distributorId={distributorId}
        distributorName={distributorName}
        distributorPhone={distributorPhone}
        onSuccess={loadProducts}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        visible={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={loadProducts}
      />
    </ScrollView>
  );
};

export default ManageOrder;

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F9FAFB', padding: 16 },
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: { fontSize: 22, fontWeight: '600', color: '#111827' },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addProductText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
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
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: { fontSize: 16, fontWeight: '600', color: '#111' },
  description: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  stockTag: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  stockText: { fontSize: 12, fontWeight: '500' },
  details: { color: '#6B7280', fontSize: 13, marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  qtyButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtyButtonText: { fontSize: 18, fontWeight: '600' },
  qtyValue: { fontSize: 16, marginHorizontal: 12, fontWeight: '600' },
  editQty: { marginLeft: 'auto', color: '#2563EB', fontSize: 14, fontWeight: '500' },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  toggleLabel: { color: '#111827', fontSize: 14, fontWeight: '500' },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  chipsLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  chip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 11,
    color: '#374151',
  },
  moreText: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});