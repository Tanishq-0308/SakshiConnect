import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const DistributorRegisterPage = () => {
  const { t } = useTranslation();

  return (
    <ImageBackground
      // source={require('../images/backimg.png')}
      style={styles.background}
    >
      {/* Dark overlay for better readability */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>{t('distributorRegisterTitle')}</Text>

        <TextInput
          placeholder={t('businessName')}
          placeholderTextColor="#ddd"
          style={styles.input}
        />
        <TextInput
          placeholder={t('contactNumber')}
          placeholderTextColor="#ddd"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder={t('productCategory')}
          placeholderTextColor="#ddd"
          style={styles.input}
        />

        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>{t('registerDistributorBtn')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // translucent dark overlay
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  btn: {
    backgroundColor: '#ff9800',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default DistributorRegisterPage;
