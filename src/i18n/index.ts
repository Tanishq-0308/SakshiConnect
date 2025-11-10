import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import hi from '../locales/hi.json';
import or from '../locales/or.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  or: { translation: or },
};

const setI18nConfig = async () => {
  try {
    // 🧩 Try to load saved user preference
    const savedLang = await AsyncStorage.getItem('appLang');

    // 🌍 Fallback to device language if not saved
    const bestLang =
      (RNLocalize as any).findBestLanguageTag?.(Object.keys(resources)) ||
      (RNLocalize as any).findBestAvailableLanguage?.(Object.keys(resources));

    const langToUse = savedLang || bestLang?.languageTag || 'en';

    await i18n
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v4',
        resources,
        lng: langToUse,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
      });
  } catch (error) {
    console.warn('🌐 i18n setup failed:', error);
  }
};

// 🚀 Initialize once
setI18nConfig();

export default i18n;
