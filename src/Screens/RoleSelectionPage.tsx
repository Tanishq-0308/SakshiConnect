import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../Navigation/types';

type RoleSelectionPageProp = NativeStackNavigationProp<
  MainStackParamList,
  'RoleSelectionPage'
>;

const RoleSelectionPage = ({ navigation }: any) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [mobile, setMobile] = useState('');
  const nav = useNavigation<RoleSelectionPageProp>();

  const handleSendOtp = () => {
    if (!selectedRole) {
      Alert.alert('Error', language === 'en' ? 'Please select a role' : 'कृपया एक भूमिका चुनें');
      return;
    }
    if (mobile.length !== 10) {
      Alert.alert(
        'Error',
        language === 'en'
          ? 'Please enter a valid 10-digit mobile number'
          : 'कृपया एक मान्य 10-अंकों का मोबाइल नंबर दर्ज करें'
      );
      return;
    }
    navigation.navigate('OtpVerification', { mobile, selectedRole });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* 🏷️ Heading */}
      <Text style={styles.heading}>
        {language === 'en' ? 'Create Account' : 'खाता बनाएं'}
      </Text>

      {/* 🌐 Language Toggle */}
      <View style={styles.languageToggle}>
        <TouchableOpacity
          style={[styles.langButton, language === 'en' && styles.activeLang]}
          onPress={() => setLanguage('en')}>
          <Text
            style={[
              styles.langText,
              language === 'en' && { color: '#000', fontWeight: '700' },
            ]}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, language === 'hi' && styles.activeLang]}
          onPress={() => setLanguage('hi')}>
          <Text
            style={[
              styles.langText,
              language === 'hi' && { color: '#000', fontWeight: '700' },
            ]}>
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>

      {/* 👥 Role Selection */}
      <Text style={styles.subHeading}>
        {language === 'en' ? 'Select your role' : 'अपनी भूमिका चुनें'}
      </Text>

      {/* Pharmacy Card */}
      <TouchableOpacity
        style={[
          styles.roleCard,
          selectedRole === 'pharmacy' && styles.roleCardSelected,
        ]}
        onPress={() => {
          setSelectedRole('pharmacy');
          // you can handle pharmacy-specific logic here
        }}>
        <View style={styles.roleLeft}>
          <View style={styles.roleImageBox}>
            <Image source={require('../images/pharmacy.png')} style={styles.roleImage} />
          </View>
          <View>
            <Text style={styles.roleTitle}>
              {language === 'en' ? 'Pharmacy' : 'फार्मेसी'}
            </Text>
            <Text style={styles.roleDesc}>
              {language === 'en'
                ? 'For pharmacy owners'
                : 'फार्मेसी मालिकों के लिए'}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.radioOuter,
            selectedRole === 'pharmacy' && styles.radioOuterActive,
          ]}>
          {selectedRole === 'pharmacy' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* SHG Card */}
      <TouchableOpacity
        style={[
          styles.roleCard,
          selectedRole === 'shg' && styles.roleCardSelected,
        ]}
        onPress={() => {
          setSelectedRole('shg');
          // handle SHG-specific logic here
        }}>
        <View style={styles.roleLeft}>
          <View style={styles.roleImageBox}>
            <Image source={require('../images/SHG-Women.png')} style={styles.roleImage} />
          </View>
          <View>
            <Text style={styles.roleTitle}>
              {language === 'en' ? 'Self-Help Group (SHG)' : 'स्वयं सहायता समूह (SHG)'}
            </Text>
            <Text style={styles.roleDesc}>
              {language === 'en'
                ? 'For group members'
                : 'समूह सदस्यों के लिए'}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.radioOuter,
            selectedRole === 'shg' && styles.radioOuterActive,
          ]}>
          {selectedRole === 'shg' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* Distributor Card */}
      <TouchableOpacity
        style={[
          styles.roleCard,
          selectedRole === 'distributor' && styles.roleCardSelected,
        ]}
        onPress={() => {
          setSelectedRole('distributor');
          // handle distributor-specific logic here
        }}>
        <View style={styles.roleLeft}>
          <View style={styles.roleImageBox}>
            <Image source={require('../images/pharmacy.png')} style={styles.roleImage} />
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('DistibuterHome')}>
          <View>
            <Text style={styles.roleTitle}>
              {language === 'en' ? 'Distributor' : 'वितरक'}
            </Text>
            <Text style={styles.roleDesc}>
              {language === 'en'
                ? 'For supply chain distributors'
                : 'आपूर्ति श्रृंखला वितरकों के लिए'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.radioOuter,
            selectedRole === 'distributor' && styles.radioOuterActive,
          ]}>
          {selectedRole === 'distributor' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* 📱 Mobile Input */}
      <Text style={styles.inputLabel}>
        {language === 'en' ? 'Enter Mobile Number' : 'मोबाइल नंबर दर्ज करें'}
      </Text>
      <View style={styles.inputBox}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.textInput}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          maxLength={10}
          placeholder={
            language === 'en' ? '10-digit mobile number' : '10 अंकों का मोबाइल नंबर'
          }
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* 🔐 Send OTP */}
      <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
        <Text style={styles.otpText}>
          {language === 'en' ? 'Send OTP' : 'ओटीपी भेजें'}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        {language === 'en'
          ? "No password needed. You'll verify with an OTP."
          : 'पासवर्ड की आवश्यकता नहीं। आप ओटीपी से सत्यापित करेंगे।'}
      </Text>

      <Text style={styles.footerLogin}>
        {language === 'en'
          ? 'Already have an account? '
          : 'क्या आपके पास पहले से खाता है? '}
        <Text style={styles.loginLink}>
          {language === 'en' ? 'Login' : 'लॉगिन करें'}
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  heading: { fontSize: 24, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 20 },
  languageToggle: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 30, marginBottom: 30 },
  langButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 30 },
  activeLang: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  langText: { color: '#64748B', fontSize: 16 },
  subHeading: { fontSize: 16, fontWeight: '600', color: '#0F172A', marginBottom: 16 },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  roleCardSelected: { borderWidth: 1.5, borderColor: '#2563EB' },
  roleLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  roleImageBox: { backgroundColor: '#E0F2FE', padding: 10, borderRadius: 12 },
  roleImage: { width: 30, height: 30, resizeMode: 'contain' },
  roleTitle: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  roleDesc: { fontSize: 13, color: '#64748B' },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#2563EB' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  prefix: { fontSize: 16, fontWeight: '500', color: '#0F172A', marginRight: 8 },
  textInput: { flex: 1, fontSize: 16, color: '#0F172A', paddingVertical: 10 },
  otpButton: { backgroundColor: '#2563EB', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  otpText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footerText: { textAlign: 'center', color: '#64748B', fontSize: 13, marginBottom: 8 },
  footerLogin: { textAlign: 'center', color: '#475569', fontSize: 14 },
  loginLink: { color: '#2563EB', fontWeight: '700' },
});

export default RoleSelectionPage;
