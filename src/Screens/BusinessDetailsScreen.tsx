import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const BusinessDetailsScreen = () => {
  const [serviceAreas, setServiceAreas] = useState(['Cuttack', 'Khordha', 'Jajpur']);
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('COD');

  const removeServiceArea = (area: string) => {
    setServiceAreas(serviceAreas.filter(item => item !== area));
  };

  const addServiceArea = () => {
    // Implement add service area logic
    console.log('Add service area');
  };

  const handleCompleteRegistration = () => {
    const data = {
      serviceAreas,
      gstin,
      pan,
      paymentMode: selectedPayment,
      upiId,
    };
    console.log('Registration data:', data);
    // Handle registration completion
  };

  const handleSkip = () => {
    console.log('Skip for now');
    // Navigate to next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Business details</Text>
        </View>

        {/* Service Areas Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service areas</Text>
          
          <View style={styles.chipsContainer}>
            {serviceAreas.map((area, index) => (
              <View
                key={index}
                style={[
                  styles.chip,
                  index < 2 ? styles.chipSelected : styles.chipUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    index < 2 ? styles.chipTextSelected : styles.chipTextUnselected,
                  ]}
                >
                  {area}
                </Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addButton} onPress={addServiceArea}>
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.helperText}>
            Pick 1-3 to start. You can add more later.
          </Text>
        </View>

        {/* Compliance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Compliance <Text style={styles.optionalText}>(optional)</Text>
          </Text>
          
          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 22AAAAA0000A1Z5"
            placeholderTextColor="#999"
            value={gstin}
            onChangeText={setGstin}
            autoCapitalize="characters"
          />
          
          <Text style={styles.label}>PAN</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. ABCDE1234F"
            placeholderTextColor="#999"
            value={pan}
            onChangeText={setPan}
            autoCapitalize="characters"
            maxLength={10}
          />
          
          <Text style={styles.helperText}>
            You can upload documents later for verification.
          </Text>
        </View>

        {/* Payments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payments <Text style={styles.optionalText}>(optional)</Text>
          </Text>
          
          <Text style={styles.label}>Payment modes</Text>
          <View style={styles.paymentModesContainer}>
            <TouchableOpacity
              style={[
                styles.paymentChip,
                selectedPayment === 'COD' && styles.paymentChipSelected,
              ]}
              onPress={() => setSelectedPayment('COD')}
            >
              <Text
                style={[
                  styles.paymentChipText,
                  selectedPayment === 'COD' && styles.paymentChipTextSelected,
                ]}
              >
                Cash on Delivery (COD)
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentChip,
                selectedPayment === 'UPI' && styles.paymentChipSelected,
              ]}
              onPress={() => setSelectedPayment('UPI')}
            >
              <Text
                style={[
                  styles.paymentChipText,
                  selectedPayment === 'UPI' && styles.paymentChipTextSelected,
                ]}
              >
                UPI
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label}>UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. yourname@bank"
            placeholderTextColor="#999"
            value={upiId}
            onChangeText={setUpiId}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Bottom Padding for scroll */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteRegistration}
        >
          <Text style={styles.completeButtonText}>Complete registration</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 60,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 12,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  optionalText: {
    color: '#999',
    fontWeight: '400',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  chipSelected: {
    backgroundColor: '#E3F2FD',
  },
  chipUnselected: {
    backgroundColor: '#F5F5F5',
  },
  chipText: {
    fontSize: 15,
  },
  chipTextSelected: {
    color: '#2196F3',
    fontWeight: '500',
  },
  chipTextUnselected: {
    color: '#000',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#DDD',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 15,
    color: '#666',
  },
  helperText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#FAFAFA',
  },
  paymentModesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  paymentChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  paymentChipSelected: {
    backgroundColor: '#E3F2FD',
  },
  paymentChipText: {
    fontSize: 15,
    color: '#000',
  },
  paymentChipTextSelected: {
    color: '#2196F3',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 180,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  completeButton: {
    backgroundColor: '#0066FF',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#0066FF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BusinessDetailsScreen;