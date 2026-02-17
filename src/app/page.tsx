'use client'

import Header from "@/components/Header";
import Image from "next/image";
import {objects, rooms, Translations, words} from "@/lib/db";
import {useLanguage} from "@/context/LanguageContext";
import {useEffect, useMemo, useRef, useState} from "react";
import {Room, WordsObjects} from "@/types/words_objects";
import Spinner from "@/components/common/loading/Spinner";
import ImageWithLoader from "@/components/common/loading/ImageWithLoader";

interface HandleObjectData {
    index: number;
    object: WordsObjects;
}

export default function Page() {
    const {getLanguage} = useLanguage();

    // Tooltip и таймер
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    // Получение текущего языка
    const currentLearnLanguage = getLanguage("learn");
    const currentMainLanguage = getLanguage("main");

    // Состояния для комнат и объектов комнат
    const [activeRoom, setActiveRoom] = useState<Room>("room");
    const [selectedObject, setSelectedObject] = useState<WordsObjects | null>(null)
    const currentRoomData = rooms.filter(room => room.name === activeRoom);
    const currentObjectsData = objects.filter(object => object.room === activeRoom);

    // Состояния для загрузки изображений
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const loadedImagesCount = useRef(0);

    // Счетчик загруженных изображений
    const totalImagesToLoad = useMemo(() => {
        return (currentRoomData.length > 0 ? 1 : 0) + currentObjectsData.length;
    }, [currentRoomData, currentObjectsData]);

    // Обработчик загрузки одного изображения
    const handleImageLoad = () => {
        loadedImagesCount.current++

        if (loadedImagesCount.current >= totalImagesToLoad && totalImagesToLoad > 0) {
            setAllImagesLoaded(true);
        }
    };

    // Сброс состояния при смене комнаты
    useEffect(() => {
        loadedImagesCount.current = 0;
        setAllImagesLoaded(false);
    }, [activeRoom]);

    // Обработка клика по объекту
    const handleObject = ({index, object}: HandleObjectData) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        setActiveTooltip(index);
        setSelectedObject(object);

        timeoutId.current = setTimeout(() => {
            setActiveTooltip(null);
            timeoutId.current = null; // Обнуляем после срабатывания
        }, 3000);
    }

    // Переключение комнат
    const switchRoom = (room: Room) => {
        setActiveRoom(room);
        setActiveTooltip(null);
    }

    return (
        <>
            <Header />
            <main className={"flex flex-col mx-6 mt-4"}>
                <section className={"flex justify-center mt-4"}>
                    <h1 className={"text-3xl max-sm:text-2xl font-bold"}>{Translations({key: 'page.words.subtitle', language: currentMainLanguage})}</h1>
                </section>
                <section className="flex justify-center gap-4 mt-6">
                    {rooms.map((room) => {
                        const roomName = Translations({
                            key: `rooms.${room.name}`,
                            language: currentMainLanguage
                        });

                        return (
                            <button
                                key={room.name}
                                onClick={() => switchRoom(room.name)}
                                className={`
                                    px-6 max-sm:px-4 py-3 max-sm:py-2 rounded-lg font-medium transition-all duration-200
                                    ${activeRoom === room.name
                                    ? 'bg-(--main-color) text-white shadow-lg scale-110'
                                    : 'bg-gray-100 text-gray-700'
                                }
                                `}
                            >
                                {roomName || room.name}
                            </button>
                        );
                    })}
                </section>
                <section className={"relative mt-6 "}>
                    <div
                        className={`
                            flex h-auto justify-center relative sm:transform sm:transition-all sm:duration-1000
                            rounded-lg
                            ${selectedObject ? "sm:-translate-x-[20%]" : "sm:translate-x-0"}
                            ${!allImagesLoaded ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        {!allImagesLoaded && totalImagesToLoad > 0 && (
                            <Spinner absolute/>
                        )}

                        {currentRoomData.map((room, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={`/wordsImage/${room.name}.png`}
                                    width={room.width}
                                    height={room.height}
                                    alt={room.name}
                                    className={"w-3/5 max-sm:w-full max-sm:h-auto rounded-lg"}
                                    onLoad={handleImageLoad}
                                />
                            )
                        })}

                        {currentObjectsData.map((object, index) => {
                            const objectName = Translations({
                                key: `words.${object.objectName}`,
                                language: currentLearnLanguage
                            });

                            return (
                                <div
                                    key={index}
                                    className={`absolute ${object.classes} group`}
                                    onClick={() => handleObject({index, object})}
                                >
                                    <button
                                        className="p-0 border-none bg-transparent cursor-pointer w-full"
                                    >
                                        <Image
                                            src={`/wordsImage/${object.objectName}.png`}
                                            width={object.width}
                                            height={object.height}
                                            alt={objectName}
                                            className={"w-full h-auto scale-100 hover:scale-105 transition-all duration-200"}
                                            onLoad={handleImageLoad}
                                        />
                                    </button>

                                    {activeTooltip === index && (
                                        <div
                                            className={`
                                                absolute bottom-full left-1/2 transform 
                                                -translate-x-1/2 mb-2 px-3 py-2 bg-(--main-color) 
                                                text-white text-sm sm:text-base rounded z-90 whitespace-nowrap
                                                scale-100 hover:scale-105 select-none
                                            `}
                                        >
                                            <p>{objectName}</p>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-(--main-color)"></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className={`
                            max-sm:hidden absolute w-[38%] h-full px-4 py-2 rounded-lg   
                            top-0 right-0 flex flex-col duration-1000
                            gap-4 bg-(--second-color)
                            
                            transform transition-all
                            ${selectedObject ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                        `}
                    >
                        {selectedObject && (
                            (() => {
                                const word = words.find(word => word.id === selectedObject.wordsId);
                                const showChineseExtras = currentLearnLanguage === 'zh';

                                if (!word) {
                                    return (
                                        <>
                                            <div className="relative flex items-center z-1">
                                                <button
                                                    className="bg-(--main-color) text-white px-3 py-1 rounded-md m-auto mr-0"
                                                    onClick={() => setSelectedObject(null)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div className="absolute h-full w-full flex justify-center items-center ">
                                                <h2>{Translations({key: 'words.error', language: currentMainLanguage})}</h2>
                                            </div>
                                        </>
                                    )
                                }

                                return (
                                    <>
                                        <div className="flex items-center">
                                            <h2 className={"flex-1 text-center font-bold text-xl"}>
                                                {Translations({key: `words.${word.name}`, language: currentMainLanguage})}
                                                {" / "}
                                                {Translations({key: `words.${word.name}`, language: currentLearnLanguage})}
                                                {showChineseExtras && ` (${word.transcript})`}
                                            </h2>
                                            <button
                                                className="bg-(--main-color) text-white px-3 py-1 rounded-md m-auto mr-0"
                                                onClick={() => setSelectedObject(null)}
                                            >
                                                X
                                            </button>
                                        </div>
                                        <ImageWithLoader
                                            src={`/wordsImage/${word.image}.png`}
                                            alt={word.name}
                                            width={word.imageWidth}
                                            height={word.imageHeight}
                                            className={"h-[25%] mx-auto object-contain"}
                                        />
                                        <button
                                            onClick={() => {
                                                const audio = new Audio(`/voices/${currentLearnLanguage}/${word.name}.mp3`);
                                                audio.play().catch(() => alert('Аудио не найдено'));
                                            }}
                                            className= {"self-start "}
                                        >
                                            🔊 {Translations({key: 'words.listen', language: currentMainLanguage})}
                                        </button>
                                        {showChineseExtras && word.spellingGif && word.spellingGif.length > 0 && (
                                            <div className="flex flex-row gap-4 justify-center items-center h-full w-full">
                                                {word.spellingGif.map((gif, index) => (
                                                    <div key={index} className="relative grow shrink-0 basis-0 max-w-[20%] h-auto">
                                                        <ImageWithLoader
                                                            src={`/spelling/${gif}.gif`}
                                                            alt={`${word.name} spelling ${index + 1}`}
                                                            width={50}
                                                            height={50}
                                                            className="object-cover w-full h-full"
                                                            unoptimized
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>

                                );
                            })()
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}