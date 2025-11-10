import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Navigation/MainStack';

// 🗣 i18n setup
import './i18n';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

// 🧩 Contexts
import { LanguageProvider } from './context/LanguageContext'; // ✅ fixed path (was ../context)
import { OrderProvider } from './context/OrderContext';
import { InventoryProvider } from './context/InventoryContext';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <OrderProvider>
          <InventoryProvider>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </InventoryProvider>
        </OrderProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
};

export default App;
