import {WordsObjects} from "@/types/words_objects";
import {Translations, wordsMap} from "@/lib/db";
import ImageWithLoader from "@/components/common/loading/ImageWithLoader";
import {Language} from "@/types/language";

interface PCDetailedPanelProps {
    selectedObject: WordsObjects | null;
    onClose: () => void;
    currentMainLanguage: Language;
    currentLearnLanguage: Language;
}

export default function PCDetailedPanel(
    {
        selectedObject,
        onClose,
        currentLearnLanguage,
        currentMainLanguage
    }: PCDetailedPanelProps
) {
    const word = selectedObject ? wordsMap.get(selectedObject.wordsId) : null;
    const showChineseExtras = currentLearnLanguage === 'zh';



    if (!word) {
        return (
            <div
                className={`
                            hidden sm:flex absolute w-[38%] h-full px-4 py-2 rounded-lg   
                            top-0 right-0 flex-col duration-1000
                            gap-4 bg-(--second-color) 
                            
                            transform transition-all
                            ${selectedObject ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                        `}
            >
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
            </div>
        )
    }

    return (
        <div
            className={`
                            hidden sm:flex absolute w-[38%] h-full px-4 py-2 rounded-lg   
                            top-0 right-0 flex-col duration-1000
                            gap-4 bg-(--second-color)
                            
                            transform transition-all
                            ${selectedObject ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                        `}
        >
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
        </div>

    );
}

