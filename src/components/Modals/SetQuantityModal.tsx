import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface SetQuantityModalProps {
  visible: boolean;
  onClose: () => void;
  productId: number | null;
  productName: string;
  distributorId?: number; // default to 1
}

const SetQuantityModal: React.FC<SetQuantityModalProps> = ({
  visible,
  onClose,
  productId,
  productName,
  distributorId = 1,
}) => {
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!quantity || !productId) {
      Alert.alert('Please enter quantity.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.21:5000/api/distributor/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distributor_id: distributorId,
          product_id: productId,
          quantity: parseInt(quantity),
        }),
      });

      if (response.ok) {
        Alert.alert('✅ Success', 'Product quantity set successfully!');
        setQuantity('');
        onClose();
      } else {
        const errorData = await response.json();
        Alert.alert('❌ Failed', errorData.message || 'Unable to set quantity.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('⚠️ Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set Quantity</Text>
          <Text style={styles.productName}>{productName}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          {loading ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SetQuantityModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  saveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  cancelText: { color: '#333', fontWeight: '600' },
  saveText: { color: '#fff', fontWeight: '600' },
});
