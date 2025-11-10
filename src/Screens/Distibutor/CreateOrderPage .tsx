import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateOrder = ({ navigation }: any) => {
  const [quantity, setQuantity] = useState(50);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const pricePerPack = 120;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleCreateOrder = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Navigate back or to orders list
      // navigation.goBack();
    }, 2000);
  };

  const handleCancel = () => {
    // navigation.goBack();
    console.log('Cancel order');
  };

  const totalAmount = quantity * pricePerPack;

  return (
    <SafeAreaView style={styles.container}>
      {/* Success Toast */}
      {showSuccessToast && (
        <View style={styles.successToast}>
          <View style={styles.checkIcon}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <View>
            <Text style={styles.toastTitle}>Order created for</Text>
            <Text style={styles.toastSubtitle}>Kiran's SuperMart.</Text>
          </View>
        </View>
      )}

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.dragHandle} />
          <Text style={styles.pageTitle}>Create order</Text>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <Text style={styles.storeName}>Kiran's SuperMart</Text>
          <Text style={styles.productName}>Classic Lays - 52g</Text>
          <Text style={styles.offerPrice}>Offer price ₹120 / pack</Text>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityCard}>
          <View style={styles.quantityIcon}>
            <View style={styles.boxIcon} />
          </View>
          <Text style={styles.quantityLabel}>Quantity</Text>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecreaseQuantity}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityValue}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncreaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>₹{pricePerPack} / pack</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Qty</Text>
            <Text style={styles.summaryValue}>{quantity}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* Create Order Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateOrder}>
          <View style={styles.createButtonIcon}>
            <View style={styles.refreshIcon} />
          </View>
          <Text style={styles.createButtonText}>Create order</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => {
            handleCancel(); // optional: keep your custom logic
            navigation.goBack(); // 👈 goes back to the previous screen
          }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  successToast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  toastTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  toastSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    alignSelf: 'flex-start',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productName: {
    fontSize: 15,
    color: '#757575',
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 15,
    color: '#2196F3',
    fontWeight: '600',
  },
  quantityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  boxIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#424242',
    borderRadius: 4,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 40,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  createButton: {
    backgroundColor: '#A0C4FF',
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  createButtonIcon: {
    marginRight: 8,
  },
  refreshIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    textAlign: 'center',
  },
});

export default CreateOrder;