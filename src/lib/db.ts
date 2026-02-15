import {Language, TranslationData} from "@/types/language";
import {Rooms, Words_objects} from "@/types/words_objects";

export const objects: Words_objects[] = [
    {
        id: 1,
        objectName: "bed",
        room: "room",
        wordsId: 1,
        width: 311,
        height: 209,
        classes: "w-[13%] top-[61.5%] max-sm:w-[20%] max-sm:top-[65%] z-1"
    },
    {
        id: 2,
        objectName: "nightstand",
        room: "room",
        wordsId: 2,
        width: 107,
        height: 105,
        classes: "w-[5.3%] left-[55.5%] top-[68%] max-sm:w-[7%] max-sm:left-[58.5%] max-sm:top-[71%]"
    },
    {
        id: 3,
        objectName: "nightstand",
        room: "room",
        wordsId: 2,
        width: 107,
        height: 105,
        classes: "w-[5.3%] left-[39.5%] top-[68%] max-sm:w-[7%] max-sm:left-[34.7%] max-sm:top-[71%]"
    },
    {
        id: 4,
        objectName: "lamp",
        room: "room",
        wordsId: 3,
        width: 41,
        height: 59,
        classes: "w-[2.5%] left-[40.9%] top-[58.5%] max-sm:w-[4%] max-sm:left-[36.3%] max-sm:top-[62%] z-2"
    },
    {
        id: 5,
        objectName: "lamp",
        room: "room",
        wordsId: 3,
        width: 41,
        height: 59,
        classes: "w-[2.5%] left-[56.8%] top-[58.5%] max-sm:w-[4%] max-sm:left-[60%] max-sm:top-[62%] z-2"
    },
    {
        id: 6,
        objectName: "wardrobe",
        room: "room",
        wordsId: 3,
        width: 163,
        height: 307,
        classes: "w-[9%] left-[63%] top-[40%] max-sm:w-[16%] max-sm:left-[70%] max-sm:top-[37%] z-2"
    },
    {
        id: 7,
        objectName: "TV",
        room: "room",
        wordsId: 4,
        width: 103,
        height: 86,
        classes: "w-[7%] left-[72.3%] top-[40%] max-sm:w-[12%] max-sm:left-[87%] max-sm:top-[37%]"
    },
    {
        id: 8,
        objectName: "mirror",
        room: "room",
        wordsId: 5,
        width: 103,
        height: 86,
        classes: "w-[3.5%] left-[73.6%] top-[66.4%] max-sm:w-[6%] max-sm:left-[89%] max-sm:top-[65%]"
    },
    {
        id: 9,
        objectName: "fridge",
        room: "room",
        wordsId: 6,
        width: 80,
        height: 123,
        classes: "w-[4.6%] left-[33%] top-[63%] max-sm:w-[6.4%] max-sm:left-[21.6%] max-sm:top-[66%]"
    },
    {
        id: 10,
        objectName: "table",
        room: "room",
        wordsId: 7,
        width: 278,
        height: 198,
        classes: "w-[12%] left-[25%] top-[75%] max-sm:w-[18%] max-sm:left-[9%] max-sm:top-[75%] z-1"
    },
    {
        id: 11,
        objectName: "window",
        room: "room",
        wordsId: 8,
        width: 187,
        height: 482,
        classes: "w-[10.5%] left-[20.4%] top-[5%] max-sm:w-[17%] max-sm:left-[1%] max-sm:top-[6%] "
    },
    {
        id: 12,
        objectName: "notebook",
        room: "room",
        wordsId: 9,
        width: 94,
        height: 52,
        classes: "w-[4%] left-[31%] top-[73%] max-sm:w-[6%] max-sm:left-[18%] max-sm:top-[70.5%] z-2"
    },
    {
        id: 13,
        objectName: "chair",
        room: "room",
        wordsId: 10,
        width: 124,
        height: 198,
        classes: "w-[6%] left-[35%] top-[69%] max-sm:w-[10%] max-sm:left-[24%] max-sm:top-[69%]"
    },
    {
        id: 14,
        objectName: "pen",
        room: "room",
        wordsId: 11,
        width: 43,
        height: 7,
        classes: "w-[2.5%] left-[27%] top-[74.5%] max-sm:w-[5%] max-sm:left-[12%] max-sm:top-[69.1%] z-1"
    }
];

export const rooms: Rooms[] = [
    {
        id: 1,
        name: "room",
        width: 1089,
        height: 653
    },
    {
        id: 2,
        name: "bathroom",
        width: 1078,
        height: 760
    }
]

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
        'words.TV': {
            ru: 'Телевизор',
            en: 'TV',
            zh: '电视'
        },
        'words.mirror': {
            ru: 'Зеркало',
            en: 'Mirror',
            zh: '镜子'
        },
        'words.fridge': {
            ru: 'Холодильник',
            en: 'Fridge',
            zh: '冰箱'
        },
        'words.table': {
            ru: 'Стол',
            en: 'Table',
            zh: '桌子'
        },
        'words.window': {
            ru: 'Окно',
            en: 'Window',
            zh: '窗户'
        },
        'words.notebook': {
            ru: 'Тетрадь',
            en: 'Notebook',
            zh: '笔记本'
        },
        'words.chair': {
            ru: 'Стул',
            en: 'Chair',
            zh: '椅子'
        },
        'words.pen': {
            ru: 'Ручка',
            en: 'Pen',
            zh: '笔'
        },

        'page.subtitle': {
            ru: 'Выберите изображение, которое вас интересует',
            en: 'Choose the image you are interested in',
            zh: '选择您感兴趣的图片'
        }
    }

    return translations[key]?.[lang] || key
}