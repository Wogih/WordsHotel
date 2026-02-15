export type Language = 'ru' | 'en' | 'zh'
export type TypeLanguage = "main" | "learn"

export interface SetLanguage {
    language: Language
    type: TypeLanguage
}

export interface TranslationData {
    key: string,
    language: Language
}