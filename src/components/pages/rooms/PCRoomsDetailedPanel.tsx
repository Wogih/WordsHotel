import {Translations, wordsMap} from "@/lib/db";
import ImageWithLoader from "@/components/common/loading/ImageWithLoader";
import {Language} from "@/types/language";
import {useEffect, useRef, useState} from "react";
import {AudioButton} from "@/components/common/audioButton";

interface PCDetailedPanelProps {
    selectedObject: number | null;
    onClose: () => void;
    currentMainLanguage: Language;
    currentLearnLanguage: Language;
    className?: string;
}

export default function PCRoomsDetailedPanel(
    {
        selectedObject,
        onClose,
        currentLearnLanguage,
        currentMainLanguage,
        className
    }: PCDetailedPanelProps
) {
    // === Локальные состояния для закрытия ===
    const [localData, setLocalData] = useState<number | null>(selectedObject);
    const [isClosing, setIsClosing] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);



    useEffect(() => {
        if (selectedObject) {
            setLocalData(selectedObject);
            setIsClosing(false);
            setTimeout(() => {
                setIsOpen(true);
            }, 50);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
        else {
            setIsOpen(false);
            setIsClosing(true);

            timerRef.current = setTimeout(() => {
                setLocalData(null);
                setIsClosing(false);
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [selectedObject])

    if (!localData && !isClosing) {
        return null;
    }

    const word = localData ? wordsMap.get(localData) : null;
    const showChineseExtras = currentLearnLanguage === 'zh';
    const isVisibleState = isOpen && !isClosing;


    return (
        <div
            className={`
                            hidden sm:flex absolute flex-col duration-1000
                            gap-4 bg-(--second-color) px-4 py-2 rounded-lg
                            
                            ${className}
                            
                            transform transition-all
                            ${isVisibleState ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                        `}
        >
            {!word ?
                <>
                    <div className="relative flex items-center z-1">
                        <button
                            className="bg-(--main-color) text-white px-3 py-1 rounded-md m-auto mr-0"
                            onClick={() => onClose()}
                        >
                            X
                        </button>
                    </div>
                    <div className="absolute h-full w-full flex justify-center items-center ">
                        <h2>{Translations({key: 'words.error', language: currentMainLanguage})}</h2>
                    </div>
                </> :
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
                            onClick={() => onClose()}
                        >
                            X
                        </button>
                    </div>
                    <ImageWithLoader
                        src={`/wordsImage/${word.image}.png`}
                        alt={word.name}
                        width={word.imageWidth}
                        height={word.imageHeight}
                        className={"h-[25%] w-auto mx-auto object-contain"}
                    />
                    <AudioButton word={word} currentLearnLanguage={currentLearnLanguage} currentMainLanguage={currentMainLanguage}/>

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
            }
        </div>

    );
}

