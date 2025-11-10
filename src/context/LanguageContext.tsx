import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageContextType = {
  language: string;
  changeLanguage: (lng: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('appLang');
      if (savedLang) {
        setLanguage(savedLang);
        await i18n.changeLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem('appLang', lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
