import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../src/i18n'; // your existing i18n setup

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
});

interface Props {
  children: ReactNode;
}

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem('userLanguage');
      if (savedLang) {
        setLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }
    })();
  }, []);

  const changeLanguage = async (lang: string) => {
    setLanguage(lang);
    await AsyncStorage.setItem('userLanguage', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
