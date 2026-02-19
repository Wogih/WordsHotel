'use client'

import {useLanguage} from "@/context/LanguageContext";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import Header from "@/components/Header";
import {Translations, wordsMap} from "@/lib/db";
import Spinner from "@/components/common/loading/Spinner";
import {MobileDetailsPanel} from "@/components/pages/rooms/MobileDetailsPanel";
import {Word} from "@/types/words_objects";
import PCRoomsDetailedPanel from "@/components/pages/rooms/PCRoomsDetailedPanel";
import ImageWithLoader from "@/components/common/loading/ImageWithLoader";

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_COUNT = 5;

export default function Page() {
    const {getLanguage} = useLanguage();
    const loaderRef = useRef<HTMLDivElement>(null);

    // Получение текущих языков
    const currentLearnLanguage = getLanguage("learn");
    const currentMainLanguage = getLanguage("main");

    // Состояния поиска и загрузки
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT)
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Состояние выбранного слова
    const [selectedWord, setSelectedWord] = useState<Word | null>(null)

    // Сброс количества видимых слов при изменении поиска
    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }, [debouncedSearchQuery]);

    // Получение всех слов для поиска
    const allSearchableWords = useMemo(() => {
        return Array.from(wordsMap.values()).map((word) => {
            const translationKey = `words.${word.name}`;

            const learnLanguageName = Translations({ key: translationKey, language: currentLearnLanguage });
            const mainLanguageName = Translations({ key: translationKey, language: currentMainLanguage });

            return {
                wordObj: word,
                translatedName: learnLanguageName,
                mainLanguageName,
            }
        })
    }, [currentLearnLanguage, currentMainLanguage]);

    // Фильтрация слов
    const filteredWords = useMemo(() => {

        if (!debouncedSearchQuery.trim()) {
            return allSearchableWords;
        }

        const query = debouncedSearchQuery.toLowerCase().trim();

        return allSearchableWords.filter((word) => {
            return (
                word.translatedName.toLowerCase().includes(query) ||
                word.mainLanguageName.toLowerCase().includes(query)
            )
        });



    }, [allSearchableWords, debouncedSearchQuery]);

    // Подготовка видимых слов
    const visibleWords = useMemo(() => {
        return filteredWords.slice(0, visibleCount);
    }, [filteredWords, visibleCount]);
    const hasMore = visibleWords.length < filteredWords.length;

    // Загрузка еще слов
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);

        await new Promise(resolve => setTimeout(resolve, 200));

        setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredWords.length));
        setIsLoadingMore(false);
    }, [isLoadingMore, hasMore, filteredWords.length]);

    // Автоматическая загрузка при прокрутке
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, loadMore]);

    return (
        <div className={"overflow-hidden"}>
            <Header />
            <main className="flex flex-col gap-4 mt-4 mx-6">
                <section>
                    <input
                        type="text"
                        className={`
                            w-full px-4 py-2 bg-(--second-color) rounded-md
                        `}
                        placeholder={`${Translations({key: 'page.dictionary.searchBar', language: currentMainLanguage})} ${currentMainLanguage} | ${currentLearnLanguage}`}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </section>
                <section className="mt-4 relative flex">
                    <div className={`
                        grid grid-cols-[repeat(auto-fill,minmax(12em,1fr))] gap-4
                        ml-0 m-auto
                        
                        transition-all duration-1000 
                        ${selectedWord ? 'sm:w-[65%]' : 'sm:w-full'}
                    `}>
                        {visibleWords.map((word, i) => (
                            <div
                                key={i}
                                className={`
                                px-4 py-2 bg-(--second-color) rounded-md flex flex-col gap-2
                                aspect-[1/1.2] items-center
                            `}
                                onClick={() => {setSelectedWord(word.wordObj)}}
                            >
                                <div className={"w-full h-[60%] relative"}>
                                    <ImageWithLoader
                                        src={`/wordsImage/${word.wordObj.image}.png`}
                                        alt={word.wordObj.name}
                                        width={word.wordObj.imageWidth}
                                        height={word.wordObj.imageHeight}
                                        className={"w-full h-full object-contain object-center"}
                                        spinnerProps={{absolute: true, className: "w-full h-full object-center"}}
                                    />
                                </div>

                                <h3 className="text-lg font-bold">{word.mainLanguageName} / {word.translatedName}</h3>
                            </div>
                        ))}
                    </div>

                    <PCRoomsDetailedPanel
                        selectedObject={selectedWord?.id || null}
                        onClose={() => setSelectedWord(null)}
                        currentMainLanguage={currentMainLanguage}
                        currentLearnLanguage={currentLearnLanguage}
                        className={`fixed h-[70%] w-[30%] top-[50hv] right-6`}
                    />

                </section>

                <MobileDetailsPanel
                    selectedObject={selectedWord?.id || null}
                    onClose={() => {setSelectedWord(null)}}
                    currentLearnLanguage={currentLearnLanguage}
                    currentMainLanguage={currentMainLanguage}
                />

                {hasMore && (
                    <div
                        ref={loaderRef}
                        className="flex justify-center items-center py-8"
                    >
                        {isLoadingMore ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                <span>Загрузка...</span>
                            </div>
                        ) : (
                            <button
                                onClick={loadMore}
                                className="px-6 py-2 bg-(--primary-color) text-white rounded-md hover:opacity-90 transition-opacity"
                            >
                                Показать еще
                            </button>
                        )}
                    </div>
                )}


                {filteredWords.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Ничего не найдено
                    </div>
                )}
            </main>
        </div>
    )
}