import {Language, TranslationData} from "@/types/language";
import {Rooms, Word, WordsObjects} from "@/types/words_objects";

export const allLanguages: Language[] = ['ru', 'en', 'zh']

export const objects: WordsObjects[] = [
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
        wordsId: 4,
        width: 163,
        height: 307,
        classes: "w-[9%] left-[63%] top-[40%] max-sm:w-[16%] max-sm:left-[70%] max-sm:top-[37%] z-2"
    },
    {
        id: 7,
        objectName: "TV",
        room: "room",
        wordsId: 5,
        width: 103,
        height: 86,
        classes: "w-[7%] left-[72.3%] top-[40%] max-sm:w-[12%] max-sm:left-[87%] max-sm:top-[37%]"
    },
    {
        id: 8,
        objectName: "mirror",
        room: "room",
        wordsId: 6,
        width: 103,
        height: 86,
        classes: "w-[3.5%] left-[73.6%] top-[66.4%] max-sm:w-[6%] max-sm:left-[89%] max-sm:top-[65%]"
    },
    {
        id: 9,
        objectName: "fridge",
        room: "room",
        wordsId: 7,
        width: 80,
        height: 123,
        classes: "w-[4.6%] left-[33%] top-[63%] max-sm:w-[6.4%] max-sm:left-[21.6%] max-sm:top-[66%]"
    },
    {
        id: 10,
        objectName: "table",
        room: "room",
        wordsId: 8,
        width: 278,
        height: 198,
        classes: "w-[12%] left-[25%] top-[75%] max-sm:w-[18%] max-sm:left-[9%] max-sm:top-[75%] z-1"
    },
    {
        id: 11,
        objectName: "window",
        room: "room",
        wordsId: 9,
        width: 187,
        height: 482,
        classes: "w-[10.5%] left-[20.4%] top-[5%] max-sm:w-[17%] max-sm:left-[1%] max-sm:top-[6%] "
    },
    {
        id: 12,
        objectName: "notebook",
        room: "room",
        wordsId: 10,
        width: 94,
        height: 52,
        classes: "w-[4%] left-[31%] top-[73%] max-sm:w-[6%] max-sm:left-[18%] max-sm:top-[70.5%] z-2"
    },
    {
        id: 13,
        objectName: "chair",
        room: "room",
        wordsId: 11,
        width: 124,
        height: 198,
        classes: "w-[6%] left-[35%] top-[69%] max-sm:w-[10%] max-sm:left-[24%] max-sm:top-[69%]"
    },
    {
        id: 14,
        objectName: "pen",
        room: "room",
        wordsId: 12,
        width: 43,
        height: 7,
        classes: "w-[2.5%] left-[27%] top-[74.5%] max-sm:w-[5%] max-sm:left-[12%] max-sm:top-[69.1%] z-1"
    },
    {
        id: 15,
        objectName: "toilet",
        room: "bathroom",
        wordsId: 13,
        width: 107,
        height: 227,
        classes: "w-[5%] left-[30%] top-[55.5%] max-sm:w-[10%] max-sm:left-[17%] max-sm:top-[56.5%] z-1"
    },
    {
        id: 16,
        objectName: "bathrobe",
        room: "bathroom",
        wordsId: 14,
        width: 151,
        height: 248,
        classes: "w-[7%] left-[36%] top-[40%] max-sm:w-[15%] max-sm:left-[29%] max-sm:top-[40%] z-1"
    },
    {
        id: 17,
        objectName: "sink",
        room: "bathroom",
        wordsId: 15,
        width: 170,
        height: 291,
        classes: "w-[6%] left-[46%] top-[55.5%] max-sm:w-[12%] max-sm:left-[47%] max-sm:top-[56.5%] z-1"
    },
    {
        id: 18,
        objectName: "bath",
        room: "bathroom",
        wordsId: 16,
        width: 329,
        height: 218,
        classes: "w-[16%] left-[60%] top-[57%] max-sm:w-[24%] max-sm:left-[69%] max-sm:top-[59%] z-1"
    },
    {
        id: 19,
        objectName: "towel",
        room: "bathroom",
        wordsId: 17,
        width: 111,
        height: 121,
        classes: "w-[5.5%] left-[54%] top-[56%] max-sm:w-[9%] max-sm:left-[60%] max-sm:top-[57%] z-1"
    }
];

