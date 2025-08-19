import { createContext, useContext, useState, useEffect } from 'react';
import fr from './fr.json';
import en from './en.json';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.languages[0]; // Langue du navigateur
    if (browserLang.startsWith('fr')) {
      return 'fr';
    }
    return 'en';
  };

  const [language, setLanguage] = useState(detectBrowserLanguage());

  const translations = language === 'fr' ? fr : en;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
