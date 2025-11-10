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

const UserRegisterPage = () => {
  const { t } = useTranslation();

  return (
    <ImageBackground
      // source={require('../images/logo.png')}
      style={styles.background}
    >
      {/* Soft transparent overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>{t('UserRegisterTitle')}</Text>

        <TextInput
          placeholder={t('FullName')}
          placeholderTextColor="#ddd"
          style={styles.input}
        />
        <TextInput
          placeholder={t('phoneNumber')}
          placeholderTextColor="#ddd"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder={t('Address')}
          placeholderTextColor="#ddd"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8} // subtle hover/press effect
        >
          <Text style={styles.btnText}>{t('RegisterBtn')}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)', // dim background for better contrast
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
    backgroundColor: '#007bff',
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

export default UserRegisterPage;
