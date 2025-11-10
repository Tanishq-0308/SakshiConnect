import React, { useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addProductToInventory } from '../../api/client';

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  distributorId?: number;
  distributorName?: string;
  distributorPhone?: string;
  onSuccess?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onClose,
  distributorId = 1,
  distributorName = 'Distributor',
  distributorPhone = '+91XXXXXXXXXX',
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  // Form state
  const [productName, setProductName] = useState('Reusable Pads - 8 pack');
  const [description, setDescription] = useState('');
  const [stockOnHand, setStockOnHand] = useState(120);
  const [price, setPrice] = useState(199);
  const [moq, setMoq] = useState(10);
  const [leadTime, setLeadTime] = useState('2-4 days');
  const [serviceAreas, setServiceAreas] = useState<string[]>(['Mumbai', 'Pune', 'Delhi NCR']);
  const [newArea, setNewArea] = useState('');
  const [paymentModes, setPaymentModes] = useState<string[]>(['COD', 'UPI']);
  const [showInOffers, setShowInOffers] = useState(true);
  const [sellerNote, setSellerNote] = useState('');

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

  const handleSaveProduct = async () => {
    if (!productName.trim()) {
      Alert.alert('Error', 'Product name is required');
      return;
    }
    if (price <= 0) {
      Alert.alert('Error', 'Valid price is required');
      return;
    }
    if (moq <= 0) {
      Alert.alert('Error', 'Valid MOQ is required');
      return;
    }

    try {
      setLoading(true);

      await addProductToInventory({
        distributor_id: String(distributorId),
        product_name: productName.trim(),
        category: description.trim() || undefined,
        price: price,
        moq: moq,
        lead_time: leadTime.trim() || undefined,
        service_areas: serviceAreas.filter(a => a.trim()),
        payment_modes: paymentModes,
        stock_quantity: stockOnHand,
        is_enabled: showInOffers,
      });

      Alert.alert('Success', 'Product added successfully!');
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setStockOnHand(0);
    setPrice(0);
    setMoq(1);
    setLeadTime('2-4 days');
    setServiceAreas([]);
    setPaymentModes(['COD']);
    setShowInOffers(true);
    setSellerNote('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Product</Text>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Select from catalogue */}
            <TouchableOpacity style={styles.catalogueCard}>
              <View style={styles.iconBox}>
                <Ionicons name="cube-outline" size={24} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.catalogueTitle}>Select from catalogue</Text>
                <Text style={styles.catalogueSubtitle}>{productName || 'Enter product name'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.requestNewLink}>
              <Text style={styles.requestNewText}>Request new product</Text>
            </TouchableOpacity>

            {/* Stock on hand */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Stock on hand</Text>
              <View style={styles.stockRow}>
                <TouchableOpacity
                  style={styles.stockButton}
                  onPress={() => setStockOnHand(Math.max(0, stockOnHand - 1))}
                  disabled={loading}>
                  <Text style={styles.stockButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stockValue}>{stockOnHand}</Text>
                <TouchableOpacity
                  style={[styles.stockButton, styles.stockButtonPlus]}
                  onPress={() => setStockOnHand(stockOnHand + 1)}
                  disabled={loading}>
                  <Text style={styles.stockButtonTextWhite}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Offer shown to outlets */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Offer shown to outlets</Text>

              <Text style={styles.inputLabel}>Product Name *</Text>
              <TextInput
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
                placeholder="Enter product name"
                editable={!loading}
              />

              <Text style={styles.inputLabel}>Price (₹/pack) *</Text>
              <TextInput
                style={styles.input}
                value={String(price)}
                onChangeText={(text) => setPrice(Number(text) || 0)}
                keyboardType="numeric"
                placeholder="Enter price"
                editable={!loading}
              />

              <Text style={styles.inputLabel}>MOQ *</Text>
              <TextInput
                style={styles.input}
                value={String(moq)}
                onChangeText={(text) => setMoq(Number(text) || 1)}
                keyboardType="numeric"
                placeholder="Minimum order quantity"
                editable={!loading}
              />

              <Text style={styles.inputLabel}>Lead time</Text>
              <TextInput
                style={styles.input}
                value={leadTime}
                onChangeText={setLeadTime}
                placeholder="e.g., 2-4 days"
                editable={!loading}
              />

              {/* Service areas */}
              <Text style={styles.inputLabel}>Service areas</Text>
              <View style={styles.chipContainer}>
                {serviceAreas.map((area, idx) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{area}</Text>
                    <TouchableOpacity onPress={() => handleRemoveArea(area)} disabled={loading}>
                      <Ionicons name="close" size={16} color="#2563EB" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.addAreaRow}>
                <TextInput
                  style={styles.areaInput}
                  value={newArea}
                  onChangeText={setNewArea}
                  placeholder="Add area"
                  editable={!loading}
                />
                <TouchableOpacity 
                  style={styles.addAreaButton} 
                  onPress={handleAddArea}
                  disabled={loading}>
                  <Ionicons name="add" size={20} color="#666" />
                  <Text style={styles.addAreaText}>Add</Text>
                </TouchableOpacity>
              </View>

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
                    onPress={() => togglePaymentMode(mode)}
                    disabled={loading}>
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
            </View>

            {/* Show in offers */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Show in offers</Text>
              <Switch 
                value={showInOffers} 
                onValueChange={setShowInOffers}
                disabled={loading}
              />
            </View>

            {/* Seller note */}
            <Text style={styles.inputLabel}>Seller note (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={sellerNote}
              onChangeText={setSellerNote}
              placeholder="Add a short note for outlets..."
              multiline
              numberOfLines={4}
              editable={!loading}
            />

            {/* Save button */}
            <TouchableOpacity 
              style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
              onPress={handleSaveProduct}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Product</Text>
              )}
            </TouchableOpacity>

            <View style={{ height: 20 }} />
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
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  cancelButton: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
  },
  catalogueCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catalogueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  catalogueSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  requestNewLink: {
    padding: 16,
    paddingTop: 8,
  },
  requestNewText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },
  stockButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockButtonPlus: {
    backgroundColor: '#2563EB',
  },
  stockButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  stockButtonTextWhite: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  stockValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 40,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginHorizontal: 16,
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
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
    fontWeight: '500',
  },
  addAreaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  areaInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
  },
  addAreaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    gap: 4,
  },
  addAreaText: {
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
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
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
    marginHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddProductModal;