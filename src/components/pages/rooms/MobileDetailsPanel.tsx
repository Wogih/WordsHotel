// components/MobileDetailsPanel.tsx
'use client'

import ImageWithLoader from "@/components/common/loading/ImageWithLoader";
import {Translations, wordsMap} from "@/lib/db";
import {Language} from "@/types/language";
import {useEffect, useRef, useState} from "react";

interface MobileDetailsPanelProps {
    selectedObject: number | null;
    onClose: () => void;
    currentLearnLanguage: Language;
    currentMainLanguage: Language;
}

export function MobileDetailsPanel(
    {
        selectedObject,
        onClose,
        currentLearnLanguage,
        currentMainLanguage
    }: MobileDetailsPanelProps
) {
    const [localData, setLocalData] = useState<number | null>(selectedObject);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (selectedObject) {
            setLocalData(selectedObject);
            setIsClosing(false);
            setTimeout(() => {
                setIsOpen(true)
            }, 50);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        } else {
            setIsClosing(true);
            setIsOpen(false);

            timerRef.current = setTimeout(() => {
                setIsClosing(false);
                setLocalData(null);
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [selectedObject]);

    if (!localData && !isClosing) {
        return null;
    }

    const word = localData ? wordsMap.get(localData) : null;
    const showChineseExtras = currentLearnLanguage === 'zh';
    const isVisibleState = isOpen && !isClosing;

    return (
        <>
            <div
                className={`
                        sm:hidden fixed inset-0 z-40 
                        bg-black/50
                        transition-opacity duration-1000
                        ease-in-out
                        ${isVisibleState ? 'opacity-100' : 'opacity-0'}
                    `}
                onClick={onClose}
            />
            {!word ? <>
                    <div
                        className={`
                    sm:hidden fixed inset-x-0 bottom-0 bg-(--second-color) 
                    rounded-t-2xl shadow-lg z-50 
                    
                    transition-all duration-1000 ease-in-out
                    
                    ${isVisibleState ? 'translate-y-0 ' : 'translate-y-full'}
                `}>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">{Translations({
                                    key: 'words.notFound',
                                    language: currentMainLanguage
                                })}</h3>
                                <button
                                    className="bg-(--main-color) text-white px-3 py-1 rounded-md m-auto mr-0"
                                    onClick={() => onClose()}
                                >
                                    X
                                </button>
                            </div>
                            <p>{Translations({key: 'words.error', language: currentMainLanguage})}</p>
                        </div>
                    </div>
                </> :
                <>
                    <div
                        className={`
                        sm:hidden fixed inset-x-0 bottom-0 bg-(--second-color) 
                        rounded-t-2xl shadow-lg z-50 overflow-y-auto 
                
                        transition-all duration-1000 ease-in-out 
                
                        ${isVisibleState ? 'translate-y-0' : 'translate-y-full'}
                    `}>
                        <div className="p-4">
                            {/* Контент панели */}
                            <div className="flex justify-between items-center mb-4 sticky top-0">
                                <h3 className="text-lg font-bold">
                                    {Translations({key: `words.${word.name}`, language: currentMainLanguage})}
                                    {" / "}
                                    {Translations({key: `words.${word.name}`, language: currentLearnLanguage})}
                                    {showChineseExtras && ` (${word.transcript})`}
                                </h3>
                                <button
                                    className="bg-(--main-color) text-white px-3 py-1 rounded-md m-auto mr-0"
                                    onClick={onClose}
                                >
                                    X
                                </button>
                            </div>

                            {/* Изображение */}
                            <div className="mb-4 relative">
                                <ImageWithLoader
                                    src={`/wordsImage/${word.image}.png`}
                                    alt={word.name}
                                    width={word.imageWidth}
                                    height={word.imageHeight}
                                    className="w-full max-h-48 object-contain"
                                    spinnerProps={{absolute: true, className: "left-1/2 -translate-x-1/2"}}
                                />
                            </div>

                            {/* Кнопка аудио */}
                            <button
                                onClick={() => {
                                    const audio = new Audio(`/voices/${currentLearnLanguage}/${word.name}.mp3`);
                                    audio.play().catch(() => alert('Аудио не найдено'));
                                }}
                                className="w-full mb-4 py-3 bg-(--main-color) text-white rounded-lg font-medium"
                            >
                                🔊 {Translations({key: 'words.listen', language: currentMainLanguage})}
                            </button>

                            {/* Иероглифы */}
                            {showChineseExtras && word.spellingGif && word.spellingGif.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 relative">
                                    {word.spellingGif.map((gif, index) => (
                                        <div key={index} className="aspect-square h-auto">
                                            <ImageWithLoader
                                                src={`/spelling/${gif}.gif`}
                                                alt={`${word.name} spelling ${index + 1}`}
                                                width={50}
                                                height={50}
                                                className="w-full h-auto object-cover rounded-lg"
                                                unoptimized
                                                spinnerProps={{absolute: true}}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>}
        </>
    )
}