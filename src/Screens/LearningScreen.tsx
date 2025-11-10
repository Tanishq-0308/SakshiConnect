import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../Navigation/types';
import { useTranslation } from 'react-i18next'; // 👈 Add this

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const LearningScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation(); // 👈 Initialize translator

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{t('Learning')}</Text>
        <Text style={styles.subHeading}>{t('Learn How To Use')}</Text>

        <View style={styles.grid}>
          {/* Card 1 */}
          <TouchableOpacity onPress={() => navigation.navigate('MenstrualCup')} style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={require('../images/MenstrualCup.png')} style={styles.icon} />
            </View>
            <Text style={styles.title}>{t('Menstrual Cup')}</Text>
            <Text style={styles.details}>{t('LearningDetails')}</Text>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity onPress={() => navigation.navigate('ReusablePads')} style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={require('../images/ReusablePad.png')} style={styles.icon} />
            </View>
            <Text style={styles.title}>{t('Reusable Pads')}</Text>
            <Text style={styles.details}>{t('Learning Details')}</Text>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity onPress={() => navigation.navigate('PeriodPanties')} style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={require('../images/reuse.png')} style={styles.icon} />
            </View>
            <Text style={styles.title}>{t('Period Panties')}</Text>
            <Text style={styles.details}>{t('Learning Details')}</Text>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity onPress={() => navigation.navigate('StarterKit')} style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={require('../images/Straterkit.png')} style={styles.icon} />
            </View>
            <Text style={styles.title}>{t('Starter Kit')}</Text>
            <Text style={styles.details}>{t('Learning Details')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '47%',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconContainer: {
    backgroundColor: '#CCFBEF',
    alignSelf: 'flex-start',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

export default LearningScreen;
