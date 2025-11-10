import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EditStockQuantityModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newQuantity: number) => void;
  currentQuantity: number;
  productName: string;
}

const EditStockQuantityModal: React.FC<EditStockQuantityModalProps> = ({
  visible,
  onClose,
  onSave,
  currentQuantity,
  productName,
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity, visible]);

  const handleSave = () => {
    if (quantity < 0) {
      Alert.alert('Invalid Quantity', 'Quantity cannot be negative');
      return;
    }
    if (quantity > currentQuantity) {
      Alert.alert(
        'Invalid Quantity',
        'You can only reduce stock quantity, not increase it'
      );
      return;
    }
    onSave(quantity);
    onClose();
  };

  const handleIncrement = () => {
    if (quantity < currentQuantity) {
      setQuantity(quantity + 1);
    } else {
      Alert.alert('Limit Reached', 'Cannot increase beyond received quantity');
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Stock Quantity</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.currentQty}>Current: {currentQuantity} units</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color="#2563EB" />
            <Text style={styles.infoText}>
              You can only reduce stock (sold/used), not increase
            </Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.qtySection}>
            <Text style={styles.label}>New Quantity</Text>
            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={[styles.qtyButton, quantity === 0 && styles.qtyButtonDisabled]}
                onPress={handleDecrement}
                disabled={quantity === 0}>
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.qtyInput}
                value={String(quantity)}
                onChangeText={(text) => {
                  const num = parseInt(text) || 0;
                  if (num <= currentQuantity) {
                    setQuantity(num);
                  }
                }}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={[
                  styles.qtyButton,
                  quantity >= currentQuantity && styles.qtyButtonDisabled,
                ]}
                onPress={handleIncrement}
                disabled={quantity >= currentQuantity}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.maxNote}>Maximum: {currentQuantity} units</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  productInfo: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  currentQty: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    gap: 10,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
  },
  qtySection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  qtyButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  qtyButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  qtyInput: {
    width: 80,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  maxNote: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});

export default EditStockQuantityModal;