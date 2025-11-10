import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { LanguageContext } from '../../context/LanguageContext';

interface ChatMessageProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { language } = useContext(LanguageContext);
  const [translated, setTranslated] = useState(message);

  useEffect(() => {
    const translate = async () => {
      try {
        if (language !== 'en') {
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
              message
            )}&langpair=en|${language}`
          );
          const data = await response.json();
          setTranslated(data.responseData.translatedText || message);
        } else {
          setTranslated(message);
        }
      } catch (err) {
        console.log('Translation error:', err);
        setTranslated(message);
      }
    };
    translate();
  }, [language, message]);

  return <Text style={{ fontSize: 16 }}>{translated}</Text>;
};

export default ChatMessage;
