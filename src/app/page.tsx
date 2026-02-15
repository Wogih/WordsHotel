'use client'

import Header from "@/components/Header";
import Image from "next/image";
import {objects, rooms, Translations} from "@/lib/db";
import {useLanguage} from "@/context/LanguageContext";
import { useState } from "react";
import {Room} from "@/types/words_objects";

export default function Page() {
    const {getLanguage} = useLanguage();
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
    const [activeRoom, setActiveRoom] = useState<Room>("room");

    return (
        <>
            <Header />
            <main className={"flex flex-col mx-6 mt-4"}>
                <section>
                    <div className={"flex h-auto justify-center relative"}>
                        {rooms.filter(room => (room.name === activeRoom)).map((room, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={`/objects/${room.name}.png`}
                                    width={room.width}
                                    height={room.height}
                                    alt={room.name}
                                    className={"w-3/5 max-sm:w-full"}
                                />
                            )
                        })}

                        {objects.map((object, index) => {
                            const objectName = Translations({
                                key: `words.${object.objectName}`,
                                language: getLanguage("learn")
                            });

                            return (
                                <div
                                    key={index}
                                    className={`absolute ${object.classes} group`}
                                    onClick={() => setActiveTooltip(index)}
                                >
                                    <button
                                        className="p-0 border-none bg-transparent cursor-pointer w-full"
                                    >
                                        <Image
                                            src={`/objects/${object.objectName}.png`}
                                            width={object.width}
                                            height={object.height}
                                            alt={objectName}
                                            className={"w-full h-auto scale-100 hover:scale-105 transition-all duration-200"}
                                        />
                                    </button>

                                    {activeTooltip === index && (
                                        <div
                                            className={`
                                                absolute bottom-full left-1/2 transform 
                                                -translate-x-1/2 mb-2 px-3 py-2 bg-(--custom-red) 
                                                text-white text-sm rounded z-90 whitespace-nowrap
                                                scale-100 hover:scale-105 select-none
                                            `}
                                        >
                                            <p>{objectName}</p>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-(--custom-red)"></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}