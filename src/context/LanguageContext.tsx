'use client'

import React, { createContext, useContext, useState, ReactNode} from 'react'
import {setLanguageCookie} from "@/context/action";
import {Language, SetLanguage, TypeLanguage} from "@/types/language";

interface LanguageContextType {
    getLanguage: (type: TypeLanguage) => Language,
    setLanguageAndSave: (data: SetLanguage) => void
}

interface LanguageProvider {
    children: ReactNode,
    initialLearnLanguage: Language,
    initialMainLanguage: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({children, initialLearnLanguage, initialMainLanguage}: LanguageProvider) {
    const [mainLanguage, setMainLanguage] = useState<Language>(initialMainLanguage);
    const [learnLanguage, setLearnLanguage] = useState<Language>(initialLearnLanguage);

    const setLanguageAndSave= async ({language: lang, type}: SetLanguage) => {
        if (type === "learn") {
            setLearnLanguage(lang)
        } else {
            setMainLanguage(lang)
        }
        await setLanguageCookie(lang, type)
    }

    const getLanguage = (type: TypeLanguage) => {
        if (type === "learn") {
            return learnLanguage
        } else {
            return mainLanguage
        }
    }

    return (
        <LanguageContext.Provider value={{ getLanguage, setLanguageAndSave}}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}