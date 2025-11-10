import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useInventory } from '../context/InventoryContext';
import EditStockQuantityModal from '../components/Modals/EditStockQuantityModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const StockManagePage: React.FC = () => {
  const { getUserStocks, updateUserStock } = useInventory();
  const userStocks = getUserStocks();
  const navigation = useNavigation();

  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const handleCreateLocalSale = (stock: any) => {
    Alert.alert(
      'Create Local Sale',
      `Create a local sale for ${stock.product_name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create',
          onPress: () => {
            Alert.alert('Success', 'Local sale created!');
          },
        },
      ]
    );
  };

  const handleEditQty = (stock: any) => {
    setSelectedStock(stock);
    setIsEditModalVisible(true);
  };

  const handleSaveQuantity = (newQuantity: number) => {
    if (selectedStock) {
      updateUserStock(selectedStock.id, { quantity: newQuantity });
      Alert.alert('Success', `Stock quantity updated to ${newQuantity}`);
    }
  };

  const handleReduceQuantity = (stockId: number, currentQuantity: number) => {
    if (currentQuantity > 0) {
      updateUserStock(stockId, { quantity: currentQuantity - 1 });
    }
  };

  const getStockColor = (quantity: number) => {
    if (quantity > 30) return '#10B981'; // Green
    if (quantity > 10) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" onPress={()=>navigation.goBack()}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Stock</Text>
        <TouchableOpacity>
          {/* <Ionicons name="search-outline" size={24} color="#000" /> */}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {userStocks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="archive-outline" size={80} color="#CCC" />
            <Text style={styles.emptyText}>No stock received yet</Text>
            <Text style={styles.emptySubtext}>
              Your delivered orders will appear here
            </Text>
          </View>
        ) : (
          userStocks.map((stock) => (
            <View key={stock.id} style={styles.stockCard}>
              <View style={styles.stockHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{stock.product_name}</Text>
                  <Text style={styles.sku}>Order ID: #{stock.order_id}</Text>
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

              <Text style={styles.distributorText}>
                From: {stock.distributor_name}
              </Text>
              <Text style={styles.dateText}>
                Received: {new Date(stock.received_date).toLocaleDateString()}
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

              {/* Create Local Sale Button */}
              <TouchableOpacity
                style={styles.localSaleButton}
                onPress={() => handleCreateLocalSale(stock)}>
                <Text style={styles.localSaleText}>Create Local Sale</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* History Section */}
        {userStocks.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>History</Text>
            <View style={styles.historyCard}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.historyText}>
                {userStocks.length} orders received successfully
              </Text>
              <TouchableOpacity>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Edit Quantity Modal */}
      {selectedStock && (
        <EditStockQuantityModal
          visible={isEditModalVisible}
          onClose={() => {
            setIsEditModalVisible(false);
            setSelectedStock(null);
          }}
          onSave={handleSaveQuantity}
          currentQuantity={selectedStock.quantity}
          productName={selectedStock.product_name}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  sku: {
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
  distributorText: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  localSaleButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  localSaleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
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
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  historyText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
});

export default StockManagePage;