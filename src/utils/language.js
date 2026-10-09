import { createContext, useContext } from 'react'
import { translations } from '../data/translations'

export const LanguageContext = createContext(null)

export const translators = {
  id: (text) => translations[text]?.[0] ?? text,
  en: (text) => translations[text]?.[1] ?? text,
}

export function useLanguage() {
  return useContext(LanguageContext)
}
