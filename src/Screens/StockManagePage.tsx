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
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getUserStock, updateStock, Stock } from '../api/client';

const StockManagePage: React.FC<{ userId?: string }> = ({ userId = 'USER001' }) => {
  const navigation = useNavigation();
  const [userStocks, setUserStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [processing, setProcessing] = useState(false);

  const loadStock = async () => {
    try {
      setLoading(true);
      const data = await getUserStock(userId);
      setUserStocks(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load stock');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStock();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadStock();
  }, []);

  const handleReduceQuantity = async (stockId: number, currentQuantity: number) => {
    if (currentQuantity > 0) {
      try {
        await updateStock(stockId, currentQuantity - 1);
        await loadStock();
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to update stock');
      }
    }
  };

  const handleEditQty = (stock: Stock) => {
    setSelectedStock(stock);
    setEditQuantity(String(stock.quantity));
    setIsEditModalVisible(true);
  };

  const handleSaveQuantity = async () => {
    if (!selectedStock) return;

    const newQuantity = parseInt(editQuantity);

    if (isNaN(newQuantity) || newQuantity < 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    if (newQuantity > selectedStock.quantity) {
      Alert.alert(
        'Error',
        'Cannot increase stock manually. Stock increases through deliveries only.'
      );
      return;
    }

    try {
      setProcessing(true);
      await updateStock(selectedStock.id, newQuantity);
      Alert.alert('Success', `Stock quantity updated to ${newQuantity}`);
      setIsEditModalVisible(false);
      setSelectedStock(null);
      await loadStock();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update stock');
    } finally {
      setProcessing(false);
    }
  };

  const getStockColor = (quantity: number) => {
    if (quantity > 30) return '#10B981'; // Green
    if (quantity > 10) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading stock...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage Stock</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {userStocks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="archive-outline" size={80} color="#CCC" />
              <Text style={styles.emptyText}>No stock received yet</Text>
              <Text style={styles.emptySubtext}>
                Your delivered orders will appear here automatically
              </Text>
            </View>
          ) : (
            userStocks.map((stock) => (
              <View key={stock.id} style={styles.stockCard}>
                <View style={styles.stockHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{stock.product_name}</Text>
                    {stock.category && (
                      <Text style={styles.category}>Category: {stock.category}</Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.quantityBadge,
                      { backgroundColor: getStockColor(stock.quantity) + '20' },
                    ]}>
                    <Text
                      style={[
                        styles.quantityText,
                        { color: getStockColor(stock.quantity) },
                      ]}>
                      {stock.quantity}
                    </Text>
                  </View>
                </View>

                <Text style={styles.dateText}>
                  Last updated: {new Date(stock.last_updated).toLocaleString()}
                </Text>

                {/* Quantity Controls */}
                <View style={styles.qtyRow}>
                  <TouchableOpacity 
                    style={[
                      styles.qtyButton,
                      stock.quantity === 0 && styles.qtyButtonDisabled
                    ]}
                    onPress={() => handleReduceQuantity(stock.id, stock.quantity)}
                    disabled={stock.quantity === 0}>
                    <Text style={[
                      styles.qtyButtonText,
                      stock.quantity === 0 && styles.qtyButtonTextDisabled
                    ]}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{stock.quantity}</Text>
                  <View style={[styles.qtyButton, styles.qtyButtonDisabled]}>
                    <Text style={styles.qtyButtonTextDisabled}>+</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleEditQty(stock)}>
                    <Text style={styles.editQty}>Edit Qty</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* History Section */}
          {userStocks.length > 0 && (
            <View style={styles.historySection}>
              <Text style={styles.historyTitle}>Stock Information</Text>
              <View style={styles.historyCard}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <Text style={styles.historyText}>
                  {userStocks.length} product(s) in stock. Stock automatically increases when orders are delivered.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Edit Quantity Modal */}
        <Modal
          visible={isEditModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsEditModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Stock Quantity</Text>

              {selectedStock && (
                <>
                  <Text style={styles.modalProductName}>{selectedStock.product_name}</Text>
                  <Text style={styles.modalCurrent}>
                    Current quantity: {selectedStock.quantity}
                  </Text>

                  <Text style={styles.inputLabel}>New Quantity:</Text>
                  <TextInput
                    style={styles.input}
                    value={editQuantity}
                    onChangeText={setEditQuantity}
                    keyboardType="numeric"
                    placeholder="Enter quantity"
                    editable={!processing}
                  />

                  <Text style={styles.note}>
                    ⚠️ You can only reduce stock, not increase it. Stock increases automatically when orders are delivered.
                  </Text>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        setIsEditModalVisible(false);
                        setSelectedStock(null);
                      }}
                      disabled={processing}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, styles.saveButton]}
                      onPress={handleSaveQuantity}
                      disabled={processing}>
                      {processing ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.saveButtonText}>Save</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  stockCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  stockHeader: {
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
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  quantityBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  qtyButtonTextDisabled: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 16,
  },
  editQty: {
    marginLeft: 'auto',
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  historySection: {
    marginTop: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  historyText: {
    flex: 1,
    color: '#1E40AF',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalCurrent: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  note: {
    fontSize: 12,
    color: '#F59E0B',
    marginBottom: 20,
    lineHeight: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default StockManagePage;