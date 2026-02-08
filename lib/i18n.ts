import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "@/messages/de.json";
import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

export const languageCodes = ["en", "tr", "de"] as const;
export type LanguageCode = (typeof languageCodes)[number];

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de }
} as const;

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });
}

export default i18n;
