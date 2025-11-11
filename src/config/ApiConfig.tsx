import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL_KEY = '@api_url';
const DEFAULT_API_URL = 'http://192.168.1.42:8000';

// Export functions to get/set API URL
export const getApiUrl = async (): Promise<string> => {
  try {
    const url = await AsyncStorage.getItem(API_URL_KEY);
    return url || DEFAULT_API_URL;
  } catch {
    return DEFAULT_API_URL;
  }
};

export const setApiUrl = async (url: string): Promise<void> => {
  await AsyncStorage.setItem(API_URL_KEY, url);
};

// Settings screen component
const ApiConfigScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [apiUrl, setApiUrlState] = useState(DEFAULT_API_URL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApiUrl();
  }, []);

  const loadApiUrl = async () => {
    const url = await getApiUrl();
    setApiUrlState(url);
  };

  const handleSave = async () => {
    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
      Alert.alert('Error', 'URL must start with http:// or https://');
      return;
    }

    try {
      setLoading(true);
      await setApiUrl(apiUrl);
      Alert.alert('Success', 'API URL updated! Restart the app for changes to take effect.', [
        { text: 'OK', onPress: onClose }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save API URL');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setApiUrlState(DEFAULT_API_URL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Configuration</Text>
      
      <Text style={styles.label}>Backend API URL:</Text>
      <TextInput
        style={styles.input}
        value={apiUrl}
        onChangeText={setApiUrlState}
        placeholder="http://192.168.1.42:8000"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.hint}>
        💡 Enter your laptop's IP address and port
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSave}
          disabled={loading}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save & Restart'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How to find your IP:</Text>
        <Text style={styles.infoText}>• Windows: Open CMD → type 'ipconfig'</Text>
        <Text style={styles.infoText}>• Mac: System Preferences → Network</Text>
        <Text style={styles.infoText}>• Linux: Terminal → type 'ifconfig'</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  resetButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#6B7280',
    fontSize: 16,
  },
  infoBox: {
    marginTop: 32,
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    marginTop: 4,
  },
});

export default ApiConfigScreen;