export const words: Word[] = [
    {id: 1, name: "bed", image: "bed", imageWidth: 300, imageHeight: 300, transcript: "chuáng", spellingGif: ["bed1"]},
    {id: 2, name: "nightstand", image: "nightstand", imageWidth: 300, imageHeight: 300, transcript: "chuáng tóu guì", spellingGif: ["nightstand1", "nightstand2", "nightstand3"]},
    {id: 3, name: "lamp", image: "lamp1", imageWidth: 150, imageHeight: 150, transcript: "dèng", spellingGif: ["lamp1"]},
    {id: 4, name: "wardrobe", image: "wardrobe", imageWidth: 150, imageHeight: 150, transcript: "yī guì", spellingGif: ["wardrobe1", "wardrobe2"]},
    {id: 5, name: "TV", image: "TV1", imageWidth: 300, imageHeight: 300, transcript: "diàn shì", spellingGif: ["tv1", "tv2"]},
    {id: 6, name: "mirror", image: "mirror1", imageWidth: 150, imageHeight: 150, transcript: "jìng zǐ", spellingGif: ["mirror1", "mirror2"]},
    {id: 7, name: "fridge", image: "fridge1", imageWidth: 200, imageHeight: 200, transcript: "bīng xiāng", spellingGif: ["fridge1", "fridge2"]},
    {id: 8, name: "table", image: "table1", imageWidth: 300, imageHeight: 300, transcript: "zhuō zi", spellingGif: ["table1", "table2"]},
    {id: 9, name: "window", image: "window1", imageWidth: 200, imageHeight: 200, transcript: "chuāng hù", spellingGif: ["window1", "window2"]},
    {id: 10, name: "notebook", image: "notebook1", imageWidth: 150, imageHeight: 150, transcript: "bǐ jì běn", spellingGif: ["notebook1", "notebook2", "notebook3"]},
    {id: 11, name: "chair", image: "chair1", imageWidth: 150, imageHeight: 150, transcript: "yǐ zi", spellingGif: ["chair1", "chair2"]},
    {id: 12, name: "pen", image: "pen1", imageWidth: 200, imageHeight: 200, transcript: "bǐ", spellingGif: ["pen1"]},
    {id: 13, name: "toilet", image: "toilet1", imageWidth: 200, imageHeight: 200, transcript: "cè suǒ", spellingGif: ["toilet1", "toilet2"]},
    {id: 14, name: "bathrobe", image: "bathrobe", imageWidth: 150, imageHeight: 150, transcript: "yù páo", spellingGif: ["bathrobe1", "bathrobe2"]},
    {id: 15, name: "sink", image: "sink", imageWidth: 300, imageHeight: 300 , transcript: "shuǐ cáng", spellingGif: ["sink1", "sink2"]},
    {id: 16, name: "bath", image: "bath", imageWidth: 300, imageHeight: 300, transcript: "yù gāng", spellingGif: ["bath1", "bath2"]},
    {id: 17, name: "towel", image: "towel1", imageWidth: 200, imageHeight: 200, transcript: "máo jīn", spellingGif: ["towel1", "towel2"]}
]

export const wordsMap = new Map(words.map(word => [word.id, word]));

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

export function Translations({key, language: lang}: TranslationData): string {
    const translations: Record<string, Record<Language, string>> = {
        // === Routes ===
        'route./': {
            ru: 'Комнаты',
            en: 'Rooms',
            zh: '房间'
        },
        'route./spelling': {
            ru: 'Словарь',
            en: 'Dictionary',
            zh: '字典'
        },
        'route./testing': {
            ru: 'Тестирование',
            en: 'Testing',
            zh: '测试',
        },

        // === Words ===
        // === Room ===
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
            ru: 'Блокнот',
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

        // === Bathroom ===
        'words.toilet': {
            ru: 'Туалет',
            en: 'Toilet',
            zh: '厕所'
        },
        'words.bathrobe': {
            ru: 'Халат',
            en: 'Bathrobe',
            zh: '浴袍'
        },
        'words.sink': {
            ru: 'Раковина',
            en: 'Sink',
            zh: '水槽'
        },
        'words.bath': {
            ru: 'Ванна',
            en: 'Bath',
            zh: '浴室'
        },
        'words.towel': {
            ru: 'Полотенце',
            en: 'Towel',
            zh: '毛巾'
        },

        // === Roms messages ===
        'words.error': {
            ru: 'Информация о слове не найдена',
            en: 'Word information not found',
            zh: '单词信息未找到'
        },
        'words.notFound': {
            ru: 'Слово не найдено',
            en: 'Word not found',
            zh: '单词未找到'
        },
        'words.listen': {
            ru: 'Проговорить',
            en: 'Pronounce',
            zh: '发音'
        },

        // === Rooms ===
        'rooms.room': {
            ru: 'Комната',
            en: 'Room',
            zh: '客厅'
        },
        'rooms.bathroom': {
            ru: 'Ванная',
            en: 'Bathroom',
            zh: '卫生间'
        },

        'page.words.subtitle': {
            ru: 'Выберите объект',
            en: 'Select an object',
            zh: '选择对象'
        }
    }

    return translations[key]?.[lang] || key
}