import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CreateOrderFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (orderDetails: {
    orderer_name: string;
    product_name: string;
    quantity: number;
    price_per_unit: number;
    total_price: number;
  }) => void;
  ordererName: string;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  visible,
  onClose,
  onSubmit,
  ordererName,
}) => {
  const [productName, setProductName] = useState('Enter Product name');
  const [pricePerUnit, setPricePerUnit] = useState(120);
  const [quantity, setQuantity] = useState(50);

  const totalPrice = pricePerUnit * quantity;

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => {
      const newQty = increment ? prev + 1 : prev - 1;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const handleCreateOrder = () => {
    onSubmit({
      orderer_name: ordererName,
      product_name: productName,
      quantity,
      price_per_unit: pricePerUnit,
      total_price: totalPrice,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Success Toast */}
          <View style={styles.successToast}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <Text style={styles.successText}>
              Order created for {ordererName}
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Create order</Text>

            {/* Orderer Info */}
            <View style={styles.infoCard}>
              <Text style={styles.ordererName}>{ordererName}</Text>
              <TextInput
                style={styles.productInput}
                value={productName}
                onChangeText={setProductName}
                placeholder="Product name"
              />
              <Text style={styles.offerPrice}>
                Offer price ₹{pricePerUnit} / pack
              </Text>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantityCard}>
              <Ionicons name="cube-outline" size={24} color="#333" />
              <Text style={styles.quantityLabel}>Quantity</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(false)}>
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(true)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Price Breakdown */}
            <View style={styles.breakdownCard}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Price</Text>
                <Text style={styles.breakdownValue}>₹{pricePerUnit} / pack</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Qty</Text>
                <Text style={styles.breakdownValue}>{quantity}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.breakdownRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{totalPrice.toLocaleString()}</Text>
              </View>
            </View>

            {/* Create Order Button */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateOrder}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
              <Text style={styles.createButtonText}>Create order</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 30,
    maxHeight: '90%',
  },
  successToast: {
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00E676',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  ordererName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  productInput: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    paddingVertical: 4,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  quantityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginLeft: 12,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 40,
    textAlign: 'center',
  },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 15,
    color: '#666',
  },
  breakdownValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
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
    backgroundColor: '#7BA3E8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateOrderForm;