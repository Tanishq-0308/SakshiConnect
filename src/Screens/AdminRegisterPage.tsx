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

const AdminRegisterPage = () => {
  const { t } = useTranslation(); // ✅ Translation hook

  return (
    <ImageBackground
      // source={require('../images/logo.png')}
      style={styles.background}
    >
      {/* Overlay for better text visibility */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>{t('AdminRegisterTitle')}</Text>

        <TextInput
          placeholder={t('AdminId')}
          placeholderTextColor="#ddd"
          style={styles.input}
        />
        <TextInput
          placeholder={t('Email')}
          placeholderTextColor="#ddd"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder={t('Password')}
          placeholderTextColor="#ddd"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>{t('CreateAdminBtn')}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)', // dark translucent overlay
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
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    borderRadius: 10,
    fontSize:15,
    padding: 12,
    color: '#f1ebebff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.87)',
  },
  btn: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    color:"white"
  },
  btnText: {
    color: '#fffffffd',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default AdminRegisterPage;
