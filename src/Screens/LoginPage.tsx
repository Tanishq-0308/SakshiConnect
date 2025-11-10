import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../Navigation/types';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../i18n';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const [mobile, setMobile] = useState('');
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();

  // ✅ Hardcoded users with role info
  const users: Record<string, { role: string; name: string; screen: string }> = {
    '9999999999': { role: 'Distributor', name: 'John Distributor', screen: 'DistibuterHome' },
    '8888888888': { role: 'SHG', name: 'Anjali SHG', screen: 'BottomTabs' },
    '7777777777': { role: 'Pharmacist', name: 'Priya Pharmacist', screen: 'PharmacistScreen' },
  };

  const languages = [
    { label: 'English', code: 'en' },
    { label: 'हिंदी', code: 'hi' },
    { label: 'ଓଡ଼ିଆ', code: 'or' },
  ];

  // ✅ Handle login logic
  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit number.');
      return;
    }

    const user = users[mobile];
    if (user) {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      Alert.alert(`✅ Login Successful`, `Welcome ${user.name} (${user.role})`);
      navigation.navigate(user.screen as never); // 👈 Navigate to specific role home
    } else {
      Alert.alert('❌ Invalid User', 'This number is not registered.');
    }
  };

  // ✅ Handle language switch
  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    await AsyncStorage.setItem('appLang', langCode);
  };

  return (
    <ImageBackground
      source={require('../images/logo.png')}
      style={styles.background}
         // 👈 ensures full background fit
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topText}>🌐 {i18n.language.toUpperCase()}</Text>
          <Ionicons name="headset-outline" size={22} color="#0a0a0a" />
        </View>

        {/* Logo section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="heart-outline" size={36} color="white" />
          </View>
          <Text style={styles.title}>{t('Chakrika')}</Text>
          <Text style={styles.subtitle}>{t('Rural Healthcare Distribution')}</Text>
        </View>

        {/* Language section */}
        <View style={styles.langSection}>
          <Text style={styles.langLabel}>{t('selectLanguage')}</Text>
          <View style={styles.langButtons}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langButton,
                  i18n.language === lang.code && styles.langButtonActive,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Text
                  style={[
                    styles.langText,
                    i18n.language === lang.code && styles.langTextActive,
                  ]}
                >
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mobile input */}
        <Text style={styles.inputLabel}>{t('mobileNumber')}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={t('enterNumber')}
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* Login / OTP button */}
        <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
          <Feather name="send" size={20} color="white" />
          <Text style={styles.otpText}>{t('sendOtp')}</Text>
        </TouchableOpacity>

        {/* Register section */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RoleSelectionPage')}
          style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}
        >
          <Text style={styles.secure}>{t('Do not have Account')}</Text>
          <Text style={styles.secure1}>{t('registerNow')}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footer}>
            {t('Secure & Trusted Healthcare Platform')}
          </Text>
        </TouchableOpacity>

        {/* Bottom help buttons */}
        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpItem}>
            <Ionicons name="mic-outline" size={28} color="#141414" />
            <Text style={styles.helpText}>{t('voiceHelp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpItem}>
            <Feather name="help-circle" size={28} color="#0d0e0d" />
            <Text style={styles.helpText}>{t('getHelp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpItem}>
            <Feather name="phone" size={28} color="#0d0e0d" />
            <Text style={styles.helpText}>{t('callSupport')}</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>{t('footer')}</Text>
      </View>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'stretch', 

  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
   
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topText: {
    fontSize: 16,
    color: '#0B6E4F',
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    backgroundColor: '#0B6E4F',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#050505',
  },
  subtitle: {
    color: '#0a0a0a',
    fontWeight: '800',
    fontSize: 16,
  },
  langSection: {
    backgroundColor: '#f6f8fac2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  langLabel: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    marginBottom: 10,
  },
  langButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langButton: {
    borderWidth: 1,
    borderColor: '#cccccc50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  langButtonActive: {
    backgroundColor: '#e6f4eaef',
    borderColor: '#0B6E4F',
  },
  langText: {
    color: 'black',
    fontWeight: '900',
  },
  langTextActive: {
    color: '#0B6E4F',
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#faf9f9',
    backgroundColor: '#ffffffc5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  prefix: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  otpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B6E4F',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 25,
  },
  otpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  helpItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  helpText: {
    color: 'black',
    fontSize: 15,
    marginTop: 4,
  },
  footer: {
    textAlign: 'center',
    marginTop: 165,
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
  },
  secure: {
    fontSize: 16,
    color: '#226953',
  },
  secure1: {
    fontSize: 16,
    color: '#226953',
    textDecorationLine: 'underline',
  },
});
