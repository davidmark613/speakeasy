import { createContext, useContext, useState, ReactNode } from "react";

export type AppLanguage = "en" | "he" | "ru";

export const appLanguages: { code: AppLanguage; name: string; nativeName: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "he", name: "Hebrew", nativeName: "עברית", dir: "rtl" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr" },
];

const translations = {
  en: {
    // Header
    appTitle: "Translator",
    appDescription: "Translate text between languages instantly with AI-powered accuracy",
    
    // Language selectors
    from: "From",
    to: "To",
    selectLanguage: "Select language",
    searchLanguages: "Search languages...",
    noLanguageFound: "No language found.",
    
    // Text areas
    enterText: "Enter text to translate...",
    translationWillAppear: "Translation will appear here...",
    characters: "characters",
    
    // Buttons
    translate: "Translate",
    translating: "Translating...",
    copy: "Copy",
    copied: "Copied",
    swapLanguages: "Swap languages",
    
    // Toast messages
    noTextToTranslate: "No text to translate",
    pleaseEnterText: "Please enter some text to translate.",
    translationComplete: "Translation complete",
    translationSuccess: "Your text has been translated successfully.",
    translationFailed: "Translation failed",
    translationError: "Something went wrong. Please try again.",
    copiedToClipboard: "Copied!",
    copiedDescription: "Translation copied to clipboard.",
    
    // Mock translation
    translationFrom: "Translation from",
    translationTo: "to",
    connectCloud: "Connect to Lovable Cloud for real AI translations",
  },
  he: {
    // Header
    appTitle: "מתרגם",
    appDescription: "תרגום טקסט בין שפות באופן מיידי עם דיוק מונע בינה מלאכותית",
    
    // Language selectors
    from: "מ",
    to: "ל",
    selectLanguage: "בחר שפה",
    searchLanguages: "חפש שפות...",
    noLanguageFound: "לא נמצאה שפה.",
    
    // Text areas
    enterText: "הזן טקסט לתרגום...",
    translationWillAppear: "התרגום יופיע כאן...",
    characters: "תווים",
    
    // Buttons
    translate: "תרגם",
    translating: "מתרגם...",
    copy: "העתק",
    copied: "הועתק",
    swapLanguages: "החלף שפות",
    
    // Toast messages
    noTextToTranslate: "אין טקסט לתרגום",
    pleaseEnterText: "אנא הזן טקסט לתרגום.",
    translationComplete: "התרגום הושלם",
    translationSuccess: "הטקסט שלך תורגם בהצלחה.",
    translationFailed: "התרגום נכשל",
    translationError: "משהו השתבש. אנא נסה שוב.",
    copiedToClipboard: "הועתק!",
    copiedDescription: "התרגום הועתק ללוח.",
    
    // Mock translation
    translationFrom: "תרגום מ",
    translationTo: "ל",
    connectCloud: "התחבר ל-Lovable Cloud לתרגומי AI אמיתיים",
  },
  ru: {
    // Header
    appTitle: "Переводчик",
    appDescription: "Мгновенный перевод текста между языками с точностью ИИ",
    
    // Language selectors
    from: "С",
    to: "На",
    selectLanguage: "Выберите язык",
    searchLanguages: "Поиск языков...",
    noLanguageFound: "Язык не найден.",
    
    // Text areas
    enterText: "Введите текст для перевода...",
    translationWillAppear: "Перевод появится здесь...",
    characters: "символов",
    
    // Buttons
    translate: "Перевести",
    translating: "Перевод...",
    copy: "Копировать",
    copied: "Скопировано",
    swapLanguages: "Поменять языки",
    
    // Toast messages
    noTextToTranslate: "Нет текста для перевода",
    pleaseEnterText: "Пожалуйста, введите текст для перевода.",
    translationComplete: "Перевод завершён",
    translationSuccess: "Ваш текст успешно переведён.",
    translationFailed: "Ошибка перевода",
    translationError: "Что-то пошло не так. Попробуйте ещё раз.",
    copiedToClipboard: "Скопировано!",
    copiedDescription: "Перевод скопирован в буфер обмена.",
    
    // Mock translation
    translationFrom: "Перевод с",
    translationTo: "на",
    connectCloud: "Подключите Lovable Cloud для реальных ИИ-переводов",
  },
};

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved as AppLanguage) || "en";
  });

  const handleSetLanguage = (lang: AppLanguage) => {
    setLanguage(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const dir = appLanguages.find((l) => l.code === language)?.dir || "ltr";

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
