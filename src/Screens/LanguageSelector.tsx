import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>

      {[
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'or', label: 'ଓଡ଼ିଆ' },
      ].map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.button,
            language === lang.code && { backgroundColor: '#007bff' },
          ]}
          onPress={() => changeLanguage(lang.code)}
        >
          <Text style={{ color: language === lang.code ? '#fff' : '#000' }}>
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  button: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
});
