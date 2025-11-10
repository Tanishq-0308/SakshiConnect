import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useInventory, InventoryProduct } from '../../context/InventoryContext';

interface EditProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: InventoryProduct | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  product,
}) => {
  const { updateProduct } = useInventory();

  const [price, setPrice] = useState(0);
  const [moq, setMoq] = useState(1);
  const [leadTime, setLeadTime] = useState('');
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [newArea, setNewArea] = useState('');
  const [paymentModes, setPaymentModes] = useState<string[]>([]);
  const [showInOffers, setShowInOffers] = useState(true);
  const [sellerNote, setSellerNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setPrice(product.unit_price);
      setMoq(product.moq);
      setLeadTime(product.lead_time);
      setServiceAreas([...product.service_areas]);
      setPaymentModes([...product.payment_modes]);
      setShowInOffers(product.show_in_offers);
      setSellerNote(product.seller_note || '');
    }
  }, [product]);

  const handleAddArea = () => {
    if (newArea.trim()) {
      setServiceAreas([...serviceAreas, newArea.trim()]);
      setNewArea('');
    }
  };

  const handleRemoveArea = (area: string) => {
    setServiceAreas(serviceAreas.filter((a) => a !== area));
  };

  const togglePaymentMode = (mode: string) => {
    if (paymentModes.includes(mode)) {
      setPaymentModes(paymentModes.filter((m) => m !== mode));
    } else {
      setPaymentModes([...paymentModes, mode]);
    }
  };

  const handleSaveChanges = () => {
    if (!product) return;

    updateProduct(product.id, {
      unit_price: price,
      moq,
      lead_time: leadTime,
      service_areas: serviceAreas,
      payment_modes: paymentModes,
      seller_note: sellerNote,
      show_in_offers: showInOffers,
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  if (!product) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Success Toast */}
          {showSuccess && (
            <View style={styles.successToast}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              <Text style={styles.successText}>Offer updated.</Text>
            </View>
          )}

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit {product.product_name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {/* Price */}
            <Text style={styles.inputLabel}>Price (₹/pack)</Text>
            <TextInput
              style={styles.input}
              value={String(price)}
              onChangeText={(text) => setPrice(Number(text) || 0)}
              keyboardType="numeric"
              placeholder="Enter price"
            />

            {/* MOQ */}
            <Text style={styles.inputLabel}>MOQ</Text>
            <TextInput
              style={styles.input}
              value={String(moq)}
              onChangeText={(text) => setMoq(Number(text) || 1)}
              keyboardType="numeric"
              placeholder="Minimum order quantity"
            />

            {/* Lead time */}
            <Text style={styles.inputLabel}>Lead time (days)</Text>
            <TextInput
              style={styles.input}
              value={leadTime}
              onChangeText={setLeadTime}
              placeholder="e.g., 2-4 days"
            />

            {/* Service areas (Pincodes) */}
            <Text style={styles.inputLabel}>Service areas (Pincodes)</Text>
            <View style={styles.chipContainer}>
              {serviceAreas.map((area, idx) => (
                <View key={idx} style={styles.chip}>
                  <Text style={styles.chipText}>{area}</Text>
                  <TouchableOpacity onPress={() => handleRemoveArea(area)}>
                    <Ionicons name="close" size={14} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddArea}>
              <Ionicons name="add" size={18} color="#666" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* Payment modes */}
            <Text style={styles.inputLabel}>Payment modes</Text>
            <View style={styles.paymentModes}>
              {['COD', 'UPI', 'Netbanking'].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.paymentChip,
                    paymentModes.includes(mode) && styles.paymentChipActive,
                  ]}
                  onPress={() => togglePaymentMode(mode)}>
                  <Text
                    style={[
                      styles.paymentChipText,
                      paymentModes.includes(mode) && styles.paymentChipTextActive,
                    ]}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Seller note */}
            <Text style={styles.inputLabel}>Seller note (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={sellerNote}
              onChangeText={setSellerNote}
              placeholder="e.g. Free delivery on orders above 10 packs."
              multiline
              numberOfLines={4}
            />

            {/* Show in offers toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Show in offers</Text>
              <Switch value={showInOffers} onValueChange={setShowInOffers} />
            </View>

            {/* Save button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '95%',
  },
  successToast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 1000,
    elevation: 10,
  },
  successText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  chipText: {
    color: '#2563EB',
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    gap: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#666',
    fontSize: 14,
  },
  paymentModes: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  paymentChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  paymentChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  paymentChipText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentChipTextActive: {
    color: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  toggleLabel: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditProductModal;