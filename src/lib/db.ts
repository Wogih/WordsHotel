import {Language, TranslationData} from "@/types/language";
import {Words_objects} from "@/types/words_objects";

export const objects: Words_objects[] = [
    {
        id: 1,
        objectName: "bed",
        wordsId: 1,
        width: 311,
        height: 209,
        classes: "w-[16%] top-[53%] max-sm:w-[25%] max-sm:top-[56%] z-1"
    },
    {
        id: 2,
        objectName: "nightstand",
        wordsId: 2,
        width: 107,
        height: 105,
        classes: "w-[5.3%] left-[55.5%] top-[68%] max-sm:w-[7%] max-sm:left-[58.5%] max-sm:top-[71%]"
    },
    {
        id: 3,
        objectName: "nightstand",
        wordsId: 2,
        width: 107,
        height: 105,
        classes: "w-[5.3%] left-[39.5%] top-[68%] max-sm:w-[7%] max-sm:left-[34.7%] max-sm:top-[71%]"
    },
    {
        id: 4,
        objectName: "lamp",
        wordsId: 3,
        width: 41,
        height: 59,
        classes: "w-[2.5%] left-[40.9%] top-[58.5%] max-sm:w-[4%] max-sm:left-[36.3%] max-sm:top-[62%] z-2"
    },
    {
        id: 5,
        objectName: "lamp",
        wordsId: 3,
        width: 41,
        height: 59,
        classes: "w-[2.5%] left-[56.8%] top-[58.5%] max-sm:w-[4%] max-sm:left-[60%] max-sm:top-[62%] z-2"
    },
    {
        id: 6,
        objectName: "wardrobe",
        wordsId: 3,
        width: 163,
        height: 307,
        classes: "w-[9%] left-[63%] top-[40%] max-sm:w-[16%] max-sm:left-[70%] max-sm:top-[37%] z-2"
    },
];

export const words = [

]

export function Translations({key, language: lang}: TranslationData): string {
    const translations: Record<string, Record<Language, string>> = {
        'route./': {
            ru: 'Слова',
            en: 'Words',
            zh: '单词'
        },
        'route./spelling': {
            ru: 'Правописание',
            en: 'Spelling',
            zh: '拼写'
        },
        'route./testing': {
            ru: 'Тестирование',
            en: 'Testing',
            zh: '测试',
        },

        'words.bed': {
            ru: 'Кровать',
            en: 'Bed',
            zh: '床'
        },
        'words.nightstand': {
            ru: 'Тумбочка',
            en: 'Nightstand',
            zh: '床头柜'
        },
        'words.lamp': {
            ru: 'Лампа',
            en: 'Lamp',
            zh: '灯'
        },
        'words.wardrobe': {
            ru: 'Шкаф',
            en: 'Wardrobe',
            zh: '衣柜'
        },

        'page.subtitle': {
            ru: 'Выберите изображение, которое вас интересует',
            en: 'Choose the image you are interested in',
            zh: '选择您感兴趣的图片'
        }
    }

    return translations[key]?.[lang] || key
}