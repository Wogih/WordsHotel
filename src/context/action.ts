'use server'

import { cookies } from 'next/headers'
import {Language, TypeLanguage} from "@/types/language";



export async function setLanguageCookie(lang: Language, type: TypeLanguage) {
    const cookieStore = await cookies()
        cookieStore.set(`${type}-language`, lang, {
        maxAge: 60 * 60 * 24 * 365, // 1 год
        path: '/',
        sameSite: 'strict'
    })
}

export async function getLanguageCookie(type: TypeLanguage): Promise<Language> {
    const cookieStore = await cookies()
    const saved = cookieStore.get(`${type}-language`)?.value

    if (saved && ['ru', 'en', 'zh'].includes(saved)) {
        return saved as Language
    }
    return 'ru'
}