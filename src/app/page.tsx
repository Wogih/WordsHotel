'use client'

import Header from "@/components/Header";
import Image from "next/image";
import {objects, rooms, Translations} from "@/lib/db";
import {useLanguage} from "@/context/LanguageContext";
import {useEffect, useRef, useState} from "react";
import {Room, WordsObjects} from "@/types/words_objects";
import Spinner from "@/components/common/loading/Spinner";
import PCRoomsDetailedPanel from "@/components/pages/rooms/PCRoomsDetailedPanel";
import {MobileDetailsPanel} from "@/components/pages/rooms/MobileDetailsPanel";
import ChoosingRoom from "@/components/common/choosingRoom";

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
    const totalImagesToLoad = (currentRoomData.length > 0 ? 1 : 0) + currentObjectsData.length;

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
        <div className={"overflow-hidden"}>
            <Header/>
            <main className={" flex flex-col mx-6 mt-4 "}>
                <section className={"flex justify-center mt-4"}>
                    <h1 className={"text-3xl max-sm:text-2xl font-bold"}>{Translations({
                        key: 'page.words.subtitle',
                        language: currentMainLanguage
                    })}</h1>
                </section>
                <section className="flex justify-center gap-4 mt-6">
                    {ChoosingRoom({currentMainLanguage, switchRoom, activeRoom})}
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
                                    className={"w-3/5 max-sm:w-full h-auto rounded-lg"}
                                    onLoad={handleImageLoad}
                                    priority
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
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-(--main-color)"></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <PCRoomsDetailedPanel
                        selectedObject={selectedObject?.wordsId || null}
                        onClose={() => {setSelectedObject(null)}}
                        currentMainLanguage={currentMainLanguage}
                        currentLearnLanguage={currentLearnLanguage}
                        className={"w-[38%] h-full top-0 right-0"}
                    />
                    <MobileDetailsPanel
                        selectedObject={selectedObject?.wordsId || null}
                        onClose={() => setSelectedObject(null)}
                        currentLearnLanguage={currentLearnLanguage}
                        currentMainLanguage={currentMainLanguage}
                    />
                </section>
            </main>
        </div>
    )
}